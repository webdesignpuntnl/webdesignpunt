let allImages;
if (document.querySelector('.index__image')) {
  allImages = Array.from(document.querySelectorAll('.index__image'));
} else {
  allImages = Array.from(document.querySelectorAll('.tools__image'));
}

const config = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show__index__image');
      entry.target.classList.remove('hide__index__image');
    } else {
      entry.target.classList.add('hide__index__image');
      entry.target.classList.remove('show__index__image');
    }
  });
}, config);

allImages.forEach(image => {
  observer.observe(image);
});
