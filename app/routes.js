var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); // mysql bağlantısını yapıyoruz . 
var rc522 = require('../node_modules/rc522-rfid-promise/build/Release/rc522');
   


module.exports = function(app) {





    app.get('/', function(req, res) {
        
     res.render('index.ejs'); // index.ejs ye gönderiyoruz . 
    });

    app.get('/ekle',function(req,res){
        res.redirect('/');
    })

    app.post('/ekle',function(req,res){
        top = req.body;
        adi = top.adi;
        soyadi = top.soyad;
        kuladi = top.kuladi;
        
// adi, soyadini, kullaniciadını alıp ekliyor 
       connection.query('insert into kullanicilar(adi,soyad,kuladi) value("'+adi+'","'+soyadi+'","'+kuladi+'") ',function(err,rows){
        if(!err){
            console.log(err);
        }else{
            console.log('tamamdir');
        }

       });

        
        res.redirect('/');
    })

    app.get('/sil',function(req,res){
        res.redirect('/');
    })
    app.post('/sil',function(req,res){
        body = req.body;
        console.log(body);
        console.log(body.data); // ekleme işlemindeki işlemin tersi olarak siliyor . 
        connection.query('delete from kullanicilar where id = ?',[body.data])
        res.redirect('/');
    })
};

