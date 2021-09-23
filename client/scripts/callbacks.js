const onSuccessfulPost = (form, data) => {
  form.reset();
  
  mediaPostCont.classList.add('hidden');
  mediaPlayerCont.classList.remove('hidden');
  postButton.textContent = 'Upload';

  const result = JSON.parse(data);
  
  return createMediaResult(result);
};
