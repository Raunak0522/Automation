const puppeteer=require("puppeteer") 

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

// ~~~~~~~~~~Puppeteer is basically a promise based library,and it is headless (not visible)~~~~~~~~~~~~~~~

let browserwillLaunchPromise =puppeteer.launch({
    headless:false,   //nothing is visible when its true
    args:["--start-maximized"],  //args array iss lia dia takii full screen p open ho website
    defaultViewport:null   //by dafault puppeteer m kuch dimension sets hota 
})//promise k first stage hota hai jo ki pending hota hai

browserwillLaunchPromise.then(function(browserInstance){//browser instance is basically the data of the browser
    let newtabopen=browserInstance.newPage()//new page is a method opens new page in the browser
    return newtabopen
}).then(function(newtab){
    let websiteopenPromise=newtab.goto("https://www.google.co.in/")
    return websiteopenPromise
}).then(function(){
    console.log("website opened")
})





console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")