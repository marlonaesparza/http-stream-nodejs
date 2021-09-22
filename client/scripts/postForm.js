const postForm = document.getElementById('media-post-form');
const txtInput = document.getElementById('post-txt');
const mediaInput = document.getElementById('post-media');
const vidTstCont = document.getElementById('video-tst-cont');

// ------------------------ //

// FORM SUBMIT LISTENER //

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const txt = txtInput.value;
  const media = mediaInput.files[0];

  const txtValidated = validateTxt(txt);
  const mediaValidated = await validateMedia(media);

  if (!txtValidated || !mediaValidated) {
    console.log('Form values are not valid.');
    return;
  };

  const formData = new FormData();
  formData.append('text', txt);
  formData.append('media', media);

  return ajaxPostForm(formData, (form, data) => {
    form.reset();
    mediaPostCont.classList.add('hidden');
    mediaPlayerCont.classList.remove('hidden');
    postButton.textContent = 'Create Post';

    const { text, media, createdAt } = JSON.parse(data);

    if (media.split('.')[1] === 'mp4') {
      const videoEl = document.createElement('video');
      videoEl.setAttribute('controls', '');
      videoEl.setAttribute('width', '500');

      var sourceEl = document.createElement('source');
      sourceEl.setAttribute('src', media);
      sourceEl.setAttribute('type', 'video/mp4');

      videoEl.appendChild(sourceEl);
      vidTstCont.appendChild(videoEl);
    };
  });
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
      cb(postForm, data);
    },
    error: (e) => {
      console.log('Post error:', e);
    }
  });
};

// ------------------------ //

// INPUT VALIDATION METHODS //

const validateTxt = (text) => {
  return text.length < 255 && text.length >= 0 ?
    true :
    false;
};

const validateMedia = async (media) => {
  if (media.type.includes('video')) {
    try {
      const vidDuration = await getVideoDuration(media);
      return vidDuration < 120 ? true : false;

    } catch(e) {
      console.log(e);
    }
  } else if (media.type.includes('image')) {
    return true;
  }

  return false;
};

// ------------------------ //

// INPUT VALIDATION HELPER METHODS //

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
