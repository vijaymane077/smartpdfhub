"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function JpgToPdfUpload(){
 const [images,setImages]=useState<File[]>([]);
 const [loading,setLoading]=useState(false);

 function addFiles(list:FileList|null){
   if(!list) return;
   const imgs=Array.from(list).filter(f=>f.type.startsWith("image/"));
   setImages(prev=>[...prev,...imgs]);
 }

 function remove(index:number){
   setImages(prev=>prev.filter((_,i)=>i!==index));
 }

 async function createPdf(){
   if(images.length===0){
     alert("Select at least one image.");
     return;
   }
   setLoading(true);
   const pdf=new jsPDF("p","mm","a4");

   for(let i=0;i<images.length;i++){
     const file=images[i];
     const data=await new Promise<string>((resolve)=>{
       const r=new FileReader();
       r.onload=()=>resolve(r.result as string);
       r.readAsDataURL(file);
     });

     const img=new Image();
     await new Promise<void>(res=>{
       img.onload=()=>res();
       img.src=data;
     });

     const pageW=210;
     const pageH=297;
     const ratio=Math.min(pageW/img.width,pageH/img.height);
     const w=img.width*ratio;
     const h=img.height*ratio;
     const x=(pageW-w)/2;
     const y=(pageH-h)/2;

     if(i>0) pdf.addPage();
     pdf.addImage(data,"JPEG",x,y,w,h);
   }

   pdf.save("images.pdf");
   setLoading(false)
 }

 return (
  <section className="space-y-6">
   <input id="img" type="file" multiple accept="image/*" className="hidden" onChange={e=>addFiles(e.target.files)}/>
   <label htmlFor="img" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer">
    {images.length?"Add More Images":"Upload Images"}
   </label>

   {images.length>0 &&
    <div className="grid md:grid-cols-3 gap-4">
      {images.map((f,i)=>(
       <div key={i} className="border rounded-xl p-3">
        <img src={URL.createObjectURL(f)} className="h-40 w-full object-cover rounded"/>
        <div className="mt-2 text-sm break-all">{f.name}</div>
        <button onClick={()=>remove(i)} className="mt-2 text-red-600">Remove</button>
       </div>
      ))}
    </div>
   }

   <button onClick={createPdf} disabled={loading} className="bg-green-600 text-white px-6 py-3 rounded-xl">
    {loading?"Creating PDF...":"Convert to PDF"}
   </button>
  </section>
 )
}
