const T = require("./Twit.js");
// const Bill = require("./Bill.js");
const request = require('request');
const fs = require('fs');
const my_user_name = require("../config").userName;
const timeout = 1000 * 10; // timeout to send the message 5 min

const xDimension = Math.floor(Math.random() * 500) + 300;
const yDimension = Math.floor(Math.random() * 500) + 300;
const body = 'https://en.wikipedia.org/wiki/File:Bill_Murray_by_Gage_Skidmore.jpg';
const fileName = 'bill.jpg';
const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Start Sending Auto Direct Message 🚀🚀🚀");
  stream.on("follow", SendMessage);
  saveFile();
};
// const Bill = () => {
//  const parameters = {
//    url: `http://www.fillmurray.com/${xDimension}/${yDimension}.jpg`,
//    url: 'https://en.wikipedia.org/wiki/File:Bill_Murray_by_Gage_Skidmore.jpg',
//    qs: {
//       api_key:
//     },
//    encoding: 'binary'
//  }
//  request.get(parameters, (err, response, body) => {
//    body = HTML.parse(body)
//    saveFile(body, 'bill.jpg')
//  })
// }

function saveFile(body, fileName) {
  console.log('testing file save');
 const file = fs.createWriteStream(fileName)
 request(body).pipe(file).on('close', err => {
   if (err) {
     console.log(err)
   } else {
     console.log('Media saved!')
     const descriptionText = body.title
     uploadMedia(descriptionText, fileName)
   }
 })
}


function uploadMedia(descriptionText, fileName) {
 const filePath = path.join(__dirname, `../${fileName}`)
 console.log(`file PATH ${filePath}`)
 T.postMediaChunked({
   file_path: filePath
 }, (err, data, respone) => {
   if (err) {
     console.log(err)
   } else {
     console.log(data)
     const params = {
       status: descriptionText,
       media_ids: data.media_id_string
     }
   }
 })
}
const SendMessage = user => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully To  ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  // return `Hey ${name} Happy ${dayName} from my twitterbot.  `; // your message
  return `Hey ${name} Happy ${dayName} from my twitterbot. Here's a random photo of Bill Murray 😊😊 `; // your message

};

// Bill();



module.exports = AutoDM;
