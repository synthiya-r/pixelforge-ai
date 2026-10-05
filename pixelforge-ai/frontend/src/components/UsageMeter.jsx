import React from "react";
import { Sparkles } from "lucide-react";

export default function UsageMeter({used=0, limit=12}) {
  const remaining = Math.max(0, limit-used);
  const percent = Math.min(100, (used/limit)*100);
  return (
    <div className="usage-meter">
      <div className="usage-head">
        <span><Sparkles size={15}/> Daily generations</span>
        <strong>{remaining} / {limit} left</strong>
      </div>
      <div className="usage-track"><span style={{width:`${percent}%`}} /></div>
      <small>Resets at 00:00 UTC</small>
    </div>
  );
}
