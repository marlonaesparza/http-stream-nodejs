// FORM SUBMIT LISTENER //

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const titleValidated = validateTitle(titleInput.value);
  const descValidated = validateDesc(descInput.value);
  const videoValidated = await validateVideo(videoInput.files[0]);
  const imageValidated = await validateImage(imageInput.files[0]);

  if (!titleValidated || !descValidated || !videoValidated || !imageValidated) {
    console.log('Form value(s) are not valid.');
    return;
  };

  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('description', descInput.value);
  formData.append('media', videoInput.files[0]);
  formData.append('media', imageInput.files[0]);

  return ajaxPostForm(formData, onSuccessfulPost);
});

// FORM POST METHOD

const ajaxPostForm = (formData, cb) => {
  $.ajax({
    type: 'POST',
    data: formData,
    url: 'http://localhost:8000/post/create',
    contentType: false,
    processData: false,
    success: (data) => {
      const result = JSON.parse(data);
      cb(postForm, result);
    },
    error: (e) => {
      console.log('POST Upload Error:', e);
    }
  });
};

// ------------------------ //

// INPUT VALIDATION METHODS //

const validateTitle = (title) => {
  return title.length < 30 && title.length >= 1 ?
    true :
    false;
};

const validateDesc = (description) => {
  return description.length < 255 && description.length >= 0 ?
    true :
    false;
};

const validateVideo = async (media) => {
  if (!media) {
    return false;
  };

  if (media.type.includes('video')) {
    try {
      const vidDuration = await getVideoDuration(media);
      return vidDuration < 120 ? true : false;

    } catch(e) {
      console.log(e);
      return false;
    };
  };
};

const validateImage = (media) => {
  if (!media) {
    return false;
  };

  return media.type.includes('image') ? true : false;
}

// ------------------------ //

// HELPER METHODS //

const getVideoDuration = (video) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(video);

    reader.onload = () => {
      const media = new Audio(reader.result);

      media.onloadedmetadata = () => {
        resolve(media.duration)
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// ------------------------ //
