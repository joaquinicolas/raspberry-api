var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const sql = require('mssql');
var http = require('http');
var debug = require('debug')('raspberryserver:server');


function app(config) {
    let self = this;
    self.main = {
        config : config,
        sql : sql,
        db:new sql.Connection(config.get('ElcaDB'))
    };
    return new Promise((resolve,reject) => {


        self.getApp()
            .then(() => self.controllers())
            .then(() => self.lib())
            .then(() => {
                debug("Setup finish,run...");
                resolve(self.main)
            })
            .catch((err)=>{
                console.log("Error init: ", err);
            });

    })
}

app.prototype.getApp = function  () {
    let self = this;
    return new Promise((resolve,reject) => {
        self.main.app = express();
        console.log("asd");
        
        // view engine setup
        self.main.app.set('views', path.join(__dirname, 'views'));
        self.main.app.set('view engine', 'jade');
        self.main.app.use(bodyParser.json());
        self.main.app.use(bodyParser.urlencoded({ extended: false }));
        self.main.app.use(cookieParser());
        self.main.app.use(express.static(path.join(__dirname, 'public')));
        self.main.server = http.createServer(self.main.app);
        resolve({app:self.main.app,server:self.main.server});
    })
};

app.prototype.controllers = function() {
  let self = this;
  return new Promise((resolve,reject) => {
      let application = self.main.app;
      let controllers = require('./routes/index')(self.main);
      application.post('/Alive',controllers['alive.post']);
      application.post('/News',controllers['news.post']);
      resolve(self.main.app);
  });
};


app.prototype.lib = function(){
    let self = this;
    return new Promise((resolve,reject) => {
        let lib = require('./libs/index')(self.main);
        self.main.libs = {};
        self.main.libs.Alive = new lib.alive(self.main);
        self.main.libs.News = new lib.news(self.main);
        resolve(self.main.libs);
    });
}
module.exports = app;
