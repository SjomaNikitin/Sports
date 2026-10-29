function updateButtonGlow(event) {
  if (event.pointerType === "touch" || event.currentTarget.disabled) return;

  const button = event.currentTarget;
  const bounds = button.getBoundingClientRect();

  // Percentages keep the glow aligned when a button scales on hover.
  button.style.setProperty("--glow-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
  button.style.setProperty("--glow-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
}

export const buttonGlow = {
  onPointerEnter: updateButtonGlow,
  onPointerMove: updateButtonGlow,
};
