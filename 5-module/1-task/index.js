function hideSelf() {
  const hideButton = document.querySelector('.hide-self-button');

  hideButton.addEventListener("click", (event) => event.target.setAttribute('hidden', true));
}
