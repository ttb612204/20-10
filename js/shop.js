/* ==========================================================================
   TINY SHOP LOGIC (Product grid, modal, and magical particle effects)
   ========================================================================== */

(() => {
 const scene=document.getElementById('tiny-shop-scene');
 const oldScene=document.getElementById('tiny-reality-scene');
 const newHost=document.getElementById('shop-tiny-host');
 const butterfly=document.getElementById('shop-flying-butterfly');
 const note=document.getElementById('shop-coming-note');
 const frame=document.getElementById('khung-mat');
 if(!scene||!oldScene||!frame||!newHost)return;
 let started=false, flightBusy=false, butterflyTimer=0,blinkTimer=0,noteTimer=0,activeAnimation=0,activatedAt=0;
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const eyes=()=>Array.from(frame.querySelectorAll('.con-mat'));
 const traces=()=>Array.from(frame.querySelectorAll('.truc-x'));
 function resetLook(){newHost.classList.remove('shop-tracking');newHost.style.setProperty('--follow-x','0px');newHost.style.setProperty('--follow-y','0px');newHost.style.setProperty('--follow-a','0deg');}
 function blink(){ if(!started||flightBusy)return; newHost.classList.add('shop-blinking');setTimeout(()=>newHost.classList.remove('shop-blinking'),170);}
 function nextBlink(){if(!started)return;blinkTimer=setTimeout(()=>{blink();nextBlink()},2400+Math.random()*3000);}
 function nextButterfly(){if(!started)return;butterflyTimer=setTimeout(()=>{flyButterfly()},4200+Math.random()*4700);}
 function flyButterfly(){
   if(!started||flightBusy)return;
   flightBusy=true;
   const begin=performance.now(),duration=reduceMotion?100:4900;
   butterfly.style.opacity='1';
   const host=newHost.getBoundingClientRect(),w=innerWidth,h=innerHeight;
   const start={x:w+65,y:h*.26};const near={x:host.left+host.width*.54,y:host.top-25};const end={x:-90,y:h*.22};
   function anim(now){if(!started){flightBusy=false;return}
      const t=Math.min(1,(now-begin)/duration);
      // Bay từ phải sang trái, lượn nhẹ ngang khu vực Tiny.
      const u=1-t;
      const x=u*u*start.x+2*u*t*near.x+t*t*end.x;
      const y=u*u*start.y+2*u*t*(near.y-65)+t*t*end.y+Math.sin(t*Math.PI*6)*13;
      butterfly.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${(Math.sin(t*7)*9).toFixed(1)}deg)`;
      butterfly.style.opacity=String(Math.min(1,t*9,(1-t)*10));
       const eyeBox=host; // no forced layout read on each animation frame
      const dx=x-(eyeBox.left+eyeBox.width/2),dy=y-(eyeBox.top+eyeBox.height/2);
      newHost.style.setProperty('--follow-x',Math.max(-9,Math.min(9,dx/34)).toFixed(1)+'px');
      newHost.style.setProperty('--follow-y',Math.max(-7,Math.min(7,dy/32)).toFixed(1)+'px');
      newHost.style.setProperty('--follow-a',Math.max(-8,Math.min(8,dx/85)).toFixed(1)+'deg');
      newHost.classList.add('shop-tracking');
      if(t<1){activeAnimation=requestAnimationFrame(anim)}else{butterfly.style.opacity='0';flightBusy=false;resetLook();nextButterfly();}
   }
   activeAnimation=requestAnimationFrame(anim);
 }
 function openShops(){
    if(started)return;
    window.tinyPauseDecorForTransition?.(1250);
    if(!oldScene.classList.contains('reality-visible'))return;
    // Giữ ĐÚNG cặp mắt đã có. FLIP để chúng bay về vòng đỏ rồi thu nhỏ.
    started=true;activatedAt=performance.now();
    const oldBounds=frame.getBoundingClientRect();
    frame.getAnimations().forEach(a=>a.cancel());
    scene.classList.add('shop-visible');scene.setAttribute('aria-hidden','false');
     if(document.documentElement.classList.contains('tiny-mobile')) {
         scene.classList.add('tiny-shop-opening');
         setTimeout(()=>scene.classList.remove('tiny-shop-opening'),1680);
     }
    newHost.appendChild(frame);
    // Hủy hiệu ứng tỉ lệ/đảo mắt từ cảnh cũ trước khi thiết lập hình thái bình thường.
    frame.style.transform='none';frame.style.removeProperty('animation');
    frame.classList.remove('question-one-eye','canh-muon','canh-chuc','wish-smile','wish-beauty');
    traces().forEach(tx=>{tx.style.removeProperty('transform');tx.style.removeProperty('animation')});
    eyes().forEach(e=>{e.style.removeProperty('transform');e.style.removeProperty('animation');e.style.removeProperty('opacity');e.classList.remove('tiny-actual-morph','nham')});
    const newBounds=frame.getBoundingClientRect();
    const sx=oldBounds.width/Math.max(1,newBounds.width);
    const sy=oldBounds.height/Math.max(1,newBounds.height);
    const dx=oldBounds.left+oldBounds.width/2-newBounds.left-newBounds.width/2;
    const dy=oldBounds.top+oldBounds.height/2-newBounds.top-newBounds.height/2;
    const length=reduceMotion?150:1330;
    frame.animate([{transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`},{transform:'translate(0px,0px) scale(1,1)'}],{duration:length,easing:'cubic-bezier(.2,.75,.17,1)'});
    oldScene.classList.add('shop-departing');
    // Đốm trắng tan dần trong lúc đôi mắt thu nhỏ, không bật/tắt chớp đột ngột.
    setTimeout(()=>eyes().forEach(e=>{e.querySelectorAll('.reality-one-piece-svg').forEach(svg=>svg.remove());e.classList.remove('reality-morphing')}),document.documentElement.classList.contains('tiny-mobile')?length+100:length*.65);
    setTimeout(()=>{oldScene.classList.remove('reality-visible');oldScene.setAttribute('aria-hidden','true')},1170);
    setTimeout(()=>{if(started){nextBlink();nextButterfly()}},length+500);
 }
 // Mở gian hàng bằng click/chạm trên nền, áp dụng cả PC và mobile.
 const shopIsInteractive=target=>target instanceof Element &&
      !!target.closest('a,button,input,textarea,select,summary,[role="button"],[contenteditable="true"]');
 document.addEventListener('click',e=>{
    if(started || shopIsInteractive(e.target)) return;
    if(e.target.closest && e.target.closest('#shop-tiny-host'))return;
    if(oldScene.classList.contains('reality-cute') && oldScene.classList.contains('reality-visible'))openShops();
 });
 // Popup chi tiết sản phẩm trước khi mở link Shopee.
 const modal=document.getElementById('shop-product-modal');
 const modalThumb=document.getElementById('shop-modal-thumb');
 const modalKicker=document.getElementById('shop-modal-kicker');
 const modalTitle=document.getElementById('shop-modal-title');
 const modalPrice=document.getElementById('shop-modal-price');
 const modalRandom=document.getElementById('shop-modal-random');
 const modalBuy=document.getElementById('shop-modal-buy');
 const girlNotes=['cái này hợp với cậu nè','vòi ny mua này nè','cậu dùng thì sẽ rất xinh','món này cũng hợp với cậu luôn'];
 const boyNotes=['mua ngay cho bạn nữ nào','đến lúc thể hiện tình cảm rồi','mạnh dạn lên nào','cái này sẽ khiến cậu ấy vui đấy'];
 function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
 function openProductModal(link){
   if(!modal)return;
   const gender=link.dataset.shopGender||'girls';
   const title=link.dataset.productTitle||link.querySelector('.shop-product-name')?.textContent?.trim()||'Sản phẩm';
   const price=link.dataset.productPrice||'Xem giá trên Shopee';
   const thumb=link.querySelector('.shop-product-thumb');
   modalKicker.textContent=gender==='boys'?'gian hàng cho nam':'gian hàng cho nữ';
   modalTitle.textContent=title;
   modalPrice.textContent=price;
   modalRandom.textContent=pick(gender==='boys'?boyNotes:girlNotes);
   modalBuy.href=link.href;
   modalThumb.innerHTML=thumb?thumb.innerHTML:'';
   modal.classList.add('show');
   modal.setAttribute('aria-hidden','false');
   scene.classList.add('shop-modal-active');
   resetLook();
 }
 function closeProductModal(){
   if(!modal)return;
   modal.classList.remove('show');
   modal.setAttribute('aria-hidden','true');
   scene.classList.remove('shop-modal-active');
   resetLook();
 }
 scene.querySelectorAll('.shop-product').forEach(link=>link.addEventListener('click',event=>{
   event.preventDefault();
   event.stopPropagation();
   openProductModal(link);
 }));
 modal?.querySelectorAll('[data-shop-modal-close]').forEach(el=>el.addEventListener('click',event=>{event.stopPropagation();closeProductModal();}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal?.classList.contains('show'))closeProductModal();});
 modalBuy?.addEventListener('click',event=>event.stopPropagation());
})();

