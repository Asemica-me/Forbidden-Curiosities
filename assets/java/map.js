function createSubButtons(container, items) {
    items.forEach((item) => {
        // Create a new div for the button
        const newDiv = document.createElement('div');
        newDiv.className = "sub-nar-but-container";
        
        // Create the button inside the div
        const newButton = document.createElement('button');
        newButton.className = "sub-nar-but";
        newButton.textContent = item;
        newButton.onclick = () => {
            changeList(newButton);
            activateSubNarButton(newButton);
        };



        // Append the button to the div
        newDiv.appendChild(newButton);

        // Append the div to the container
        container.appendChild(newDiv);

        // Animate the button appearance
        setTimeout(() => {
            newDiv.style.transform = "translateY(0)";
        }, 10);
    });

}

function subNar(narButton) {
    const buttonText = narButton.innerText;

    const targetContainer = document.getElementById('sub-nar');
    targetContainer.innerHTML = ""; // Clear the container

    const periods = ["XV-XVII", "XVIII-XIX", "1th half XX", "2nd half XX", "XXI"];
    const tipologies = ["Texts", "Tools", "Weapons", "Garments", "Events", "Works Of Art"];
    const themes = ["Ethics Of War", "Scientific Revolution", "Women's History", "Religious Dissent", "Provocative Art", "Digital Privacy"];

    // Determine which buttons to create based on the clicked button
    if (buttonText === "Period") {
        createSubButtons(targetContainer, periods, changeList);
    } else if (buttonText === "Themes") {
        createSubButtons(targetContainer, themes, changeList);
    } else if (buttonText === "Tipology") {
        createSubButtons(targetContainer, tipologies, changeList);
    }
};

