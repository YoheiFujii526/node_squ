const PORT = 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const data = [];
let max_page;


const app = express();



let URL = "https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89";
axios(URL).then((response) => {
    let htmlParser = response.data;
    //console.log(htmlParser);

    let $ = cheerio.load(htmlParser);

    $(".s-pagination-strip", htmlParser).each(function() {
        max_page = $(this).find(".s-pagination-item.s-pagination-disabled").text().trim();
    });
    console.log(max_page);
})
.catch((error) => console.log(error));



for(let i=1;i<=2;i++) {

    URL = `https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89&page=${i}`;
    axios(URL).then((response) => {
        let htmlParser = response.data;
        //console.log(htmlParser);
    
        let $ = cheerio.load(htmlParser);

        $(".a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small", htmlParser).each(function() {
            const title = $(this).find(".a-size-base-plus").text().trim();
            const price = $(this).find(".a-price-whole").text().trim();

            // 価格が存在し、かつ空でない場合のみ表示する
            if (title && price) {
                data.push({title, price});
            } 
        });

        //データの中身を表示する
        console.log(`\n---${i}のデータを表示開始---\n`);
        console.log(data);
        console.log(`\n---${i}のデータを表示終了---\n`);
    })
    .catch((error) => console.log(error));
}

app.listen(PORT, console.log("server running!"));
