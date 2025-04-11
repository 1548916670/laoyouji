// 添加测验功能
document.addEventListener('DOMContentLoaded', function() {
    const quizSubmit = document.querySelector('.quiz-submit');
    if (quizSubmit) {
        quizSubmit.addEventListener('click', function() {
            // 问题1的答案是A (Muriel)
            const q1Correct = document.getElementById('q1a').checked;
            
            // 问题2的答案是C (猴子)
            const q2Correct = document.getElementById('q2c').checked;
            
            let score = 0;
            if (q1Correct) score++;
            if (q2Correct) score++;
            
            alert(`你答对了 ${score} 道题，总共 2 道题！`);
        });
    }
});

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 剧集页面季数切换
    const seasonBtns = document.querySelectorAll('.season-btn');
    if (seasonBtns.length > 0) {
        seasonBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                seasonBtns.forEach(b => b.classList.remove('active'));
                // 给当前按钮添加active类
                this.classList.add('active');
                
                // 隐藏所有季的内容
                const seasonContainers = document.querySelectorAll('.season-container');
                seasonContainers.forEach(container => {
                    container.classList.remove('active-season');
                });
                
                // 显示选中季的内容
                const seasonNumber = this.getAttribute('data-season');
                const targetSeason = document.getElementById('season' + seasonNumber);
                if (targetSeason) {
                    targetSeason.classList.add('active-season');
                }
            });
        });
        
        // 默认选中第一季
        seasonBtns[0].click();
    }

    // 台词页面角色筛选
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                filterBtns.forEach(b => b.classList.remove('active'));
                // 给当前按钮添加active类
                this.classList.add('active');
                
                const character = this.getAttribute('data-character');
                const quoteCards = document.querySelectorAll('.quote-card');
                
                quoteCards.forEach(card => {
                    if (character === 'all' || card.getAttribute('data-character') === character) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 图库页面分类筛选
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                // 给当前按钮添加active类
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const galleryItems = document.querySelectorAll('.gallery-item');
                
                galleryItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 图库灯箱效果
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxContainer = document.querySelector('.lightbox-container');
    
    if (galleryItems.length > 0 && lightboxContainer) {
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const closeLightbox = document.querySelector('.close-lightbox');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
        
        // 打开灯箱
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const visible = visibleItems();
                currentIndex = visible.indexOf(this);
                
                const img = this.querySelector('img');
                const caption = this.querySelector('.gallery-caption').innerHTML;
                
                lightboxImage.src = img.src;
                lightboxCaption.innerHTML = caption;
                lightboxContainer.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            });
        });
        
        // 关闭灯箱
        closeLightbox.addEventListener('click', function() {
            lightboxContainer.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        });
        
        // 上一张图片
        prevBtn.addEventListener('click', function() {
            const visible = visibleItems();
            currentIndex = (currentIndex - 1 + visible.length) % visible.length;
            
            const item = visible[currentIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption').innerHTML;
            
            lightboxImage.src = img.src;
            lightboxCaption.innerHTML = caption;
        });
        
        // 下一张图片
        nextBtn.addEventListener('click', function() {
            const visible = visibleItems();
            currentIndex = (currentIndex + 1) % visible.length;
            
            const item = visible[currentIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption').innerHTML;
            
            lightboxImage.src = img.src;
            lightboxCaption.innerHTML = caption;
        });
        
        // 点击灯箱外部关闭
        lightboxContainer.addEventListener('click', function(e) {
            if (e.target === lightboxContainer) {
                lightboxContainer.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // 键盘控制
        document.addEventListener('keydown', function(e) {
            if (lightboxContainer.style.display === 'flex') {
                if (e.key === 'Escape') {
                    lightboxContainer.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            }
        });
    }
});

// 滚动时导航栏高亮
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// 添加导航栏活跃状态样式
document.head.insertAdjacentHTML('beforeend', `
    <style>
        nav ul li a.active {
            color: #f04a4a;
            border-bottom: 2px solid #f04a4a;
        }
    </style>
`);

// 幻灯片脚本
let slideIndex = 1;
showSlides(slideIndex);

// 自动播放
let slideInterval = setInterval(function() {
    plusSlides(1);
}, 5000); // 每5秒切换一次

// 前后导航
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// 当前幻灯片
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // 循环播放
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // 隐藏所有幻灯片
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // 移除所有点的active类
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // 显示当前幻灯片和激活当前点
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    
    // 当用户交互时重置自动播放计时器
    clearInterval(slideInterval);
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000);
}

// 当鼠标悬停在幻灯片上时暂停自动播放
document.querySelector('.slideshow-container').addEventListener('mouseenter', function() {
    clearInterval(slideInterval);
});

// 当鼠标离开幻灯片时恢复自动播放
document.querySelector('.slideshow-container').addEventListener('mouseleave', function() {
    clearInterval(slideInterval);
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000);
});