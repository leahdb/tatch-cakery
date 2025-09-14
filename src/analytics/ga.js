export const GA_ID = "G-TV3ENJYWHJ";

export function sendPageview(path) {
  if (!window.gtag || !GA_ID) return;
  window.gtag("config", GA_ID, { page_path: path });
}

export function sendEvent(name, params = {}) {
  if (!window.gtag) return;
  window.gtag("event", name, params);
}
