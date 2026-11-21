const wishes = [
  "No matter how many candles you blow out, keep that beautiful spark alive! 🕯️💗",
  "May your year be as lovely, bright, and special as your heart. 🌸",
  "Here's to more laughter, more adventures, and a friendship full of memories! 🐼💕",
  "You deserve all the happiness in the world. Happy Birthday, bestie! 🎂"
];
const $ = id => document.getElementById(id);

// typewriter name
const typed = $('typed'), name = typed.dataset.text;
let n = 0;
(function type(){ typed.textContent = name.slice(0, n++); if (n <= name.length) setTimeout(type, 160); })();

// confetti
const cv = $('confetti'), ctx = cv.getContext('2d');
let bits = [], running = false;
const colors = ['#ff7eb3','#ffb3d1','#fff','#ffd166','#c77dff','#7bdff2'];
function size(){ cv.width = innerWidth; cv.height = innerHeight; }
addEventListener('resize', size); size();
function burst(x = innerWidth/2, y = innerHeight/3, count = 140){
  for (let i = 0; i < count; i++) bits.push({
    x, y, vx:(Math.random()-.5)*14, vy:Math.random()*-13-2, g:.28+Math.random()*.1,
    s:5+Math.random()*7, r:Math.random()*6, vr:(Math.random()-.5)*.3,
    c:colors[Math.floor(Math.random()*colors.length)], life:0
  });
  if (!running){ running = true; requestAnimationFrame(tick); }
}
function tick(){
  ctx.clearRect(0,0,cv.width,cv.height);
  bits = bits.filter(b => b.y < cv.height + 20 && b.life < 260);
  for (const b of bits){
    b.vy += b.g; b.x += b.vx; b.y += b.vy; b.r += b.vr; b.vx *= .99; b.life++;
    ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(b.r); ctx.fillStyle = b.c;
    ctx.fillRect(-b.s/2,-b.s/4,b.s,b.s/2); ctx.restore();
  }
  if (bits.length) requestAnimationFrame(tick); else running = false;
}

function party(){ burst(); setTimeout(() => burst(innerWidth*.2, innerHeight/2, 70), 250);
  setTimeout(() => burst(innerWidth*.8, innerHeight/2, 70), 450); }
$('party').addEventListener('click', party);
$('panda').addEventListener('click', e => {
  const p = e.currentTarget; p.classList.remove('pop'); void p.offsetWidth; p.classList.add('pop');
  burst(e.clientX, e.clientY, 60);
});
setTimeout(party, 1200); // little welcome party

// wish button
$('surprise').addEventListener('click', e => {
  const m = $('surpriseMessage');
  m.textContent = wishes[Math.floor(Math.random()*wishes.length)];
  m.classList.remove('show'); void m.offsetWidth; m.classList.add('show');
  burst(e.clientX, e.clientY, 70);
});

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
}), {threshold:.15});
document.querySelectorAll('.reveal').forEach((el,i) => { el.style.transitionDelay = (i%3)*90 + 'ms'; io.observe(el); });

// lightbox
const lb = $('lightbox'), lbImg = lb.querySelector('img');
$('gallery').addEventListener('click', e => {
  const img = e.target.closest('img'); if (!img) return;
  lbImg.src = img.src; lb.hidden = false; burst(e.clientX, e.clientY, 40);
});
lb.addEventListener('click', () => lb.hidden = true);
addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });
