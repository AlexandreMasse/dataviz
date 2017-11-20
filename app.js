
let indexImg = 1;
let nbImg = 50;

let zIndex = 1;

const body =  document.querySelector('body');
console.dir(body);

for (let i = 1; i < nbImg; i++) {
    let div = document.createElement('div');

    div.style.backgroundImage = "url(\"../dataviz/img/" + i + ".JPG\")";
    body.appendChild(div)

}

window.addEventListener("keydown", function (e) {
    //console.log(e);

    if (e.code === "Space") {
       // body.children[(body.children.length - indexImg)].style.display = "none";
       body.children[(body.children.length - indexImg)].style.zIndex = zIndex;
       zIndex++;
       indexImg++;


        if (indexImg > nbImg) {
           /* for (let j = 0; j < body.children.length; j++ ) {
                let child = body.children[j];
                child.style.display = "block"
            }*/
            indexImg = 1
        }
    }
});