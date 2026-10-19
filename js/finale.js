/* ==========================================================================
   FINALE EXPERIENCE SCRIPT: DÀNH RIÊNG CHO NGUYỄN BÍCH THẢO (20/10)
   5-Photo Album, Dedicated Letter, Heart Finale, Music Widget,
   Fairy Dust Trail, Petal Burst, and Secret Easter Egg
   ========================================================================== */

(function () {
  'use strict';

  function getPhotoUrl(idx) {
    if (window.getThaoPhotoUrl && typeof window.getThaoPhotoUrl === 'function') {
      const u = window.getThaoPhotoUrl(idx);
      if (u) return u;
    }
    if (window.__THAO_PHOTOS__ && window.__THAO_PHOTOS__[idx]) {
      return window.__THAO_PHOTOS__[idx];
    }
    return '';
  }

  // Photo gallery metadata for Nguyễn Bích Thảo (5 authentic photos)
  const THAO_PHOTOS = [
    {
      idx: 1,
      title: 'Dịu dàng & Ngọt ngào',
      desc: 'Nụ cười tươi tắn và nét trong trẻo luôn mang lại cảm giác bình yên, ấm áp.'
    },
    {
      idx: 2,
      title: 'Chăm chỉ & Tự tin',
      desc: 'Hình ảnh Thảo tập trung làm việc đầy nhiệt huyết, thông minh và bản lĩnh.'
    },
    {
      idx: 3,
      title: 'Thanh lịch & Rạng rỡ',
      desc: 'Vẻ đẹp dịu dàng, trang nhã trong chiếc áo hồng xinh xắn cùng cặp kính tri thức.'
    },
    {
      idx: 4,
      title: 'E ấp & Duyên dáng',
      desc: 'Khoảnh khắc duyên dáng và nụ cười mỉm đáng yêu tựa như đóa hoa sớm mai.'
    },
    {
      idx: 5,
      title: 'Tinh nghịch & Tràn đầy sức sống',
      desc: 'Năng lượng tích cực rạng ngời cùng nụ cười tinh nghịch, siêu dễ thương.'
    }
  ];

  let currentPhase = 1;
  let canvasAnimationId = null;
  let lastFocusedElement = null;
  let currentLightboxIdx = 1;

  // DOM Elements cache
  let sceneEl = null;
  let phases = [];
  let starsCanvas = null;
  let starsCtx = null;
  let particles = [];
  let lightboxModal = null;
  let lightboxImg = null;
  let lightboxCaption = null;
  let lightboxClose = null;
  let lightboxCounter = null;
  let lightboxPrev = null;
  let lightboxNext = null;

  function initElements() {
    sceneEl = document.getElementById('thao-finale-scene');
    if (!sceneEl) return false;

    phases = [
      document.getElementById('thao-phase-1'),
      document.getElementById('thao-phase-2'),
      document.getElementById('thao-phase-3'),
      document.getElementById('thao-phase-4')
    ];

    starsCanvas = document.getElementById('thao-stars-canvas');
    if (starsCanvas) {
      starsCtx = starsCanvas.getContext('2d');
    }

    lightboxModal = document.getElementById('thao-lightbox-modal');
    lightboxImg = document.getElementById('thao-lightbox-img');
    lightboxCaption = document.getElementById('thao-lightbox-caption');
    lightboxClose = document.getElementById('thao-lightbox-close');
    lightboxCounter = document.getElementById('thao-lightbox-counter');
    lightboxPrev = document.getElementById('thao-lightbox-prev');
    lightboxNext = document.getElementById('thao-lightbox-next');

    bindEvents();
    initCanvasParticles();
    initMusicWidget();
    initFairyDustTrail();
    initEasterEgg();
    hydrateImages();
    return true;
  }

  function hydrateImages() {
    document.querySelectorAll('[data-photo-idx]').forEach((el) => {
      const idx = parseInt(el.getAttribute('data-photo-idx'), 10);
      const url = getPhotoUrl(idx);
      if (!url) return;
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (img) {
        img.src = url;
      }
    });
  }

  function bindEvents() {
    // Navigation buttons
    const btnToAlbum = document.getElementById('thao-btn-to-album');
    const btnToWish = document.getElementById('thao-btn-to-wish');
    const btnToHeart = document.getElementById('thao-btn-to-heart');
    const btnReplay = document.getElementById('thao-btn-replay');
    const btnBackLetter = document.getElementById('thao-btn-back-letter');

    if (btnToAlbum) {
      btnToAlbum.addEventListener('click', () => goToPhase(2));
    }
    if (btnToWish) {
      btnToWish.addEventListener('click', () => goToPhase(3));
    }
    if (btnToHeart) {
      btnToHeart.addEventListener('click', () => goToPhase(4));
    }
    if (btnReplay) {
      btnReplay.addEventListener('click', () => goToPhase(2));
    }
    if (btnBackLetter) {
      btnBackLetter.addEventListener('click', () => goToPhase(3));
    }

    // Photo card clicks in Album (Phase 2)
    document.querySelectorAll('.thao-photo-card').forEach((card) => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-photo-idx'), 10);
        openLightbox(idx);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(card.getAttribute('data-photo-idx'), 10);
          openLightbox(idx);
        }
      });
    });

    // Heart items click (Phase 4)
    document.querySelectorAll('.thao-heart-item').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-photo-idx'), 10);
        openLightbox(idx);
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(item.getAttribute('data-photo-idx'), 10);
          openLightbox(idx);
        }
      });
    });

    // Lightbox modal close handlers
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });
    }

    // Lightbox Prev & Next button handlers
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxPhoto(currentLightboxIdx - 1, 'prev');
      });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxPhoto(currentLightboxIdx + 1, 'next');
      });
    }

    // Lightbox Keyboard Navigation (ArrowLeft, ArrowRight, Escape)
    window.addEventListener('keydown', (e) => {
      if (lightboxModal && lightboxModal.classList.contains('open')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          showLightboxPhoto(currentLightboxIdx - 1, 'prev');
        } else if (e.key === 'ArrowRight') {
          showLightboxPhoto(currentLightboxIdx + 1, 'next');
        }
      }
    });

    // Lightbox Mobile Touch Swipe Gestures
    if (lightboxModal) {
      let touchStartX = 0;
      let touchStartY = 0;

      lightboxModal.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      lightboxModal.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
              showLightboxPhoto(currentLightboxIdx + 1, 'next');
            } else {
              showLightboxPhoto(currentLightboxIdx - 1, 'prev');
            }
          }
        }
      }, { passive: true });
    }

    window.addEventListener('resize', resizeCanvas);
  }

  function goToPhase(targetPhase) {
    if (targetPhase < 1 || targetPhase > 4) return;
    currentPhase = targetPhase;

    // Safely remove focus from any element in previous phase
    if (document.activeElement && document.activeElement !== document.body) {
      try { document.activeElement.blur(); } catch (_) {}
    }

    phases.forEach((p, idx) => {
      if (!p) return;
      if (idx + 1 === targetPhase) {
        p.classList.add('current');
        p.removeAttribute('inert');
      } else {
        p.classList.remove('current');
        p.setAttribute('inert', '');
      }
    });

    // Special animation trigger for Phase 4 (Heart convergence)
    if (targetPhase === 4) {
      triggerHeartAnimation();
    }

    // Scroll to top of stage
    if (sceneEl) {
      sceneEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function triggerHeartAnimation() {
    const heartItems = document.querySelectorAll('.thao-heart-item');
    const centerBadge = document.querySelector('.thao-heart-center-badge');

    // Stagger photos entering heart formation
    heartItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translate(-50%, -50%) scale(0.2)';

      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = '';
      }, 180 + index * 120);
    });

    if (centerBadge) {
      centerBadge.style.opacity = '0';
      centerBadge.style.transform = 'translate(-50%, -50%) scale(0.7)';
      setTimeout(() => {
        centerBadge.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        centerBadge.style.opacity = '1';
        centerBadge.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 750);
    }
  }

  function showLightboxPhoto(photoIdx, direction = 'next') {
    let idx = photoIdx;
    if (idx < 1) idx = THAO_PHOTOS.length;
    if (idx > THAO_PHOTOS.length) idx = 1;
    currentLightboxIdx = idx;

    const data = THAO_PHOTOS.find((p) => p.idx === idx) || THAO_PHOTOS[0];
    if (!lightboxModal || !lightboxImg) return;

    // Subtle slide transition
    lightboxImg.classList.remove('sliding-left', 'sliding-right');
    void lightboxImg.offsetWidth;
    lightboxImg.classList.add(direction === 'next' ? 'sliding-right' : 'sliding-left');

    const photoUrl = getPhotoUrl(idx);
    lightboxImg.src = photoUrl;
    lightboxImg.alt = 'Ảnh của Nguyễn Bích Thảo - ' + data.title;

    if (lightboxCaption) {
      lightboxCaption.innerHTML = `<strong>${data.title}</strong><br><span style="font-size:0.9em;opacity:0.85;">${data.desc}</span>`;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${idx} / ${THAO_PHOTOS.length}`;
    }
  }

  function openLightbox(photoIdx) {
    if (!lightboxModal) return;
    lastFocusedElement = document.activeElement;
    showLightboxPhoto(photoIdx, 'next');

    lightboxModal.removeAttribute('inert');
    lightboxModal.classList.add('open');
    if (lightboxClose) {
      setTimeout(() => {
        try { lightboxClose.focus(); } catch (_) {}
      }, 50);
    }
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    if (document.activeElement && lightboxModal.contains(document.activeElement)) {
      try { document.activeElement.blur(); } catch (_) {}
    }
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('inert', '');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      try { lastFocusedElement.focus(); } catch (_) {}
    }
  }

  // ==========================================================================
  // FEATURE 1: PETAL & SPARKLE BURST ENGINE
  // ==========================================================================
  window.triggerGiftOpenBurst = function (originX, originY) {
    const canvas = document.getElementById('thao-burst-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = typeof originX === 'number' ? originX : canvas.width / 2;
    const cy = typeof originY === 'number' ? originY : canvas.height * 0.65;

    const petalColors = ['#F4C9D2', '#D98298', '#D6B77A', '#FFF5F7', '#FFAEC3', '#E898AC'];
    const starColors = ['#FFF9F5', '#D6B77A', '#F4C9D2'];
    const burstParticles = [];

    // 45 Flower Petals
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 4;
      burstParticles.push({
        type: 'petal',
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 4 - 2,
        size: Math.random() * 12 + 10,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.08 + 0.04,
        alpha: 1,
        gravity: 0.12,
        drag: 0.965
      });
    }

    // 35 Stars & Mini Hearts
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 3;
      burstParticles.push({
        type: i % 3 === 0 ? 'heart' : 'star',
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 5 - 2,
        size: Math.random() * 8 + 6,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: 1,
        gravity: 0.08,
        drag: 0.95
      });
    }

    let burstAnimId = null;
    function drawBurst() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      for (let i = 0; i < burstParticles.length; i++) {
        const p = burstParticles[i];
        if (p.alpha <= 0.02) continue;
        activeCount++;

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.009;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.type === 'petal') {
          p.wobble += p.wobbleSpeed;
          p.rotation += p.vRot;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.scale(Math.sin(p.wobble), 1);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.4, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.4, 0, -p.size);
          ctx.fill();
        } else if (p.type === 'heart') {
          ctx.translate(p.x, p.y);
          ctx.fillStyle = p.color;
          ctx.font = `${p.size * 1.5}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('♥', 0, 0);
        } else {
          ctx.translate(p.x, p.y);
          ctx.fillStyle = p.color;
          ctx.font = `${p.size * 1.4}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✦', 0, 0);
        }
        ctx.restore();
      }

      if (activeCount > 0) {
        burstAnimId = requestAnimationFrame(drawBurst);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(burstAnimId);
      }
    }

    drawBurst();
  };

  // ==========================================================================
  // FEATURE 2: FAIRY DUST MAGIC TRAIL CANVAS
  // ==========================================================================
  function initFairyDustTrail() {
    const canvas = document.getElementById('thao-magic-trail-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeTrail() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeTrail();
    window.addEventListener('resize', resizeTrail, { passive: true });

    const trailParticles = [];
    const colors = ['#F4C9D2', '#D6B77A', '#FFF9F5', '#D98298'];
    let lastEmitTime = 0;

    function emitAt(x, y) {
      const now = performance.now();
      if (now - lastEmitTime < 30) return; // throttle emission
      lastEmitTime = now;

      if (trailParticles.length > 35) {
        trailParticles.shift();
      }

      trailParticles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.9 - 0.3,
        size: Math.random() * 8 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.95,
        fade: Math.random() * 0.02 + 0.018,
        char: Math.random() > 0.4 ? '✦' : '✧'
      });
    }

    window.addEventListener('pointermove', (e) => {
      emitAt(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        emitAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    function renderTrail() {
      if (trailParticles.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = trailParticles.length - 1; i >= 0; i--) {
          const p = trailParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.fade;

          if (p.alpha <= 0) {
            trailParticles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.font = `${p.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, p.x, p.y);
          ctx.restore();
        }
      }
      requestAnimationFrame(renderTrail);
    }
    renderTrail();
  }

  // ==========================================================================
  // FEATURE 3: VINYL MUSIC DISC WIDGET
  // ==========================================================================
  function initMusicWidget() {
    const widget = document.getElementById('thao-music-widget');
    const audio = document.getElementById('tiny-soundtrack');
    if (!widget || !audio) return;

    function updateState() {
      if (audio.paused) {
        widget.classList.add('is-paused');
        widget.classList.remove('is-playing');
        widget.setAttribute('aria-label', 'Phát nhạc nền');
      } else {
        widget.classList.add('is-playing');
        widget.classList.remove('is-paused');
        widget.setAttribute('aria-label', 'Tạm dừng nhạc nền');
      }
    }

    widget.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      updateState();
    });

    widget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        widget.click();
      }
    });

    audio.addEventListener('play', updateState);
    audio.addEventListener('pause', updateState);
    updateState();
  }

  // ==========================================================================
  // FEATURE 5: HEARTBEAT & SECRET MESSAGE EASTER EGG (PHASE 4)
  // ==========================================================================
  function initEasterEgg() {
    const badge = document.getElementById('thao-heart-center-badge');
    const heartStage = document.getElementById('thao-heart-stage');
    const secretModal = document.getElementById('thao-secret-modal');
    const secretCloseBtn = document.getElementById('thao-secret-close-btn');
    const secretConfirmBtn = document.getElementById('thao-secret-confirm-btn');
    const secretBackdrop = document.getElementById('thao-secret-backdrop');

    if (!badge || !secretModal) return;

    function openSecret() {
      // Trigger double heartbeat animation on heart formation
      if (heartStage) {
        heartStage.classList.add('is-heartbeating');
        setTimeout(() => heartStage.classList.remove('is-heartbeating'), 1800);
      }

      // Spawn cascade of mini hearts
      if (typeof window.triggerGiftOpenBurst === 'function') {
        const rect = badge.getBoundingClientRect();
        window.triggerGiftOpenBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      lastFocusedElement = document.activeElement;
      setTimeout(() => {
        secretModal.removeAttribute('inert');
        secretModal.classList.add('open');
        if (secretConfirmBtn) {
          try { secretConfirmBtn.focus(); } catch (_) {}
        }
      }, 450);
    }

    function closeSecret() {
      if (document.activeElement && secretModal.contains(document.activeElement)) {
        try { document.activeElement.blur(); } catch (_) {}
      }
      secretModal.classList.remove('open');
      secretModal.setAttribute('inert', '');
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        try { lastFocusedElement.focus(); } catch (_) {}
      }
    }

    badge.addEventListener('click', openSecret);
    badge.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSecret();
      }
    });

    if (secretCloseBtn) secretCloseBtn.addEventListener('click', closeSecret);
    if (secretConfirmBtn) secretConfirmBtn.addEventListener('click', closeSecret);
    if (secretBackdrop) secretBackdrop.addEventListener('click', closeSecret);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && secretModal.classList.contains('open')) {
        closeSecret();
      }
    });
  }

  // ==========================================================================
  // Romantic Twinkling & Floating Particle Canvas (Finale Background)
  // ==========================================================================
  function initCanvasParticles() {
    if (!starsCanvas || !starsCtx) return;
    resizeCanvas();

    const count = window.innerWidth < 600 ? 30 : 60;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 1.8 + 0.6,
        color: i % 3 === 0 ? 'rgba(214, 183, 122,' : i % 3 === 1 ? 'rgba(244, 201, 210,' : 'rgba(255, 249, 245,',
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        vy: -(Math.random() * 0.35 + 0.1),
        vx: (Math.random() - 0.5) * 0.15
      });
    }

    if (!canvasAnimationId) {
      animateParticles();
    }
  }

  function resizeCanvas() {
    if (!starsCanvas) return;
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  }

  function animateParticles() {
    if (!starsCtx || !starsCanvas) return;

    if (sceneEl && sceneEl.classList.contains('active')) {
      starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.alpha += p.twinkleSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.2) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }

        p.y += p.vy;
        p.x += p.vx;

        if (p.y < 0) {
          p.y = starsCanvas.height + 5;
          p.x = Math.random() * starsCanvas.width;
        }
        if (p.x < 0) p.x = starsCanvas.width;
        if (p.x > starsCanvas.width) p.x = 0;

        starsCtx.beginPath();
        starsCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        starsCtx.fillStyle = p.color + p.alpha + ')';
        starsCtx.shadowBlur = 8;
        starsCtx.shadowColor = 'rgba(214, 183, 122, 0.4)';
        starsCtx.fill();
      }
    }

    canvasAnimationId = requestAnimationFrame(animateParticles);
  }

  // Master function called by story.js when user clicks after "liệu cậu có thể?"
  window.startThaoFinale = function (targetPhase = 2) {
    if (!sceneEl) {
      initElements();
    }

    // Smoothly hide question stage, text cues, and robot face
    const questionStage = document.getElementById('question-stage');
    if (questionStage) {
      questionStage.classList.remove('active', 'hien-thi');
      questionStage.style.opacity = '0';
      questionStage.style.pointerEvents = 'none';
      setTimeout(() => { questionStage.style.display = 'none'; }, 800);
    }

    document.querySelectorAll('.text-layer').forEach((t) => {
      t.classList.remove('hien-thi');
    });

    const khungMat = document.getElementById('khung-mat');
    if (khungMat) {
      khungMat.style.transition = 'opacity 1s ease, transform 1s ease';
      khungMat.style.opacity = '0';
      khungMat.style.pointerEvents = 'none';
      setTimeout(() => { khungMat.style.display = 'none'; }, 1000);
    }

    // Ensure soundtrack keeps looping with gentle romantic volume
    const soundtrack = document.getElementById('tiny-soundtrack');
    if (soundtrack) {
      soundtrack.loop = true;
      if (soundtrack.paused) {
        soundtrack.play().catch(() => {});
      }
      soundtrack.volume = 0.45;
    }

    // Activate the finale scene
    if (sceneEl) {
      sceneEl.removeAttribute('inert');
      sceneEl.classList.add('active');
    }

    goToPhase(targetPhase);
    resizeCanvas();
  };

  // Pre-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initElements);
  } else {
    initElements();
  }
})();
