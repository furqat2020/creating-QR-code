const qrcode = require('qrcode'),
base64toImage = require('base64-to-image'),
path = require('path'),
express = require('express'),
bodyParser = require('body-parser'),
ejs = require('ejs'),
expressLayout = require('express-ejs-layouts')
var app = express()

app.set('view engine', 'ejs')
app.use('/public/', express.static(path.join(__dirname, './public')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(expressLayout)

app.get('/', (req, res) => {

    // qrcode.toDataURL("Na gapla", {type:'png', errorCorrectionLevel: 'H'}, (err, url) => {
    //     if(err) throw err

    //     base64toImage(url, `${__dirname}/public/img/`, {'fileName':'oila.png', 'type':'png'})

        res.render('index')
    //})

})

app.post('/create_qr', (req, res) => {
    var datr = req.body.data
    qrcode.toDataURL(datr, {type:'png', errorCorrectionLevel: 'H'}, (err, url) => {
        if(err) throw err

        res.send(url)
    })
})

app.post('/download_qr', (req, res) => {
    var url = req.body.dat

    var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var len = txt.length
    var pass = ''
    for(var i = 1; i <= 8; i++){
        var belgi = txt.charAt(Math.floor(Math.random() * len))
        pass += belgi
    }

    qrcode.toDataURL(url, {type:'png', errorCorrectionLevel: 'H'}, (err, url) => {
        if(err) throw err

        base64toImage(url, `${__dirname}/public/img/`, {'fileName':`${pass}.png`, 'type':'png'})
        res.send('success')
    })
})

app.listen(3000, () => {
    console.log("Port: 3000")
})