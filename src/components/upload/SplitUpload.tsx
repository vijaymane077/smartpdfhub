"use client";

import { useState } from "react";

export default function SplitUpload() {
  const [file,setFile]=useState<File|null>(null);
  const [page,setPage]=useState("");
  const [loading,setLoading]=useState(false);

  async function splitPdf(){
    if(!file){alert("Select a PDF.");return;}
    if(!page){alert("Enter split page.");return;}
    setLoading(true);
    try{
      const fd=new FormData();
      fd.append("file",file);
      fd.append("splitPage",page);
      const res=await fetch("/api/split",{method:"POST",body:fd});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error);

      const download=(b64:string,name:string)=>{
        const a=document.createElement("a");
        a.href="data:application/pdf;base64,"+b64;
        a.download=name;
        a.click();
      };
      download(data.part1,"part-1.pdf");
      download(data.part2,"part-2.pdf");
    }catch(e:any){
      alert(e.message||"Split failed");
    }
    setLoading(false);
  }

  return(
    <section className="space-y-6">
      <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <input
        type="number"
        min="1"
        value={page}
        onChange={e=>setPage(e.target.value)}
        placeholder="Split after page number"
        className="border rounded px-4 py-2 block"
      />
      <button onClick={splitPdf} disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl">
        {loading?"Splitting...":"Split PDF"}
      </button>
    </section>
  );
}
