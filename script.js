// ==================== NAVIGATION MOBILE MENU ==================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu on scroll
document.addEventListener('scroll', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
});

// ==================== ACTIVE NAV LINK ==================== 
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== GALLERY IMAGES ==================== 
// قائمة الصور في مجلد data/image/
const galleryImages = [
    { src: 'data/image/photo_2026-03-24_22-03-23.jpg', alt: 'ديكور جميل' },
    { src: 'data/image/photo_2026-03-24_22-03-27.jpg', alt: 'تنسيق الحفلات' },
    { src: 'data/image/photo_2026-03-24_22-05-31 (2).jpg', alt: 'ديكورات عصرية' },
    { src: 'data/image/photo_2026-03-24_22-05-31.jpg', alt: 'حفل مميز' },
    { src: 'data/image/photo_2026-03-24_22-05-32.jpg', alt: 'أناقة الديكور' },
    { src: 'data/image/photo_2026-03-24_22-05-33.jpg', alt: 'تصاميم راقية' },
    { src: 'data/image/photo_2026-03-24_22-05-34.jpg', alt: 'فن الديكور' },
    { src: 'data/image/photo_2026-03-24_22-05-35 (2).jpg', alt: 'حفلة لا تنسى' },
    { src: 'data/image/photo_2026-03-24_22-05-35.jpg', alt: 'ديكورات فخمة' },
];

// تحميل الصور في معرض الصور
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
            <div class="gallery-overlay">
                <div class="zoom-icon">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `;
        
        // فتح Lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(image.src, image.alt);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// ==================== LIGHTBOX ==================== 
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(imageSrc, imageAlt) {
    lightbox.classList.add('active');
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = imageAlt;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ==================== VIDEOS ==================== 
// قائمة الفيديوهات في مجلد data/video/
const videos = [
    { src: 'data/video/1767342326512.mp4', alt: 'فيديو الحفل الأول' },
    { src: 'data/video/966c5640-8b04-4d11-affe-1da6284d4852-watermark.mp4', alt: 'فيديو الحفل الثاني' },
];

// تحميل الفيديوهات
function loadVideos() {
    const videosGrid = document.getElementById('videosGrid');
    
    if (videos.length === 0) {
        videosGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">لا توجد فيديوهات حالياً</p>';
        return;
    }

    videos.forEach((video) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <video muted>
                <source src="${video.src}" type="video/mp4">
                متصفحك لا يدعم الفيديو
            </video>
            <div class="video-play-icon">
                <i class="fas fa-play"></i>
            </div>
        `;
        
        // تشغيل الفيديو
        videoItem.addEventListener('click', () => {
            const videoElement = videoItem.querySelector('video');
            if (videoElement.paused) {
                videoElement.play();
                videoItem.querySelector('.video-play-icon').style.opacity = '0';
            } else {
                videoElement.pause();
                videoItem.querySelector('.video-play-icon').style.opacity = '1';
            }
        });
        
        videosGrid.appendChild(videoItem);
    });
}

// ==================== CONTACT FORM ==================== 
// يتم التعامل مع النموذج تلقائياً عبر FormSubmit.co
// لا تحتاج إلى معالجة JavaScript إضافية

// ==================== SCROLL ANIMATIONS ==================== 
// إضافة تأثيرات عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .gallery-item, .video-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadVideos();
    
    // إضافة البريد الإلكتروني المزيف لأسباب التوضيح
    // يمكنك تعديل جميع الروابط والأرقام
    console.log('UMAR DECORATION Website loaded successfully!');
});

// ==================== LAZY LOADING ==================== 
// تأخير تحميل الصور للأداء الأفضل
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
