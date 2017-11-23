function App() {
    this.imgIndex = 0;
    this.yearIndex = 0;
    this.nbImg = 50;
    this.zIndex = 1;
    this.timer = 0;
    this.treeIndex = 1;

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
            container: document.getElementById('trunkAnimation1'),
            path: 'img/trunk/tronc_anim1.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
            name: "animationName",
        });


        this.animation2 = bodymovin.loadAnimation({
            container: document.getElementById('trunkAnimation2'),
            path: 'img/trunk/tronc_anim2.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
            name: "animationName",
        });

        this.animation3 = bodymovin.loadAnimation({
            container: document.getElementById('trunkAnimation3'),
            path: 'img/trunk/tronc_anim3.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
            name: "animationName",
        });
        this.animation4 = bodymovin.loadAnimation({
            container: document.getElementById('trunkAnimation4'),
            path: 'img/trunk/tronc_anim4.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
            name: "animationName",
        });

        this.animation1.setSpeed(0.9);
        this.animation2.setSpeed(0.9);
        this.animation3.setSpeed(0.9);
        this.animation4.setSpeed(0.9);



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
            el: this.arbreUi,
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
        }.bind(this), 1000);
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
            console.log(this.imgIndex);
            this.imgIndex++;

            //Update Ui
            if (this.imgIndex % 2 === 0){
                console.log('paire !');
                this.yearIndex++;
                this.updateUiData(this.yearIndex);
            }

            if (this.imgIndex === 1) {
                this.animation1.play();
                /*setTimeout(function () {
                    document.getElementById('trunkAnimation1').style.display = 'none';
                }, 1000)*/
            }

            if (this.imgIndex === 2) {
                this.animation1.destroy();
                this.animation2.play();

               /* setTimeout(function () {
                    document.getElementById('trunkAnimation2').style.display = 'none';
                }, 1000)*/
            }
            if (this.imgIndex === 3) {
                this.animation2.destroy();
                this.animation3.play();
                /*setTimeout(function () {
                    document.getElementById('trunkAnimation3').style.display = 'none';
                }, 1000)*/
            }

            if (this.imgIndex === 4) {
                this.animation3.destroy();
                this.animation4.play();

               /* setTimeout(function () {
                    document.getElementById('trunkAnimation4').style.display = 'none';
                    document.querySelector("svg#trunks g[data-name=\"" + (this.imgIndex + 1) + "\"]").style.display = "initial";
                }.bind(this), 1000)*/
            }

            if (this.imgIndex === 5) {

                /*const svgTrunksDocument = document.querySelector("object#trunks").contentDocument;

                let gs = svgTrunksDocument.querySelectorAll("svg g > g");
                for (let i = 0; i < gs.length; i++){
                    let g = gs[i];
                    g.style.opacity = "0";
                    //g.style.display = "initial";

                }*/

                this.animation4.destroy();


                document.querySelector("svg#trunks g[data-name=\"" + (this.imgIndex + 1) + "\"]").style.display = "initial";
            }




            if (this.imgIndex > 5 && this.imgIndex <= this.nbImg) {

                console.log(" svg g[data-name=\"" + (this.imgIndex) + "\"]");
                document.querySelector("svg#trunks g[data-name=\"" + (this.imgIndex + 1) + "\"]").style.display = "initial";
                document.querySelector("svg#trunks g[data-name=\"" + (this.imgIndex) + "\"]").style.display = "none";

            }





           /* this.body.children[(this.body.children.length - this.imgIndex)].style.zIndex = this.zIndex;
            this.zIndex++;*/
           /*

            if (this.imgIndex > this.nbImg) {
                this.imgIndex = 1
            }*/


            if (this.imgIndex % 2 === 1 && this.imgIndex > 5 && this.imgIndex <= this.nbImg){

                document.querySelector("svg#background g[data-name=\"arbre " + this.treeIndex + "\"]").style.display = "none";

                this.treeIndex++;
            }



            //this.imgIndex++;
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








