export const projectPaths = {
  ugc: "/projects/ugc-camera",
  menutap: "/projects/menutap",
  foodspot: "/projects/foodspot-mobile",
  mac: "/projects/macos-app-suite",
  autobarber: "/projects/the-auto-barber",
  engineering: "/build-notes",
};

export function openNotes(event, onOpen) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onOpen();
}
