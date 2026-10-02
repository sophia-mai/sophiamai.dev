'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import usePaperDrag,{isTouchLayout} from './usePaperDrag';

export default function JumpingSophia(){
  const [jumping,setJumping]=useState(false);
  const {offset,layer,consumeDrag,setOffset,raise,pointerHandlers}=usePaperDrag();
  const landing=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(landing.current)clearTimeout(landing.current);},[]);
  function jump(){if(jumping)return;setJumping(true);landing.current=setTimeout(()=>setJumping(false),900);}
  return <div className={`jumping-sophia ${jumping?'is-jumping':''}`} style={{transform:`translate(${offset.x}px,${offset.y}px) rotate(-3deg)`,zIndex:layer}}>
    <span className="handwriting">a little hop? ↘</span>
    <button {...pointerHandlers} onClick={()=>{if(consumeDrag())return;jump();}} onKeyDown={e=>{if(isTouchLayout())return;const directions:Record<string,[number,number]>={ArrowLeft:[-15,0],ArrowRight:[15,0],ArrowUp:[0,-15],ArrowDown:[0,15]};const delta=directions[e.key];if(delta){e.preventDefault();raise();setOffset(p=>({x:p.x+delta[0],y:p.y+delta[1]}));}}} aria-label="Make Sophia jump" aria-describedby="jump-response jump-move-help">
      {['standing','jumping'].map(pose=><Image key={pose} className={(pose==='jumping')===jumping?'pose-visible':''} src={`/assets/personal/cutouts/poses/sophia-${pose}.png`} alt={(pose==='jumping')===jumping?`Scissor-cut photograph of Sophia ${pose}`:''} aria-hidden={(pose==='jumping')!==jumping} width={1080} height={1350} sizes="(max-width: 760px) 260px, 280px" loading="eager" draggable={false}/>)}
    </button>
    <span id="jump-response" className="jump-caption" role="status">{jumping?'wheee!':'click / tap for a hop'}</span>
    <span id="jump-move-help" className="visually-hidden">On desktop, drag to move Sophia or use the arrow keys when focused.</span>
  </div>;
}
