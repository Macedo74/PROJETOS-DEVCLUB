document.addEventListener('DOMContentLoaded', () => {
    // Código do Menu Hamburguer (já existente)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) { // Verifica se os elementos existem
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- CÓDIGO DO LIGHTBOX ---
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let imagesArray = Array.from(galleryImages); // Converte NodeList para Array

    // Função para abrir o lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        const img = imagesArray[currentImageIndex];
        
        lightboxImg.src = img.getAttribute('data-src') || img.src; // Usa data-src ou src
        lightboxCaption.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : ''; // Pega a legenda
        
        lightbox.classList.add('active'); // Mostra o lightbox
        document.body.style.overflow = 'hidden'; // Evita rolagem da página por trás
    }

    // Função para fechar o lightbox
    function closeLightbox() {
        lightbox.classList.remove('active'); // Esconde o lightbox
        document.body.style.overflow = ''; // Restaura a rolagem da página
    }

    // Navegar para a imagem anterior
    function showPrevImage() {
        currentImageIndex = (currentImageIndex === 0) ? imagesArray.length - 1 : currentImageIndex - 1;
        openLightbox(currentImageIndex);
    }

    // Navegar para a próxima imagem
    function showNextImage() {
        currentImageIndex = (currentImageIndex === imagesArray.length - 1) ? 0 : currentImageIndex + 1;
        openLightbox(currentImageIndex);
    }

    // Adiciona evento de clique a cada imagem da galeria
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    // Eventos dos botões do lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Fechar com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active') && e.key === 'Escape') {
            closeLightbox();
        }
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // Fechar clicando fora da imagem (mas dentro do overlay)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});