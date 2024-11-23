function showList() {
	const listContainer = document.getElementById('list-container');
	const icon = document.getElementById('icon');
  
	// Toggle display between 'none' and 'block'
	if (listContainer.style.display === 'none') {
	  listContainer.style.display = 'block';
	  icon.style.transform = 'rotate(180deg)'; // Rotate icon by 180°
	} else {
	  listContainer.style.display = 'none';
	  icon.style.transform = 'rotate(0deg)'; // Reset icon rotation
	}
  }