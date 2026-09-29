@tailwind base;
@tailwind components;
@tailwind utilities;

/* Reset Global e Controlo de Overflow Mobile */
html,
body {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden !important;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Previne imagens e media de causarem scroll horizontal */
img,
video,
iframe,
canvas,
svg {
  max-width: 100%;
  height: auto;
}

/* Ajustes Responsivos da Navegação e Layout */
@media (max-width: 768px) {
  /* Esconde os links desktop no mobile (ficam visíveis apenas no menu hambúrguer) */
  .nav-links {
    display: none !important;
  }

  .hidden-mobile {
    display: none !important;
  }

  main,
  section,
  header,
  footer {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: hidden;
  }
}

/* Mostra o botão hambúrguer apenas em ecrãs pequenos */
@media (min-width: 769px) {
  header button[aria-label="Toggle menu"] {
    display: none !important;
  }
}

html {
  scroll-behavior: smooth;
}