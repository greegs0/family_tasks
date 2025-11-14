// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const createFamilyForm = document.getElementById('create-family-form');

  if (createFamilyForm) {
    createFamilyForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const familyName = document.getElementById('family-name').value;
      const familyEmail = document.getElementById('family-email').value;
      const postalCode = document.getElementById('postal-code').value;

      // Validate form
      if (!familyName || !familyEmail || !postalCode) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      // Validate postal code format (5 digits)
      if (!/^\d{5}$/.test(postalCode)) {
        alert('Le code postal doit contenir 5 chiffres');
        return;
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(familyEmail)) {
        alert('Veuillez entrer une adresse email valide');
        return;
      }

      // Store family data in localStorage
      const familyData = {
        name: familyName,
        email: familyEmail,
        postalCode: postalCode,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('familyData', JSON.stringify(familyData));

      // Redirect to composition page
      window.location.href = 'composition-de-la.html';
    });
  }

  // Search functionality for family list
  const familySearch = document.getElementById('family-search');
  if (familySearch) {
    familySearch.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const familyItems = document.querySelectorAll('ul[aria-label="Liste des familles"] > li');

      familyItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});
