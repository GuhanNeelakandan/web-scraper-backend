const axios = require("axios")
const cheerio =require("cheerio")
const db=require("./mongo")



let data =()=>{
//scrapdata of Snapdeal***********************************************
const Snapdeal = []
    axios('https://www.snapdeal.com/search?keyword=mobile%20phone&santizedKeyword=&catId=&categoryId=0&suggested=true&vertical=p&noOfResults=20&searchState=&clickSrc=suggested&lastKeyword=&prodCatId=&changeBackToAll=true&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rlvncy')
        .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)
        

        $('.js-tuple', htmlData).each((index, element) => {
            const image =$(element).find('.picture-elem source').attr('srcset')
            const title = $(element).find('.product-title').text()
            const rating = $(element).find('.product-rating-count').text()
            const price =$(element).find('span.product-desc-price').text()
            const offerprice = $(element).find("span.product-price").text();
            Snapdeal.push({
                image,
                title,
                rating,
                price,
                offerprice,
            })
        })
        db.mobiles.insertMany(Snapdeal)
    }).catch(err => console.error(err))


// //scrapdata from flipkart********************************************


// axios('https://www.flipkart.com/search?q=mobile&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off')
//     .then(res => {
//         const htmlData = res.data
//         const $ = cheerio.load(htmlData)
//         const Flipkart = []

//         $('._1AtVbE', htmlData).each((index, element) => {
//             const image =$(element).find('img._396cs4').attr('src')
//             const title = $(element).find('div._4rR01T').text()
//             const rating = $(element).find('div._3LWZlK').text()
//             const price =$(element).find('div._3I9_wc').text()
//             const offerprice = $(element).find("div._30jeq3").text();
//             Flipkart.push({
//                 image,
//                 title,
//                 rating,
//                 price,
//                 offerprice,
//             })
//         })
//         console.log(Flipkart)
//     }).catch(err => console.error(err))


// //scrap from amazon***********************************************************


// axios('https://www.flipkart.com/search?q=mobile&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&as-pos=1&as-type=HISTORY')
//     .then(res => {
//         const htmlData = res.data
//         const $ = cheerio.load(htmlData)
//         const Amazon = []

//         $('._1AtVbE', htmlData).each((index, element) => {
//             const image =$(element).find('.CXW8mj>img').attr('src')
//             const title = $(element).find('div._4rR01T').text()
//             const rating = $(element).find('div._3LWZlK').text()
//             const price =$(element).find('div._30jeq3').text()
//             const offerprice = $(element).find("div._3I9_wc").text();
//             Amazon.push({
//                 image,
//                 title,
//                 rating,
//                 price,
//                 offerprice,
//             })
//         })
//         console.log(Amazon)
//     }).catch(err => console.error(err))


}
// **********************************************************************************
module.exports = data;