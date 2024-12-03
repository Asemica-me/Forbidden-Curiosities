function showList() {
    const listContainer = document.getElementById('list');
    const icon = document.getElementById('icon');

    // Toggle visibility and icon rotation
    if (listContainer.style.display === 'none' || listContainer.style.display === '') {
        listContainer.style.display = 'block'; // Show the container
        icon.style.transform = 'rotate(180deg)'; // Flip the icon
    } else {
        listContainer.style.display = 'none'; // Hide the container
        icon.style.transform = 'rotate(0deg)'; // Reset icon orientation
    }
};


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

    const periods = ["XV-XVII", "XVII-XIX", "1th half XX", "2nd half XX", "XXI"];
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

    // Define all object arrays
    const ALLObj = ['Vitruvian man (1) ', 'Arquebus (2)', 'Martin Luther’s 95 Theses (facsimile) (3)', 'Galileo’s Telescope Replica (4)','Victorian-Era Corset (5)', 'Reign of Terror Guillotine Blade (6)', 'The Origin of Species” by Charles Darwin (7)', 'Courbet\'s L\'Origine du Monde (8)','Sheet of the measurements taken by Marie Curie (9)', 'Suffragette Hunger Strike Medal (10)', 'Enigma Machine Model D A1214 (11)', 'Replica of the Atomic Bomb “Little Boy” (12)','First Issue of “Playboy” Magazine (13)', 'Mini skirt by Mary Quant (14)', 'NASA Moon Landing Photo (15)', '“Shoot” by Chris Burden (16)','Dolly the Sheep (Cloning) (17)', 'For the Love of God” by Damien Hirst (18)', 'Edward Snowden’s Revelations (facsimile) (19)', 'AI Image of Pope Francis (20)'];
    const XVXVIIObj = ['Vitruvian man (1)', 'Arquebus (2)', 'Martin Luther’s 95 Theses (facsimile) (3)', 'Galileo’s Telescope Replica (4)'];
    const XVIIXIXObj = ['Victorian-Era Corset (5)', 'Reign of Terror Guillotine Blade (6)', 'The Origin of Species” by Charles Darwin (7)', 'Courbet\'s L\'Origine du Monde (8)'];
    const fXXObj = ['Sheet of the measurements taken by Marie Curie (9)', 'Suffragette Hunger Strike Medal (10)', 'Enigma Machine Model D A1214 (11)', 'Replica of the Atomic Bomb “Little Boy” (12)'];
    const sXXObj = ['First Issue of “Playboy” Magazine (13)', 'Mini skirt by Mary Quant (14)', 'NASA Moon Landing Photo (15)', '“Shoot” by Chris Burden (16)','Dolly the Sheep (Cloning) (17)'];
    const XXIObj = ['For the Love of God” by Damien Hirst (18)', 'Edward Snowden’s Revelations (facsimile) (19)', 'AI Image of Pope Francis (20)'];
    const TextsObj = ['Martin Luther’s 95 Theses (facsimile) (3)', 'The Origin of Species” by Charles Darwin (7)', 'Sheet of the measurements taken by Marie Curie (9)', 'First Issue of “Playboy” Magazine (13)'];
    const ToolsObj = ['Galileo’s Telescope Replica (4)', 'Enigma Machine Model D A1214 (11)'];
    const WeaponsObj = ['Arquebus (2)', 'Reign of Terror Guillotine Blade (6)', 'Replica of the Atomic Bomb “Little Boy” (12)'];
    const GarmentsObj = ['Victorian-Era Corset (5)', 'Mini skirt by Mary Quant (14)'];
    const EventsObj = ['Sheet of the measurements taken by Marie Curie (9)', 'Suffragette Hunger Strike Medal (10)', 'NASA Moon Landing Photo (15)', 'Dolly the Sheep (Cloning) (17)'];
    const ArtObj = ['Art Item 1', 'Art Item 2', 'Art Item 3', 'Art Item 4'];
    const EthicsObj = ['Ethics Of War Item 1', 'Ethics Of War Item 2', 'Ethics Of War Item 3', 'Ethics Of War Item 4'];
    const ScientificObj = ['Scientific Revolution Item 1', 'Scientific Revolution Item 2', 'Scientific Revolution Item 3', 'Scientific Revolution Item 4'];
    const WomenObj = ['Women\'s History Item 1', 'Women\'s History Item 2', 'Women\'s History Item 3', 'Women\'s History Item 4'];
    const ReligiousObj = ['Religious Dissent Item 1', 'Religious Dissent Item 2', 'Religious Dissent Item 3', 'Religious Dissent Item 4'];
    const ProvocativeObj = ['Provocative Art Item 1', 'Provocative Art Item 2', 'Provocative Art Item 3', 'Provocative Art Item 4'];
    const DigitalObj = ['Digital Privacy Item 1', 'Digital Privacy Item 2', 'Digital Privacy Item 3', 'Digital Privacy Item 4'];

    // Helper function to render the list
    function renderList(items) {
        // Clear any existing content
        listDiv.innerHTML = '';

        // Create and populate an ordered list
        const ul = document.createElement('ul');
        ul.className = 'itemList';

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });

        // Append the ordered list to the container
        listDiv.appendChild(ul);
    }

    // Match the button text and render the corresponding list
    if (subButtonText === 'ALL') {
        renderList(ALLObj);
    } else if (subButtonText === 'XV-XVII') {
        renderList(XVXVIIObj);
    } else if (subButtonText === 'XVII-XIX') {
        renderList(XVIIXIXObj);
    } else if (subButtonText === '1th half XX') {
        renderList(fXXObj);
    } else if (subButtonText === '2nd half XX') {
        renderList(sXXObj);
    } else if (subButtonText === 'XXI') {
        renderList(XXIObj);
    } else if (subButtonText === 'Texts') {
        renderList(TextsObj);
    } else if (subButtonText === 'Tools') {
        renderList(ToolsObj);
    } else if (subButtonText === 'Weapons') {
        renderList(WeaponsObj);
    } else if (subButtonText === 'Garments') {
        renderList(GarmentsObj);
    } else if (subButtonText === 'Events') {
        renderList(EventsObj);
    } else if (subButtonText === 'Works Of Art') {
        renderList(ArtObj);
    } else if (subButtonText === 'Ethics Of War') {
        renderList(EthicsObj);
    } else if (subButtonText === 'Scientific Revolution') {
        renderList(ScientificObj);
    } else if (subButtonText === 'Women\'s History') {
        renderList(WomenObj);
    } else if (subButtonText === 'Religious Dissent') {
        renderList(ReligiousObj);
    } else if (subButtonText === 'Provocative Art') {
        renderList(ProvocativeObj);
    } else if (subButtonText === 'Digital Privacy') {
        renderList(DigitalObj);
    } 
};

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
