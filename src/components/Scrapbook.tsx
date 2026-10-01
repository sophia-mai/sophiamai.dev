'use client';
import {useRef,useState} from 'react';
import {personal,doodles,photos,projects,discovery,type ArchiveItem} from '@/data/archive';
import ArchiveObject,{ObjectFace} from './ArchiveObject';
import Clover from './Clover';
export default function Scrapbook(){
  const [selected,setSelected]=useState<ArchiveItem|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLElement|null>(null);
  function inspect(item:ArchiveItem,element:HTMLElement){trigger.current=element;setSelected(item);dialog.current?.showModal();}
  function close(){dialog.current?.close();setSelected(null);trigger.current?.focus({preventScroll:true});}
  const objects=(items:ArchiveItem[])=>items.map(item=><ArchiveObject key={item.id} item={item} inspect={inspect}/>);
  return <><a className="skip-link" href="#about">Skip to about</a><header><a className="wordmark" href="#top">sophia mai <span>✳</span></a><nav aria-label="Main navigation"><a href="#about">about</a><a href="#made">things I’ve made</a><a href="#photos">photos</a><a href="#contact">contact</a></nav></header>
    <main id="top"><section className="scene opening" aria-label="Welcome to Sophia’s collection"><div className="intro"><span className="eyebrow">A LITTLE COLLECTION OF</span><h1>bits &amp; pieces<span className="title-star">✳</span></h1><p>welcome to my little corner of the internet.<br/>I’m Sophia. Make yourself at home.</p><span className="handwriting intro-note">a few things I’ve kept along the way</span></div>{objects(personal)}<Clover/><span className="margin-mark">01 / the everyday</span><span className="scroll-note">there’s more down here ↓</span></section>
    <section className="scene doodle-scene" aria-labelledby="doodle-heading"><div className="section-label"><span className="eyebrow">FROM THE NOTEBOOK</span><h2 id="doodle-heading">wandering lines</h2><p>Giving the margins somewhere to live.</p></div>{objects(doodles)}<span className="handwriting doodle-note">no particular reason.<br/>just felt like drawing.</span><span className="margin-mark">02 / little inhabitants</span></section>
    <section id="photos" className="scene photo-scene" aria-labelledby="photo-heading"><div className="section-label"><span className="eyebrow">THROUGH MY LENS (& CAMERA ROLL)</span><h2 id="photo-heading">wish you were here</h2></div>{objects(photos)}<span className="handwriting photo-note">people, places,<br/>and the occasional goat.</span><span className="margin-mark">03 / collected moments</span></section>
    <section id="made" className="scene made-scene" aria-labelledby="made-heading"><div className="section-label"><span className="eyebrow">A FEW EXPERIMENTS</span><h2 id="made-heading">things I’ve made</h2><p>Finished, unfinished, and somewhere in between.</p></div>{objects(projects)}<span className="margin-mark">04 / room to grow</span></section>
    <section id="about" className="about"><span className="eyebrow">THE PERSON BEHIND THE PAPER</span><h2>hi again, I’m Sophia.</h2><p>I doodle in class, when I’m bored, when I’m confused, and sometimes when I don’t want to work.</p><p>This is a home for those drawings, photographs, things I’ve made, and little pieces of life. A sketchbook that doesn’t have a last page.</p><span className="handwriting">glad you found your way here ♡</span></section>
    <section id="contact" className="contact"><h2>leave a little note</h2><p>Email &amp; Instagram links are coming soon.</p><small>TODO: add my contact details</small></section>
    <section className="secret" aria-label="A tiny discovery"><span className="handwriting desktop-hint">double click me ↘</span><span className="handwriting mobile-hint">double tap me ↘</span>{objects([discovery])}</section>
    <footer><p>thanks for wandering through.</p><span>visitor no. <b>000001</b> <small>(mock counter)</small></span><a href="#top">back to the beginning ↑</a><small>Sophia Mai · a collection, in progress</small></footer></main>
    <dialog ref={dialog} className="inspect-dialog" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close();}} onKeyDown={e=>{if(e.key==='Tab'){e.preventDefault();}}}><button className="close-inspect" autoFocus onClick={close} aria-label="Close object">×</button>{selected&&<ObjectFace item={selected} back/>}</dialog>
  </>;
}
