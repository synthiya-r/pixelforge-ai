import React, { useEffect, useState } from "react";
import { ChevronDown, Download, Expand, RefreshCw, Sparkles, Wand2, AlertCircle } from "lucide-react";
import UsageMeter from "../components/UsageMeter";

const styles = ["Photorealistic","Cinematic","Editorial","3D Render","Illustration","Minimal"];
const ratios = [
  ["1:1","Square"],["16:9","Landscape"],["9:16","Portrait"],["4:3","Classic"],["3:4","Portrait"]
];

function getClientId() {
  let id = localStorage.getItem("pixelforge_client_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("pixelforge_client_id", id);
  }
  return id;
}

export default function Generate() {
  const [prompt,setPrompt] = useState("");
  const [style,setStyle] = useState("Photorealistic");
  const [ratio,setRatio] = useState("1:1");
  const [negative,setNegative] = useState("");
  const [advanced,setAdvanced] = useState(false);
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState(null);
  const [error,setError] = useState("");
  const [usage,setUsage] = useState({used:0,limit:12,remaining:12});

  async function refreshUsage() {
    try {
      const res = await fetch("/api/usage", {headers: {"x-client-id": getClientId()}});
      if (res.ok) setUsage(await res.json());
    } catch {}
  }

  useEffect(()=>{refreshUsage()},[]);

  async function enhancePrompt() {
    if (!prompt.trim()) return;
    setPrompt(`${prompt.trim()}, highly detailed, professional composition, refined lighting, visually cohesive, premium finish`);
  }

  async function generate() {
    if (!prompt.trim()) { setError("Write a prompt before generating."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method:"POST",
        headers: {"Content-Type":"application/json","x-client-id":getClientId()},
        body: JSON.stringify({prompt,style,ratio,negative})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      setResult(data);
      setUsage(data.usage);
      const saved = JSON.parse(localStorage.getItem("pixelforge_creations") || "[]");
      saved.unshift({id:Date.now(),image:data.image,prompt,style,ratio,createdAt:new Date().toISOString()});
      localStorage.setItem("pixelforge_creations", JSON.stringify(saved.slice(0,60)));
    } catch(e) {
      setError(e.message);
      await refreshUsage();
    } finally { setLoading(false); }
  }

  return (
    <section className="app-page">
      <div className="container">
        <div className="page-heading">
          <div><div className="eyebrow">CREATE</div><h1>Turn a prompt into a visual.</h1><p>Describe the image in your head. PixelForge will handle the first draft.</p></div>
          <UsageMeter used={usage.used} limit={usage.limit}/>
        </div>

        <div className="generator-layout">
          <aside className="control-panel">
            <div className="panel-section">
              <label className="field-label">Your prompt</label>
              <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} maxLength={1000} placeholder="A quiet modern gallery in Tokyo at blue hour, editorial architecture photography..." />
              <div className="textarea-bottom"><span>{prompt.length} / 1000</span><button className="enhance-button" onClick={enhancePrompt}><Wand2 size={14}/> Enhance</button></div>
            </div>

            <div className="panel-section">
              <label className="field-label">Style</label>
              <div className="choice-grid">
                {styles.map(s=><button key={s} className={style===s ? "choice active" : "choice"} onClick={()=>setStyle(s)}>{s}</button>)}
              </div>
            </div>

            <div className="panel-section">
              <label className="field-label">Aspect ratio</label>
              <div className="ratio-grid">
                {ratios.map(([r,label])=><button key={r} className={ratio===r ? "ratio-choice active" : "ratio-choice"} onClick={()=>setRatio(r)}><span className={`ratio-box ratio-${r.replace(":","")}`}/><small>{r}</small><em>{label}</em></button>)}
              </div>
            </div>

            <button className="advanced-toggle" onClick={()=>setAdvanced(!advanced)}>Advanced settings <ChevronDown size={16} className={advanced?"rotate":""}/></button>
            {advanced && (
              <div className="advanced-content">
                <label className="field-label">Negative prompt</label>
                <textarea value={negative} onChange={e=>setNegative(e.target.value)} placeholder="blurry, distorted, low quality, watermark..." />
              </div>
            )}

            {error && <div className="error-box"><AlertCircle size={17}/><span>{error}</span></div>}

            <button className="button button-dark generate-button" onClick={generate} disabled={loading || usage.remaining <= 0}>
              {loading ? <><span className="spinner"/> Creating...</> : usage.remaining <= 0 ? "Daily limit reached" : <><Sparkles size={17}/> Generate image</>}
            </button>
            <p className="limit-note">Free plan · {usage.remaining} generations remaining today</p>
          </aside>

          <section className="result-panel">
            {loading ? (
              <div className="result-empty generating-state"><div className="loader-orbit"><span/></div><h2>Creating your visual</h2><p>Turning your prompt into pixels. This can take a moment.</p></div>
            ) : result ? (
              <div className="result-ready">
                <div className="result-image-wrap">
                  <img src={result.image} alt={prompt}/>
                  <a className="result-expand" href={result.image} target="_blank" rel="noreferrer"><Expand size={17}/></a>
                </div>
                <div className="result-info">
                  <div><span>Prompt</span><strong>{prompt}</strong></div>
                  <div><span>Style</span><strong>{style}</strong></div>
                  <div><span>Format</span><strong>{ratio}</strong></div>
                </div>
                <div className="result-actions">
                  <a className="button button-dark" href={result.image} download="pixelforge-image.jpg"><Download size={16}/> Download</a>
                  <button className="button button-light" onClick={generate} disabled={usage.remaining<=0}><RefreshCw size={16}/> Generate variation</button>
                </div>
              </div>
            ) : (
              <div className="result-empty">
                <div className="empty-mark"><Sparkles size={22}/></div>
                <h2>Your image will appear here.</h2>
                <p>Write a prompt, choose a direction, and start creating.</p>
                <div className="prompt-example"><span>Try</span> “A sculptural chair in a sunlit brutalist room, high-end editorial photography.”</div>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
