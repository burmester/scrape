const chromium = require('chrome-aws-lambda');

exports.handler = async function(event, context) {
    const saljkollen = JSON.parse(event.body).url;
    
    const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless
    });

    const page = await browser.newPage()
    try{
        const str = "https://www.hemnet.se/saljkollen/17078586/7a0ea7ad148accd3c5cbfbe91af48c4548da1e9e6cdf74a9cbd463226e87579c?asdfasdfas"
        const url = str.split("?")[0]+'?role=admin';
        await page.goto(url)
        await page.setViewport({
            width: 1200,
            height: 800
        });
        await page.waitForTimeout(500)
        //const visits = await page.$eval('.sellers-dashboard__primary-number', el => el.innerText)
        const raketen = await page.$eval('.sellers-dashboard__secondary-number', el => el.innerText)
        await browser.close()
        return {
            statusCode: 200,
            body: "Raketen: " + raketen
          }
    } catch(err) {
        try{
            const visits = await page.$eval('.seller-listing__times-viewed-counter', el => el.innerText)
            await browser.close()
            return {
                statusCode: 200,
                body: "Visits: " + visits
              }
        }catch (err2){
            console.log("error",err, err2)
            await browser.close()
            return {
                statusCode: 500
              }
        }
        
    }
}