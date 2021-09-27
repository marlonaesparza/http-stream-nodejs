module.exports = (datavalues) => {
  const { title, description, videoPath, thumbnailPath, createdAt } = datavalues;
  
  const getFileUrlPath = (path) => {
    let pathParts = path.split('/');
    let filePart = pathParts[pathParts.length - 1];
    return `http://localhost:8000/media?file=${filePart}`;
  };

  const video = getFileUrlPath(videoPath);
  const thumbnail = getFileUrlPath(thumbnailPath)
  return { title, description, video, thumbnail, createdAt };
};
