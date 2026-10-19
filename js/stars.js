/* Sky stars & shooting stars animation */
// Các ngôi sao nhấp nháy và sao băng bay lặp lại trên nền trời.
        (() => {
            const sky = document.getElementById('tiny-sky');
            for (let i = 0; i < (TINY_PERF.mobile ? 30 : TINY_PERF.lite ? 58 : 78); i++) {
                const star = document.createElement('span');
                star.className = 'tiny-star';
                star.style.left = (Math.random() * 100) + '%';
                star.style.top = (Math.random() * 75) + '%';
                star.style.setProperty('--size', (1 + Math.random() * 2) + 'px');
                star.style.setProperty('--twinkle', (1.4 + Math.random() * 3.2) + 's');
                star.style.setProperty('--delay', (-Math.random() * 5) + 's');
                sky.appendChild(star);
            }
            const lower = document.getElementById('lower-stars');
            for (let i = 0; i < (TINY_PERF.mobile ? 12 : 28); i++) {
                const star = document.createElement('span');
                star.className = 'lower-star';
                star.style.left = (Math.random() * 100) + '%';
                star.style.top = (76 + Math.random() * 20) + '%';
                star.style.setProperty('--size', (1 + Math.random() * 2.4) + 'px');
                star.style.setProperty('--twinkle', (1.5 + Math.random() * 3) + 's');
                star.style.setProperty('--delay', (-Math.random() * 5) + 's');
                lower.appendChild(star);
            }
            // Không tạo sao từ lớp vũ trụ cũ nữa: từ lời chúc sức khỏe đã thay bằng
            // Uiverse #stars, #stars2, #stars3, tránh tốn thêm 90–170 animation.

            // Sao băng thay vị trí và góc lao sau MỖI lượt, không chỉ ngẫu nhiên lúc tải trang.
            const meteors = [];
            function quyDaoSao(meteor) {
                const w = window.innerWidth, h = window.innerHeight;
                const dx = w * Number(meteor.dataset.flyX), dy = h * Number(meteor.dataset.flyY);
                const goc = Math.atan2(-dy, dx) * 180 / Math.PI;
                meteor.style.setProperty('--meteor-angle', goc.toFixed(1) + 'deg');
                for (const t of [8, 20, 36, 53, 100]) {
                    meteor.style.setProperty('--meteor-x' + String(t).padStart(2, '0'), (-dx * t / 100).toFixed(1) + 'px');
                    meteor.style.setProperty('--meteor-y' + String(t).padStart(2, '0'), (dy * t / 100).toFixed(1) + 'px');
                }
            }
            function datSaoNgauNhien(meteor) {
                // Phân bố cả nửa trên và vùng giữa trời, chừa lề tránh cắt đầu sao.
                const x = 23 + Math.random() * 63;   // 23%-86% chiều rộng màn hình
                const y = 7 + Math.random() * 46;    // 7%-53% chiều cao màn hình
                meteor.style.left = x.toFixed(2) + '%';
                meteor.style.top = y.toFixed(2) + '%';
                meteor.dataset.flyX = String(Math.min(.14 + Math.random() * .13, x / 100 - .07));
                meteor.dataset.flyY = String(.10 + Math.random() * .12);
                quyDaoSao(meteor);
            }
            for (let i = 0; i < 4; i++) {
                const meteor = document.createElement('span');
                meteor.className = 'tiny-meteor';
                meteor.style.setProperty('--period', (6.1 + Math.random() * 1.4) + 's');
                meteor.style.setProperty('--meteor-delay', (-i * 1.65) + 's');
                datSaoNgauNhien(meteor);
                // Chuyển vị trí ở ranh giới hai vòng khi sao đang vô hình, tránh nhảy hình.
                meteor.addEventListener('animationiteration', () => datSaoNgauNhien(meteor));
                sky.appendChild(meteor);
                meteors.push(meteor);
            }
            let resizeSao;
            window.addEventListener('resize', () => {
                clearTimeout(resizeSao);
                resizeSao = setTimeout(() => meteors.forEach(quyDaoSao), 200);
            });

        })();
