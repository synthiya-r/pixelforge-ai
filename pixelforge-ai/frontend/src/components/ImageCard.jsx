import React from "react";
import { Download, Heart, Maximize2 } from "lucide-react";

export default function ImageCard({item, onOpen}) {
  return (
    <article className="image-card">
      <button className="image-card-media" onClick={() => onOpen?.(item)} aria-label="Open image">
        <img src={item.image} alt={item.prompt || "AI generated artwork"} loading="lazy" />
        <span className="image-card-overlay"><Maximize2 size={17}/></span>
      </button>
      <div className="image-card-body">
        <p>{item.prompt}</p>
        <div className="image-card-meta">
          <span>{item.style || "Creative"}</span>
          <div className="image-card-actions">
            <a href={item.image} download="pixelforge-image" title="Download" onClick={(e)=>e.stopPropagation()}><Download size={16}/></a>
            <button title="Favorite"><Heart size={16}/></button>
          </div>
        </div>
      </div>
    </article>
  );
}
