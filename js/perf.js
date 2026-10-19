/* Performance profile: animated background adapts, story timing/audio/product links stay unchanged. */
/* Performance profile: animated background adapts, story timing/audio/product links stay unchanged. */
window.TINY_PERF = (() => {
  const qs = new URLSearchParams(location.search);
  const quality = qs.get('tinyfx');
  const touch = matchMedia('(pointer:coarse)').matches;
  const constrained = touch || (navigator.deviceMemory && navigator.deviceMemory <= 6)
     || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (touch && matchMedia('(max-width:900px)').matches && !/Windows|Macintosh|X11/i.test(navigator.userAgent));
  const lite = mobile || (quality === 'full' ? false : quality === 'lite' ? true : !!constrained);
  document.documentElement.classList.toggle('tiny-lite', lite);
  document.documentElement.classList.toggle('tiny-mobile', mobile);
  const maxCanvasPixels = mobile ? 365000 : lite ? 1250000 : 2100000;
  function canvasDpr(w,h,maxDpr=1.6) {
    return Math.max(mobile ? .48 : .55, Math.min(devicePixelRatio || 1,
      mobile ? .84 : lite ? 1.15 : maxDpr,
      Math.sqrt(maxCanvasPixels / Math.max(1, w*h))));
  }
  return { lite, mobile, canvasDpr, ambientFps: mobile ? 60 : lite ? 24 : 60,
    roverFps:mobile ? 45 : lite ? 30 : 60,
    orbitFps:mobile ? 45 : lite ? 24 : 60,
    leafFps:mobile ? 60 : lite ? 24 : 60 };

})();
