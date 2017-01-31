export function openModal(component, title) {
  const event = new CustomEvent('open-modal', { detail: {
    component,
    title,
  } });

  document.dispatchEvent(event);
}

export function closeModal() {
  const event = new CustomEvent('close-modal');

  document.dispatchEvent(event);
}
