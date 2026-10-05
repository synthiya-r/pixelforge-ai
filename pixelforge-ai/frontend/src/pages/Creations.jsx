import React, { useEffect, useState } from "react";
import { Download, Trash2, Search, Image as ImageIcon } from "lucide-react";

export default function Creations() {
  const [items,setItems]=useState([]);
  const [query,setQuery]=useState("");
  useEffect(()=>setItems(JSON.parse(localStorage.getItem("pixelforge_creations")||"[]")),[]);
  function remove(id){
    const next=items.filter(x=>x.id!==id);
    setItems(next);localStorage.setItem("pixelforge_creations",JSON.stringify(next));
  }
  const filtered=items.filter(x=>x.prompt.toLowerCase().includes(query.toLowerCase()));
  return (
    <section className="app-page">
      <div className="container">
        <div className="page-heading"><div><div className="eyebrow">YOUR WORK</div><h1>My creations.</h1><p>Your recent generations are kept in this browser for easy access.</p></div></div>
        <div className="creation-toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search your creations..."/></div><span>{items.length} saved</span></div>
        {filtered.length ? <div className="creation-grid">{filtered.map(item=><article className="creation-card" key={item.id}><img src={item.image} alt={item.prompt}/><div className="creation-info"><p>{item.prompt}</p><small>{item.style} · {item.ratio}</small><div><a href={item.image} download="pixelforge-image.jpg"><Download size={16}/> Download</a><button onClick={()=>remove(item.id)}><Trash2 size={16}/> Delete</button></div></div></article>)}</div> :
        <div className="empty-library"><ImageIcon size={28}/><h2>No creations yet.</h2><p>Generate your first image and it will appear here.</p></div>}
      </div>
    </section>
  );
}
