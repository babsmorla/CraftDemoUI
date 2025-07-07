import artisans from "./artisans";

export const initLocalStorageData = () => {
  if (!localStorage.getItem('craftconnect_requests')) {
    localStorage.setItem('craftconnect_requests', JSON.stringify([]));
  }

  if (!localStorage.getItem('craftconnect_messages')) {
    localStorage.setItem('craftconnect_messages', JSON.stringify([]));
  }

  if (!localStorage.getItem('craftconnect_artisans')) {
    localStorage.setItem('craftconnect_artisans', JSON.stringify(artisans));
    console.log(`[CraftConnect] Artisan data seeded at ${new Date().toLocaleString()}`);
  }
};