document.addEventListener("DOMContentLoaded", () => {
    // Quando la pagina è completamente caricata, rimuovi lo spinner e mostra il contenuto
    document.body.classList.add('loaded');
    
    const content = document.querySelector('.content');
    if (content) {
        content.style.display = 'block'; // Mostra il contenuto
    }
});