// Gallery & lightbox logic
(function(){
    const gallery = document.getElementById('gallery');
    const images = Array.from(gallery.querySelectorAll('img'));
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lb-image');
    const lbCaption = document.getElementById('lb-caption');
    const lbClose = document.getElementById('lb-close');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    let current = 0;

    function openLightbox(index){
        const img = images[index];
        if(!img) return;
        current = index;
        lbImage.src = img.src;
        lbImage.alt = img.alt || '';
        lbCaption.textContent = img.dataset.caption || '';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox(){
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden','true');
        lbImage.src = '';
        document.body.style.overflow = '';
    }

    function showNext(dir){
        current = (current + dir + images.length) % images.length;
        openLightbox(current);
    }

    images.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showNext(-1); });
    lbNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(1); });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if(!lightbox.classList.contains('active')) return;
        if(e.key === 'Escape') closeLightbox();
        if(e.key === 'ArrowRight') showNext(1);
        if(e.key === 'ArrowLeft') showNext(-1);
    });
})();