function changeList(subNarButton) {
    const subButtonText = subNarButton.innerText; // Get the button's text
    const listDiv = document.getElementById('list'); // Target container
    const mapImage = document.getElementById('map');

    // Define all object arrays
    const ALLObj = ["Arquebus (1)",'Vitruvian Man (2)', 'Martin Luther’s 95 Theses (facsimile) (3)', 'Galileo’s Telescope Replica (4)','Reign of Terror Guillotine Blade (5)', '"The Origin of Species” by Charles Darwin (6)','Victorian-Era Corset (7)', 'Courbet\'s L\'Origine du Monde (8)','Sheet of the measurements taken by Marie Curie (9)', 'Suffragette Hunger Strike Medal (10)', 'Enigma Machine Model D A1214 (11)', 'Replica of the Atomic Bomb “Little Boy” (12)','First Issue of “Playboy” Magazine (13)', 'Mini skirt by Mary Quant (14)', 'NASA Moon Landing Photo (15)', '“Shoot” by Chris Burden (16)','Dolly the Sheep (Cloning) (17)', 'For the Love of God” by Damien Hirst (18)', 'Edward Snowden’s Revelations (facsimile) (19)', 'AI Image of Pope Francis (20)'];
    const XVXVIIObj = ['Vitruvian man (2)', 'Arquebus (1)', 'Martin Luther’s 95 Theses (facsimile) (3)', 'Galileo’s Telescope Replica (4)'];
    const XVIIXIXObj = ['Victorian-Era Corset (7)', 'Reign of Terror Guillotine Blade (5)', 'The Origin of Species” by Charles Darwin (6)', 'Courbet\'s L\'Origine du Monde (8)'];
    const fXXObj = ['Sheet of the measurements taken by Marie Curie (9)', 'Suffragette Hunger Strike Medal (10)', 'Enigma Machine Model D A1214 (11)', 'Replica of the Atomic Bomb “Little Boy” (12)'];
    const sXXObj = ['First Issue of “Playboy” Magazine (13)', 'Mini skirt by Mary Quant (14)', 'NASA Moon Landing Photo (15)', '“Shoot” by Chris Burden (16)','Dolly the Sheep (Cloning) (17)'];
    const XXIObj = ['For the Love of God” by Damien Hirst (18)', 'Edward Snowden’s Revelations (facsimile) (19)', 'AI Image of Pope Francis (20)'];
    const TextsObj = ['Martin Luther’s 95 Theses (facsimile) (3)', 'The Origin of Species” by Charles Darwin (6)', 'Sheet of the measurements taken by Marie Curie (9)', 'First Issue of “Playboy” Magazine (13)'];
    const ToolsObj = ['Galileo’s Telescope Replica (4)', 'Enigma Machine Model D A1214 (11)'];
    const WeaponsObj = ['Arquebus (1)', 'Reign of Terror Guillotine Blade (5)', 'Replica of the Atomic Bomb “Little Boy” (12)'];
    const GarmentsObj = ['Victorian-Era Corset (7)', 'Mini skirt by Mary Quant (14)'];
    const EventsObj = ['Sheet of the measurements taken by Marie Curie (9)', 'Suffragette Hunger Strike Medal (10)', 'NASA Moon Landing Photo (15)', 'Dolly the Sheep (Cloning) (17)'];
    const ArtObj = ['For the Love of God” by Damien Hirst (18)', 'Courbet\'s L\'Origine du Monde (8)', '“Shoot” by Chris Burden (16)', 'AI Image of Pope Francis (20)','Vitruvian man (2)'];
    const EthicsObj = ['Enigma Machine Model D A1214 (11)', 'Replica of the Atomic Bomb “Little Boy” (12)', 'Arquebus (1)', 'Reign of Terror Guillotine Blade (5)'];
    const ScientificObj = ['Galileo’s Telescope Replica (4)', 'The Origin of Species” by Charles Darwin (6)', 'Dolly the Sheep (Cloning) (17)', 'NASA Moon Landing Photo (15)', 'Sheet of the measurements taken by Marie Curie (9)'];
    const WomenObj = ['Victorian-Era Corset (7)', 'First Issue of “Playboy” Magazine (13)', 'Sheet of the measurements taken by Marie Curie (9)', 'Mini skirt by Mary Quant (14)'];
    const ReligiousObj = ['Galileo’s Telescope Replica (4)', 'The Origin of Species” by Charles Darwin (6)', 'Martin Luther’s 95 Theses (facsimile) (3)', 'AI Image of Pope Francis (20)','Vitruvian man (2)'];
    const ProvocativeObj = ['For the Love of God” by Damien Hirst (18)', 'Courbet\'s L\'Origine du Monde (8)', '“Shoot” by Chris Burden (16)'];
    const DigitalObj = ['AI Image of Pope Francis (20)', 'Edward Snowden’s Revelations (facsimile) (19)', 'Enigma Machine Model D A1214 (11)'];


    const itemDict = {
        "Arquebus (1)": 1,
        "Vitruvian man (2)": 2,
        "Martin Luther’s 95 Theses (facsimile) (3)": 3,
        "Galileo’s Telescope Replica (4)": 4,
        "Reign of Terror Guillotine Blade (5)": 5,
        '"The Origin of Species” by Charles Darwin (6)': 6,
        "Victorian-Era Corset (7)": 7,
        "Courbet's L'Origine du Monde (8)": 8,
        "Sheet of the measurements taken by Marie Curie (9)": 9,
        "Suffragette Hunger Strike Medal (10)": 10,
        "Enigma Machine Model D A1214 (11)": 11,
        "Replica of the Atomic Bomb “Little Boy” (12)": 12,
        "First Issue of “Playboy” Magazine (13)": 13,
        "Mini skirt by Mary Quant (14)": 14,
        "NASA Moon Landing Photo (15)": 15,
        "“Shoot” by Chris Burden (16)": 16,
        "Dolly the Sheep (Cloning) (17)": 17,
        "For the Love of God” by Damien Hirst (18)": 18,
        "Edward Snowden’s Revelations (facsimile) (19)": 19,
        "AI Image of Pope Francis (20)": 20
    };

    let value = "";
    let nar = "";
      

    // Helper function to render the list
    function renderList(items) {
        

        listDiv.innerHTML = '';

        // Create and populate an ordered list
        const ul = document.createElement('ul');
        ul.className = 'itemList';

        items.forEach(item => {
            const li = document.createElement('li');
            
            li.textContent = item;
            li.dataset.item = itemDict[item] ;            
            li.dataset.value = value; //subnarrative
            li.dataset.nar = nar ;
            li.setAttribute("onclick", "goItem(this)");
            

            ul.appendChild(li);
        });

        // Append the ordered list to the container
        listDiv.appendChild(ul);
    }

    function changeMapImage(narrative) {
        mapImage.src = `assets/img/maps/${narrative}.png`; 
        mapImage.alt = `${narrative} Map`; 
    }

    // Match the button text and render the corresponding list
    if (subButtonText === 'ALL') {
        renderList(ALLObj);
        changeMapImage("ALL");
    } else if (subButtonText === 'XV-XVII') {
        value = 'XV-XVII Century';
        nar = "Historical Period";
        renderList(XVXVIIObj);
        changeMapImage("XV-XVII");
    } else if (subButtonText === 'XVIII-XIX') {
        value = "XVIII-XIX Century";
        nar = "Historical Period";
        renderList(XVIIXIXObj);
        changeMapImage("XVIII-XIX");
    } else if (subButtonText === '1th half XX') {
        value = "First half of XX Century";
        nar = "Historical Period";
        renderList(fXXObj);
        changeMapImage("1th-half-XX");
    } else if (subButtonText === '2nd half XX') {
        value = "Second half of XX Century";
        nar = "Historical Period";
        renderList(sXXObj);
        changeMapImage("2nd-half-XX");
    } else if (subButtonText === 'XXI') {
        value = "XXI Century";
        nar = "Historical Period";
        renderList(XXIObj);
        changeMapImage("XXI");
    } else if (subButtonText === 'Texts') {
        value = "Text";
        nar = "Typology";
        renderList(TextsObj);
        changeMapImage("Texts");
    } else if (subButtonText === 'Tools') {
        value = "Tools";
        nar = "Typology";
        renderList(ToolsObj);
        changeMapImage("Tools");
    } else if (subButtonText === 'Weapons') {
        value = "Weapon";
        nar = "Typology";
        renderList(WeaponsObj);
        changeMapImage("Weapons");
    } else if (subButtonText === 'Garments') {
        value = "Garment";
        nar = "Typology";
        renderList(GarmentsObj);
        changeMapImage("Garments");
    } else if (subButtonText === 'Events') {
        value = "Event";
        nar = "Typology";
        renderList(EventsObj);
        changeMapImage("Events");
    } else if (subButtonText === 'Works Of Art') {
        value = "Artwork";
        nar = "Typology";
        renderList(ArtObj);
        changeMapImage("Artwork");
    } else if (subButtonText === 'Ethics Of War') {
        value = "Ethics of war";
        nar = "Themes";
        renderList(EthicsObj);
        changeMapImage("Ethics");
    } else if (subButtonText === 'Scientific Revolution') {
        value = "Scientific revolution";
        nar = "Themes";
        renderList(ScientificObj);
        changeMapImage("Scientific");
    } else if (subButtonText === 'Women\'s History') {
        value = "Women's history";
        nar = "Themes";
        renderList(WomenObj);
        changeMapImage("Women");
    } else if (subButtonText === 'Religious Dissent') {
        value = "Religious dissent";
        nar = "Themes";
        renderList(ReligiousObj);
        changeMapImage("Religious");
    } else if (subButtonText === 'Provocative Art') {
        value = "Provocative art";
        nar = "Themes";
        renderList(ProvocativeObj);
        changeMapImage("Provocative");
    } else if (subButtonText === 'Digital Privacy') {
        value = "Digital privacy";
        nar = "Themes";
        renderList(DigitalObj);
        changeMapImage("Digital");
    }
}

function activateNarButton(button) {
    // Remove "active" class from all buttons
    const buttons = document.querySelectorAll('.nar-but');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add "active" class to the clicked button
    button.classList.add('active');
};

function activateSubNarButton(button) {
    // Remove "active" class from all buttons
    const buttons = document.querySelectorAll('.sub-nar-but');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add "active" class to the clicked button
    button.classList.add('active');
};

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
