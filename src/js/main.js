// Main logic for Banco de Dados II educational material

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Highlight.js if present
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  // Initialize Mermaid if present
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#000000',
        primaryBorderColor: '#000000',
        lineColor: '#000000',
        secondaryColor: '#f0f0f0',
        tertiaryColor: '#ffffff'
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  console.log('Banco de Dados II - Apostila Inicializada');
});
