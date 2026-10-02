import Image from 'next/image';
import type {CSSProperties} from 'react';

const elements = {
  opening:[{image:'pink-flower-drawing',x:3,y:760,width:168,rotation:-12},{image:'yellow-doodle-sparkles',x:87,y:680,width:120,rotation:9}],
  doodles:[{image:'blue-and-pink-stars',x:5,y:15,width:144,rotation:-8},{image:'paper-airplane-doodle',x:36,y:470,width:176,rotation:12}],
  photos:[{image:'pink-camera',x:45,y:45,width:176,rotation:14},{image:'blue-pressed-flower',x:78,y:780,width:168,rotation:8},{image:'pink-pressed-flower',x:38,y:1120,width:160,rotation:-14}],
  collected:[{image:'paper-ribbon-bow',x:42,y:130,width:224,rotation:6},{image:'painted-tulips',x:73,y:440,width:176,rotation:-8},{image:'yellow-striped-stars',x:4,y:470,width:144,rotation:12},{image:'pink-flower-sprig',x:72,y:1150,width:224,rotation:-12}],
  made:[{image:'paper-bear',x:45,y:360,width:176,rotation:10}],
};

export default function ScrapbookElements({scene}:{scene:keyof typeof elements}){
  return <div className="scrapbook-elements" aria-hidden="true">{elements[scene].map(item=><Image key={item.image} src={`/assets/elements/${item.image}.png`} alt="" width={400} height={500} sizes={`${item.width}px`} style={{left:`${item.x}%`,top:item.y,width:item.width,transform:`rotate(${item.rotation}deg)`} as CSSProperties}/>)}</div>;
}
