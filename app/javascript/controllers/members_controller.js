import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "form", "membersList", "emptyState", "memberCount"]

  connect() {
    console.log("Members controller connected")
    this.updateMemberCount()
  }

  openModal(event) {
    event.preventDefault()
    this.modalTarget.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }

  closeModal(event) {
    if (event) {
      event.preventDefault()
    }
    this.modalTarget.classList.add("hidden")
    document.body.style.overflow = "auto"
    if (this.hasFormTarget) {
      this.formTarget.reset()
    }
  }

  closeOnBackdrop(event) {
    if (event.target === this.modalTarget) {
      this.closeModal(event)
    }
  }

  updateMemberCount() {
    if (this.hasMemberCountTarget) {
      const count = this.membersListTarget.children.length
      const text = count === 0 ? "0 membre ajouté" :
                   count === 1 ? "1 membre ajouté" :
                   `${count} membres ajoutés`
      this.memberCountTarget.textContent = text
    }
  }

  deleteMember(event) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      event.preventDefault()
    }
  }
}
