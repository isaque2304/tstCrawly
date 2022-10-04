const express = require('express');
const app = express()
const port = 3000
const puppeteer = require('puppeteer');

app.get('/', (req, res) => {
    res.render('index');
});
app.set('view engine', 'pug')

app.get('/api', async(req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://applicant-test.us-east-1.elasticbeanstalk.com/');
    await page.click('input[type=button]');
    let element = await page.$('#answer')
    let value = await page.evaluate(el => el.textContent, element);
    await browser.close();
    res.send(`RESPOSTA: ${value}`);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})