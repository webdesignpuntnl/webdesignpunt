const allImages = Array.from(document.querySelectorAll('.index__image'));

const config = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.classList.remove('hide');
    } else {
      entry.target.classList.add('hide');
      entry.target.classList.remove('show');
    }
  });
}, config);

allImages.forEach(image => {
  observer.observe(image);
});
