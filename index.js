require('dotenv').config()
const telegrambot = require('node-telegram-bot-api')
const {selectdatapermohonan} = require('./selectbekasi.js');
const bot = new telegrambot(process.env.TOKEN,{polling:true})

bot.on('message',(message)=>{
    var gettext = message.text;
    var getchat_id = message.chat.id;
    if(gettext == "/help")
    {
        bot.sendMessage(getchat_id,"Apa yang kamu butuhin? \n untuk melakukan pengecekan permohonan di silat bekasi silakan untuk melakukan perintah : /permohonan \n "+
        "untuk melakukan pemesanan untuk tiket pesawat ketik:  /pesan");
    }
    else if(gettext == "/about")
    {
        bot.sendMessage(getchat_id,"Nama PemYBot \n saya dibuat tanggal 02-Mei-2022 \n untuk saat ini masih perkenalan saja"); 
    }
    else if(gettext.includes("/permohonan"))
    {
        if(gettext.includes("/permohonan/"))
        {
            var splitkodetext = gettext.split('/');
            console.log(splitkodetext);
            selectdatapermohonan(splitkodetext[2],function(response)
            {
                bot.sendMessage(getchat_id,response);
            });
                //console.log(response)
        }
        else
        {
            
            bot.sendMessage(getchat_id,"untuk melakukan pengecekan tentang data pribadi silakan ketik : /permohonan/PHN2201280000124633 data test")
        }
    }
    else if(gettext == "/pesan")
    {
        if(gettext.includes("/pesan/"))
        {
            var split = gettext.split('/')
            if(split[2] == "01")
            {
                bot.sendMessage(getchat_id,"Tiket Kereta sudah habis \n silakan kembali ke pemilihan tipe tiket dengan format: /pesan/back");
            }
            else if(split[2] == "02")
            {
                bot.sendMessage(getchat_id,"Tiket Pesawat sudah habis \n silakan kembali ke pemilihan tipe tiket dengan format: /pesan/back");
            }
            else
            {
                bot.sendMessage(getchat_id,"untuk melakukan pemesanan silakan ketik format : /pesan/tipe tiket")
            }
        }
        else
        {
            bot.sendMessage(getchat_id,"melakukan pesanan terdapat 2 tiket \n "+
            "01. Tiket Kereta \n 02. Tiket Pesawat \n untuk melakukan pemesanan silakan ketik format : /pesan/tipe tiket")
        }
    }

    // else if(gettext == "/testconnect")
    // {
    //     datapermohonan.connectdatabase(function(response){
            
    //     console.log(response)
    //     });
    // }
    else
    {
        bot.sendMessage(getchat_id,"selamat datang untuk perintah: \n /help \n /about");
    }
})