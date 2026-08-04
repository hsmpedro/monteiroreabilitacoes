// Passo A: Selecionar o botão e o menu no HTML pelo id deles
const menuHamburguer = document.getElementById('menu-hamburguer');
const navMenuHamburguer = document.getElementById('nav-menu-hamburguer');

// Passo B: Ficar "ouvindo" quando o usuário clica no botão
if (menuHamburguer && navMenuHamburguer) {
    menuHamburguer.addEventListener('click', () => {
        menuHamburguer.classList.toggle('ativo');
        navMenuHamburguer.classList.toggle('ativo');
        // Passo C: O método .toggle() adiciona a classe 'ativo' se ela não existir,
        // e remove a classe 'ativo' se ela já estiver lá!
        const aberto = menuHamburguer.classList.contains('ativo');
        menuHamburguer.setAttribute('aria-expanded', String(aberto));
        menuHamburguer.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu ao clicar em qualquer link dentro dele
    navMenuHamburguer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menuHamburguer.classList.remove('ativo');
            navMenuHamburguer.classList.remove('ativo');
            menuHamburguer.setAttribute('aria-expanded', 'false');
        });
    });
}

// Marca as fotos que ainda não foram enviadas para exibir um espaço reservado bonito
document.querySelectorAll('.unidades-img img').forEach((img) => {
    const marcar = () => img.classList.add('sem-imagem');
    if (img.complete && img.naturalWidth === 0) marcar();
    img.addEventListener('error', marcar);
});

// Lightbox: clicar na foto abre ela ampliada
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

if (lightbox && lightboxImg) {
    const fechar = () => {
        lightbox.classList.remove('ativo');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.unidades-img img').forEach((img) => {
        img.addEventListener('click', () => {
            if (img.classList.contains('sem-imagem')) return;
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || '';
            lightbox.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', (evento) => {
        if (evento.target !== lightboxImg) fechar();
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') fechar();
    });
}

// Animação suave de entrada das seções ao rolar a página
const alvos = document.querySelectorAll('.revelar');

if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });

    alvos.forEach((alvo) => observador.observe(alvo));
} else {
    alvos.forEach((alvo) => alvo.classList.add('visivel'));
}
