postButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (currentMediaCont.classList.contains('hidden')) {
    mediaPostCont.classList.add('hidden');
    currentMediaCont.classList.remove('hidden');
    postButton.textContent = 'Upload';
  } else {
    currentMediaCont.classList.add('hidden');
    mediaPostCont.classList.remove('hidden');
    postButton.textContent = 'Cancel Upload';
  };
});
