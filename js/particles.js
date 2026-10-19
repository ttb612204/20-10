/* Tiny upgrade particles v2 */
(()=>{
  const root=document.getElementById('tiny-wish-decor');
  if(!root)return;
  const motif=(id,html)=>{const host=document.getElementById(id);if(host){const el=document.createElement('div');el.className='tiny-upgrade-motif '+({ 'decor-want':'tiny-want-upgrade','decor-health':'tiny-health-upgrade','decor-beauty':'tiny-beauty-upgrade'}[id]);el.innerHTML=html;host.appendChild(el);}};
  const wishSvg='<svg class="motif-left" viewBox="0 0 270 360" aria-hidden="true"><path class="wish-guide" d="M-15 280 Q80 246 83 171 T235 60"/><path class="wish-trace" d="M5 313 Q73 247 101 186 T250 32"/><path class="wish-trace" d="M26 332 Q108 270 130 209 T267 70" opacity=".38"/></svg><svg class="motif-right" viewBox="0 0 270 360" aria-hidden="true"><path class="wish-guide" d="M-15 280 Q80 246 83 171 T235 60"/><path class="wish-trace" d="M5 313 Q73 247 101 186 T250 32"/><path class="wish-trace" d="M26 332 Q108 270 130 209 T267 70" opacity=".38"/></svg><i class="tiny-wish-jewel one"></i><i class="tiny-wish-jewel two"></i>';
  motif('decor-want',wishSvg);
  const plusSvg='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M36 12 H64 V36 H88 V64 H64 V88 H36 V64 H12 V36 H36 Z"/></svg>';
  motif('decor-health','<div class="tiny-heal-sigil one">'+plusSvg+'</div><div class="tiny-heal-sigil two">'+plusSvg+'</div>');
  const flower='<svg viewBox="0 0 260 300" aria-hidden="true"><g>'+Array.from({length:6},(_,i)=>'<path d="M130 151 C86 120 88 74 130 38 C172 74 174 120 130 151" transform="rotate('+(i*60)+' 130 151)" />').join('')+'<circle class="orchid-nucleus" cx="130" cy="151" r="8"/><path d="M130 160 Q110 222 148 285" opacity=".6"/></g></svg>';
  if(!window.TINY_PERF?.mobile) motif('decor-beauty',flower.replace('<svg ','<svg class="tiny-orchid-svg motif-left" ') + flower.replace('<svg ','<svg class="tiny-orchid-svg motif-right" '));
  const canvas=document.createElement('canvas');canvas.id='tiny-upgrade-canvas';canvas.setAttribute('aria-hidden','true');root.appendChild(canvas);
  const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
  const scenes=['decor-want','decor-health','decor-beauty'].map(id=>document.getElementById(id));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w=1,h=1,dpr=1,particles=[],mode=-1,frame=0,last=0;
  const rnd=(lo,hi)=>lo+Math.random()*(hi-lo);
  function resize(){w=innerWidth;h=innerHeight;dpr=TINY_PERF.canvasDpr(w,h,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
  resize();window.addEventListener('resize',resize,{passive:true});
  function particlesFor(idx){const count=TINY_PERF.mobile?7:w<700?10:19;particles=Array.from({length:count},(_,i)=>{
    const edge=i%2===0;return {x:rnd(edge?.02:.76,edge?.23:.98)*w,y:rnd(.09,.89)*h,r:rnd(.8,2.7),speed:rnd(.11,.35),alpha:rnd(.25,.7),phase:rnd(0,6.28),kind:idx===1&&i%4===0?'plus':idx===2&&i%3===0?'diamond':'orb'};
  });}
  function dot(p,t,idx){const x=p.x+Math.sin(t*.00056+p.phase)*14,y=p.y-t*p.speed*.012 % (h+40);const yy=((y% (h+40))+(h+40))%(h+40)-20;
    const a=p.alpha*(.60+.4*Math.sin(t*.0016+p.phase));
    if(!Number.isFinite(x)||!Number.isFinite(yy))return;
    ctx.globalAlpha=Math.max(.03,a);ctx.shadowBlur=TINY_PERF.mobile?0:TINY_PERF.lite?5:10;ctx.shadowColor=idx===0?'#8beaff':idx===1?'#ffacc9':'#ffe2ff';
    ctx.strokeStyle=idx===0?'#b7efff':idx===1?'#ffd4e1':'#ffe1fa';ctx.fillStyle=ctx.strokeStyle;ctx.lineWidth=1.3;
    if(p.kind==='plus'){const s=p.r*2.4;ctx.beginPath();ctx.moveTo(x-s,yy);ctx.lineTo(x+s,yy);ctx.moveTo(x,yy-s);ctx.lineTo(x,yy+s);ctx.stroke();}
    else if(p.kind==='diamond'){const s=p.r*2.2;ctx.beginPath();ctx.moveTo(x,yy-s);ctx.lineTo(x+s*.45,yy);ctx.lineTo(x,yy+s);ctx.lineTo(x-s*.45,yy);ctx.closePath();ctx.stroke();}
    else{ctx.beginPath();ctx.arc(x,yy,p.r,0,Math.PI*2);ctx.fill();}
  }
  function select(){return scenes.findIndex(node=>node&&node.classList.contains('is-visible'));}
  function animate(now){frame=0;
    const current=select();if(current!==mode){mode=current;particlesFor(mode);last=0;}
    if(mode<0||document.hidden){ctx.clearRect(0,0,w,h);return;}
    // On desktop a crossfade should not compete with a full-screen glow canvas.
    // Stop painting particles briefly; the loop resumes naturally after transition.
    if(!TINY_PERF.mobile && document.documentElement.classList.contains('tiny-scene-transition')){
      if(!window.__tinyTransitionCanvasCleared){ctx.clearRect(0,0,w,h);window.__tinyTransitionCanvasCleared=true;}
      frame=requestAnimationFrame(animate);return;
    }
    window.__tinyTransitionCanvasCleared=false;
    // Mobile-only Beauty: no full-screen particle canvas during this scene.
    // Triggered again on next scene via existing MutationObserver.
    // Beauty already has glow, fireflies and flowers: do not repaint a
    // 2-million-pixel alpha canvas over them on desktop on every frame.
    if(mode===2){ctx.clearRect(0,0,w,h);return;}
    if(now-last>1000/TINY_PERF.ambientFps||reduced){last=now;ctx.clearRect(0,0,w,h);particles.forEach(p=>dot(p,reduced?0:now,mode));ctx.globalAlpha=1;ctx.shadowBlur=0;}
    if(!reduced)frame=requestAnimationFrame(animate);
  }
  const trigger=()=>{if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(animate);};
  scenes.forEach(node=>node&&new MutationObserver(trigger).observe(node,{attributes:true,attributeFilter:['class']}));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)trigger();});trigger();

  // A brief, light custom canvas star burst when the user accepts; no endless animation.
  const share=document.getElementById('share-flight-scene');
  if(share){let fired=false;
    const obs=new MutationObserver(()=>{if(!share.classList.contains('share-thank-you')){fired=false;return;}if(fired)return;fired=true;
      if(reduced)return;
      const face=document.querySelector('#share-tiny #khung-mat')||document.getElementById('share-tiny');
      if(!face)return;
      const r=face.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height*.5;
      const c=document.createElement('canvas');c.id='tiny-joy-burst';c.setAttribute('aria-hidden','true');document.body.appendChild(c);
      const cc=c.getContext('2d');if(!cc){c.remove();return;}
      const W=innerWidth,H=innerHeight,ratio=TINY_PERF.canvasDpr(W,H,1.5);
      c.width=Math.round(W*ratio);c.height=Math.round(H*ratio);cc.setTransform(ratio,0,0,ratio,0,0);
      const count=W<700?12:22;
      const arr=Array.from({length:count},(_,i)=>{const a=(i/count)*Math.PI*2+rnd(-.18,.18),v=rnd(28,82);return {a,x,y,v,spin:rnd(-3,3),r:rnd(2.4,5),color:['#c7f8ff','#ffbadb','#fff0ba'][i%3]};});
      const start=performance.now();function move(t){const e=Math.min(1,(t-start)/1600);cc.clearRect(0,0,W,H);cc.globalAlpha=(1-e)*.9;
        arr.forEach(p=>{const px=p.x+Math.cos(p.a)*p.v*e*2,py=p.y+Math.sin(p.a)*p.v*e*2+e*e*70;
        cc.save();cc.translate(px,py);cc.rotate(e*p.spin);cc.fillStyle=p.color;cc.shadowColor=p.color;cc.shadowBlur=8;
        cc.beginPath();cc.moveTo(0,-p.r*1.6);cc.lineTo(p.r*.55,0);cc.lineTo(0,p.r*1.6);cc.lineTo(-p.r*.55,0);cc.closePath();cc.fill();cc.restore();});
        if(e<1)requestAnimationFrame(move);else c.remove();}
      requestAnimationFrame(move);
    });obs.observe(share,{attributes:true,attributeFilter:['class']});
  }
})();
