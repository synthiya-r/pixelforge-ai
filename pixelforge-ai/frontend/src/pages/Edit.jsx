import React, { useState } from "react";
import { Upload, ImagePlus, ArrowRight, X } from "lucide-react";

export default function Edit() {
  const [file,setFile]=useState(null);
  const [preview,setPreview]=useState("");
  const [prompt,setPrompt]=useState("");
  function pick(e){
    const f=e.target.files?.[0];
    if(!f)return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }
  return (
    <section className="app-page">
      <div className="container narrow-page">
        <div className="page-heading centered"><div><div className="eyebrow">EDIT IMAGE</div><h1>Change the direction.</h1><p>Upload an image and describe the visual change you want. The editing API can be connected through the backend.</p></div></div>
        <div className="edit-card">
          {!preview ? (
            <label className="upload-zone">
              <input type="file" accept="image/*" onChange={pick}/>
              <div className="upload-icon"><Upload size={22}/></div>
              <h3>Drop an image here</h3>
              <p>or browse from your device</p>
              <span>PNG, JPG or WEBP</span>
            </label>
          ) : (
            <div className="uploaded-preview">
              <img src={preview} alt="Selected upload"/>
              <button onClick={()=>{setFile(null);setPreview("")}}><X size={17}/></button>
            </div>
          )}
          <div className="edit-fields">
            <label className="field-label">Describe your changes</label>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Change the background to a warm luxury studio while keeping the product unchanged..."/>
            <div className="edit-actions"><button className="button button-dark" disabled={!file || !prompt.trim()}>Generate edit <ArrowRight size={16}/></button><span><ImagePlus size={15}/> Editing endpoint ready to connect</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
