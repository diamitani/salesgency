import os
import glob
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage, AIMessage

# --- Path to the Master Skill Library ---
SKILL_LIBRARY_DIR = "/Users/patmini/salesgency/Signal_Processed/Master_Skill_Library"

# --- Langchain Tools for Accessing Skills ---

@tool
def list_available_skills() -> str:
    """Returns a list of all available skills, courses, playbooks, and processes in the Master Library."""
    try:
        skill_folders = [f.name for f in os.scandir(SKILL_LIBRARY_DIR) if f.is_dir()]
        return f"Found {len(skill_folders)} skills in the library. Here is a sample:\n" + "\n".join(skill_folders[:50]) + "\n...(truncated for length)"
    except Exception as e:
        return f"Error reading library: {str(e)}"

@tool
def read_skill_content(skill_name: str) -> str:
    """Reads and returns the full content of a specific skill by its exact name."""
    skill_path = os.path.join(SKILL_LIBRARY_DIR, skill_name, "SKILL.md")
    try:
        with open(skill_path, "r", errors="ignore") as f:
            content = f.read()
        return content[:15000] # Truncate to prevent context window explosion
    except FileNotFoundError:
        return f"Skill '{skill_name}' not found. Please use list_available_skills to check the exact name."
    except Exception as e:
        return f"Error reading skill: {str(e)}"

@tool
def search_skills(keyword: str) -> str:
    """Searches across all skills in the master library for a specific keyword or concept and returns relevant excerpts."""
    results = []
    try:
        for skill_dir in os.scandir(SKILL_LIBRARY_DIR):
            if skill_dir.is_dir():
                skill_path = os.path.join(skill_dir.path, "SKILL.md")
                if os.path.exists(skill_path):
                    with open(skill_path, "r", errors="ignore") as f:
                        content = f.read()
                        if keyword.lower() in content.lower():
                            # Extract a snippet
                            start_idx = max(0, content.lower().find(keyword.lower()) - 100)
                            end_idx = min(len(content), start_idx + 300)
                            snippet = content[start_idx:end_idx].replace('\n', ' ')
                            results.append(f"- **{skill_dir.name}**: ...{snippet}...")
                            
        if not results:
            return f"No skills found containing the keyword: {keyword}"
            
        return f"Found '{keyword}' in {len(results)} skills:\n" + "\n".join(results[:10])
    except Exception as e:
        return f"Error searching skills: {str(e)}"

DEEP_AGENT_TOOLS = [list_available_skills, read_skill_content, search_skills]

# --- Initialize DeepAgent ---
llm = ChatOpenAI(model="gpt-4o")

deep_agent_prompt = """You are DeepAgent, the master architectural researcher and synthesizer.
Your unique capability is accessing the massive Master Skill Library containing over 340 specific GTM strategies, playbooks, CRM processes, and automation notes.

When asked a question or given a task:
1. Use `search_skills` to find relevant documents in the library.
2. Use `read_skill_content` to deeply analyze the exact processes and rules from the source files.
3. Synthesize the findings into comprehensive, actionable strategies.

Never guess the process; always consult your tools to read the actual Signal Master Skill Library files.
"""

deepagent = create_react_agent(llm, tools=DEEP_AGENT_TOOLS, state_modifier=deep_agent_prompt)

if __name__ == "__main__":
    print("========================================")
    print("Testing DeepAgent with Langchain Skills...")
    print("========================================\n")
    
    test_request = "What are our best practices for sales outreach according to the library?"
    print(f"USER REQUEST: {test_request}\n")
    
    result = deepagent.invoke({"messages": [HumanMessage(content=test_request)]})
    
    for message in result["messages"]:
        if hasattr(message, "tool_calls") and message.tool_calls:
            for tc in message.tool_calls:
                print(f"[DeepAgent Tool Call] {tc['name']} -> {tc['args']}")
        elif isinstance(message, AIMessage) and message.content:
            print(f"[DeepAgent Final Answer]\n{message.content}")
