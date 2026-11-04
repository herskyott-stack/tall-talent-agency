
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
