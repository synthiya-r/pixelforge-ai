import React, { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageCard from "../components/ImageCard";

const items = [
  {image:"/assets/gallery-1.svg",prompt:"A sculptural chair in a sunlit brutalist gallery",style:"Editorial",ratio:"4:3"},
  {image:"/assets/gallery-2.svg",prompt:"A quiet coastal house with monolithic architecture",style:"Cinematic",ratio:"16:9"},
  {image:"/assets/gallery-3.svg",prompt:"A premium fragrance bottle on a stone pedestal",style:"Product",ratio:"1:1"},
  {image:"/assets/gallery-4.svg",prompt:"An abstract landscape built from soft geometric forms",style:"Minimal",ratio:"3:4"},
  {image:"/assets/gallery-5.svg",prompt:"A futuristic reading room floating above a city",style:"3D Render",ratio:"16:9"},
  {image:"/assets/gallery-6.svg",prompt:"A surreal garden in a quiet architectural courtyard",style:"Illustration",ratio:"1:1"}
];

export default function Explore() {
  const [query,setQuery]=useState("");
  const [active,setActive]=useState("All");
  const [selected,setSelected]=useState(null);
  const filtered=items.filter(x=>(active==="All"||x.style===active)&&x.prompt.toLowerCase().includes(query.toLowerCase()));
  const cats=["All","Editorial","Cinematic","Product","Minimal","3D Render","Illustration"];

  return (
    <section className="app-page">
      <div className="container">
        <div className="page-heading centered"><div><div className="eyebrow">EXPLORE</div><h1>Ideas worth borrowing.</h1><p>Browse visual directions and use them as a starting point for your next prompt.</p></div></div>
        <div className="explore-toolbar">
          <div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search visual ideas..."/></div>
          <div className="filter-pills">{cats.map(c=><button key={c} onClick={()=>setActive(c)} className={active===c?"active":""}>{c}</button>)}</div>
        </div>
        <div className="explore-grid">{filtered.map((item,i)=><ImageCard key={i} item={item} onOpen={setSelected}/>)}</div>
        <div className="explore-cta"><p>Found a direction you like?</p><Link to="/generate" className="button button-dark">Use it as inspiration <ArrowRight size={16}/></Link></div>
      </div>

      {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}>
        <div className="image-modal" onClick={e=>e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setSelected(null)}><X size={18}/></button>
          <img src={selected.image} alt={selected.prompt}/>
          <div className="modal-info"><span>{selected.style}</span><h3>{selected.prompt}</h3><Link to={`/generate?prompt=${encodeURIComponent(selected.prompt)}`} className="button button-dark">Use this prompt <ArrowRight size={16}/></Link></div>
        </div>
      </div>}
    </section>
  );
}
