window.addEventListener('load', e => {
  $.ajax({
    url: 'http://localhost:8000/media/all',
    success: (videos) => {
      loadAllVideos(JSON.parse(videos));
    },
    error: (e) => {
      console.log('Load Videos Error:', e);
    }
  });
});
