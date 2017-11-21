function App() {
    this.imgIndex = 1;
    this.yearIndex = 0;
    this.nbImg = 50;
    this.zIndex = 1;

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

}




App.prototype = {

    updateUiData(i = this.yearIndex) {

        let year =  Object.keys(this.populationData)[i];
        let population = Object.values(this.populationData)[i];
        let forestArea = Object.values(this.forestData)[i];

        if (year <= 2015){
            //Year
            this.yearUi.innerText = year;

            //Population
            this.populationDataUi.innerText = population;

            //Arbres
            this.arbreUi.innerText = Math.floor( ( forestArea * this.density ) / population );
        }

        //console.log((surfaceForest * density) / nbPopulation);

    },

    addListener: function() {
        window.addEventListener("keydown", this.onKeyDown.bind(this))
    },


    onKeyDown: function(e) {
        console.log(e);

        if (e.code === "Space") {

            if (this.imgIndex % 2 === 0){
                console.log('paire !');

                this.updateUiData(this.yearIndex);
                this.yearIndex++;
            }

            this.body.children[(this.body.children.length - this.imgIndex)].style.zIndex = this.zIndex;
            this.zIndex++;

            this.imgIndex++;

            if (this.imgIndex > this.nbImg) {
                this.imgIndex = 1
            }
        }
    },

    generateImg : function() {

        for (let i = 1; i < this.nbImg; i++) {
            let div = document.createElement('div');

            div.style.backgroundImage = "url(\"../dataviz/img/" + i + ".JPG\")";
            this.body.appendChild(div)

        }
    },

    init: function() {

        this.updateUiData();
        this.addListener();
        this.generateImg();

    },

};


let app = new App();
app.init();






