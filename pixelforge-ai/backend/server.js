import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 8787);
const DAILY_LIMIT = Number(process.env.DAILY_LIMIT || 12);
const DATA_DIR = path.join(__dirname, "data");
const USAGE_FILE = path.join(DATA_DIR, "usage.json");

fs.mkdirSync(DATA_DIR, {recursive:true});
if (!fs.existsSync(USAGE_FILE)) fs.writeFileSync(USAGE_FILE, "{}");

app.set("trust proxy", true);
app.use(cors({origin: process.env.FRONTEND_ORIGIN?.split(",") || true}));
app.use(express.json({limit:"2mb"}));

function readUsage(){
  try { return JSON.parse(fs.readFileSync(USAGE_FILE,"utf8") || "{}"); }
  catch { return {}; }
}
function writeUsage(data){
  fs.writeFileSync(USAGE_FILE, JSON.stringify(data, null, 2));
}
function dayKey(){
  return new Date().toISOString().slice(0,10);
}
function visitorKey(req){
  const raw = `${req.ip}|${req.get("x-client-id") || "no-client-id"}`;
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0,32);
}
function getRecord(req){
  const db=readUsage();
  const key=visitorKey(req);
  const day=dayKey();
  const rec=db[key]?.day===day ? db[key] : {day,count:0};
  return {db,key,rec};
}
function usagePayload(rec){
  return {used:rec.count, limit:DAILY_LIMIT, remaining:Math.max(0,DAILY_LIMIT-rec.count), date:rec.day};
}

app.get("/api/health",(req,res)=>res.json({ok:true,service:"PixelForge API"}));

app.get("/api/usage",(req,res)=>{
  const {rec}=getRecord(req);
  res.json(usagePayload(rec));
});

app.post("/api/generate", async (req,res)=>{
  const {prompt,style="Photorealistic",ratio="1:1",negative=""}=req.body || {};
  if(typeof prompt!=="string" || !prompt.trim()) return res.status(400).json({error:"A prompt is required."});
  if(prompt.length>1000) return res.status(400).json({error:"Prompt must be 1000 characters or less."});

  const {db,key,rec}=getRecord(req);
  if(rec.count>=DAILY_LIMIT) return res.status(429).json({error:`You've reached today's limit of ${DAILY_LIMIT} generations. Please try again tomorrow.`,usage:usagePayload(rec)});

  const apiKey=process.env.POLLINATIONS_API_KEY;
  if(!apiKey){
    return res.status(503).json({error:"Image generation is not configured yet. Add POLLINATIONS_API_KEY to backend/.env.",usage:usagePayload(rec)});
  }

  const enriched = `${prompt.trim()}. Style: ${style}. Professional composition, high visual quality, polished details.${negative ? ` Avoid: ${negative}.` : ""}`;
  const base=process.env.POLLINATIONS_BASE_URL || "https://gen.pollinations.ai";
  const url=`${base}/image/${encodeURIComponent(enriched)}?model=flux&nologo=true`;

  try{
    const upstream=await fetch(url,{headers:{Authorization:`Bearer ${apiKey}`}});
    if(!upstream.ok){
      const text=await upstream.text();
      return res.status(502).json({error:`Image provider returned ${upstream.status}. ${text.slice(0,180)}`});
    }

    // Count only successful generations.
    rec.count += 1;
    db[key]=rec;
    writeUsage(db);

    const contentType=upstream.headers.get("content-type") || "image/jpeg";
    const buffer=Buffer.from(await upstream.arrayBuffer());
    const image=`data:${contentType};base64,${buffer.toString("base64")}`;

    res.json({image,usage:usagePayload(rec),provider:"Pollinations",model:"flux"});
  }catch(err){
    res.status(502).json({error:"Could not reach the image provider. Check your API key and network connection."});
  }
});

app.listen(PORT,()=>console.log(`PixelForge API running on http://localhost:${PORT}`));
