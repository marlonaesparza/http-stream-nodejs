const postForm = document.getElementById('media-post-form');
const titleInput = document.getElementById('post-title');
const descInput = document.getElementById('post-description');
const mediaInput = document.getElementById('post-media');
const currentMediaCont = document.getElementById('media-player-cont');
const mediaResultsCont = document.getElementById('media-rslts-cont');
const currentMedia = document.getElementById('current-media');
const currentMediaInfo = document.getElementById('current-media-info');

const videoEl = document.createElement('video');
const sourceEl = document.createElement('source');
videoEl.setAttribute('controls', '');
videoEl.setAttribute('class', 'current-media');
sourceEl.setAttribute('id', 'media-mp4');
sourceEl.setAttribute('type', 'video/mp4');
videoEl.appendChild(sourceEl);

const imageEl = document.createElement('img');
imageEl.setAttribute('id', 'current-img');
imageEl.setAttribute('class', 'current-media');
