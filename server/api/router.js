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

        const post = {
          text: formText,
          mediaPath: path
        };

        if (type.includes('jpeg') || type.includes('mp4')) {
          return PostDAO.createPost(post)
            .then(({ dataValues }) => {
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
          if (type.includes('video')) {
            // convert media to mp4
            res.end();
            return;
          } else if (type.includes('image')) {
            // convert media to jpeg
            res.end();
            return;
          };
        };
      });
    };
  };
};

module.exports = router;
