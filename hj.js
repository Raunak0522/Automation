const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const codesol= require("./code")

let email = "fadato3141@aregods.com";
let password = "auto@123R";

let page;

let browserlaunch = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});

browserlaunch
  .then(function (browserInstance) {
    let newtab = browserInstance.newPage();
    return newtab;
  })
  .then(function (newtab) {
    page = newtab;
    let websiteopen = newtab.goto(loginLink);
    return websiteopen;
  })
  .then(function () {
    let emailWillbeEntered = page.type("input[id='input-1']", email, {
      delay: 100,
    });
    return emailWillbeEntered;
  })
  .then(function () {
    let passwordWillbeEntered = page.type("input[id='input-2']", password, {
      delay: 100,
    });
    return passwordWillbeEntered;
  })
  .then(function () {
    let loginbuttonClickPromise = page.click(
      "button.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled span.ui-text",
      { delay: 100 }
    );
    return loginbuttonClickPromise;
  })
  .then(function () {
    let algoSectionClickedPromise = waitAndClick("a[data-attr1='algorithms']", page);
    return algoSectionClickedPromise;
  })
  .then(function () {
    let warmupSectionPromise = waitAndClick("input[value='warmup']", page);
    return warmupSectionPromise;
  })
  .then(function(){
    let allquestionsPromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
    return allquestionsPromise;
  }).then(function(Totalquestion){
    console.log("Total Questions->"+Totalquestion.length)
    let Questions=questionsolver(page,Totalquestion[0],codesol.answers[0])
    return Questions;
  })

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitforMOdalPromise = cPage.waitForSelector(selector);
    waitforMOdalPromise
      .then(function () {
        let clickModal = cPage.click(selector, { delay: 100 });
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

function questionsolver(page,question,solver){


    return new Promise(function(resolve,reject){
        let questionwillbeclicked=question.click()
        questionwillbeclicked.then(function(){
            return waitAndClick("div.checkBoxWrapper .checkbox-input",page)
        }).then(function(){
                return textareaClicked=waitAndClick(".input.text-area.custominput.auto-width",page)
        }).then(function(){
            return page.type(".input.text-area.custominput.auto-width",solver,{delay:20})
        }).then(function(){
            let Controlispressed=page.keyboard.down("Control")
            return Controlispressed
        }).then(function(){
            let Aispressed=page.keyboard.press("A")
            return Aispressed
        }).then(function(){
            let Xispressed=page.keyboard.press("X")
            return Xispressed
        }).then(function(){
            let Ctrlisreleasd=page.keyboard.up("Control")
            return Ctrlisreleasd
        }).then(function(){
            let movecursortocodeeditor=waitAndClick(".hr-monaco-editor-parent",page)
            return movecursortocodeeditor
        }).then(function(){
            let Controlispressed=page.keyboard.down("Control")
            return Controlispressed
        }).then(function(){
            let Aispressed=page.keyboard.press("A")
            return Aispressed
        }).then (function(){
            let Vispressed=page.keyboard.press("V")
            return Vispressed
        }).then(function(){
            let Ctrlisreleasd=page.keyboard.up("Control")
            return Ctrlisreleasd
        }).then(function(){
            let clickonRuncode=waitAndClick("button[class='ui-btn ui-btn-normal ui-btn-secondary pull-right msR hr-monaco-compile hr-monaco__run-code ui-btn-styled']",page,{delay:1000})
             return clickonRuncode
        }).then(function(){
            let clickonSubmit=waitAndClick("button[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']",page,{delay:1000})
            return clickonSubmit
        }).then(function(){
            resolve()
        }).catch(function(error){
            console.error("error")
        })
    })
}