/* --- Shop Magical particles --- */
(()=>{
 const field=document.getElementById('shop-magical-field');
 if(!field)return;
 let seed=20261020;
 const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const palette=['#b3faff','#ffb8dd','#fff2b7','#c5ceff'];
 const fragment=document.createDocumentFragment();
 // Ambient fireflies and petals, fewer on small viewports, no animation on reduced motion.
 const small=window.matchMedia('(max-width: 700px)').matches;
 const fireCount=TINY_PERF.mobile?8:small?10:23,petalCount=TINY_PERF.mobile?2:small?3:6;
 for(let i=0;i<fireCount+petalCount;i++){
  const petal=i>=fireCount,el=document.createElement('span');
  el.className=petal?'shop-magical-petal':'shop-magical-firefly';
  el.setAttribute('aria-hidden','true');
  const x=petal?(rand()<.5?rand()*15:85+rand()*15):rand()*100;
  const y=20+rand()*73;
  el.style.setProperty('--fx',x.toFixed(2)+'%');
  el.style.setProperty('--fy',y.toFixed(2)+'%');
  el.style.setProperty('--fs',petal?(12+rand()*11).toFixed(1)+'px':(1.8+rand()*2.8).toFixed(1)+'px');
  el.style.setProperty('--fc',palette[Math.floor(rand()*palette.length)]);
  el.style.setProperty('--ft',(petal?6+rand()*5:2.5+rand()*4.5).toFixed(2)+'s');
  el.style.setProperty('--fd',(-rand()*8).toFixed(2)+'s');
  if(petal)el.textContent=['✿','✧','❀'][Math.floor(rand()*3)];
  fragment.appendChild(el);
 }
 field.appendChild(fragment);
})();
