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

// Galeria: mostra poucas fotos e revela o restante na mesma tela
document.querySelectorAll('.unidades-img').forEach((galeria) => {
    const fotos = Array.from(galeria.querySelectorAll('img'));
    const limite = Number(galeria.dataset.visiveis || 4);

    fotos.forEach((img) => {
        const moldura = document.createElement('div');
        moldura.className = 'foto';
        img.parentNode.insertBefore(moldura, img);
        moldura.appendChild(img);
    });

    if (fotos.length <= limite) return;

    const molduras = Array.from(galeria.querySelectorAll('.foto'));
    const restantes = molduras.length - limite;
    molduras.slice(limite).forEach((m) => m.classList.add('oculta'));

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'galeria-mais';
    botao.innerHTML = '+' + restantes + '<small>ver mais fotos</small>';
    molduras[limite - 1].appendChild(botao);

    botao.addEventListener('click', () => {
        molduras.forEach((m) => m.classList.remove('oculta'));
        botao.remove();
    });
});

// Marca as fotos que ainda não foram enviadas para exibir um espaço reservado bonito
document.querySelectorAll('.unidades-img img').forEach((img) => {
    const marcar = () => {
        img.classList.add('sem-imagem');
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    };
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

/* PARA LEVAR O USUÁRIO ATÉ O LOCAL DA PÁGINA, DEPENDENDO DE QUAL BOTÃO ELE CLICAR
    POR EXEMPLO: QUNADO ELE CLICAR NO BOTÃO "SOBRE NÓS", ELE SERÁ DIRECIONADO PARA
    O LOCAL DA PÁGINA QUE TEM O SOBRE NÒS
Busca os botões (a[href^="#"]): Ele varre o seu HTML e seleciona todos os links/botões cujo endereço (href) começa com a hashtag # (por exemplo: href="#unidades", href="#sobre", href="#contato").

Busca o destino (document.querySelector(targetId)): No momento em que alguém clica em um desses botões, o código lê o valor do href e procura na página qual elemento possui exatamente aquele id correspondente (ex: <section id="unidades">).
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Se for apenas "#", ignora
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault(); // Impede o pulo seco padrão do navegador
            
            // 1. Pega a altura EXATA do cabeçalho no momento do clique
            const header = document.querySelector('.topo');
            const headerHeight = header ? header.offsetHeight : 0;
            
            // 2. Calcula a posição do elemento na página descartando o cabeçalho
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight;

            // 3. Rola suavemente até o ponto exato
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});