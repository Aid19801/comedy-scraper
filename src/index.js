const request = require("tinyreq");
const cheerio = require("cheerio");
const chortleUrl = 'http://www.chortle.co.uk';

let arrayOfChortleNewsObjects = [];

// getChortle
request("http://www.chortle.co.uk/news", (err, body) => {
    console.log(err || 'extracted html'); 
    let $ = cheerio.load(body, {
        normalizeWhitespace: true,
    });
    
    const findArticles = $('.twelvecol').toArray();

    findArticles.map((each, index) => {
        const title = $('h3 a', each).text();
        const img = $('img', each).attr('src');
        const url = $('a', each).attr('href');
        const subtitle = $('p.caption a', each).text();

        let chortleNewsStoryObject = {
            title,
            img,
            url,
            subtitle,
        }

        arrayOfChortleNewsObjects.push(chortleNewsStoryObject);
        return arrayOfChortleNewsObjects;
    });
});

setTimeout(() => {
    console.log('array: ', arrayOfChortleNewsObjects.length);
}, 5000)