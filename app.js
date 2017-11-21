function App() {
    this.indexImg = 1;
    this.nbImg = 50;
    this.zIndex = 1;

    this.body =  document.querySelector('body');
    console.dir(this.body);
}



App.prototype = {

    init: function() {

        for (let i = 1; i < this.nbImg; i++) {
            let div = document.createElement('div');

            div.style.backgroundImage = "url(\"../dataviz/img/" + i + ".JPG\")";
            this.body.appendChild(div)

        }

        window.addEventListener("keydown", function (e) {

            if (e.code === "Space") {
                // body.children[(body.children.length - indexImg)].style.display = "none";
                this.body.children[(this.body.children.length - this.indexImg)].style.zIndex = this.zIndex;
                zIndex++;
                this.indexImg++;

                if (this.indexImg > this.nbImg) {
                    /* for (let j = 0; j < body.children.length; j++ ) {
                         let child = body.children[j];
                         child.style.display = "block"
                     }*/
                    this.indexImg = 1
                }
            }
        }.bind(this));


        function makeRequest(url, type){
            let httpRequest = new XMLHttpRequest();
            httpRequest.open('POST', url);
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequest.send();
            httpRequest.onreadystatechange = function (){
                listenResponse(httpRequest, type);
            }

        }

        function listenResponse(httpRequest, type){
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = JSON.parse(httpRequest.responseText);
                    console.log(response);
                    getResponse(response, type)
                } else {
                    alert('request issue');
                }
            }
        }


        function getResponse(response, type) {
            if (type === 'population') {

                console.log('population !');
            }
        }

        makeRequest('data/population.json', 'population');


    },



};

let app = new App();
app.init();




