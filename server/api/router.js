const { IncomingForm } = require('formidable');
const CloudConvert = require('cloudconvert');
const { inspect } = require('util');
const headers = require('./../config/cors');
const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_SBKEY, true);

const router = (req, res) => {
  const reqMethod = req.method.toLowerCase();
  const reqUrl = req.url;

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

        // if files.media.type includes 'video'
          // if !files.media.type.includes 'webm'
            // convert file to type 'webm'
            // 
          // else post form to posts table in feed db
            // send back succesful post for client to display
        // if files.media.type includes image
          // if !files.media.type.includes 'jpeg'
            // convert file to type 'jpeg'

        if (type.includes('video')) {
          if (!type.includes('mp4')) {
            // update!
            res.end();
            return;

          } else {

          };
        };

        res.writeHead(201, headers);
        res.end();
        return;
      });
    };
  };
};

module.exports = router;
