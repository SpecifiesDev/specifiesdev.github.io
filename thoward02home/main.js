// Main Start Up For Home

const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

var MainWindow = null;


//Create our window

const CreateWindow = () => {

  MainWindow = new BrowserWindow({
    frame: false,
    fullscreen: true,
    backgroundColor: '#24292e'
  });

  MainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'index.html'), //Our main page where we're gonna load data etc etc
    protocol: 'file:',
    slashes: true
  }));

  MainWindow.on('closed', () => {

    mainWindow = null;

  });

}


app.on('ready', function(){

    CreateWindow();

});
