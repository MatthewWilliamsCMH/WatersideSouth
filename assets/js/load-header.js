fetch('header.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('header-placeholder').innerHTML = data;

    // NOW the header exists in the DOM
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
      });

      navItems.forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
        });
      });
    }
  });
