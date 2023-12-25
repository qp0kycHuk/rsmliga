class Counter extends HTMLElement {
  min = 0
  max = 0
  value = 0

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <svg class="w-100 h-100">
        <use xlink:href="${this.getAttribute('href')}" />
      </svg>
    `
  }
}

function register() {
  customElements.define('c-icon', Counter)
}

export default { register }
