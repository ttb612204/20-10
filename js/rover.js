/* Tiny reality moon rover script */
(() => {
  const scene = document.getElementById('tiny-reality-scene');
  const rover = document.getElementById('tiny-moon-rover');
  const shop = document.getElementById('tiny-shop-scene');
  if (!scene || !rover) return;
  let frame = 0, startedAt = 0, lastRoverFrame = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const active = () => document.visibilityState === 'visible' && scene.classList.contains('reality-visible') && !shop?.classList.contains('shop-visible');
  function putRover(t) {
    // Mặt trăng: điểm từ trái tới phải của Bezier bậc hai M(-80,292), Q(600,56), (1280,292).
    const x = -80 + 1360 * t;
    const y = 292 - 472 * t * (1 - t);
    const dy = -472 * (1 - 2*t) / 1360;
    const tilt = Math.atan(dy) * 180 / Math.PI;
    rover.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${tilt.toFixed(2)}) scale(.72)`);
    const narrow = innerWidth <= 650;
    const fade = narrow
      ? Math.min(1, Math.max(0, (t - .245)/.042), Math.max(0, (.755 - t)/.042))
      : Math.min(1, Math.max(0, (t + .09)/.16), Math.max(0, (1.09 - t)/.15));
    rover.style.opacity = String(fade);
  }
  function tick(time) {
    if (!active()) { frame = 0; return; }
    if (!startedAt) startedAt = time;
    if (lastRoverFrame && time-lastRoverFrame < 1000/TINY_PERF.roverFps) {
      frame = requestAnimationFrame(tick);return;
    }
    lastRoverFrame=time;
    // Xe chạy liên tục dọc đường cong, đi khỏi màn hình rồi bắt đầu chuyến mới.
    const progress = ((time - startedAt) % 13300) / 13300;
    // Trên điện thoại xe vẫn đi qua phần mặt trăng nhìn thấy được, không mất quá lâu ở rìa ngoài.
    const t = innerWidth <= 650 ? .25 + progress * .50 : -.085 + progress * 1.17;
    putRover(t);
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (active()) {
      if (reduced) { putRover(.59); return; }
      if (!frame) { startedAt = 0; frame = requestAnimationFrame(tick); }
    } else {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      startedAt = 0;
    }
  }
  new MutationObserver(sync).observe(scene, {attributes:true,attributeFilter:['class']});
  if (shop) new MutationObserver(sync).observe(shop, {attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange', sync);
  sync();
})();
