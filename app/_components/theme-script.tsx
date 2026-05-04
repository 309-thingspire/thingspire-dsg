// Inline script that runs before paint to set the theme attribute.
// Defaults to light unless the user has explicitly toggled to dark
// (we intentionally ignore prefers-color-scheme so the showcase always
// starts in light mode for first-time visitors). Prevents FOUC.
const THEME_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`.trim()

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
}
