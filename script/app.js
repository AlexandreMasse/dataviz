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

    //Dom elements
    this.body =  document.querySelector('body');
    this.populationDataUi = document.querySelector('p#population span');
    this.yearUi = document.querySelector("p#year span");
    this.arbreUi = document.querySelector("p#arbre span");

    //this.timerUi = document.querySelector("p#timer span");
    this.timerMinuteUi = document.querySelector("p#timer span#timerMinute");
    this.timerSecondeDecimalUi = document.querySelector("p#timer span#timerSecondDecimal");
    this.timerSecondeUnitUi = document.querySelector("p#timer span#timerSecondUnit");

    this.timerArbreUi = document.querySelector("p#timerArbre span");



}



App.prototype = {

    setBodymovin : function () {

        this.animation1 = bodymovin.loadAnimation({
            container: document.getElementById('trunkAnimation1'), // Required
            path: 'img/tronc_anim1.json', // Required
            renderer: 'svg/canvas/html', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "animationName", // Name for future reference. Optional.
        });

        this.animation2 = bodymovin.loadAnimation({
            container: document.getElementById('trunkAnimation2'), // Required
            path: 'img/tronc_anim2.json', // Required
            renderer: 'svg/canvas/html', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "animationName", // Name for future reference. Optional.
        });

        this.animation3 = bodymovin.loadAnimation({
            container: document.getElementById('trunkAnimation3'), // Required
            path: 'img/tronc_anim3.json', // Required
            renderer: 'svg/canvas/html', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "animationName", // Name for future reference. Optional.
        });
        this.animation4 = bodymovin.loadAnimation({
            container: document.getElementById('trunkAnimation4'), // Required
            path: 'img/tronc_anim4.json', // Required
            renderer: 'svg/canvas/html', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "animationName", // Name for future reference. Optional.
        });


/*

        setTimeout(function () {
            this.animation1.play()
        }.bind(this), 2000);

        setTimeout(function () {
            document.getElementById('trunkAnimation1').style.display = 'none';
        }, 3000);

        setTimeout(function () {
            animation2.play()
        }, 4000);

        setTimeout(function () {
            document.getElementById('trunkAnimation2').style.display = 'none';
        }, 5000);

        setTimeout(function () {
            animation3.play()
        }, 6000);


        setTimeout(function () {
            document.getElementById('trunkAnimation3').style.display = 'none';
        }, 7000);

        setTimeout(function () {
            animation4.play()
        }, 8000);
*/


    },

    setOdometer : function () {

        new Odometer({
            el: this.yearUi,
            value: 1990,
            duration: 3000,

            format: '',
            theme: 'minimal',
        });

        new Odometer({
            el: this.populationDataUi,
            value: 0,
            duration: 80,
            format: '',
            theme: 'minimal',
        });

        new Odometer({
            el: this.timerMinuteUi,
            value: 0,
            duration: 80,
            format: '',
            theme: 'minimal',
        });

        new Odometer({
            el: this.timerSecondeDecimalUi,
            value: 0,
            duration: 80,
            format: '',
            theme: 'minimal',
        });


        new Odometer({
            el: this.timerSecondeUnitUi,
            value: 0,
            duration: 80,
            format: '',
            theme: 'minimal',
        });

         new Odometer({
            el: this.timerArbreUi,
            value: 0,
            duration: 80,
            format: '',
            theme: 'minimal',
        });

    },

    setTimer : function () {
        setInterval(function () {

            let currentMinute = Math.floor(this.timer / 60 );
            let currentSecond = Math.floor(this.timer % 60);


            let currentSecondUnit = Math.floor(currentSecond % 10);

            let currentSecondDecimal = Math.floor( currentSecond / 10 );




           //Seconds with 2 numbers
            //currentSecond = currentSecond < 10 ? '0' + currentSecond.toString() : currentSecond.toString();
            //this.timerUi.innerText = currentMinute + ":" + currentSecond;


            this.timerMinuteUi.innerText = currentMinute;
            this.timerSecondeDecimalUi.innerText = currentSecondDecimal;
            this.timerSecondeUnitUi.innerText = currentSecondUnit;



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


            if (this.imgIndex === 1) {
                this.animation1.play();
                setTimeout(function () {
                    document.getElementById('trunkAnimation1').style.display = 'none';
                }, 1000)
            }

            if (this.imgIndex === 2) {
                this.animation2.play();
                setTimeout(function () {
                    document.getElementById('trunkAnimation2').style.display = 'none';
                }, 1000)
            }
            if (this.imgIndex === 3) {
                this.animation3.play();
                setTimeout(function () {
                    document.getElementById('trunkAnimation3').style.display = 'none';
                }, 1000)
            }

            if (this.imgIndex === 4) {
                this.animation4.play();
               /* setTimeout(function () {
                    document.getElementById('trunkAnimation4').style.display = 'none';
                    document.querySelector("svg g[data-name=\"" + (this.imgIndex + 1) + "\"]").style.display = "initial";

                }.bind(this), 1000)*/
            }

            if (this.imgIndex === 5) {
                document.getElementById('trunkAnimation4').style.display = 'none';
                document.querySelector("svg g[data-name=\"" + (this.imgIndex + 1) + "\"]").style.display = "initial";
            }


            if (this.imgIndex % 2 === 0){
                console.log('paire !');
                this.yearIndex++;
                this.updateUiData(this.yearIndex);

            }

           /* if (this.imgIndex <= this.nbImg - 4) {
                console.log(" svg g[data-name=\"" + (this.imgIndex + 5) + "\"]");
                document.querySelector("svg g[data-name=\"" + (this.imgIndex + 5) + "\"]").style.display = "initial";
                document.querySelector("svg g[data-name=\"" + (this.imgIndex + 5 - 1) + "\"]").style.display = "none";
                this.imgIndex++;
            }*/



            if (this.imgIndex > 5 && this.imgIndex <= this.nbImg) {
                console.log(" svg g[data-name=\"" + (this.imgIndex) + "\"]");
                document.querySelector("svg g[data-name=\"" + (this.imgIndex) + "\"]").style.display = "initial";
                document.querySelector("svg g[data-name=\"" + (this.imgIndex - 1) + "\"]").style.display = "none";

            }


           /* this.body.children[(this.body.children.length - this.imgIndex)].style.zIndex = this.zIndex;
            this.zIndex++;*/

           /*

            if (this.imgIndex > this.nbImg) {
                this.imgIndex = 1
            }*/

            this.imgIndex++;
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




    init: function() {

        this.setBodymovin();
        this.setOdometer();
        this.setTimer();
        this.updateUiData();
        this.addListener();


    },

};


let app = new App();
app.init();








