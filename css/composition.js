// Member management for composition page
document.addEventListener('DOMContentLoaded', function() {
  let members = JSON.parse(localStorage.getItem('familyMembers')) || [];

  const addMemberBtn = document.getElementById('add-member-btn');
  const modal = document.getElementById('add-member-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const addMemberForm = document.getElementById('add-member-form');
  const membersContainer = document.getElementById('members-container');
  const emptyState = document.getElementById('empty-state');
  const membersList = document.getElementById('members-list');
  const memberCount = document.getElementById('member-count');
  const skipBtn = document.getElementById('skip-btn');
  const finishBtn = document.getElementById('finish-btn');

  // Color gradients for member avatars
  const avatarColors = [
    'linear-gradient(135deg,rgba(81,162,255,1)_0%,rgba(21,93,252,1)_100%)',
    'linear-gradient(135deg,rgba(194,122,255,1)_0%,rgba(152,16,250,1)_100%)',
    'linear-gradient(135deg,rgba(5,223,114,1)_0%,rgba(0,166,62,1)_100%)',
    'linear-gradient(135deg,rgba(255,159,67,1)_0%,rgba(255,99,71,1)_100%)',
    'linear-gradient(135deg,rgba(255,107,129,1)_0%,rgba(255,48,79,1)_100%)'
  ];

  // Open modal
  addMemberBtn.addEventListener('click', function() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    addMemberForm.reset();

    // Reset form title and button
    const modalTitle = document.querySelector('#add-member-modal h2');
    modalTitle.textContent = 'Ajouter un membre';

    const submitBtn = document.querySelector('#add-member-form button[type="submit"]');
    submitBtn.textContent = 'Ajouter';

    // Remove editing index
    delete addMemberForm.dataset.editingIndex;
  }

  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close modal on outside click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Format date to DD/MM/YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Calculate age
  function calculateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  // Update member count
  function updateMemberCount() {
    const count = members.length;
    memberCount.textContent = count === 0 ? '0 membre ajouté' :
                              count === 1 ? '1 membre ajouté' :
                              `${count} membres ajoutés`;
  }

  // Render members
  function renderMembers() {
    if (members.length === 0) {
      emptyState.classList.remove('hidden');
      membersList.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      membersList.classList.remove('hidden');

      membersList.innerHTML = members.map((member, index) => {
        const initial = member.name.charAt(0).toUpperCase();
        const colorIndex = index % avatarColors.length;
        const age = calculateAge(member.birthdate);

        return `
          <div class="flex items-center justify-between p-5 bg-white rounded-[10px] border border-solid border-[#0000001a]">
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <div
                class="flex w-12 h-12 flex-shrink-0 items-center justify-center rounded-full"
                style="background: ${avatarColors[colorIndex]}"
              >
                <span class="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[-0.31px] leading-6">
                  ${initial}
                </span>
              </div>
              <div class="flex flex-col flex-1 min-w-0">
                <div class="[font-family:'Inter',Helvetica] font-normal text-neutral-950 text-base tracking-[-0.31px] leading-6 truncate">
                  ${member.name}
                </div>
                <p class="[font-family:'Inter',Helvetica] font-normal text-[#495565] text-sm tracking-[-0.15px] leading-5 truncate">
                  ${age} ans (né(e) le ${formatDate(member.birthdate)}) • ${member.postalCode}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors"
                onclick="editMember(${index})"
                aria-label="Modifier ${member.name}"
                title="Modifier"
              >
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                onclick="deleteMember(${index})"
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

    updateMemberCount();
  }

  // Edit member
  window.editMember = function(index) {
    const member = members[index];

    // Fill form with member data
    document.getElementById('member-name').value = member.name;
    document.getElementById('member-birthdate').value = member.birthdate;
    document.getElementById('member-postal').value = member.postalCode;

    // Change form title
    const modalTitle = document.querySelector('#add-member-modal h2');
    modalTitle.textContent = 'Modifier le membre';

    // Change submit button text
    const submitBtn = document.querySelector('#add-member-form button[type="submit"]');
    submitBtn.textContent = 'Modifier';

    // Store editing index
    addMemberForm.dataset.editingIndex = index;

    // Open modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  // Delete member
  window.deleteMember = function(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      members.splice(index, 1);
      localStorage.setItem('familyMembers', JSON.stringify(members));
      renderMembers();
    }
  };

  // Add/Edit member form submission
  addMemberForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('member-name').value.trim();
    const birthdate = document.getElementById('member-birthdate').value;
    const postalCode = document.getElementById('member-postal').value.trim();

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

    const memberData = {
      name: name,
      birthdate: birthdate,
      postalCode: postalCode
    };

    // Check if editing or adding
    if (addMemberForm.dataset.editingIndex !== undefined) {
      // Edit existing member
      const index = parseInt(addMemberForm.dataset.editingIndex);
      members[index] = {
        ...members[index],
        ...memberData,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Add new member
      memberData.addedAt = new Date().toISOString();
      members.push(memberData);
    }

    localStorage.setItem('familyMembers', JSON.stringify(members));

    renderMembers();
    closeModal();
  });

  // Skip button
  skipBtn.addEventListener('click', function() {
    if (confirm('Êtes-vous sûr de vouloir passer cette étape ? Vous pourrez ajouter des membres plus tard.')) {
      window.location.href = 'dashboard.html';
    }
  });

  // Finish button
  finishBtn.addEventListener('click', function() {
    if (members.length === 0) {
      alert('Veuillez ajouter au moins un membre ou passer cette étape');
      return;
    }

    window.location.href = 'assistant-IA.html';
  });

  // Initial render
  renderMembers();
});
