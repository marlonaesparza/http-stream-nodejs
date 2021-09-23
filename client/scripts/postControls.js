const postButton = document.getElementById('post-btn');
const mediaPlayerCont = document.getElementById('media-player-cont');
const mediaPostCont = document.getElementById('media-post-cont');

postButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (mediaPlayerCont.classList.contains('hidden')) {
    mediaPostCont.classList.add('hidden');
    mediaPlayerCont.classList.remove('hidden');
    postButton.textContent = 'Upload';
  } else {
    mediaPlayerCont.classList.add('hidden');
    mediaPostCont.classList.remove('hidden');
    postButton.textContent = 'Cancel Upload';
  };
});
