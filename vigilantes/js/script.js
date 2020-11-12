(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let probFoco = 25;
  let reserva;
  let focos = [];
  let status;
  let score;
  let lifes;
  let gameLoop;
  let gameOver;
  let luck=0;

  function init() {

    gameOver = false;
    status = document.createElement("div");
    status.className = "status";
    lifes = new Lifes()
    score = new Score()

    for(var life=0; life < 5; life++) new Life();
    
    status.appendChild(lifes.element);
    status.appendChild(score.element);
    document.body.appendChild(status);

    reserva = new Reserva();
  
    gameLoop = setInterval(run, 1000/FPS);
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
    if(e.key === 'r'){
      clearInterval(gameLoop);
      init();
    }
  })

  function validate_position () {

   
    var valid = false;
    var lY = [0,400, 616,967]
    var lX = [600,1500, 28,296]
    
    while(!valid){

      var x = Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))
      var y =  Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))

      if(((x > lX[0] && x < lX[1]) || (y > lY[0] && y < lY[1])) && ((x > lX[2] && x < lX[2]) || (y > lY[2] && y < lY[3]))){
        valid = false;
      }else {
        valid = true;
      }
    }
      return [x,y];
  }

  class GameOver {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "gameOver";
      this.element.innerHTML =  '<div class="results">'+ 
                                  '<h1>GAME OVER</h1>'+
                                  '<h3>score: '+score.score+'</h3>'+
                                '</div>'
      reserva.element.appendChild(this.element);
    }
  }

  class Score {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "score";
      this.score = 0;
      this.element.innerHTML = "Score: 00"
      this.update_score = function (){
        this.score = this.score+10;
        this.element.innerHTML = "Score:"+this.score;
      }
      status.appendChild(this.element);
    }
  }

  class Lifes {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "lifes";
      this.count = 5;
      status.appendChild(this.element);
    }
  }

  class Life {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "life";
      lifes.element.appendChild(this.element);
    }
  }

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.id = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      this.element.onclick = function (e){
        console.log(e)
      }
      document.body.appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      var XY = validate_position()
      this.element.style.left = `${XY[0]}px`;
      this.element.style.top = `${XY[1]}px`;
      this.element.setAttribute("data-index",luck)
      luck++;
      this.element.setAttribute("data-state","burn")
      this.element.onclick = function (){
        update_foco();
        if(this.getAttribute("data-state") == "burn"){
          this.style.display = "none";
          focos.splice(this.getAttribute("data-index"),1);
          score.update_score();
        }
      }
      this.keep_alive = new Date();
      this.keep_alive.setSeconds(this.keep_alive.getSeconds() + 2);
      console.log(focos.length+":"+this.keep_alive);
      reserva.element.appendChild(this.element);
    }
  }

  function update_foco () {
    
    for(var foc=0; foc < focos.length; foc++){
      var current_time = new Date();
      var foco = focos[foc];

      if(foco.element.getAttribute("data-state") == "burn"){
        foco.element.setAttribute("data-index",foc)
        if (current_time > foco.keep_alive){

          console.log("remove:"+foc+":"+foco.keep_alive);
          foco.element.style.backgroundImage = "url('css/assets/devastacao.png')";
          foco.element.setAttribute("data-state","burned")
          lifes.count--;
          if(lifes.count == 0){ 
            gameOver = true;
            new GameOver();
          }
          focos.splice(foc, 1);
          if(lifes.element.children.length > 0) lifes.element.removeChild(lifes.element.lastChild);

        }
      }
    } 
  }

  function run () {
    if(!gameOver){
      if (Math.random() * 100 < probFoco) {
        let foco = new FocoIncendio();
        focos.push(foco);
      }
      update_foco();
    } 
  }

  init();
})();
