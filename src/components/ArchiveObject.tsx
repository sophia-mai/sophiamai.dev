'use client';
import Image from 'next/image';
import { useRef, useState, type CSSProperties } from 'react';
import type { ArchiveItem } from '@/data/archive';
import usePaperDrag,{isTouchLayout} from './usePaperDrag';

export function ObjectFace({item, back = false}: {item: ArchiveItem; back?: boolean}) {
  if (back) return <div className="object-back"><div className="back-writing">{item.type !== 'photo' && item.type !== 'cutout' && <span className="catalog-label">FROM THE COLLECTION / {item.type}</span>}<h3>{item.title}</h3>{item.date && <p>{item.date}</p>}{item.context && <small>{item.context}</small>}<p>{item.description}</p><span className="back-mark">s.m. ♡</span></div></div>;
  return <div className={`object-front ${item.type} ${item.crop || ''}`}>
    {item.image ? <><div className="image-window"><Image src={item.image} alt={item.alt || item.title} width={1000} height={750} sizes="(max-width: 760px) 85vw, 500px" loading={item.id==='spring'?'eager':'lazy'} draggable={false}/></div>{item.type === 'photo' && <span className="photo-caption">{item.frontCaption || item.title}</span>}</> : <div className="note-text">{item.frontText}</div>}
  </div>;
}

export default function ArchiveObject({item, inspect}: {item: ArchiveItem; inspect: (item: ArchiveItem, trigger: HTMLElement) => void}) {
  const [flipped, setFlipped] = useState(false);
  const {offset,layer,consumeDrag,wasDragged,pointerHandlers}=usePaperDrag();
  const lastTap = useRef(0);
  const touchLayout = isTouchLayout;
  function reveal(trigger: HTMLElement) { if (touchLayout()) inspect(item,trigger); else setFlipped(v=>!v); }
  return <button className={`archive-object ${item.type==='cutout'?'cutout-object':''} ${item.paperMask?'shaped-paper':''} ${flipped?'is-flipped':''}`} style={{'--rotation':`${item.rotation}deg`,'--x':`${item.x}%`,'--y':`${item.y}px`,'--width':`${item.width}px`,'--order':item.mobileOrder,'--paper-mask':item.paperMask?`url("${typeof item.paperMask === 'string' ? item.paperMask : item.image}")`:undefined,'--back-note-top':item.backNoteTop?`${item.backNoteTop}%`:undefined,zIndex:layer,transform:`translate(${offset.x}px, ${offset.y}px) rotate(${item.rotation}deg)`} as CSSProperties}
    aria-label={`${item.title}. Press Enter to reveal its story.`} aria-pressed={flipped}
    {...pointerHandlers}
    onClick={e=>{if(consumeDrag())return; if(e.detail===0){reveal(e.currentTarget);return;} if(touchLayout()){const now=Date.now();if(now-lastTap.current<350){reveal(e.currentTarget);lastTap.current=0;}else lastTap.current=now;}}}
    onDoubleClick={e=>{if(!touchLayout()&&!wasDragged()) reveal(e.currentTarget);}}>
    <div className="object-turn"><div className="face front" aria-hidden={flipped}><ObjectFace item={item}/></div><div className="face back" aria-hidden={!flipped}><ObjectFace item={item} back/></div></div>
  </button>;
}
