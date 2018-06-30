
const Twit = require('twit')
const request = require('request')
const fs = require('fs')
const config = require('../config')
const path = require('path')

const T = new Twit(config.twitterApp);

const xDimension = Math.floor(Math.random() * 500) + 300;
const yDimension = Math.floor(Math.random() * 500) + 300;
// const billPhoto = `http://www.fillmurray.com/${xDimension}/${yDimension}.jpg`;

 const Bill () => {
  const parameters = {
    url: `http://www.fillmurray.com/${xDimension}/${yDimension}.jpg`
    encoding: 'binary'
  }
  request.get(parameters, (err, respone, body) => {
    body = JSON.parse(body)
    saveFile(body, 'bill.jpg')
  })
}

function saveFile(body, fileName) {
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


module.exports = Bill;
