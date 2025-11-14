import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container"]

  open(event) {
    event.preventDefault()
    this.containerTarget.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }

  close(event) {
    if (event) {
      event.preventDefault()
    }
    this.containerTarget.classList.add("hidden")
    document.body.style.overflow = "auto"
  }

  closeOnBackdrop(event) {
    if (event.target === this.containerTarget) {
      this.close(event)
    }
  }

  closeWithKeyboard(event) {
    if (event.key === "Escape") {
      this.close(event)
    }
  }
}
