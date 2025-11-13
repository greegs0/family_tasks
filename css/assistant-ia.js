// Assistant IA page functionality
document.addEventListener('DOMContentLoaded', function() {
  const goToDashboardBtn = document.getElementById('go-to-dashboard-btn');

  if (goToDashboardBtn) {
    goToDashboardBtn.addEventListener('click', function() {
      window.location.href = 'dashboard.html';
    });
  }
});
