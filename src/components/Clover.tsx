'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
const poses = [
  {image:'clover-staring.png',message:'Clover lives here.'},
  {image:'clover-chomping.png',message:'hmm. a little close…'},
  {image:'clover-biting.png',message:'chomp!'},
  {image:'clover-queen.png',message:'okay, you can stay ♡'},
  {image:'clover-holding-grape.png',message:'a peace offering?'},
  {image:'clover-eating-grape.png',message:'grape accepted. nom nom.'},
];
export default function Clover() {
  const ref=useRef<HTMLButtonElement>(null);
  const [mood,setMood]=useState(0);
  const taps=useRef(0);
  const approaches=useRef(0);
  const wasClose=useRef(false);
  const lockedUntil=useRef(0);
  const reset=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>{
    function move(e: globalThis.PointerEvent){
      if(e.pointerType!=='mouse'||Date.now()<lockedUntil.current)return;
      const r=ref.current?.getBoundingClientRect();if(!r)return;
      const distance=Math.hypot(Math.max(r.left-e.clientX,0,e.clientX-r.right),Math.max(r.top-e.clientY,0,e.clientY-r.bottom));
      const close=distance<15;
      if(close&&!wasClose.current)approaches.current++;
      wasClose.current=close;
      setMood(close?(approaches.current%4===0?3:2):distance<100?1:0);
    }
    function leave(){wasClose.current=false;if(Date.now()>=lockedUntil.current)setMood(0);}
    window.addEventListener('pointermove',move);document.addEventListener('pointerleave',leave);
    return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);if(reset.current)clearTimeout(reset.current);};
  },[]);
  function greet(){
    if(reset.current)clearTimeout(reset.current);
    taps.current=taps.current%(poses.length-1)+1;setMood(taps.current);
    lockedUntil.current=Date.now()+1800;
    reset.current=setTimeout(()=>{setMood(0);wasClose.current=false;},1800);
  }
  return <div className={`clover mood-${mood}`}><span className="clover-note">the resident troublemaker ↘</span><button ref={ref} aria-label="Say hello to Clover" aria-describedby="clover-response" onClick={greet}>
    {poses.map((pose,index)=><Image key={pose.image} className={index===mood?'pose-visible':''} src={`/assets/clover/cutouts/${pose.image}`} alt={index===mood?`Clover: ${pose.message}`:''} aria-hidden={index!==mood} width={1350} height={1688} sizes="250px" loading="eager" draggable={false}/>)}
  </button><span id="clover-response" className="clover-speech" role="status">{poses[mood].message}</span></div>;
}
