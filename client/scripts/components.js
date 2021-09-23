const createMediaResult = (props) => {
  const { title, description , media, createdAt} = props;
  const resultCont = document.createElement('article');
  resultCont.setAttribute('class', 'rslt-cont');
  const resultThumbCont = document.createElement('div');
  resultThumbCont.setAttribute('class', 'rslt-thumb-cont');
  const resultThumb = document.createElement('img');
  resultThumb.setAttribute('class', 'rslt-thumb')
  resultThumb.setAttribute('src', media);
  resultThumb.setAttribute('alt', title);
  resultThumbCont.appendChild(resultThumb);
  const resultInfoCont = document.createElement('div');
  resultInfoCont.setAttribute('class', 'rslt-info-cont');
  const resultTitle = document.createElement('p');
  resultTitle.setAttribute('class', 'rslt-info');
  resultTitle.textContent = `${title}`;
  const resultDesc = document.createElement('p');
  resultDesc.setAttribute('class', 'rslt-info');
  resultDesc.textContent = `${description}`;
  const resultTimestamp = document.createElement('p');
  resultTimestamp.setAttribute('class', 'rslt-info');
  resultTimestamp.textContent = `${createdAt}`;
  resultInfoCont.appendChild(resultTitle);
  resultInfoCont.appendChild(resultDesc);
  resultInfoCont.appendChild(resultTimestamp);
  resultCont.appendChild(resultThumbCont);
  resultCont.appendChild(resultInfoCont);
  mediaResultsCont.appendChild(resultCont);
};

const updateCurrentMedia = (props) => {
  const { title, description , media, createdAt } = props;
  const getMediaType = (string) => string.split('.')[1];
  const mediaType = getMediaType(media);
  
  const videoEl = document.getElementById('current-video');
  const sourceEl = document.getElementById('media-mp4')
  const currentVideoEl = currentMedia.removeChild(videoEl);

  
};
