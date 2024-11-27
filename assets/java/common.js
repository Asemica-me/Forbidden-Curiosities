/* Spinner pagine */
window.onload = function() {
	// Rimuovi lo spinner e mostra il contenuto
	document.body.classList.add('loaded');
	document.querySelector('.content').style.display = 'block'; // Mostra il contenuto
}; 

// Funzione che nasconde lo spinner e mostra il contenuto dopo un ritardo fittizio
/* window.onload = function() {
    setTimeout(function() {
        // Rimuovi lo spinner e mostra il contenuto
        document.body.classList.add('loaded');
        document.querySelector('.content').style.display = 'block'; // Mostra il contenuto
    }, 5000); // 3 secondi di ritardo
};*/

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
});
