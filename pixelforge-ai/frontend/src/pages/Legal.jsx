import React from "react";

const content = {
 privacy: {
  label:"PRIVACY POLICY",
  title:"Privacy Policy",
  intro:"This template is written for the PixelForge project. Before public launch, update it so every statement matches the services, storage, authentication and AI provider actually used by your deployment.",
  sections:[
   ["1. Information we collect","PixelForge may process information you submit while using the product, such as prompts, generated-image references and files you intentionally upload. If you later add an account system, account information such as an email address may also be collected."],
   ["2. How information is used","Information may be used to provide image generation, maintain your creation history, prevent abuse, enforce the daily generation limit and improve the reliability of the service."],
   ["3. AI provider processing","Prompts and generation parameters may be sent to the configured image-generation provider to produce the requested output. Review that provider’s current privacy terms before launch."],
   ["4. Uploaded images","If image editing is enabled, uploaded files may be transmitted to the configured AI provider. Do not upload confidential or sensitive material unless you understand how the relevant services process it."],
   ["5. Data retention","The development version stores creation history in the browser and usage counters on the server. A production deployment should document its actual retention periods and deletion process."],
   ["6. Security","Provider API credentials are intended to remain server-side. Production deployments should also use HTTPS, secure headers, input validation, rate limiting and protected secrets."],
   ["7. Your choices","Users should be able to understand what data is processed and, where applicable, request deletion or stop using the service."],
   ["8. Contact","Replace this section with the actual contact address or privacy contact for the organization operating PixelForge."]
  ]
 },
 cookies:{
  label:"COOKIE POLICY",title:"Cookie Policy",
  intro:"PixelForge currently does not display a cookie-consent banner and does not include analytics or marketing tags in this version. If those technologies are added later, this policy should be updated to describe them accurately.",
  sections:[
   ["1. Essential technologies","The application may use browser storage such as localStorage to remember the anonymous visitor identifier and locally saved creations. This is different from an advertising or analytics cookie."],
   ["2. No analytics in this version","Google Tag Manager, Google Analytics and other analytics scripts are intentionally not included in this build."],
   ["3. No marketing cookies in this version","The current build does not intentionally place advertising or marketing cookies."],
   ["4. Future changes","If analytics, advertising, personalization or third-party consent technologies are introduced, update this policy and implement the appropriate consent experience before deployment."],
   ["5. Managing browser storage","Users can clear browser storage through their browser settings. Clearing local storage may remove locally saved creations and may create a new anonymous client identifier."]
  ]
 },
 terms:{
  label:"TERMS & CONDITIONS",title:"Terms & Conditions",
  intro:"These terms are a project template and should be reviewed and adapted before PixelForge is offered publicly or commercially.",
  sections:[
   ["1. Using PixelForge","You may use the service to create visual content for lawful purposes and in accordance with the rules of the configured AI provider."],
   ["2. Daily limit","The free service allows up to 12 image generations per visitor per UTC day. The limit may be changed, suspended or adjusted to protect service availability."],
   ["3. Your prompts and uploads","You are responsible for the prompts, images and other material you submit. Do not submit material you do not have the right to use."],
   ["4. Prohibited use","Do not use the service for unlawful content, fraud, impersonation, harassment, exploitation, infringement, or attempts to bypass technical safeguards or usage limits."],
   ["5. Generated content","AI output can be inaccurate, unexpected or similar to existing works. You are responsible for reviewing output before using it commercially or publicly."],
   ["6. Availability","AI generation depends on third-party infrastructure and may be unavailable, delayed or changed without notice."],
   ["7. Third-party services","The application may rely on external AI, hosting and storage providers. Their separate terms may also apply."],
   ["8. Changes","These terms may be updated as the product changes. Replace this template with the final legal terms applicable to your deployment."]
  ]
 }
};

export default function Legal({type}){
 const c=content[type];
 return <section className="app-page"><div className="container legal-page"><div className="page-heading"><div><div className="eyebrow">{c.label}</div><h1>{c.title}</h1><p>{c.intro}</p></div></div><div className="legal-body">{c.sections.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div></div></section>
}
