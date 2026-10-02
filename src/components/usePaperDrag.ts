'use client';
import {useRef,useState,type PointerEvent} from 'react';
let topLayer=20;
export const isTouchLayout=()=>matchMedia('(max-width: 760px), (pointer: coarse)').matches;

export default function usePaperDrag(){
  const [offset,setOffset]=useState({x:0,y:0});
  const [layer,setLayer]=useState(3);
  const drag=useRef<{x:number;y:number;ox:number;oy:number;moved:boolean}|null>(null);
  const suppress=useRef(false);
  function down(e:PointerEvent<HTMLButtonElement>){
    suppress.current=false;
    if(isTouchLayout()||e.button!==0)return;
    setLayer(++topLayer);
    drag.current={x:e.clientX,y:e.clientY,ox:offset.x,oy:offset.y,moved:false};
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e:PointerEvent<HTMLButtonElement>){
    const d=drag.current;if(!d)return;
    const x=e.clientX-d.x,y=e.clientY-d.y;
    if(Math.hypot(x,y)>5)d.moved=true;
    if(d.moved)setOffset({x:d.ox+x,y:d.oy+y});
  }
  return {offset,layer,wasDragged:()=>suppress.current,consumeDrag:()=>{const moved=suppress.current;suppress.current=false;return moved;},setOffset,raise:()=>setLayer(++topLayer),pointerHandlers:{
    onPointerDown:down,onPointerMove:move,
    onPointerUp:()=>{suppress.current=!!drag.current?.moved;drag.current=null;},
    onPointerCancel:()=>{drag.current=null;},
  }};
}
