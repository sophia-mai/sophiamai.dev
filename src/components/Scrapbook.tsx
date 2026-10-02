'use client';
import Image from "next/image";
import {useRef,useState} from 'react';
import {personal,doodles,photos,collected,projects,discovery,type ArchiveItem} from '@/data/archive';
import ArchiveObject,{ObjectFace} from './ArchiveObject';
import ScrapbookElements from "./ScrapbookElements";
import Clover from './Clover';
import JumpingSophia from './JumpingSophia';
import VisitorCounter from './VisitorCounter';
export default function Scrapbook(){
  const [selected,setSelected]=useState<ArchiveItem|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLElement|null>(null);
  function inspect(item:ArchiveItem,element:HTMLElement){trigger.current=element;setSelected(item);dialog.current?.showModal();}
  function close(){dialog.current?.close();setSelected(null);trigger.current?.focus({preventScroll:true});}
  const objects=(items:ArchiveItem[])=>items.map(item=><ArchiveObject key={item.id} item={item} inspect={inspect}/>);
  return <><a className="skip-link" href="#about">Skip to about</a><header><a className="wordmark" href="#top">sophia mai <span>✳</span></a><nav aria-label="Main navigation"><a href="#about">about</a><a href="#made">things I’ve made</a><a href="#photos">photos</a><a href="#contact">contact</a></nav></header>
    <main id="top"><section className="scene opening" aria-label="Welcome to Sophia’s collection"><div className="intro"><span className="eyebrow">A LITTLE COLLECTION OF THE</span><h1>bits &amp; pieces<span className="title-star">✳</span><span className="title-subline">of my life</span></h1><p>welcome to my little corner of the internet.<br/>I’m Sophia.</p><a className="intro-about" href="#about">learn more about me ↗</a><span className="handwriting intro-note">some things from my little world</span></div>{objects(personal)}<ScrapbookElements scene="opening"/><Clover/><span className="margin-mark">01 / the everyday</span><span className="scroll-note">there’s more down here<span className="scroll-paper-arrow" aria-hidden="true"><Image src="/assets/elements/paper-down-arrows.png" alt="" width={1350} height={1688} sizes="270px"/></span></span></section>
    <section className="scene doodle-scene" aria-labelledby="doodle-heading"><div className="section-label"><h2 id="doodle-heading">wandering lines</h2><p>letting the drawings be seen and keep each other company c:</p></div>{objects(doodles)}<ScrapbookElements scene="doodles"/><span className="margin-mark">02 / little inhabitants</span></section>
    <section id="photos" className="scene photo-scene" aria-labelledby="photo-heading"><div className="section-label"><span className="eyebrow">THROUGH MY LENS (& CAMERA ROLL)</span><h2 id="photo-heading">wish you were here</h2></div>{objects(photos)}<ScrapbookElements scene="photos"/><JumpingSophia/><span className="handwriting photo-note">people, places,<br/>and the occasional goat.</span><span className="margin-mark">03 / collected moments</span></section>
    <section className="scene collected-scene" aria-labelledby="collected-heading"><div className="section-label"><span className="eyebrow">MORE FROM MY LITTLE WORLD</span><h2 id="collected-heading">out &amp; about, with company</h2></div>{objects(collected)}<ScrapbookElements scene="collected"/><span className="margin-mark">a few more faces &amp; places</span></section>
    <section id="made" className="scene made-scene" aria-labelledby="made-heading"><div className="section-label"><span className="eyebrow">A FEW EXPERIMENTS</span><h2 id="made-heading">things I’ve made</h2><p>Finished, unfinished, and somewhere in between.</p></div>{objects(projects)}<ScrapbookElements scene="made"/><span className="margin-mark">04 / room to grow</span></section>
    <section id="about" className="about">
      <span className="eyebrow">THE PERSON BEHIND THE PAPER</span>
      <h2>hi again, I’m Sophia.</h2>
      <p>I’m a computer science student at Johns Hopkins who likes making things, whether that means building software, painting, taking photographs, or turning a random idea into something real.</p>
      <p>I’m drawn to the space between technology and creativity. I’ve worked on everything from software and robotics to product design and community-focused projects, but I’m just as happy with a sketchbook, camera, or half-finished experiment. I also spend an unreasonable amount of time with my bird, Clover, who you’ll probably run into somewhere around here.</p>
      <p>This site is a home for all of it: the things I’ve built, the places I’ve noticed, the doodles from the margins of my notes, and whatever I decide to make next.</p>
      <span className="handwriting">glad you found your way here ♡</span>
    </section>
    <section id="contact" className="contact">
      <h2>leave a little note</h2>
      <nav className="contact-links" aria-label="Find Sophia online">
        <a href="https://www.instagram.com/mai_wip/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <a href="https://www.linkedin.com/in/sophia-t-mai/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="https://github.com/sophia-mai" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </nav>
    </section>
    <section className="secret" aria-label="A tiny discovery"><span className="handwriting desktop-hint">double click me ↘</span><span className="handwriting mobile-hint">double tap me ↘</span>{objects([discovery])}</section>
    <footer><p>thanks for wandering through.</p><VisitorCounter/><a href="#top">back to the beginning ↑</a><small>Sophia Mai · a collection, in progress</small></footer></main>
    <dialog ref={dialog} className="inspect-dialog" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close();}} onKeyDown={e=>{if(e.key==='Tab'){e.preventDefault();}}}><button className="close-inspect" autoFocus onClick={close} aria-label="Close object">×</button>{selected&&<ObjectFace item={selected} back/>}</dialog>
  </>;
}
