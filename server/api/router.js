const { IncomingForm } = require('formidable');
const CloudConvert = require('cloudconvert');
const fs = require('fs');
const url = require('url');
const { inspect } = require('util');
const PostDAO = require('./../dao/post');
const headers = require('./../config/cors');

const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_SBKEY, true);

const router = (req, res) => {
  const reqMethod = req.method.toLowerCase();
  const reqUrl = req.url;

  if (reqMethod === 'get') {
    const parts = url.parse(reqUrl, true);
    const { pathname, query } = parts;

    if (pathname === '/media') {
      const { file } = query;
      const filePath = `${__dirname}/../media/${file}`;

      return fs.readFile(filePath, (err, chunk) => {
        if (err) {
          console.log(inspect(err));
          res.writeHead(400, headers);
        } else {
          res.writeHead(200, headers);
          res.write(chunk, 'binary');
        };

        res.end();
        return;
      })
    };
  };

  if (reqMethod === 'post') {

    if (reqUrl === '/post/create') {
      const formParser = new IncomingForm({
        uploadDir: `${__dirname}/../media`,
        multiples: true,
        keepExtensions: true
      });

      return formParser.parse(req, (err, fields, files) => {
        if (err) {
          res.writeHead(400, headers);
          res.end();
          return;
        };

        const formTitle = fields.title;
        const formDesc = fields.description;
        const formVideo = files.media[0];
        const formThumbnail = files.media[1];

        const post = {
          title: formTitle,
          description: formDesc,
          videoPath: formVideo.path,
          thumbnailPath: formThumbnail.path
        };

        if (formThumbnail.type.includes('jpeg') && formVideo.type.includes('mp4')) {
          return PostDAO.createPost(post)
            .then(({ dataValues }) => {
              const getFileUrlPath = (path) => {
                let pathParts = path.split('/');
                let filePart = pathParts[pathParts.length - 1];
                return `http://localhost:8000/media?file=${filePart}`;
              };

              const { title, description, videoPath, thumbnailPath, createdAt } = dataValues;
              const video = getFileUrlPath(videoPath);
              const thumbnail = getFileUrlPath(thumbnailPath)
              const post = { title, description, video, thumbnail, createdAt };

              res.writeHead(201, headers);
              res.write(JSON.stringify(post));
              res.end();
              return;
            })
            .catch((error) => {
              console.log(inspect(error));
              res.writeHead(500, headers);
              res.end();
              return;
            });
        } else {
          // convert video -> mp4
          // convert image -> jpeg
          res.writeHead(500, headers);
          res.end();
          return;
        };
      });
    };
  };
};

module.exports = router;
