const accordion = document.querySelectorAll(".accordion-btn");

accordion.forEach(btn => {
    btn.addEventListener("click", function() {
        const content = this.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});

const fadeElements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
    fadeElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add('show');
        }
    });
});

// ===== Hero 背景自动轮播 =====
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentIndex = 0;
    const intervalTime = 4000;   // 每4秒切换一张（单位：毫秒）

    // 如果少于2张图片，不启动轮播
    if (slides.length < 2) return;

    function nextSlide() {
        // 移除当前图片的 active 类
        slides[currentIndex].classList.remove('active');
        
        // 计算下一张的索引
        currentIndex = (currentIndex + 1) % slides.length;
        
        // 给下一张图片添加 active 类
        slides[currentIndex].classList.add('active');
    }

    // 设置定时器，自动切换
    setInterval(nextSlide, intervalTime);
});