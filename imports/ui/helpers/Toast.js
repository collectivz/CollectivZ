export function Toast(content, color) {
  const event = new CustomEvent("new-toast", {
    detail: {
      content,
      color
    }
  });

  document.dispatchEvent(event);
}
