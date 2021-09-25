const createMediaResult = (props) => {
  const { title, description , video, thumbnail, createdAt} = props;
  const resultCont = document.createElement('article');
  resultCont.setAttribute('class', 'rslt-cont');
  const resultThumbCont = document.createElement('div');
  resultThumbCont.setAttribute('class', 'rslt-thumb-cont');
  const resultThumb = document.createElement('img');
  resultThumb.setAttribute('class', 'rslt-thumb')
  resultThumb.setAttribute('src', thumbnail);
  resultThumb.setAttribute('alt', title);
  resultThumbCont.appendChild(resultThumb);
  const resultInfoCont = document.createElement('div');
  resultInfoCont.setAttribute('class', 'rslt-info-cont');
  const resultTitle = document.createElement('p');
  resultTitle.setAttribute('class', 'rslt-info');
  resultTitle.classList.add('result-title');
  resultTitle.addEventListener('click', onClickMediaResult);
  resultTitle.textContent = `${title}`;
  const resultTimestamp = document.createElement('p');
  resultTimestamp.setAttribute('class', 'rslt-info');
  resultTimestamp.classList.add('result-time');
  resultTimestamp.textContent = `${createdAt}`;
  resultInfoCont.appendChild(resultTitle);
  resultInfoCont.appendChild(resultTimestamp);
  resultCont.appendChild(resultThumbCont);
  resultCont.appendChild(resultInfoCont);
  mediaResultsCont.appendChild(resultCont);
};

const updateCurrentMedia = (props) => {
  const { title, description , video, thumbnail, createdAt } = props;
  const currentVideoEl = currentMedia.removeChild(videoEl);
  currentVideoEl.setAttribute('poster', thumbnail);
  currentVideoEl.setAttribute('src', video);
  currentMedia.appendChild(currentVideoEl);
  videoTitle.textContent = `${title}`;
  videoDesc.textContent = `${description}`;
  videoTimeStamp.textContent = `${createdAt}`;
};
