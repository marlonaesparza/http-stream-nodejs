const switchMediaOrPostCont = () => {
  if (currentMediaCont.classList.contains('hidden')) {
    postForm.reset();
    mediaPostCont.classList.add('hidden');
    currentMediaCont.classList.remove('hidden');
    postButton.textContent = 'Upload';
    return;
  } else {
    currentMediaCont.classList.add('hidden');
    mediaPostCont.classList.remove('hidden');
    postButton.textContent = 'Cancel Upload';
    return;
  };
};

const onSuccessfulPost = (form, result) => {
  form.reset();
  switchMediaOrPostCont();
  allVideos.push(result);
  return createMediaResult(result);
};

const onClickMediaResult = (e) => {
  e.preventDefault();
  const targetVideo = e.target.textContent;
  for (let i = 0; i < allVideos.length; i++) {
    let video = allVideos[i];
    if (video.title === targetVideo) {
      return updateCurrentMedia(video);
    };
  };
};
