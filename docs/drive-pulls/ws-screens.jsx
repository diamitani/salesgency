/* Artispreneur Workspace — Business, Brand, Booking, Academy, Profile */

const SERVICES=[
  {id:'ein',n:'EIN registration',s:'active',d:'Your federal tax ID. Required before banking, PRO payouts, or any contract in the business name.',out:'IRS CP-575 letter',mgr:'Legal'},
  {id:'llc',n:'Form an LLC',s:'next',d:'Separates your personal assets from the business and lets a venue pay an entity instead of a person.',out:'Articles of organization',mgr:'Legal'},
  {id:'ccorp',n:'Form a C-Corp',s:'idle',d:'Investor-ready structure. Only worth it if you are raising or issuing equity.',out:'Certificate of incorporation',mgr:'Legal'},
  {id:'bank',n:'Business banking',s:'idle',d:'A dedicated account so income, deductions and taxes stay clean from day one.',out:'Account + debit card',mgr:'Finance'},
  {id:'pro',n:'P.R.O. registration',s:'next',d:'Register as writer and publisher with ASCAP or BMI, plus SoundExchange and the MLC.',out:'Writer + publisher IPI',mgr:'Publishing'},
  {id:'works',n:'Register your works',s:'next',d:'Submit every song with ISRC, writer shares and publisher shares attached correctly.',out:'12 work registrations',mgr:'Publishing'},
  {id:'splits',n:'Split sheets',s:'idle',d:'Generate a signable split sheet the moment a session ends, before anyone forgets.',out:'Signed PDF per session',mgr:'Publishing'},
  {id:'ledger',n:'P&L and tax reserve',s:'idle',d:'Categorize every transaction, track deductions, and know your quarterly set-aside.',out:'Running P&L',mgr:'Finance'},
  {id:'contract',n:'Contracts',s:'idle',d:'Draft performance, production, management and sync agreements — or review what arrives.',out:'Draft + redline',mgr:'Legal'},
  {id:'trademark',n:'Trademark your name',s:'idle',d:'Protect the artist name and logo before someone else files on it.',out:'USPTO filing',mgr:'Legal'}
];

