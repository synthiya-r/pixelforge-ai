import React from "react";
import { ArrowRight, Sparkles, Wand2, Layers3, Download, ImagePlus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";

const gallery = [
  "/assets/gallery-1.svg","/assets/gallery-2.svg","/assets/gallery-3.svg","/assets/gallery-4.svg"
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot"/> AI IMAGE CREATOR</div>
            <h1>Your imagination,<br/><em>rendered.</em></h1>
            <p className="hero-text">Create original visuals from simple text prompts. Explore ideas, shape concepts, and turn words into images in seconds.</p>
            <div className="hero-actions">
              <Link to="/generate" className="button button-dark">Start creating <ArrowRight size={17}/></Link>
              <Link to="/explore" className="button button-light">Explore creations</Link>
            </div>
            <div className="hero-note"><span>12</span> free generations every day · No account required to try</div>
          </div>

          <div className="hero-art">
            <div className="hero-art-main">
              <img src="/assets/gallery-1.svg" alt="Abstract AI generated visual"/>
              <div className="floating-card floating-top"><Sparkles size={16}/><span>AI generated</span></div>
              <div className="floating-card floating-bottom"><span className="mini-dot"/> Prompt → visual</div>
            </div>
            <div className="hero-art-side">
              <img src="/assets/gallery-2.svg" alt="Creative visual"/>
              <img src="/assets/gallery-3.svg" alt="Creative visual"/>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-inner">
          <span>DESIGNED FOR</span>
          <b>Creators</b><b>Designers</b><b>Founders</b><b>Marketers</b><b>Students</b>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="THE WORKSPACE" title="Everything you need to create." text="A focused toolkit for going from rough idea to finished visual without unnecessary complexity."/>
          <div className="feature-grid">
            {[
              [Sparkles,"Text to image","Describe what you want and turn your words into an original visual."],
              [Wand2,"Creative styles","Choose a visual direction that fits the idea: editorial, cinematic, 3D, minimal and more."],
              [Layers3,"Multiple formats","Build for social, presentations, websites and campaigns with flexible aspect ratios."],
              [ImagePlus,"Image editing","Upload an existing visual and describe the changes you want to make."],
              [RefreshCw,"Variations","Generate new directions when the first result is close, but not quite there."],
              [Download,"Easy export","Download your finished visual and take it into your next workflow."]
            ].map(([Icon,title,text]) => (
              <div className="feature-card" key={title}>
                <div className="feature-icon"><Icon size={20}/></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="feature-number">0{["Text to image","Creative styles","Multiple formats","Image editing","Variations","Easy export"].indexOf(title)+1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container workflow">
          <SectionHeading eyebrow="SIMPLE BY DESIGN" title="From idea to image in three steps."/>
          <div className="steps">
            <div className="step"><span>01</span><h3>Describe</h3><p>Write what you want to see. Be specific or keep it loose and exploratory.</p></div>
            <div className="step"><span>02</span><h3>Generate</h3><p>Choose a style and format, then let the image model translate your idea.</p></div>
            <div className="step"><span>03</span><h3>Create</h3><p>Download it, try a variation, or take the idea into another iteration.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-row">
            <SectionHeading eyebrow="EXPLORE" title="A little inspiration goes a long way." text="Browse a selection of visual directions to spark your next prompt."/>
            <Link to="/explore" className="text-link">View all <ArrowRight size={16}/></Link>
          </div>
          <div className="gallery-preview">
            {gallery.map((src,i)=><img key={src} src={src} alt={`Gallery artwork ${i+1}`}/>)}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-box">
          <div>
            <div className="eyebrow">START WITH AN IDEA</div>
            <h2>Make the first frame.</h2>
            <p>No complicated setup. Just a prompt and a direction.</p>
          </div>
          <Link to="/generate" className="button button-dark">Create an image <ArrowRight size={17}/></Link>
        </div>
      </section>
    </>
  );
}
