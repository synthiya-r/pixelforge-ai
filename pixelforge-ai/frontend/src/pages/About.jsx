import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function About(){
 return <section className="app-page">
  <div className="container narrow-page">
   <div className="page-heading centered"><div><div className="eyebrow">ABOUT PIXELFORGE</div><h1>Built for the space between an idea and an image.</h1><p>PixelForge is a focused creative workspace for exploring visual concepts quickly without turning the process into a complicated production pipeline.</p></div></div>
   <div className="about-manifesto"><span>01</span><h2>Start with the idea.<br/><em>Refine with intention.</em></h2></div>
   <div className="about-grid">
    <div><Sparkles/><h3>Creative first</h3><p>The interface stays quiet so the prompt and the visual stay at the center of the experience.</p></div>
    <div><Layers3/><h3>Useful control</h3><p>Styles, formats, variations and downloads are available without burying the essentials.</p></div>
    <div><ShieldCheck/><h3>Transparent by design</h3><p>Privacy, cookies and terms are documented separately so users can understand the product clearly.</p></div>
   </div>
   <div className="about-tech"><div><div className="eyebrow">TECHNOLOGY</div><h2>Simple architecture.<br/>Ready to grow.</h2></div><p>The project uses React for the interface and an Express backend to keep provider credentials off the client and enforce the daily generation limit. The image provider can be changed without rebuilding the UI.</p></div>
   <div className="about-bottom"><Link to="/generate" className="button button-dark">Start creating <ArrowRight size={16}/></Link></div>
  </div>
 </section>
}
