// Calendar page functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToFamilyBtn = document.getElementById('back-to-family-btn');
  const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');

  if (backToFamilyBtn) {
    backToFamilyBtn.addEventListener('click', function() {
      window.location.href = 'dashboard.html';
    });
  }

  if (backToDashboardBtn) {
    backToDashboardBtn.addEventListener('click', function() {
      window.location.href = 'dashboard.html';
    });
  }
});
