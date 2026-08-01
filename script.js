<<<<<<< HEAD
// Passo A: Selecionar o botão e o menu no HTML pelo id deles
const menuHamburguer = document.getElementById('menu-hamburguer');
const navMenuHamburguer = document.getElementById('nav-menu-hamburguer');

// Passo B: Ficar "ouvindo" quando o usuário clica no botão
menuHamburguer.addEventListener('click', () => {
    menuHamburguer.classList.toggle('ativo');
    navMenuHamburguer.classList.toggle('ativo');
    // Passo C: O método .toggle() adiciona a classe 'ativo' se ela não existir,
    // e remove a classe 'ativo' se ela já estiver lá!
});
=======
// Passo A: Selecionar o botão e o menu no HTML pelo id deles
const menuHamburguer = document.getElementById('menu-hamburguer');
const navMenuHamburguer = document.getElementById('nav-menu-hamburguer');

// Passo B: Ficar "ouvindo" quando o usuário clica no botão
menuHamburguer.addEventListener('click', () => {
    menuHamburguer.classList.toggle('ativo');
    navMenuHamburguer.classList.toggle('ativo');
    // Passo C: O método .toggle() adiciona a classe 'ativo' se ela não existir,
    // e remove a classe 'ativo' se ela já estiver lá!
});
>>>>>>> da0177c (estou adaptando o git/github com vs code para conseguir atualizar o repositorio diretamente da ide)
