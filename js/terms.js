document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.terms-section[id]');
    const tocLinks = document.querySelectorAll('.terms-toc a[href^="#"]');
  
    if (!sections.length || !tocLinks.length) return;
  
    const setActive = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };
  
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
  
      sections.forEach((section) => observer.observe(section));
    }
  
    // Keep the highlighted link in sync if someone clicks a TOC entry directly.
    tocLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('href').slice(1);
        setActive(id);
      });
    });
  });