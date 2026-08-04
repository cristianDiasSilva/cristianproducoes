const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hidden"),700));
const header=document.getElementById("header");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>20));
const menu=document.getElementById("menuButton");
menu.addEventListener("click",()=>document.body.classList.toggle("menu-open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("menu-open")));
const light=document.getElementById("cursorLight");
document.addEventListener("pointermove",e=>{light.style.left=e.clientX+"px";light.style.top=e.clientY+"px"});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
const count=entry.target.querySelector("[data-count]")||entry.target.matches("[data-count]")&&entry.target;
if(count&&!count.dataset.done) animateCount(count);
}
}),{threshold:.12});
document.querySelectorAll(".reveal,.number-item").forEach(el=>observer.observe(el));
function animateCount(el){
el.dataset.done="1";
const target=Number(el.dataset.count),start=performance.now(),duration=1200;
function frame(now){
const p=Math.min((now-start)/duration,1);
el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));
if(p<1)requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
}
const filters=document.querySelectorAll(".filter");
const works=document.querySelectorAll(".gallery-item");
filters.forEach(button=>button.addEventListener("click",()=>{
filters.forEach(b=>b.classList.remove("active"));
button.classList.add("active");
const category=button.dataset.filter;
works.forEach(item=>item.classList.toggle("hidden",category!=="all"&&item.dataset.category!==category));
}));
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxCaption=document.getElementById("lightboxCaption");
document.querySelectorAll(".gallery-item").forEach(item=>item.addEventListener("click",()=>{
lightboxImage.src=item.dataset.image;
lightboxImage.alt=item.dataset.title;
lightboxCaption.textContent=item.dataset.title;
lightbox.classList.add("open");
document.body.classList.add("modal-open");
}));
function closeLightbox(){lightbox.classList.remove("open");document.body.classList.remove("modal-open")}
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});
document.getElementById("year").textContent=new Date().getFullYear();
const particleCanvas=document.getElementById("particleCanvas");
if(particleCanvas){
const ctx=particleCanvas.getContext("2d");
let particles=[];
function resizeParticles(){
const dpr=Math.min(window.devicePixelRatio||1,2);
particleCanvas.width=innerWidth*dpr;
particleCanvas.height=innerHeight*dpr;
particleCanvas.style.width=innerWidth+"px";
particleCanvas.style.height=innerHeight+"px";
ctx.setTransform(dpr,0,0,dpr,0,0);
const amount=Math.min(90,Math.floor(innerWidth/15));
particles=Array.from({length:amount},()=>({
x:Math.random()*innerWidth,
y:Math.random()*innerHeight,
r:Math.random()*1.4+.25,
vx:(Math.random()-.5)*.16,
vy:(Math.random()-.5)*.16,
a:Math.random()*.45+.08
}));
}
function drawParticles(){
ctx.clearRect(0,0,innerWidth,innerHeight);
particles.forEach((p,i)=>{
p.x+=p.vx;p.y+=p.vy;
if(p.x<0)p.x=innerWidth;
if(p.x>innerWidth)p.x=0;
if(p.y<0)p.y=innerHeight;
if(p.y>innerHeight)p.y=0;
ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle=`rgba(88,164,255,${p.a})`;
ctx.fill();
for(let j=i+1;j<particles.length;j++){
const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
if(d<110){
ctx.beginPath();
ctx.moveTo(p.x,p.y);
ctx.lineTo(q.x,q.y);
ctx.strokeStyle=`rgba(58,132,255,${(1-d/110)*.045})`;
ctx.stroke();
}
}
});
requestAnimationFrame(drawParticles);
}
resizeParticles();
drawParticles();
addEventListener("resize",resizeParticles);
}