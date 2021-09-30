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
  updateCurrentMedia(result);
  allVideos.push(result);
  return createMediaResult(result);
};

const onClickMediaResult = (e) => {
  e.preventDefault();
  const targetVideo = Number(e.target.getAttribute('id'));
  console.log(targetVideo);
  for (let i = 0; i < allVideos.length; i++) {
    let video = allVideos[i];
    if (video.id === targetVideo) {
      return updateCurrentMedia(video);
    };
  };
};

const loadAllVideos = (videos) => {
  return videos.forEach((video, i) => {
    if (i === 0) {
      updateCurrentMedia(video);
    };
    allVideos.push(video);
    return createMediaResult(video);
  });
};
