
const burger=document.getElementById('burger'),nav=document.getElementById('mainnav');
if(burger){burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);});}
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
function sendForm(kind){
  const f=document.getElementById(kind+'-form');
  if(f.querySelector('.hp input').value){return false;}
  const data=new FormData(f);const lines=[];
  for(const [k,v] of data.entries()){if(k==='website'){continue;} if(String(v).trim()){lines.push(k+': '+v);}}
  const subject=(kind==='book'?'Booking inquiry — TALL Talent Agency':kind==='join'?'Artist application — TALL Talent Agency':'General inquiry — TALL Talent Agency');
  window.location.href='mailto:talltalentagency@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
  const ok=document.getElementById(kind+'-ok'); if(ok){ok.style.display='block'; ok.scrollIntoView({behavior:'smooth',block:'center'});}
  return false;
}
const yr=document.getElementById('yr'); if(yr){yr.textContent=new Date().getFullYear();}
const pathQ=new URLSearchParams(location.search).get('path');
if(pathQ){const r=document.querySelector('input[name="Applying for"][value="'+pathQ+'"]'); if(r){r.checked=true;}}

/* Premium interaction layer: scroll state, progress, parallax, spotlights. */
(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=window.matchMedia('(pointer: fine)').matches;
  const headerEl=document.querySelector('header');
  const progressEl=document.getElementById('scroll-progress-fill');
  const heroImg=document.querySelector('.hero .bg img');
  const heroEl=document.querySelector('.hero');
  let ticking=false;

  function updateScroll(){
    const y=window.scrollY||0;
    if(headerEl){headerEl.classList.toggle('scrolled',y>24);}
    if(progressEl){
      const max=document.documentElement.scrollHeight-window.innerHeight;
      progressEl.style.transform='scaleX('+(max>0?Math.min(1,Math.max(0,y/max)):0)+')';
    }
    if(heroImg&&heroEl&&!reduced){
      const rect=heroEl.getBoundingClientRect();
      if(rect.bottom>0&&rect.top<window.innerHeight){
        heroImg.style.setProperty('--hero-shift',Math.min(84,Math.max(0,y*.08))+'px');
      }
    }
    ticking=false;
  }
  window.addEventListener('scroll',()=>{
    if(!ticking){window.requestAnimationFrame(updateScroll);ticking=true;}
  },{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});
  updateScroll();

  document.querySelectorAll('.reveal').forEach(el=>{
    const parent=el.parentElement;
    if(!parent){return;}
    const siblings=Array.from(parent.children).filter(child=>child.classList&&child.classList.contains('reveal'));
    const idx=Math.max(0,siblings.indexOf(el));
    el.style.transitionDelay=Math.min(idx*70,280)+'ms';
  });

  if(finePointer&&!reduced){
    document.querySelectorAll('.door,.ctaband>div,.notice,.radio-card').forEach(card=>{
      card.addEventListener('pointermove',event=>{
        const rect=card.getBoundingClientRect();
        card.style.setProperty('--mx',((event.clientX-rect.left)/rect.width*100)+'%');
        card.style.setProperty('--my',((event.clientY-rect.top)/rect.height*100)+'%');
      },{passive:true});
    });
  }

  function syncRadioCards(){
    document.querySelectorAll('.radio-card').forEach(card=>{
      card.classList.toggle('selected',!!card.querySelector('input:checked'));
    });
  }
  document.querySelectorAll('.radio-card input').forEach(input=>input.addEventListener('change',syncRadioCards));
  syncRadioCards();

  const navEl=document.getElementById('mainnav');
  const burgerEl=document.getElementById('burger');
  if(navEl&&burgerEl){
    navEl.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      navEl.classList.remove('open');
      burgerEl.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&navEl.classList.contains('open')){
        navEl.classList.remove('open');
        burgerEl.setAttribute('aria-expanded','false');
        burgerEl.focus();
      }
    });
  }
})();
