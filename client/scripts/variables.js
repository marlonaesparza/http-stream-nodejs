// FORM //////////////////
const postButton = document.getElementById('post-btn');
const postForm = document.getElementById('media-post-form');
const titleInput = document.getElementById('post-title');
const descInput = document.getElementById('post-description');
const videoInput = document.getElementById('post-video');
const imageInput = document.getElementById('post-thumbnail');
const mediaPostCont = document.getElementById('media-post-cont');
//////////////////////////
// CURRENT MEDIA /////////
const videoEl = document.getElementById('video');
const videoSourceEl = document.getElementById('video-mp4');
const videoTitle = document.getElementById('video-title');
const videoDesc = document.getElementById('video-description');
const videoTimeStamp = document.getElementById('video-timestamp');
const currentMedia = document.getElementById('current-media');
const currentMediaCont = document.getElementById('media-player-cont');
const currentMediaInfo = document.getElementById('current-media-info');
//////////////////////////
const mediaResultsCont = document.getElementById('media-rslts-cont');
// APP STATE /////////////
let allVideos = [];
let currentVideo = {};
