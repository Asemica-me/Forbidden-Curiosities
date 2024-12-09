document.addEventListener('DOMContentLoaded', function() {
    // Ottieni l'URL corrente
    const currentUrl = window.location.href;

    // Seleziona tutti i link con la classe nav-link
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Controlla se l'href del link corrisponde all'URL corrente
        if (link.href === currentUrl) {
            // Aggiungi la classe 'active' al link corrispondente
            link.classList.add('perm');
        }
    });
});
