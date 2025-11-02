

let palettes = {
  neon: ["#7aa2f7","#8bd5ff","#7ee787","#f7768e","#bb9af7","#ffae57"],
  sunset: ["#ff6b6b","#ffd166","#fca17d","#9a348e","#2d3142","#e9c46a"],
  ocean: ["#0ea5e9","#14b8a6","#22d3ee","#0284c7","#7dd3fc","#38bdf8"],
  forest: ["#064e3b","#10b981","#7c9a92","#2b361d","#a3e635","#bef264"],
  candy: ["#ff7ab6","#ffafcc","#bde0fe","#a2d2ff","#ffc8dd","#cdb4db"],
  mono: ["#ffffff","#e5e7eb","#94a3b8","#475569","#111827","#0b0c10"]
};

let paletteKeys = Object.keys(palettes);
let paletteIndex = 0;
let orbs = [];        // Lissajous orbes
let polys = [];       // Polígonos orbitales
let nodes = [];       // Nodos para red de líneas
let t = 0;            // tiempo global
let paused = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  background(7,8,11);
  blendMode(BLEND);
  initSystems();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(7,8,11);
  initSystems(true);
}

function keyPressed(){
  if(key==='s' || key==='S') saveCanvas('p5-generativo','png');
  if(key==='h' || key==='H') toggleHUD();
  if(key==='p' || key==='P') paused = !paused;
}

function toggleHUD(){
  const el = document.getElementById('hud');
  el.style.display = (el.style.display==='none') ? '' : 'none';
}

function currentPalette(){ return palettes[paletteKeys[paletteIndex]]; }

function cyclePalette(){
  paletteIndex = (paletteIndex + 1) % paletteKeys.length;
}

function initSystems(keep=false){
  // Orbs en curvas de Lissajous
  if(!keep) orbs = [];
  const ORB_COUNT = int(min(18, max(10, width*height/160000)));
  for(let i=0;i<ORB_COUNT;i++){
    orbs[i] = {
      ax: random(0.5, 1.6),
      ay: random(0.5, 1.6),
      fx: int(random(1, 6)),
      fy: int(random(1, 6)),
      phase: random(TWO_PI),
      r: random(16, 54),
      ampX: random(width*0.2, width*0.48),
      ampY: random(height*0.2, height*0.48),
      col: pickColor(180)
    };
  }

  // Polígonos que orbitan y rotan
  if(!keep) polys = [];
  const POLY_COUNT = int(min(36, max(14, width*height/120000)));
  for(let i=0;i<POLY_COUNT;i++){
    polys[i] = {
      cx: random(width),
      cy: random(height),
      sides: int(random(3,7)),
      baseR: random(18, 80),
      orbitR: random(30, 180),
      rot: random(TWO_PI),
      rotSpd: random(-0.02, 0.02),
      orbitSpd: random(-0.01, 0.01),
      nOff: random(1000),
      col: pickColor(140)
    };
  }

  // Nodos para red conectiva
  if(!keep) nodes = [];
  const NODE_COUNT = int(min(120, max(50, width*height/22000)));
  for(let i=0;i<NODE_COUNT;i++){
    nodes[i] = {
      x: random(width),
      y: random(height),
      vx: random(-0.6,0.6),
      vy: random(-0.6,0.6),
      s: random(2,5),
      col: pickColor(120)
    };
  }
}

function pickColor(a=200){
  const p = currentPalette();
  const c = color(p[int(random(p.length))]);
  c.setAlpha(a);
  return c;
}

function draw(){
  if(paused) return;
  // Fondo con leve desvanecido para estelas
  noStroke();
  fill(7,8,11, 22);
  rect(0,0,width,height);

  // Cambio de paleta cada ~20s
  if(frameCount % (60*20) === 0){ cyclePalette(); }

  // Capa 1: Orbes Lissajous con aditivo
  push();
  blendMode(ADD);
  for(let i=0;i<orbs.length;i++){
    const o = orbs[i];
    const x = width/2  + o.ampX * sin(o.fx * t + o.phase);
    const y = height/2 + o.ampY * sin(o.fy * t + o.phase + PI/2);
    const rr = o.r * (1 + 0.3*sin(t*1.3 + i));
    noStroke(); fill(o.col);
    circle(x, y, rr);
  }
  pop();

  // Capa 2: Polígonos orbitando
  push();
  for(let i=0;i<polys.length;i++){
    const p = polys[i];
    p.rot += p.rotSpd;
    const ang = t*1.2 + i*0.2;
    const nx = p.cx + cos(ang) * p.orbitR;
    const ny = p.cy + sin(ang) * p.orbitR;
    const pulso = p.baseR * (0.8 + 0.3*noise(p.nOff + t*0.6));
    push();
      translate(nx, ny);
      rotate(p.rot);
      noStroke(); fill(p.col);
      regularPolygon(0,0,pulso,p.sides, 0.18*pulso);
    pop();
  }
  pop();

  // Capa 3: Red de nodos conectados
  push();
  strokeWeight(1);
  for(let i=0;i<nodes.length;i++){
    const a = nodes[i];
    a.x += a.vx; a.y += a.vy;
    if(a.x<0) a.x=width; if(a.x>width) a.x=0;
    if(a.y<0) a.y=height; if(a.y>height) a.y=0;
    // Dibuja nodo
    noStroke(); fill(a.col);
    circle(a.x, a.y, a.s);
  }
  // Conexiones cercanas
  const maxDist = min(180, 90 + 0.06*width);
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const a = nodes[i], b = nodes[j];
      const d = dist(a.x,a.y,b.x,b.y);
      if(d < maxDist){
        const al = map(d, 0, maxDist, 150, 8);
        const c = color( lerpColor(color('#ffffff'), pickColor(), 0.5) );
        c.setAlpha(al);
        stroke(c);
        line(a.x,a.y,b.x,b.y);
      }
    }
  }
  pop();

  t += 0.008; // velocidad global
}

function regularPolygon(x, y, r, sides, roundR=0){
  // Polígono con esquinas suavizadas (roundR)
  if(sides < 3){ circle(x,y,r*2); return; }
  beginShape();
  for(let i=0;i<sides;i++){
    let ang = TWO_PI * (i / sides);
    let px = x + cos(ang) * r;
    let py = y + sin(ang) * r;
    if(roundR>0){
      // Interpola hacia el centro para redondeo simple
      px = lerp(px, x, roundR/r);
      py = lerp(py, y, roundR/r);
    }
    vertex(px, py);
  }
  endShape(CLOSE);
}
