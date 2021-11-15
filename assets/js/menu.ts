const menuCollapse = (event) => {
  event.preventDefault();

  event.currentTarget.setAttribute(
    "aria-expanded",
    event.currentTarget.getAttribute("aria-expanded") === "true"
      ? "false"
      : "true"
  );

  const icons = event.currentTarget.getElementsByTagName("i");
  if (icons.item(0) !== null) {
    const icon = icons.item(0);
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-right");
  }

  const controls = event.currentTarget.getAttribute("aria-controls");
  document.getElementById(controls).classList.toggle("collapse");
};

for (const link of document.querySelectorAll('[data-toggle="collapse"]')) {
  link.addEventListener("click", menuCollapse);
}
