import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("Dashboard controller connected")
  }

  confirmSkip(event) {
    if (!confirm("Êtes-vous sûr de vouloir passer cette étape ? Vous pourrez ajouter des membres plus tard.")) {
      event.preventDefault()
    }
  }

  validateFinish(event) {
    const memberCount = parseInt(this.element.dataset.memberCount || "0")
    if (memberCount === 0) {
      event.preventDefault()
      alert("Veuillez ajouter au moins un membre ou passer cette étape")
    }
  }
}
