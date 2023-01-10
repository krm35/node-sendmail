const fs = require('fs');

const sendmail = require('../sendmail')({
  silent: true,
  devHost: 'localhost',
  devPort: 2525,
  rejectUnauthorized: false
});

sendmail({
  from: 'test@yourdomain.com',
  to: 'info@yourdomain.com',
  replyTo: 'jason@yourdomain.com',
  subject: 'MailComposer sendmail',
  html: 'Mail of test sendmail ',
  attachments: [
    {   // utf-8 string as an attachment
      filename: 'text1.txt',
      content: 'hello world!'
    },
    {   // binary buffer as an attachment
      filename: 'text2.txt',
      content: Buffer.from('hello world!', 'utf-8')
    }
  ],
  encryptionKeys: [fs.readFileSync('./pgp-public.pem', 'utf8')],
}, function (err, reply) {
  console.log(err && err.stack);
  console.dir(reply);
});
