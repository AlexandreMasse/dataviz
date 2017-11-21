function App() {
    this.imgIndex = 1;
    this.yearIndex = 0;
    this.nbImg = 50;
    this.zIndex = 1;
    this.populationData = {};
    this.forestData = {};

    //Dom element
    this.body =  document.querySelector('body');
    console.dir(this.body);
    this.populationDataUi = document.querySelector('p.population');
    this.yearUi = document.querySelector("p#year");

}



App.prototype = {


    getData : function(){
        const data = new Data();
        this.populationData = data.getDataPopulation();
        this.forestData = data.getDataForest();

        console.log(Object.keys(this.populationData)[0]);
    },


    updateUiData(i = this.yearIndex) {

        this.yearUi.innerText = Object.keys(this.populationData)[i];

        //this.populationDataUi.innerText = Object.values(this.populationData)[i]




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

        this.getData();
        this.updateUiData();
        this.addListener();
        this.generateImg();

    },

};




let app = new App();
app.init();