function BusinessScreen(){
  const [open,setOpen]=React.useState(null);
  const [step,setStep]=React.useState(0);
  const vw=useVW();const narrow=vw<1150;
  const [f,setF]=React.useState({name:'',type:'Single-member LLC',state:'California',ssn:''});
  const svc=SERVICES.find(s=>s.id===open);
  const steps=['Entity','Responsible party','Review','Submitted'];
  function close(){setOpen(null);setStep(0);}
  return <div style={{padding:'30px 32px 60px',overflowY:'auto'}}>
    <StatRow>
      <Stat k="Entity status" v="None" note="LLC not yet filed" c={W.gold}/>
      <Stat k="EIN" v="Pending" note="Application in flight" c={W.redHi}/>
      <Stat k="Works registered" v="0 / 12" note="Metadata ready"/>
      <Stat k="Business income YTD" v="$0" note="Connect an account" c={W.t2}/>
    </StatRow>

    <Section eyebrow="Formation, rights & money" title="Ten things a business needs. Your managers do all of them.">
      <div style={{borderTop:`1px solid ${W.line}`}}>
        {SERVICES.map((s,i)=><LRow key={s.id} onClick={()=>setOpen(s.id)} gap={narrow?16:24} cols={[
          {el:<Mono fs={10.5}>{String(i+1).padStart(2,'0')}</Mono>,w:'32px'},
          {el:<div><div style={{fontFamily:W.display,fontSize:19,color:W.cream,lineHeight:1.15,marginBottom:5}}>{s.n}</div><div style={{fontSize:14,color:W.t2,lineHeight:1.55,maxWidth:'56ch'}}>{s.d}</div>{narrow&&<div style={{marginTop:8,display:'flex',gap:14,flexWrap:'wrap'}}><Mono fs={10} c={W.redHi}>{s.out}</Mono><Mono fs={10}>{s.mgr}</Mono></div>}</div>},
          {el:<Mono fs={10} c={W.redHi}>{s.out}</Mono>,w:'190px',hide:narrow},
          {el:<Mono fs={10}>{s.mgr}</Mono>,w:'110px',hide:narrow},
          {el:<Pill s={s.s}/>,w:'130px',style:{textAlign:'right'}}
        ]}/>)}
      </div>
    </Section>

    <Sheet open={!!svc} onClose={close} eyebrow={svc?svc.mgr+' manager':''} title={svc?svc.n:''}
      foot={svc&&(step<3?<React.Fragment>
        <Btn v="g" onClick={close}>Cancel</Btn>
        <Btn v="p" onClick={()=>setStep(s=>s+1)}>{step===2?'Submit to IRS':'Continue'}<WIco n="arrow" s={13}/></Btn>
      </React.Fragment>:<Btn v="p" onClick={close}>Back to workspace</Btn>)}>
      {svc&&<div>
        {svc.id==='ein'?<div>
          <div style={{display:'flex',gap:0,marginBottom:28,borderBottom:`1px solid ${W.lineSoft}`}}>
            {steps.map((s,i)=><div key={s} style={{flex:1,padding:'0 0 10px',borderBottom:`2px solid ${i<=step?W.red:'transparent'}`,marginBottom:-1}}>
              <Mono fs={9.5} c={i<=step?W.cream:W.t3}>{String(i+1).padStart(2,'0')} {s}</Mono>
            </div>)}
          </div>
          {step===0&&<div style={{display:'grid',gap:22}}>
            <Field label="Legal business name" value={f.name} onChange={v=>setF({...f,name:v})} placeholder="e.g. Nightshift Music LLC"/>
            <Field label="Entity type" as="select" value={f.type} onChange={v=>setF({...f,type:v})} opts={['Single-member LLC','Multi-member LLC','C-Corporation','Sole proprietor']}/>
            <Field label="State of formation" as="select" value={f.state} onChange={v=>setF({...f,state:v})} opts={['California','New York','Texas','Georgia','Florida','Tennessee','Delaware']}/>
            <p style={{fontSize:14,color:W.t3,lineHeight:1.6}}>Your legal manager files this directly with the IRS. Most EINs are issued the same business day.</p>
          </div>}
          {step===1&&<div style={{display:'grid',gap:22}}>
            <Field label="Responsible party — full legal name" value={f.rp||''} onChange={v=>setF({...f,rp:v})} placeholder="As it appears on your ID"/>
            <Field label="SSN or ITIN" value={f.ssn} onChange={v=>setF({...f,ssn:v})} placeholder="•••-••-••••"/>
            <Field label="Business address" value={f.addr||''} onChange={v=>setF({...f,addr:v})} placeholder="Street, city, ZIP"/>
            <p style={{fontSize:14,color:W.t3,lineHeight:1.6}}>Encrypted in transit and at rest. Used only for this filing and never shared.</p>
          </div>}
          {step===2&&<div style={{borderTop:`1px solid ${W.lineSoft}`}}>
            {[['Business name',f.name||'—'],['Entity type',f.type],['State',f.state],['Responsible party',f.rp||'—'],['SSN / ITIN',f.ssn?'•••-••-'+f.ssn.slice(-4):'—'],['Filing fee','$0 — included']].map(([k,v])=>
              <div key={k} style={{display:'flex',justifyContent:'space-between',gap:20,padding:'12px 0',borderBottom:`1px solid ${W.lineSoft}`}}>
                <Mono fs={10}>{k}</Mono><span style={{fontSize:14.5,color:W.cream}}>{v}</span></div>)}
          </div>}
          {step===3&&<div style={{textAlign:'center',padding:'26px 0'}}>
            <div style={{width:52,height:52,margin:'0 auto 20px',border:`1px solid ${W.ok}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}><WIco n="check" s={22} c={W.ok}/></div>
            <Disp fs={26} style={{display:'block',marginBottom:12}}>Filed.</Disp>
            <p style={{fontSize:15.5,color:W.t2,maxWidth:'42ch',margin:'0 auto',lineHeight:1.6}}>Your legal manager submitted the application and will post the CP-575 letter here the moment it lands. Banking unlocks automatically after that.</p>
          </div>}
        </div>:<div>
          <p style={{fontSize:16.5,color:W.t2,lineHeight:1.65,marginBottom:26}}>{svc.d}</p>
          <div style={{borderTop:`1px solid ${W.lineSoft}`,marginBottom:26}}>
            {[['Owned by',svc.mgr+' manager'],['You receive',svc.out],['Status',svc.s==='next'?'Ready to start':svc.s==='active'?'In flight':'Not started'],['Cost','Included with Agent access']].map(([k,v])=>
              <div key={k} style={{display:'flex',justifyContent:'space-between',gap:20,padding:'12px 0',borderBottom:`1px solid ${W.lineSoft}`}}>
                <Mono fs={10}>{k}</Mono><span style={{fontSize:14.5,color:W.cream}}>{v}</span></div>)}
          </div>
          <Btn v="p" full onClick={close}>Hand this to your {svc.mgr.toLowerCase()} manager<WIco n="arrow" s={13}/></Btn>
        </div>}
      </div>}
    </Sheet>
  </div>;
}

function BrandScreen(){
  const vw=useVW();const narrow=vw<1150;
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const plan={2:{t:'Studio clip',c:'#EC4899'},4:{t:'Single announce',c:W.red},5:{t:'Pre-save push',c:W.gold},9:{t:'Behind the track',c:'#EC4899'},11:{t:'Release day',c:W.red},12:{t:'Press push',c:'#4ECDC4'},16:{t:'Lyric video',c:'#EC4899'},18:{t:'Playlist thanks',c:W.gold},23:{t:'Live rehearsal',c:'#EC4899'},25:{t:'Tour teaser',c:'#F59E0B'}};
  return <div style={{padding:'30px 32px 60px',overflowY:'auto'}}>
    <StatRow>
      <Stat k="EPK" v="Draft" note="Not published yet" c={W.gold}/>
      <Stat k="Assets" v="6" note="Logo, photos, covers"/>
      <Stat k="Posts planned" v="10" note="April calendar"/>
      <Stat k="Press contacts" v="34" note="Matched to your genre"/>
    </StatRow>

    <Section eyebrow="Content calendar · April" title="What goes out, and when." right={<Btn v="g" size="sm"><WIco n="plus" s={13}/>Add post</Btn>}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1,background:W.lineSoft,border:`1px solid ${W.lineSoft}`}}>
        {days.map(d=><div key={d} style={{background:W.band,padding:'9px 12px'}}><Mono fs={9.5}>{d}</Mono></div>)}
        {Array.from({length:28},(_,i)=>{const p=plan[i];
          return <div key={i} style={{background:W.base,minHeight:84,padding:'9px 11px',display:'flex',flexDirection:'column',gap:7}}>
            <Mono fs={10} c={W.t3}>{i+1}</Mono>
            {p&&<div style={{borderLeft:`2px solid ${p.c}`,paddingLeft:8,fontSize:12.5,color:W.t1,lineHeight:1.35}}>{p.t}</div>}
          </div>;})}
      </div>
    </Section>

    <Section eyebrow="Press kit" title="One link that does the pitching.">
      <div style={{borderTop:`1px solid ${W.line}`}}>
        {[['Hero image','1 of 3 selected','next'],['Two-line hook','Drafted by brand manager','active'],['Top three tracks','Pulled from catalog','done'],['Streaming numbers','Live from DSP sync','done'],['Booking contact','Add your business email','idle'],['Press quotes','No coverage yet','idle']].map(([a,b,s])=>
          <LRow key={a} gap={narrow?16:24} cols={[
            {el:<span style={{fontSize:15.5,color:W.t1}}>{a}</span>},
            {el:<span style={{fontSize:14,color:W.t2}}>{b}</span>,hide:narrow},
            {el:<Pill s={s}/>,w:'130px',style:{textAlign:'right'}}
          ]}/>)}
      </div>
      <div style={{display:'flex',gap:10,marginTop:24}}><Btn v="p">Publish EPK<WIco n="arrow" s={13}/></Btn><Btn v="g">Preview</Btn></div>
    </Section>
  </div>;
}

const VENUES=[
  ['The Independent','San Francisco, CA','500 cap','Indie / Alt','Booking mgr','active'],
  ['Bottom of the Hill','San Francisco, CA','350 cap','Rock / Indie','Talent buyer','next'],
  ['The Echo','Los Angeles, CA','350 cap','Indie / Electronic','Talent buyer','next'],
  ['Zebulon','Los Angeles, CA','300 cap','Jazz / Soul','Booking mgr','idle'],
  ['Baby\u0027s All Right','Brooklyn, NY','280 cap','Indie / Pop','Talent buyer','idle'],
  ['Elsewhere · Zone One','Brooklyn, NY','400 cap','Electronic','Booking mgr','idle'],
  ['The Basement East','Nashville, TN','400 cap','Americana / Rock','Talent buyer','idle'],
  ['Aisle 5','Atlanta, GA','300 cap','Hip-Hop / R&B','Booking mgr','idle']
];
function BookingScreen(){
  const [qy,setQy]=React.useState('');
  const vw=useVW();const narrow=vw<1150;const tight=vw<860;
  const rows=VENUES.filter(v=>v.join(' ').toLowerCase().includes(qy.toLowerCase()));
  return <div style={{padding:'30px 32px 60px',overflowY:'auto'}}>
    <StatRow>
      <Stat k="Directory" v="78,412" note="Venues, buyers, press"/>
      <Stat k="Pitches sent" v="0" note="Agent drafts them" c={W.t2}/>
      <Stat k="In conversation" v="0" note="Nothing yet"/>
      <Stat k="Shows booked" v="0" note="Goal: 10 this year" c={W.gold}/>
    </StatRow>

    <Section eyebrow="Pipeline" title="Who's hiring artists near you." right={
      <div style={{display:'flex',alignItems:'center',gap:9,borderBottom:`1px solid ${W.line}`,paddingBottom:6,minWidth:200,flex:'1 1 200px',maxWidth:300}}>
        <WIco n="search" s={14} c={W.t3}/>
        <input value={qy} onChange={e=>setQy(e.target.value)} placeholder="Filter city, genre, capacity…" aria-label="Filter venues"
          style={{background:'transparent',border:0,outline:'none',color:W.cream,fontFamily:W.sans,fontSize:14.5,width:'100%',minWidth:0}}/>
      </div>}>
      <div style={{borderTop:`1px solid ${W.line}`}}>
        <LRow pad="10px 0" gap={narrow?14:24} cols={[{el:<Mono fs={9.5}>Venue</Mono>},{el:<Mono fs={9.5}>City</Mono>,w:'170px',hide:tight},{el:<Mono fs={9.5}>Room</Mono>,w:'100px',hide:narrow},{el:<Mono fs={9.5}>Programs</Mono>,w:'170px',hide:narrow},{el:<Mono fs={9.5}>Contact</Mono>,w:'120px',hide:narrow},{el:<Mono fs={9.5}>Status</Mono>,w:'118px',style:{textAlign:'right'}}]}/>
        {rows.map(v=><LRow key={v[0]} pad="15px 0" gap={narrow?14:24} cols={[
          {el:<div style={{minWidth:0}}><div style={{fontSize:15,color:W.cream,fontWeight:500}}>{v[0]}</div>{narrow&&<div style={{marginTop:5,display:'flex',gap:12,flexWrap:'wrap'}}>{tight&&<Mono fs={10}>{v[1]}</Mono>}<Mono fs={10}>{v[2]}</Mono><Mono fs={10} c={W.t2}>{v[3]}</Mono></div>}</div>},
          {el:<span style={{fontSize:14,color:W.t2}}>{v[1]}</span>,w:'170px',hide:tight},
          {el:<Mono fs={10}>{v[2]}</Mono>,w:'100px',hide:narrow},
          {el:<span style={{fontSize:14,color:W.t2}}>{v[3]}</span>,w:'170px',hide:narrow},
          {el:<Mono fs={10}>{v[4]}</Mono>,w:'120px',hide:narrow},
          {el:<Pill s={v[5]}/>,w:'118px',style:{textAlign:'right'}}
        ]}/>)}
        {rows.length===0&&<div style={{padding:'34px 0',textAlign:'center'}}><Mono>No matches — try a city or genre</Mono></div>}
      </div>
      <div style={{display:'flex',gap:10,marginTop:24,flexWrap:'wrap'}}><Btn v="p">Draft pitches for these rooms<WIco n="arrow" s={13}/></Btn><Btn v="g">Export list</Btn></div>
    </Section>
  </div>;
}

const COURSES=[
  ['Royalties, decoded','How money actually reaches an artist','9 lessons','Publishing'],
  ['Form the business','Entity, EIN, banking, and why order matters','7 lessons','Legal'],
  ['Read any contract','The eight clauses that decide your career','11 lessons','Legal'],
  ['Own your publishing','Splits, admin deals, and what to never sign away','8 lessons','Publishing'],
  ['Book the room','Pitching venues, buyers, and building a run','10 lessons','Booking'],
  ['Money for artists','Deductions, quarterlies, and staying solvent','6 lessons','Finance'],
  ['The press kit that works','What editors and buyers actually open','5 lessons','Brand'],
  ['Release strategy','Twelve weeks around a single','12 lessons','Press']
];
function AcademyScreen(){
  const vw=useVW();const narrow=vw<1150;
  return <div style={{padding:'30px 32px 60px',overflowY:'auto'}}>
    <StatRow>
      <Stat k="Courses" v="8" note="Built with the managers"/>
      <Stat k="Lessons" v="68" note="Short, practical"/>
      <Stat k="Completed" v="0" note="Start anywhere" c={W.t2}/>
      <Stat k="Included" v="Free" note="On every account" c={W.ok}/>
    </StatRow>
    <Section eyebrow="Academy" title="Learn it once. Your manager handles it after that.">
      <div style={{borderTop:`1px solid ${W.line}`}}>
        {COURSES.map((c,i)=><LRow key={c[0]} onClick={()=>{}} gap={narrow?16:24} cols={[
          {el:<Mono fs={10.5}>{String(i+1).padStart(2,'0')}</Mono>,w:'32px'},
          {el:<div><div style={{fontFamily:W.display,fontSize:19,color:W.cream,lineHeight:1.15,marginBottom:4}}>{c[0]}</div><div style={{fontSize:14,color:W.t2}}>{c[1]}</div>{narrow&&<div style={{marginTop:7,display:'flex',gap:14,flexWrap:'wrap'}}><Mono fs={10}>{c[2]}</Mono><Mono fs={10} c={W.redHi}>{c[3]}</Mono></div>}</div>},
          {el:<Mono fs={10}>{c[2]}</Mono>,w:'110px',hide:narrow},
          {el:<Mono fs={10} c={W.redHi}>{c[3]}</Mono>,w:'120px',hide:narrow},
          {el:<Btn v="q" size="sm"><WIco n="play" s={12}/>Start</Btn>,w:'auto',style:{textAlign:'right'}}
        ]}/>)}
      </div>
    </Section>
  </div>;
}

function ProfileScreen(){
  const vw=useVW();const narrow=vw<900;
  const [f,setF]=React.useState({name:'Kendra Vale',artist:'NIGHTSHIFT',email:'kendra@nightshift.fm',city:'San Francisco, CA',genre:'R&B / Soul'});
  return <div style={{padding:'30px 32px 60px',overflowY:'auto',maxWidth:1000}}>
    <Section eyebrow="Account" title="Who the managers are working for.">
      <div style={{display:'grid',gridTemplateColumns:narrow?'1fr':'1fr 1fr',gap:'26px 44px',marginBottom:8}}>
        <Field label="Legal name" value={f.name} onChange={v=>setF({...f,name:v})}/>
        <Field label="Artist name" value={f.artist} onChange={v=>setF({...f,artist:v})}/>
        <Field label="Email" value={f.email} onChange={v=>setF({...f,email:v})} type="email"/>
        <Field label="Based in" value={f.city} onChange={v=>setF({...f,city:v})}/>
        <Field label="Primary genre" as="select" value={f.genre} onChange={v=>setF({...f,genre:v})} opts={['R&B / Soul','Hip-Hop / Rap','Pop','Electronic','Rock / Alternative','Jazz','Country / Folk','Gospel']}/>
        <Field label="Roles" as="select" value={f.role||'Artist + writer'} onChange={v=>setF({...f,role:v})} opts={['Artist + writer','Producer','Songwriter','DJ','Band member']}/>
      </div>
      <div style={{marginTop:26}}><Btn v="p">Save changes</Btn></div>
    </Section>

    <Section eyebrow="Business" title="Entity of record.">
      <div style={{borderTop:`1px solid ${W.line}`}}>
        {[['Legal entity','Not yet formed','idle'],['EIN','Application in flight','active'],['Business banking','Blocked until EIN clears','next'],['P.R.O.','Not registered','idle'],['Trademark','Not filed','idle']].map(([a,b,s])=>
          <LRow key={a} gap={narrow?16:24} cols={[
            {el:<div><span style={{fontSize:15.5,color:W.t1}}>{a}</span>{narrow&&<div style={{fontSize:13.5,color:W.t2,marginTop:3}}>{b}</div>}</div>},
            {el:<span style={{fontSize:14,color:W.t2}}>{b}</span>,hide:narrow},
            {el:<Pill s={s}/>,w:'130px',style:{textAlign:'right'}}
          ]}/>)}
      </div>
    </Section>

    <Section eyebrow="Access" title="The Agent — full team.">
      <div style={{border:`1px solid ${W.line}`,background:`linear-gradient(150deg,rgba(192,39,45,.10),transparent 58%),${W.band}`,padding:'30px 32px'}}>
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'flex-end',justifyContent:'space-between',gap:24}}>
          <div>
            <Mono fs={10} style={{display:'block',marginBottom:12}}>Current plan</Mono>
            <div style={{fontFamily:W.display,fontSize:44,lineHeight:1,color:W.cream,letterSpacing:'-.02em'}}>$99<span style={{fontFamily:W.mono,fontSize:11,letterSpacing:'.14em',textTransform:'uppercase',color:W.t3,marginLeft:12}}>per month</span></div>
            <p style={{fontSize:15,color:W.t2,marginTop:14,maxWidth:'44ch',lineHeight:1.6}}>All seven managers across every platform. Renews May 18, 2026. Cancel anytime — your filings, catalog and rights stay yours.</p>
          </div>
          <div style={{display:'flex',gap:10}}><Btn v="g">Manage billing</Btn><Btn v="q">Invoices</Btn></div>
        </div>
      </div>
    </Section>
  </div>;
}

Object.assign(window,{BusinessScreen,BrandScreen,BookingScreen,AcademyScreen,ProfileScreen,SERVICES});
