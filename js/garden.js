/* Tiny final garden health motions */
(()=>{
  'use strict';
  const beauty=document.getElementById('decor-beauty');
  const health=document.getElementById('decor-health');
  if(!beauty || !health || document.getElementById('tiny-meadow-scene'))return;
  beauty.insertAdjacentHTML('afterbegin', '<svg class="tiny-meadow-scene" id="tiny-meadow-scene" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">\n<defs><linearGradient id="tinyHillGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#352238" stop-opacity=".86"/><stop offset=".55" stop-color="#1b152a" stop-opacity=".96"/><stop offset="1" stop-color="#0b0919" stop-opacity="1"/></linearGradient>\n<mask id="tinyStarAboveHorizon" maskUnits="userSpaceOnUse"><rect width="1600" height="900" fill="#fff"/><path d="M0 890 C130 862 226 824 390 791 S580 761 730 740 C930 712 1007 722 1080 751 C1240 795 1380 815 1600 898 L1600 950 L0 950 Z" fill="#000"/></mask>\n<radialGradient id="tinyStarGlow"><stop offset="0" stop-color="#f4faff" stop-opacity=".55"/><stop offset=".38" stop-color="#d4e9f8" stop-opacity=".19"/><stop offset="1" stop-color="#c8dbef" stop-opacity="0"/></radialGradient><radialGradient id="tinyMoonFace" cx="34%" cy="28%" r="75%"><stop offset="0" stop-color="#fffef7"/><stop offset=".37" stop-color="#eef5f6"/><stop offset=".75" stop-color="#cedfea"/><stop offset="1" stop-color="#9db8cf"/></radialGradient>\n<filter id="tinyStarBloom" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="5"/></filter></defs>\n<path id="tinyOrbitFlightPath" d="M930 954 C1070 823 1024 780 1115 680 C1230 528 1320 354 1410 165 C1450 81 1453 18 1468 -68" fill="none" stroke="none"/>\n<g mask="url(#tinyStarAboveHorizon)"><g id="tiny-orbit-trails" class="tiny-orbit-trail"></g><g id="tiny-orbit-star" class="tiny-orbit-star tiny-glow-planet tiny-moon" style="opacity:0">\n <!-- A soft, larger Moon; no planetary ring. Entire group travels down the existing orbit. -->\n <circle r="104" fill="url(#tinyStarGlow)" opacity=".53"/>\n <circle r="50" fill="none" stroke="#e1f0ff" stroke-width="3" opacity=".09"/>\n <circle class="tiny-planet-sphere" r="34" fill="url(#tinyMoonFace)" stroke="#f1f9fb" stroke-width="1.15"/>\n <ellipse cx="-11" cy="-9" rx="9" ry="6.8" fill="#a9bdcb" opacity=".19" transform="rotate(-22 -11 -9)"/>\n <ellipse cx="13" cy="12" rx="7" ry="5" fill="#a3b9ca" opacity=".15" transform="rotate(-17 13 12)"/>\n <circle cx="14" cy="-16" r="4.2" fill="#b0c4d0" opacity=".14"/>\n <circle cx="-15" cy="17" r="3.8" fill="#a5b5c7" opacity=".16"/>\n <path d="M-20 -19 Q -10 -25 2 -25" stroke="#fff" stroke-width="2" opacity=".19" fill="none" stroke-linecap="round"/>\n </g></g>\n<path class="tiny-terrain" d="M0 890 C130 862 226 824 390 791 S580 761 730 740 C930 712 1007 722 1080 751 C1240 795 1380 815 1600 898 L1600 950 L0 950 Z"/>\n<path class="tiny-horizon-rim" d="M0 890 C130 862 226 824 390 791 S580 761 730 740 C930 712 1007 722 1080 751 C1240 795 1380 815 1600 898"/>\n<g class="tiny-meadow-flowers"><g class="tiny-meadow-blossom" style="--wave:4.2s;--delay:-0.00s" transform="translate(82 861) scale(0.7)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.9s;--delay:-0.27s" transform="translate(175 835) scale(0.85)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:5.5s;--delay:-0.54s" transform="translate(257 813) scale(0.8)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.2s;--delay:-0.81s" transform="translate(345 795) scale(1)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.8s;--delay:-1.08s" transform="translate(460 775) scale(0.65)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.2s;--delay:-1.35s" transform="translate(555 764) scale(0.7)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.9s;--delay:-1.62s" transform="translate(652 746) scale(0.8)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:5.5s;--delay:-1.89s" transform="translate(1190 773) scale(0.8)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.2s;--delay:-2.16s" transform="translate(1320 808) scale(0.75)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.8s;--delay:-2.43s" transform="translate(1454 851) scale(0.9)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.2s;--delay:-2.70s" transform="translate(1538 887) scale(0.62)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g></g></svg>');
  // Beautiful light bugs fill the sky, without covering Tiny or the title.
  const mobile=matchMedia('(max-width:700px)').matches;
  for(let i=0,n=mobile?4:14;i<n;i++){
    const b=document.createElement('i');b.className='tiny-beauty-firefly';
    const x=((i*61.17)%95)+2.5, y=17+((i*34.93)%73);
    const z=2.1+(i%5)*.56;
    b.style.cssText=`--x:${x.toFixed(1)}%;--y:${y.toFixed(1)}%;--sz:${z}px;--d:${4.2+(i%6)*.85}s;--p:${1.8+(i%7)*.49}s;--delay:-${(i*.71)%8}s;`;
    beauty.appendChild(b);
  }
  // The orbit becomes invisible behind the ground silhouette; the user's
  // dotted guideline is NOT drawn as an actual dotted line on the page.
  const orbit=document.getElementById('tinyOrbitFlightPath');
  const star=document.getElementById('tiny-orbit-star');
  const group=document.getElementById('tiny-orbit-trails');
  // Mobile: the Beauty moon is intentionally disabled, including its per-frame SVG orbit.
  const mobileBeautyMoonless = true; // V13: Beauty's small moon removed on all devices; no orbit RAF.
  if (mobileBeautyMoonless) { star.style.display='none'; group.style.display='none'; }
  const svgNS='http://www.w3.org/2000/svg';
  const tail=[];
  for(let i=0;i<(mobileBeautyMoonless?0:3);i++){
    const c=document.createElementNS(svgNS,'circle');
    c.setAttribute('r',String(3.3-i*.3));c.setAttribute('opacity',String(.52-i*.058));
    group.appendChild(c);tail.push(c);
  }
  const motionReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf=0,active=false,begin=0,lastOrbit=0;
  let arcLength=0; if(!mobileBeautyMoonless)try{arcLength=orbit.getTotalLength();}catch(e){}
  // Desktop: sample the SVG orbit ONCE, then interpolate positions. No repeated
  // getPointAtLength() during animation or transition, and no layout reads in RAF.
  let orbitSamples=null;
  const orbitSampleCount=192;
  function prepareOrbitSamples(){
    if(mobileBeautyMoonless||!arcLength||orbitSamples)return;
    try {
      const samples=[];
      for(let j=0;j<=orbitSampleCount;j++) {
        const p=orbit.getPointAtLength(arcLength*j/orbitSampleCount);
        samples.push([p.x,p.y]);
      }
      orbitSamples=samples;
    } catch(e){orbitSamples=null;}
  }
  if(!mobileBeautyMoonless && arcLength) {
    if('requestIdleCallback' in window)requestIdleCallback(prepareOrbitSamples,{timeout:1400});
    else setTimeout(prepareOrbitSamples,350);
  }
  function cachedOrbitPoint(f){
    if(!orbitSamples) return orbit.getPointAtLength(Math.max(0,Math.min(1,f))*arcLength);
    const t=Math.max(0,Math.min(1,f))*orbitSampleCount;
    const i=Math.min(orbitSampleCount-1,Math.floor(t)),r=t-i;
    const a=orbitSamples[i],b=orbitSamples[i+1];
    return {x:a[0]+(b[0]-a[0])*r,y:a[1]+(b[1]-a[1])*r};
  }
  function frame(t){
    raf=0;
    if(!active||document.hidden||!arcLength)return;
    if (lastOrbit && t-lastOrbit < 1000/TINY_PERF.orbitFps) {raf=requestAnimationFrame(frame);return;}
    lastOrbit=t;
    const duration=9600, progress=((t-begin)%duration)/duration;
    // Planet descends from upper right toward the horizon, then disappears
    // behind the terrain mask; the hidden part of its orbit is never drawn.
    const e=progress<.90 ? progress/.90 : 1;
    const pt=cachedOrbitPoint(1-e);
    star.setAttribute('transform',`translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)})`);
    star.style.opacity=(progress>.90)?'0':String(Math.min(1,Math.max(0,(progress-.02)/.08))*Math.min(1,Math.max(0,(.90-progress)/.07)));
    tail.forEach((node,i)=>{
      const v=Math.min(1,Math.max(0,1-e+(i+1)*.018));
      const p=cachedOrbitPoint(v);
      node.setAttribute('cx',p.x.toFixed(2));node.setAttribute('cy',p.y.toFixed(2));
      node.setAttribute('opacity',String(Math.max(0,(.52-i*.058)*Math.min(1,(progress-.02)/.06))));
    });
    raf=requestAnimationFrame(frame);
  }
  function sync(){
    if(mobileBeautyMoonless)return;
    const visible=beauty.classList.contains('is-visible')&&!document.hidden;
    if(visible===active)return;
    active=visible;if(raf)cancelAnimationFrame(raf);raf=0;
    if(visible){begin=performance.now();frame(begin+(motionReduced?4300:0));}
    else {star.style.opacity='0';tail.forEach(n=>n.setAttribute('opacity','0'));}
  }
  new MutationObserver(sync).observe(beauty,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',sync);sync();
  if(motionReduced){active=false;star.style.opacity='0';}
  // Health-scene fauna — independent animated SVGs rather than external GIFs.
  const fauna=document.createElement('div');fauna.className='tiny-health-fauna';
  const birds=[['12%','31%',68,'-1.2s'],['27%','43%',52,'-3.8s'],['57%','26%',42,'-2.1s'],['7%','61%',38,'-4.2s']];
  birds.slice(0,mobile?3:4).forEach(([x,y,w,delay],i)=>{
    const el=document.createElementNS(svgNS,'svg');el.setAttribute('viewBox','0 0 90 45');el.classList.add('tiny-bird');
    el.setAttribute('aria-hidden','true');el.style.cssText=`left:${x};top:${y};--width:${w}px;--fly:${5.5+i*1.1}s;--delay:${delay};`;
    el.innerHTML='<path class="left-wing" d="M45 28 Q27 6 4 18"/><path class="right-wing" d="M45 28 Q63 4 85 18"/><path d="M41 26 Q45 30 49 26" opacity=".6"/>';
    fauna.appendChild(el);
  });
  const butterflies=[['6%','47%',62,'-1.8s'],['35%','56%',46,'-4s'],['73%','19%',50,'-3.1s'],['18%','72%',39,'-2.4s']];
  butterflies.slice(0,mobile?2:4).forEach(([x,y,w,delay],i)=>{
    const el=document.createElementNS(svgNS,'svg');el.setAttribute('viewBox','0 0 88 78');el.classList.add('tiny-health-butterfly');
    el.setAttribute('aria-hidden','true');el.style.cssText=`left:${x};top:${y};--width:${w}px;--fly:${6.5+i*.7}s;--delay:${delay};`;
    el.innerHTML='<g class="left-wing"><path d="M44 39 C17 6 1 17 20 43 C1 59 22 73 44 42 Z"/></g><g class="right-wing"><path d="M44 39 C71 6 87 17 68 43 C87 59 66 73 44 42 Z"/></g><path class="wing-body" d="M44 30 Q47 42 44 55 M44 30 L36 23 M44 30 L52 23"/>';
    fauna.appendChild(el);
  });
  health.appendChild(fauna);
  // Chỉ ở cảnh cảm ơn: đóng độ cao và bẻ cong thành ^ TRONG CÙNG MỘT KHUNG HÌNH.
  // Hai mắt gốc được vẽ vào đúng vùng mắt, không thêm mắt chồng rồi bật hiện đột ngột.
  const share=document.getElementById('share-flight-scene');
  const tiny=document.getElementById('share-tiny');
  if(share&&tiny){
    const ns='http://www.w3.org/2000/svg';
    const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
    let raf=0, currentRun=0, active=false;
    let shapes=[];
    function geometry(progress){
      // Hai chuyển động chồng nhau: dẹt dần và gập nhọn ở giữa thành ^.
      const shrink=smooth(progress);
      const fold=smooth((progress-.31)/.69);
      const steps=32, upper=[], lower=[];
      for(let i=0;i<=steps;i++){
        const x=9+82*i/steps;
        const edge=Math.pow(Math.abs((x-50)/41),10);
        const openHalf=43-17*edge; // viền mắt vuông bo mềm khi còn mở
        const half=openHalf*(1-shrink)+5.4*shrink;
        const cusp=1-Math.abs((x-50)/41);
        const y=50+15*shrink-34*fold*cusp;
        upper.push([x,y-half]);lower.push([x,y+half]);
      }
      const fmt=([x,y])=>x.toFixed(2)+' '+y.toFixed(2);
      const right=lower[lower.length-1],left=lower[0];
      // Đầu mí bo tròn tự nhiên; đoạn giữa có đỉnh gấp rõ nhưng không sắc nhọn.
      let d='M '+fmt(upper[0]);
      for(let i=1;i<upper.length;i++)d+=' L '+fmt(upper[i]);
      d+=' Q 98 '+((upper[steps][1]+right[1])/2).toFixed(2)+' '+fmt(right);
      for(let i=steps-1;i>=0;i--)d+=' L '+fmt(lower[i]);
      d+=' Q 2 '+((left[1]+upper[0][1])/2).toFixed(2)+' '+fmt(upper[0])+' Z';
      return d;
    }
    function cleanup(){
      currentRun++;
      if(raf)cancelAnimationFrame(raf);raf=0;
      active=false;
      tiny.classList.remove('tiny-folding-smile','tiny-caret-restored');
      tiny.querySelectorAll('.tiny-folding-smile-svg, .tiny-restored-caret').forEach(el=>el.remove());
      shapes=[];
    }
    function start(){
      if(active || share.classList.contains('reality-leaving'))return;
      cleanup();active=true;
      const eyes=tiny.querySelectorAll('#khung-mat .con-mat');
      if(eyes.length!==2){active=false;return;}
      eyes.forEach((eye,i)=>{
        // Bỏ những nét cũ từ phiên bản trước để không còn hai lớp mắt.
        eye.querySelectorAll('.tiny-morph-svg,.tiny-restored-caret,.tiny-folding-smile-svg').forEach(el=>el.remove());
        eye.classList.remove('tiny-actual-morph');
        const svg=document.createElementNS(ns,'svg');
        svg.classList.add('tiny-folding-smile-svg');
        svg.setAttribute('viewBox','0 0 100 100');
        svg.setAttribute('aria-hidden','true');
        const defs=document.createElementNS(ns,'defs');
        const grad=document.createElementNS(ns,'linearGradient');
        const gid='tiny-smile-cyan-'+i;grad.id=gid;
        grad.setAttribute('x1','0%');grad.setAttribute('y1','0%');grad.setAttribute('x2','100%');grad.setAttribute('y2','100%');
        [['0%','#afffff'],['38%','#10f6ed'],['80%','#00e7e9'],['100%','#b2ffff']].forEach(([at,color])=>{
          const stop=document.createElementNS(ns,'stop');stop.setAttribute('offset',at);stop.setAttribute('stop-color',color);grad.appendChild(stop);
        });defs.appendChild(grad);svg.appendChild(defs);
        const path=document.createElementNS(ns,'path');path.classList.add('smile-morph-fill');
        path.setAttribute('fill','url(#'+gid+')');path.setAttribute('d',geometry(0));svg.appendChild(path);
        eye.appendChild(svg);shapes.push(path);
      });
      // Đưa mắt nguyên bản vào SVG ở cùng hình dáng đầu trước khung hình tiếp theo.
      tiny.classList.add('tiny-folding-smile');
      const run=++currentRun,t0=performance.now(),duration=660;
      function draw(now){
        if(run!==currentRun)return;
        const t=Math.min(1,(now-t0)/duration);
        const d=geometry(t);
        shapes.forEach(p=>p.setAttribute('d',d));
        if(t<1)raf=requestAnimationFrame(draw);else raf=0;
      }
      raf=requestAnimationFrame(draw);
    }
    const watch=new MutationObserver(()=>{
      if(share.classList.contains('share-thank-you')&&!share.classList.contains('reality-leaving'))start();
      else if(active)cleanup();
    });
    watch.observe(share,{attributes:true,attributeFilter:['class']});
  }

})();
