'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
export default function Clover() {
  const ref=useRef<HTMLButtonElement>(null);
  const [mood,setMood]=useState(0);
  const taps=useRef(0);
  useEffect(()=>{
    function move(e: globalThis.PointerEvent){if(e.pointerType!=='mouse'||matchMedia('(pointer: coarse)').matches)return;const r=ref.current?.getBoundingClientRect();if(!r)return;const distance=Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2);setMood(distance<85?2:distance<190?1:0);}
    window.addEventListener('pointermove',move);return()=>window.removeEventListener('pointermove',move);
  },[]);
  const messages=['Clover lives here.','hmm. a little close…','chomp!','okay, you can stay ♡'];
  return <div className={`clover mood-${mood}`}><span className="clover-note">the resident troublemaker ↘</span><button ref={ref} aria-label="Say hello to Clover" onClick={()=>{taps.current++;setMood(taps.current%4);}}><Image src="/assets/clover/clover.png" alt="Clover, a green conure with a curious expression" width={400} height={300} sizes="280px" priority/></button><span className="clover-speech" role="status">{messages[mood]}</span></div>;
}
