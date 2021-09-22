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

    console.log('GET path:', pathname);
    
    if (pathname === '/media') {
      const { file } = query;
      console.log('GET media file:', file);

      const filePath = `${__dirname}/../media/tempUpload/${file}`;

      return fs.readFile(filePath, (err, chunk) => {
        if (err) {
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
        uploadDir: `${__dirname}/../media/tempUpload`,
        multiples: true,
        keepExtensions: true
      });

      return formParser.parse(req, (err, fields, files) => {
        if (err) {
          res.writeHead(400, headers);
          res.end();
          return;
        };

        const formText = fields.text;
        const formMedia = files.media;
        const { name, type, path } = formMedia;

        console.log('Form txt:', formText);
        console.log('Form media:', {name, type, path});

        const post = {
          text: formText,
          mediaPath: path
        };

        if (type.includes('video')) {
          if (type.includes('mp4')) {
            return PostDAO.createPost(post)
              .then(({ dataValues }) => {
                console.log('MP4 POST Success:', inspect(dataValues));

                const getFileUrlPath = (path) => {
                  let pathParts = path.split('/');
                  let filePart = pathParts[pathParts.length - 1];
                  return `http://localhost:8000/media?file=${filePart}`;
                };

                const { text, mediaPath, createdAt } = dataValues;
                const media = getFileUrlPath(mediaPath);
                const post = { text, media, createdAt };

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
            // convert media to mp4
            res.end();
            return;
          };
        } else if (type.includes('image')) {
          if (type.includes('jpeg')) {
            return PostDAO.createPost(post)
              .then(({ dataValues }) => {
                console.log('JPG POST Success:', inspect(dataValues));

                const getFileUrlPath = (path) => {
                  let pathParts = path.split('/');
                  let filePart = pathParts[pathParts.length - 1];
                  return `http://localhost:8000/media?file=${filePart}`;
                };

                const { text, mediaPath, createdAt } = dataValues;
                const media = getFileUrlPath(mediaPath);
                const post = { text, media, createdAt };

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
            res.end();
            return;
          };
        };
      });
    };
  };
};

module.exports = router;
