const onSuccessfulPost = (form, data) => {
  form.reset();
  mediaPostCont.classList.add('hidden');
  mediaPlayerCont.classList.remove('hidden');
  postButton.textContent = 'Upload';
  const result = JSON.parse(data);
  allVideos.push(result);
  return createMediaResult(result);
};

const onClickMediaResult = (e) => {
  e.preventDefault();
  const targetVideo = e.target.textContent;
  for (let i = 0; i < allVideos.length; i++) {
    let video = allVideos[i];
    if (video.title === targetVideo) {
      currentVideo = video;
      videoSource.setAttribute('src', currentVideo.media);
      videoTitle.textContent = currentVideo.title;
      videoDesc.textContent = currentVideo.description;
      videoTimeStamp.textContent = currentVideo.createdAt;
      return;
    };
  };
};
