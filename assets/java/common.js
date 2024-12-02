window.addEventListener('load', function () {
    // Timeout di sicurezza per rimuovere lo spinner dopo 10 secondi
    const timeout = setTimeout(function () {
        if (!document.readyState === 'complete') {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.classList.add('hidden');
        }
    }, 10000); // Timeout di 10 secondi

    // Rimuovi lo spinner quando la pagina è completamente caricata
    if (document.readyState === 'complete') {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
    }
    // Pulisci il timeout di sicurezza se il caricamento è veloce
    clearTimeout(timeout);

});