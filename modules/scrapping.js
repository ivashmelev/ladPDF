const request = require('request-promise');
const cheerio = require('cheerio');
const pdfkit = require('pdfkit');
const fs = require('fs');

class Scrapping {
  getText(url) {
    return new Promise(async resolve => {
      console.log(url);
      const data = await request(url);
      const $ = cheerio.load(data);
      let stringHTML = $(data).text();
      let stringData = [];

      stringHTML = stringHTML.split(' ');

      stringHTML.forEach(element => {
        if (element !== '\n' && element !== '') {
          element = JSON.stringify(element);
          element = element.replace(/\\n/g, '');
          element = JSON.parse(element);
          if (element.length > 3) {
            stringData.push(element.toLowerCase());
          }
        }
      });
      resolve(stringData);
    });
  }

  async topWords(url) {
    const words = await this.getText(url);
    const raiting = {};
    const arrRaiting = [];

    words.forEach((element) => {
      let word = element;
      if (raiting[word] !== undefined) {
        raiting[word]++;
      } else {
        raiting[word] = 1;
      }
    });

    for (let key in raiting) {
      arrRaiting.push(new Object({ word: key, point: raiting[key] }));
    }

    arrRaiting.sort((a, b) => b.point - a.point);

    return [arrRaiting[0].word, arrRaiting[1].word, arrRaiting[2].word];
  }

  async getPDF(urls) {
    const filePDF = new pdfkit();
    const arrUrl = urls.split(',');
    const topWords = [];

    filePDF.pipe(fs.createWriteStream("sites.pdf"));
    filePDF.font('./public/static/fonts/Roboto-Regular.ttf');

    for (let url of arrUrl) {
      topWords.push(await this.topWords(url));
      filePDF.fontSize(12).text(`${url} - ${topWords.join(" | ")}\n`);
      topWords.shift();
    }

    filePDF.end();
  }
}

module.exports = Scrapping;