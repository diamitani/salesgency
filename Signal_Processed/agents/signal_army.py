from typing import Annotated, Any, Dict, List, Sequence, TypedDict
import operator
import json

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import create_react_agent

# Import our custom tools
from agent_tools import (
    INBOUND_TOOLS, OUTBOUND_TOOLS, CRM_TOOLS, 
    PLAYBOOK_TOOLS, REPORTING_TOOLS
)
from deepagent import deepagent as deep_agent_executor

# Define the State for the Agent Team
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next: str

# Define the LLM (requires OPENAI_API_KEY environment variable)
llm = ChatOpenAI(model="gpt-4o-mini")

# --- Define the Army of Agents using LangGraph's prebuilt ReAct Agent ---

# 1. Inbound Automation Engine
inbound_prompt = """You are the Inbound Automation Engine. 
Your job is to process incoming leads, classify them as MQLs, and enrich their data.
Use your tools to enrich lead data and classify MQL status. Then summarize your actions."""
inbound_agent = create_react_agent(llm, tools=INBOUND_TOOLS, state_modifier=inbound_prompt)

def inbound_node(state: AgentState):
    result = inbound_agent.invoke({"messages": state["messages"]})
    return {"messages": [AIMessage(content=f"[Inbound Engine] {result['messages'][-1].content}")]}

# 2. Outbound Automation Engine
outbound_prompt = """You are the Outbound Automation Engine (Prospect Automation Engine).
Your job is to orchestrate multi-touch outbound sequences.
Use your tools to draft LinkedIn messages and actually send outreach emails based on lead data.
Only send an email if an email address is provided."""
outbound_agent = create_react_agent(llm, tools=OUTBOUND_TOOLS, state_modifier=outbound_prompt)

def outbound_node(state: AgentState):
    result = outbound_agent.invoke({"messages": state["messages"]})
    return {"messages": [AIMessage(content=f"[Outbound Engine] {result['messages'][-1].content}")]}

# 3. CRM GTM Setup Engine
crm_prompt = """You are the CRM GTM Setup Engine (Enably).
Your job is to audit and structure the CRM, setting up pipelines and contacts.
Use your tools to create CRM contacts for new leads."""
crm_agent = create_react_agent(llm, tools=CRM_TOOLS, state_modifier=crm_prompt)

def crm_node(state: AgentState):
    result = crm_agent.invoke({"messages": state["messages"]})
    return {"messages": [AIMessage(content=f"[CRM Engine] {result['messages'][-1].content}")]}

# 4. Sales Playbook Engine
playbook_prompt = """You are the Sales Playbook Engine.
Your job is to generate dynamic sales playbooks, objection handling scripts, and battlecards.
Use your tools to generate battlecards against specific competitors."""
playbook_agent = create_react_agent(llm, tools=PLAYBOOK_TOOLS, state_modifier=playbook_prompt)

def playbook_node(state: AgentState):
    result = playbook_agent.invoke({"messages": state["messages"]})
    return {"messages": [AIMessage(content=f"[Playbook Engine] {result['messages'][-1].content}")]}

# 5. Reporting Dashboard Engine
reporting_prompt = """You are the Reporting Dashboard Engine.
Your job is to compile metrics and generate execution reports from all other engines.
Use your tools to fetch real-time campaign metrics."""
reporting_agent = create_react_agent(llm, tools=REPORTING_TOOLS, state_modifier=reporting_prompt)

def reporting_node(state: AgentState):
    result = reporting_agent.invoke({"messages": state["messages"]})
    return {"messages": [AIMessage(content=f"[Reporting Engine] {result['messages'][-1].content}")]}

# 6. DeepAgent (Master Researcher)
def deepagent_node(state: AgentState):
    result = deep_agent_executor.invoke({"messages": state["messages"]})
    return {"messages": [AIMessage(content=f"[DeepAgent] {result['messages'][-1].content}")]}

# --- Supervisor Agent ---
members = ["Inbound_Engine", "Outbound_Engine", "CRM_Engine", "Playbook_Engine", "Reporting_Engine", "DeepAgent_Researcher"]
system_prompt = (
    "You are 'Signal', the Master GTM Supervisor Agent."
    " You manage a team of specialist worker agents: {members}."
    " Read the conversation history and the user's initial request."
    " Based on the user's request, determine which agent should act next."
    " Each agent will perform their specialized step. Once all parts of the user request are fully completed, respond with 'FINISH'."
)
options = ["FINISH"] + members

routing_function = {
    "name": "route",
    "description": "Select the next role.",
    "parameters": {
        "title": "routeSchema",
        "type": "object",
        "properties": {
            "next": {
                "title": "Next",
                "anyOf": [{"enum": options}],
            }
        },
        "required": ["next"],
    },
}

supervisor_prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    MessagesPlaceholder(variable_name="messages"),
    ("system", "Given the conversation above, who should act next? Select one of: {options}")
]).partial(options=str(options), members=", ".join(members))

supervisor_chain = (
    supervisor_prompt
    | llm.bind_functions(functions=[routing_function], function_call="route")
    | (lambda x: json.loads(x.additional_kwargs["function_call"]["arguments"]))
)

def supervisor_node(state: AgentState):
    result = supervisor_chain.invoke(state)
    return result

# --- Build the LangGraph ---
workflow = StateGraph(AgentState)

workflow.add_node("Signal_Supervisor", supervisor_node)
workflow.add_node("Inbound_Engine", inbound_node)
workflow.add_node("Outbound_Engine", outbound_node)
workflow.add_node("CRM_Engine", crm_node)
workflow.add_node("Playbook_Engine", playbook_node)
workflow.add_node("Reporting_Engine", reporting_node)
workflow.add_node("DeepAgent_Researcher", deepagent_node)

for member in members:
    workflow.add_edge(member, "Signal_Supervisor")

conditional_map = {k: k for k in members}
conditional_map["FINISH"] = END
workflow.add_conditional_edges("Signal_Supervisor", lambda x: x["next"], conditional_map)

workflow.set_entry_point("Signal_Supervisor")
signal_graph = workflow.compile()

if __name__ == "__main__":
    import sys
    print("========================================")
    print("Testing Signal Master GTM Agent Army...")
    print("========================================\n")
    
    test_request = "We just got a new lead from vp@salesforce.com named Jane Doe. Please enrich and classify the lead, create a CRM contact, and then send an outreach email."
    print(f"USER REQUEST: {test_request}\n")
    
    for s in signal_graph.stream({"messages": [HumanMessage(content=test_request)]}, config={"recursion_limit": 20}):
        if "__end__" not in s:
            for key, value in s.items():
                if "messages" in value:
                    print(value["messages"][-1].content)
                else:
                    print(f"[Supervisor] Routing to: {value.get('next')}")
            print("----------------------------------------")
