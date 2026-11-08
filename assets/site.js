
const burger=document.getElementById('burger'),nav=document.getElementById('mainnav');
if(burger){burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);});}
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.10});
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
(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=window.matchMedia('(pointer: fine)').matches;
  const headerEl=document.querySelector('header');
  const progressEl=document.getElementById('scroll-progress-fill');
  const glow=document.getElementById('glow');
  let ticking=false;
  function updateScroll(){
    const y=window.scrollY||0;
    if(headerEl){headerEl.classList.toggle('scrolled',y>24);}
    if(progressEl){const max=document.documentElement.scrollHeight-window.innerHeight;progressEl.style.transform='scaleX('+(max>0?Math.min(1,Math.max(0,y/max)):0)+')';}
    ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){window.requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});
  updateScroll();
  document.querySelectorAll('.reveal').forEach(el=>{
    const parent=el.parentElement; if(!parent){return;}
    const sibs=Array.from(parent.children).filter(c=>c.classList&&c.classList.contains('reveal'));
    el.style.transitionDelay=Math.min(Math.max(0,sibs.indexOf(el))*70,280)+'ms';
  });
  if(fine&&!reduced){
    document.querySelectorAll('.glass,.radio-card').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');},{passive:true});
    });
    let gx=innerWidth/2,gy=innerHeight/3,tx=gx,ty=gy;
    window.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;},{passive:true});
    (function loop(){gx+=(tx-gx)*.06;gy+=(ty-gy)*.06;if(glow){glow.style.left=gx+'px';glow.style.top=gy+'px';}requestAnimationFrame(loop);})();
  } else if(glow){glow.style.display='none';}
  function syncRadio(){document.querySelectorAll('.radio-card').forEach(c=>c.classList.toggle('selected',!!c.querySelector('input:checked')));}
  document.querySelectorAll('.radio-card input').forEach(i=>i.addEventListener('change',syncRadio));
  syncRadio();
  const navEl=document.getElementById('mainnav'),burgerEl=document.getElementById('burger');
  if(navEl&&burgerEl){
    navEl.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{navEl.classList.remove('open');burgerEl.setAttribute('aria-expanded','false');}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navEl.classList.contains('open')){navEl.classList.remove('open');burgerEl.setAttribute('aria-expanded','false');burgerEl.focus();}});
  }
})();
