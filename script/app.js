function App() {
    this.imgIndex = 1;
    this.yearIndex = 0;
    this.nbImg = 50;
    this.zIndex = 1;
    this.timer = 0;

    //Data
    this.data = new Data();
    this.populationData = this.data.getDataPopulation();
    this.forestData = this.data.getDataForest();
    this.density = this.data.getDensity();

    console.log(this.density);

    //Dom elements
    this.body =  document.querySelector('body');
    this.populationDataUi = document.querySelector('p#population span');
    this.yearUi = document.querySelector("p#year span");
    this.arbreUi = document.querySelector("p#arbre span");
    this.timerUi = document.querySelector("p#timer span");
    this.timerArbreUi = document.querySelector("p#timerArbre span");

}




App.prototype = {

    setTimer : function () {
        setInterval(function () {

            let currentMinute = Math.floor(this.timer / 60 ).toString();
            let currentSecond = Math.floor(this.timer % 60);

           //Seconds with 2 numbers
            currentSecond = currentSecond < 10 ? '0' + currentSecond.toString() : currentSecond.toString();

            this.timerUi.innerText = currentMinute + ":" + currentSecond;



            this.timerArbreUi.innerText = this.timer * (2400/60);

            this.timer++;
        }.bind(this), 1000)
    },

    updateUiData(yearIndex = this.yearIndex) {

        let year =  Object.keys(this.populationData)[yearIndex];
        let population = Object.values(this.populationData)[yearIndex];
        let forestArea = Object.values(this.forestData)[yearIndex];

        if (year <= 2015){
            //Year
            this.yearUi.innerText = year;
            //Population
            this.populationDataUi.innerText = Math.floor(population);
            //Arbres
            this.arbreUi.innerText = Math.floor( ( forestArea * this.density ) / population );
        }

    },

    addListener: function() {
        window.addEventListener("keydown", this.throttle(this.onKeyDown.bind(this), 250))
    },


    onKeyDown: function(e) {

        if (e.code === "Space") {

            if (this.imgIndex % 2 === 0){
                console.log('paire !');
                this.yearIndex++;
                this.updateUiData(this.yearIndex);

            }

            if (this.imgIndex <= this.nbImg - 4) {
                console.log(" svg g[data-name=\"" + (this.imgIndex + 4) + "\"]");
                document.querySelector("svg g[data-name=\"" + (this.imgIndex + 4) + "\"]").style.display = "none";
                this.imgIndex++;
            }


           /* this.body.children[(this.body.children.length - this.imgIndex)].style.zIndex = this.zIndex;
            this.zIndex++;*/

           /*

            if (this.imgIndex > this.nbImg) {
                this.imgIndex = 1
            }*/
        }

    },

    throttle : function(callback, delay) {
        var last;
        var timer;
        return function () {
            var context = this;
            var now = +new Date();
            var args = arguments;
            if (last && now < last + delay) {
                // le délai n'est pas écoulé on reset le timer
                clearTimeout(timer);
                timer = setTimeout(function () {
                    last = now;
                    callback.apply(context, args);
                }, delay);
            } else {
                last = now;
                callback.apply(context, args);
            }
        };
    },


    generateImg : function() {

        for (let i = 1; i < this.nbImg; i++) {
            let div = document.createElement('div');

            div.style.backgroundImage = "url(\"../dataviz/img/" + i + ".JPG\")";
            this.body.appendChild(div)

        }
    },



    init: function() {

        this.setTimer();
        this.updateUiData();
        this.addListener();
        //this.generateImg();

    },

};


let app = new App();
app.init();






