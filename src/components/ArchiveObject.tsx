'use client';
import Image from 'next/image';
import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { ArchiveItem } from '@/data/archive';
let topLayer = 20;

export function ObjectFace({item, back = false}: {item: ArchiveItem; back?: boolean}) {
  if (back) return <div className="object-back"><span className="catalog-label">FROM THE COLLECTION / {item.type}</span><h3>{item.title}</h3>{item.date && <p>{item.date}</p>}{item.context && <small>{item.context}</small>}<p>{item.description}</p><span className="back-mark">s.m. ♡</span></div>;
  return <div className={`object-front ${item.type} ${item.crop || ''}`}>
    {item.image ? <><div className="image-window"><Image src={item.image} alt={item.alt || item.title} width={1000} height={750} sizes="(max-width: 760px) 85vw, 500px" loading={item.id==='spring'?'eager':'lazy'} draggable={false}/></div>{item.type === 'photo' && <span className="photo-caption">{item.title}</span>}</> : <div className="note-text">{item.frontText}</div>}
  </div>;
}

export default function ArchiveObject({item, inspect}: {item: ArchiveItem; inspect: (item: ArchiveItem, trigger: HTMLElement) => void}) {
  const [flipped, setFlipped] = useState(false);
  const [offset, setOffset] = useState({x:0,y:0});
  const [layer, setLayer] = useState(3);
  const drag = useRef<{x:number;y:number;ox:number;oy:number;moved:boolean} | null>(null);
  const lastTap = useRef(0);
  const suppress = useRef(false);
  const touchLayout = () => matchMedia('(max-width: 760px), (pointer: coarse)').matches;
  function reveal(trigger: HTMLElement) { if (touchLayout()) inspect(item,trigger); else setFlipped(v=>!v); }
  function down(e: PointerEvent<HTMLButtonElement>) {
    if (touchLayout() || e.button !== 0) return;
    setLayer(++topLayer); drag.current = {x:e.clientX,y:e.clientY,ox:offset.x,oy:offset.y,moved:false}; e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e: PointerEvent<HTMLButtonElement>) {
    const d = drag.current; if (!d) return;
    const x=e.clientX-d.x,y=e.clientY-d.y;
    if (Math.hypot(x,y)>5) d.moved=true;
    if (d.moved) setOffset({x:d.ox+x,y:d.oy+y});
  }
  return <button className={`archive-object ${flipped?'is-flipped':''}`} style={{'--rotation':`${item.rotation}deg`,'--x':`${item.x}%`,'--y':`${item.y}px`,'--width':`${item.width}px`,'--order':item.mobileOrder,zIndex:layer,transform:`translate(${offset.x}px, ${offset.y}px) rotate(${item.rotation}deg)`} as CSSProperties}
    aria-label={`${item.title}. Press Enter to reveal its story.`} aria-pressed={flipped}
    onPointerDown={down} onPointerMove={move} onPointerUp={()=>{suppress.current=!!drag.current?.moved;drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}
    onClick={e=>{if(suppress.current){suppress.current=false;return;} if(e.detail===0){reveal(e.currentTarget);return;} if(touchLayout()){const now=Date.now();if(now-lastTap.current<350){reveal(e.currentTarget);lastTap.current=0;}else lastTap.current=now;}}}
    onDoubleClick={e=>{if(!touchLayout()&&!suppress.current) reveal(e.currentTarget);}}>
    <div className="object-turn"><div className="face front" aria-hidden={flipped}><ObjectFace item={item}/></div><div className="face back" aria-hidden={!flipped}><ObjectFace item={item} back/></div></div>
  </button>;
}
