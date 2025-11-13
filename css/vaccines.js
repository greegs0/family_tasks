// Vaccines page functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToFamilyVaccinesBtn = document.getElementById('back-to-family-vaccines-btn');
  const backToDashboardVaccinesBtn = document.getElementById('back-to-dashboard-vaccines-btn');

  if (backToFamilyVaccinesBtn) {
    backToFamilyVaccinesBtn.addEventListener('click', function() {
      window.location.href = 'dashboard.html';
    });
  }

  if (backToDashboardVaccinesBtn) {
    backToDashboardVaccinesBtn.addEventListener('click', function() {
      window.location.href = 'dashboard.html';
    });
  }
});
