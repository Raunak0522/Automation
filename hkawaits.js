const loginLink = "https://www.hackerrank.com/auth/login";
const puppeteer = require("puppeteer");

const codesol = require("./code");

let email = "fadato3141@aregods.com";
let password = "auto@123R";

let page;

(async function () {
  try {
    let browserWilllaunch = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
      defaultViewport: null,
    });

    let newtab = await browserWilllaunch.newPage();
    await newtab.goto(loginLink);

    await newtab.type("input[id='input-1']", email, {
      delay: 100,
    });
    await newtab.type("input[id='input-2']", password, {
      delay: 100,
    });
    await newtab.click(
      "button.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled span.ui-text",
      { delay: 100 }
    );

    await waitAndClick("a[data-attr1='algorithms']", newtab);

    await waitAndClick("input[value='warmup']", newtab);

    let allquestions= await newtab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
    console.log(allquestions.length)

    await questionsolver(newtab,allquestions[0],codesol.answers[0])

  } catch (error) {
    console.log(error);
  }
})();



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
