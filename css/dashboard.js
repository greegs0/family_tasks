// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  // Navigation buttons
  const backBtn = document.getElementById('back-btn');
  const navCalendarBtn = document.getElementById('nav-calendar-btn');
  const navFamilyBtn = document.getElementById('nav-family-btn');
  const navChatBtn = document.getElementById('nav-chat-btn');

  // Action buttons
  const calendarBtn = document.getElementById('calendar-btn');
  const vaccinesBtn = document.getElementById('vaccines-btn');
  const addMemberDashboardBtn = document.getElementById('add-member-dashboard-btn');
  const editFamilyBtn = document.getElementById('edit-family-btn');

  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }

  // Navigation - Calendar
  if (navCalendarBtn) {
    navCalendarBtn.addEventListener('click', function() {
      window.location.href = 'calendrier-de.html';
    });
  }

  // Navigation - Family
  if (navFamilyBtn) {
    navFamilyBtn.addEventListener('click', function() {
      window.location.href = 'composition-de-la.html';
    });
  }

  // Navigation - Chat (Assistant IA)
  if (navChatBtn) {
    navChatBtn.addEventListener('click', function() {
      window.location.href = 'assistant-IA.html';
    });
  }

  // Calendar quick action
  if (calendarBtn) {
    calendarBtn.addEventListener('click', function() {
      window.location.href = 'calendrier-de.html';
    });
  }

  // Vaccines quick action
  if (vaccinesBtn) {
    vaccinesBtn.addEventListener('click', function() {
      window.location.href = 'rappels-des-vaccins.html';
    });
  }

  // Add member button
  if (addMemberDashboardBtn) {
    addMemberDashboardBtn.addEventListener('click', function() {
      window.location.href = 'composition-de-la.html';
    });
  }

  // Edit family button
  if (editFamilyBtn) {
    editFamilyBtn.addEventListener('click', function() {
      window.location.href = 'composition-de-la.html';
    });
  }

  // Calendar navigation
  const calendarDates = document.querySelectorAll('button[class*="rounded-lg"]');
  calendarDates.forEach(btn => {
    if (btn.textContent.trim().match(/^\d+$/)) {
      btn.addEventListener('click', function() {
        // Remove previous selection
        calendarDates.forEach(b => {
          if (b.querySelector('div')) {
            const div = b.querySelector('div');
            if (div.classList.contains('text-white')) {
              div.classList.remove('text-white');
              div.classList.add('text-neutral-950');
              b.classList.remove('bg-[#030213]');
            }
          }
        });

        // Add selection to clicked date
        const dateDiv = this.querySelector('div');
        if (dateDiv && !dateDiv.classList.contains('text-[#717182]')) {
          dateDiv.classList.remove('text-neutral-950');
          dateDiv.classList.add('text-white');
          this.classList.add('bg-[#030213]');
        }
      });
    }
  });

  // AI Assistant suggestions
  const suggestions = document.querySelectorAll('div[class*="bg-white rounded-[10px] border border-solid border-[#e9d4ff]"]');
  suggestions.forEach(suggestion => {
    if (suggestion.querySelector('p') || suggestion.querySelector('div[class*="text-[#101727]"]')) {
      suggestion.style.cursor = 'pointer';
      suggestion.addEventListener('click', function() {
        const questionText = this.querySelector('p, div[class*="text-[#101727]"]')?.textContent;
        if (questionText) {
          const input = document.querySelector('div[class*="Posez votre question"]');
          if (input) {
            input.textContent = questionText;
            input.classList.remove('text-[#0a0a0a80]');
            input.classList.add('text-neutral-950');
          }
        }
      });

      suggestion.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f9f5ff';
      });

      suggestion.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'white';
      });
    }
  });

  // Send button for AI Assistant
  const sendBtn = document.querySelector('button[class*="linear-gradient(135deg,rgba(173,70,255,1)"]');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      const input = document.querySelector('div[class*="Posez votre question"]');
      if (input && input.textContent !== 'Posez votre question...') {
        alert('Fonctionnalité de chat IA à venir ! Question : ' + input.textContent);
        input.textContent = 'Posez votre question...';
        input.classList.add('text-[#0a0a0a80]');
        input.classList.remove('text-neutral-950');
      }
    });
  }

  // Load family data from localStorage
  const familyData = JSON.parse(localStorage.getItem('familyData'));
  let members = JSON.parse(localStorage.getItem('familyMembers')) || [];

  // Avatar colors
  const avatarColors = [
    'linear-gradient(135deg,rgba(81,162,255,1)_0%,rgba(21,93,252,1)_100%)',
    'linear-gradient(135deg,rgba(194,122,255,1)_0%,rgba(152,16,250,1)_100%)',
    'linear-gradient(135deg,rgba(5,223,114,1)_0%,rgba(0,166,62,1)_100%)',
    'linear-gradient(135deg,rgba(255,159,67,1)_0%,rgba(255,99,71,1)_100%)',
    'linear-gradient(135deg,rgba(255,107,129,1)_0%,rgba(255,48,79,1)_100%)'
  ];

  // Format date to DD/MM/YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Render members in dashboard
  function renderDashboardMembers() {
    const membersList = document.getElementById('dashboard-members-list');
    if (!membersList) return;

    if (members.length === 0) {
      membersList.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 w-full">
          <p class="[font-family:'Inter',Helvetica] font-normal text-[#697282] text-base text-center tracking-[-0.31px] leading-6">
            Aucun membre pour le moment
          </p>
        </div>
      `;
      return;
    }

    membersList.innerHTML = members.map((member, index) => {
      const initial = member.name.charAt(0).toUpperCase();
      const colorIndex = index % avatarColors.length;

      return `
        <div class="flex items-center justify-between px-5 py-5 relative self-stretch w-full bg-white rounded-[10px] border border-solid border-[#0000001a]">
          <div class="flex items-center gap-4 relative flex-1 min-w-0">
            <div
              class="flex w-14 h-14 flex-shrink-0 items-center justify-center rounded-full"
              style="background: ${avatarColors[colorIndex]}"
            >
              <div class="[font-family:'Inter',Helvetica] font-normal text-white text-xl tracking-[-0.45px] leading-7">
                ${initial}
              </div>
            </div>
            <div class="flex flex-col items-start gap-1 relative flex-1 min-w-0">
              <div class="[font-family:'Inter',Helvetica] font-normal text-neutral-950 text-base tracking-[-0.31px] leading-6 truncate w-full">
                ${member.name}
              </div>
              <p class="[font-family:'Inter',Helvetica] font-normal text-[#495565] text-sm tracking-[-0.15px] leading-5 truncate w-full">
                Né(e) le ${formatDate(member.birthdate)} • ${member.postalCode}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors"
              onclick="editDashboardMember(${index})"
              aria-label="Modifier ${member.name}"
              title="Modifier"
            >
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
              onclick="deleteDashboardMember(${index})"
              aria-label="Supprimer ${member.name}"
              title="Supprimer"
            >
              <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Edit member modal
  const editModal = document.getElementById('edit-member-modal-dashboard');
  const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const editMemberForm = document.getElementById('edit-member-form-dashboard');

  function closeEditModal() {
    if (editModal) {
      editModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
      editMemberForm.reset();
      delete editMemberForm.dataset.editingIndex;
    }
  }

  if (closeEditModalBtn) {
    closeEditModalBtn.addEventListener('click', closeEditModal);
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', closeEditModal);
  }

  if (editModal) {
    editModal.addEventListener('click', function(e) {
      if (e.target === editModal) {
        closeEditModal();
      }
    });
  }

  // Edit member function
  window.editDashboardMember = function(index) {
    const member = members[index];

    document.getElementById('edit-member-name').value = member.name;
    document.getElementById('edit-member-birthdate').value = member.birthdate;
    document.getElementById('edit-member-postal').value = member.postalCode;

    editMemberForm.dataset.editingIndex = index;

    editModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  // Delete member function
  window.deleteDashboardMember = function(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      members.splice(index, 1);
      localStorage.setItem('familyMembers', JSON.stringify(members));
      renderDashboardMembers();

      // Update member count
      const memberCountDiv = document.querySelector('div.text-2xl');
      if (memberCountDiv && memberCountDiv.textContent.match(/^\d+$/)) {
        memberCountDiv.textContent = members.length.toString();
      }
    }
  };

  // Edit member form submission
  if (editMemberForm) {
    editMemberForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('edit-member-name').value.trim();
      const birthdate = document.getElementById('edit-member-birthdate').value;
      const postalCode = document.getElementById('edit-member-postal').value.trim();

      // Validate postal code
      if (!/^\d{5}$/.test(postalCode)) {
        alert('Le code postal doit contenir 5 chiffres');
        return;
      }

      // Validate birthdate (not in future)
      const selectedDate = new Date(birthdate);
      const today = new Date();
      if (selectedDate > today) {
        alert('La date de naissance ne peut pas être dans le futur');
        return;
      }

      const index = parseInt(editMemberForm.dataset.editingIndex);

      members[index] = {
        ...members[index],
        name: name,
        birthdate: birthdate,
        postalCode: postalCode,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('familyMembers', JSON.stringify(members));
      renderDashboardMembers();
      closeEditModal();
    });
  }

  // Update dashboard with real data if available
  if (familyData) {
    // Update family name if element exists
    const familyNameElements = document.querySelectorAll('[class*="Famille Dupont"]');
    familyNameElements.forEach(el => {
      if (el.textContent.includes('Famille Dupont')) {
        el.textContent = el.textContent.replace('Famille Dupont', familyData.name);
      }
    });
  }

  if (members.length > 0) {
    // Update member count
    const memberCountElements = document.querySelectorAll('div');
    memberCountElements.forEach(el => {
      if (el.textContent === '3' && el.nextElementSibling?.textContent === 'Membres') {
        el.textContent = members.length.toString();
      }
    });
  }

  // Initial render of members
  renderDashboardMembers();
});
