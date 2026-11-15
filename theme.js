/* theme.js — the dark/light switch. Loaded in the <head> of every page.
   The choice is remembered in the browser, so it carries across pages and visits. */

// Runs before the page is drawn, so a dark page never flashes white first.
var savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {
  // Storage can be blocked (private windows); the switch still works for this page view.
}
if (savedTheme === "dark") document.documentElement.classList.add("dark");

document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".theme-toggle");
  if (!button) return;

  function label() {
    var dark = document.documentElement.classList.contains("dark");
    button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  button.addEventListener("click", function () {
    var dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      // See above: nothing to remember it in.
    }
    label();
  });

  label();
});
