(function () {
    const FPS = 1;
    let FREQ = 1000;
    let probFoco = 25;
    let probCaveira = 5;
    let gameDimensionX = 1243;
    let gameDimensionY = 960;
    let focoDimensions = [100, 130, 142, 142];
    let reserva;
    let focos = [];
    let status;
    let score;
    let lifes;
    let gameLoop;
    let gameOver;
    let id = 0;
    let game;
    let started;
    let paused;
    let pause;
    let frames = 0;
    let factor = 20;

  class Game{
    constructor(){
      document.body.innerHTML = "";
      reserva = new Reserva();
      status = new Status();
      focos = [];
      started = true;
      gameOver = false;
      paused = false;
      id = 0;
      FREQ = 1000;
      factor = 20
      this.start = function (){ 
        pause = new Pause();
        score = new Score();
        lifes = new Lifes(5);
        clearInterval(gameLoop);
        gameLoop = setInterval(run, FREQ/FPS);
      }
      this.difficult = function(){
        if(FREQ > 0){
          factor += factor * 0.03;
          FREQ = FREQ - factor;
        } 
        clearInterval(gameLoop);
        gameLoop = setInterval(run, FREQ/FPS);
      }
      this.gameover = () => { new GameOver(); }
      this.pause = () => { pause.pause(); }
      this.menu = () => { new Menu(); }
    }
  }

  class Menu {
    constructor () {
      this.element = document.createElement("div");
      this.element.id = "menu";
      this.element.innerHTML =  '<div class="results">'+ 
                                  '<h1 class="h1Verde">VIGILANTES DA FLORESTA</h1>'+
                                  '<h4>Pressione "S" para jogar</h4>'+
                                '</div>'
      reserva.element.appendChild(this.element);
    }
  }

  class Pause {
    constructor () {
      this.element = document.createElement("div");
      this.element.id = "paused";
      this.element.innerHTML = '<div class="results">'+ 
                                  '<h1 class="h1Verde">PAUSADO</h1>'+
                                  '<h4>Pressione "P" para continuar...</h4>'+
                                '</div>'
      reserva.element.appendChild(this.element);
      this.pause = function (){
        if(!gameOver && started){
          if(paused){ 
            paused = false;
            gameLoop = setInterval(run, FREQ/FPS);
            this.element.style.display = "none";
          }else{ 
            paused = true; 
            clearInterval(gameLoop); 
            this.element.style.display = "block";
          }
        }
      }
    }
  }

  class Status {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "status";  
      reserva.element.appendChild(this.element);
    }
  }
  
  window.addEventListener("keydown", function (e) {
    if (e.key === 'p') {
       game.pause();
    }
    if(e.key === 's'){
      game = new Game();
      game.start();
    }
  })
  window.addEventListener("resize", function(e){
      window.resizeTo(1243, 980);
      if(window.innerWidth > 1250){
        gameDimensionX = 1243;
        gameDimensionY = 960;
        reserva.element.style.width = "1243px";
        reserva.element.style.height = "960px";
      }else{
        gameDimensionX = window.innerWidth;
        gameDimensionY = window.innerHeight;
        reserva.element.style.width = "100%";
        reserva.element.style.height = "100%";
      }
  });

  function validate_position () {

    var valid = false;
    var lY = [450,800, 0,200]
    var lX = [0,280, 620,1070]
    var x,y;
    while(!valid){
      
      x = Math.floor((Math.random() * (gameDimensionX-focoDimensions[2])))
      y = Math.floor((Math.random() * (gameDimensionY-focoDimensions[3])))

      if(((x >= lX[0] && x <= lX[1]) && (y >= lY[0] && y <= lY[1])) || ((x >= lX[2] && x <= lX[3]) && (y >= lY[2] && y <= lY[3]))){
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
                                  '<h4>Pressione "S" para tentar novamente </h4>'+
                                '</div>'
      status.element.style.display = "none";
      reserva.element.appendChild(this.element);
      gameOver = true;
    }
  }

  class Score {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "score";
      this.score = 0;
      this.element.innerHTML = "Score:00"
      this.update_score = function (type){
        if(!gameOver){
          type == "skull"? this.score = this.score+20 : this.score = this.score+10;
          this.element.innerHTML = "Score:"+this.score;
        }
      }
      status.element.appendChild(this.element);
    }
  }

  class Lifes {
    constructor (max_lifes) {
      this.element = document.createElement("div");
      this.element.className = "lifes";
      this.count = max_lifes;
      for(var life=0; life < this.count; life++){
        var new_life = document.createElement("div");
        new_life.className = "life";
        this.element.appendChild(new_life);
      }
        
      status.element.appendChild(this.element);
    }
  }

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.id = "reserva";
      if(window.innerWidth > 1250){
        this.element.style.width = gameDimensionX+"px";
        this.element.style.height = gameDimensionY+"px";
      }else{
        this.element.style.width = "100%";
        this.element.style.height = `100%`;
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
      this.element.setAttribute("data-index",id);id++;
      this.type = false; // foco
      this.element.setAttribute("data-state","burn")
      this.element.setAttribute("data-type","focus")
      this.element.onclick = function (){
        if(!gameOver && !paused){
          update_foco();
          if(this.getAttribute("data-state") == "burn"){
            this.style.display = "none";
            focos.splice(this.getAttribute("data-index"),1);
            score.update_score(this.getAttribute("data-type"));
          }
        }
      }
      this.keep_alive = new Date();
      this.keep_alive.setSeconds(this.keep_alive.getSeconds() + 2);
      reserva.element.appendChild(this.element);
    }
  }

  class Caveira {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "caveira";
      this.element.style.width = `${focoDimensions[2]}px`;
      this.element.style.height = `${focoDimensions[3]}px`;
      var XY = validate_position()
      this.element.style.left = `${XY[0]}px`;
      this.element.style.top = `${XY[1]}px`;
      this.element.setAttribute("data-index",id);id++;
      this.type = true; //caveira
      this.element.setAttribute("data-state","burn")
      this.element.setAttribute("data-type","skull")
      this.element.onclick = function (){
        if(!gameOver && !paused){
          update_foco();
          if(this.getAttribute("data-state") == "burn"){
            this.style.display = "none";
            focos.splice(this.getAttribute("data-index"),1);
            score.update_score(this.getAttribute("data-type"));
          }
        }
      }
      this.keep_alive = new Date();
      this.keep_alive.setSeconds(this.keep_alive.getSeconds() + 2);
      reserva.element.appendChild(this.element);
    }
  }

  function update_foco () {
    
    for(var foc=0; foc < focos.length; foc++){
      var current_time = new Date();
      var foco = focos[foc];
      var state = foco.element.getAttribute("data-state");
      if(state == "burn"){
        foco.element.setAttribute("data-index",foc)
        if (current_time > foco.keep_alive){
          foco.element.setAttribute("data-state","burned")
          foco.element.style.backgroundImage = "url('css/assets/devastacao.png')";
          !foco.type? lifes.count-- : lifes.count = lifes.count-2;
          if(lifes.count <= 0){ 
            lifes.element.innerHTML = "";
            game.gameover();
            break;
          }else{
            foco.type? lifes.element.removeChild(lifes.element.lastChild): "";
            lifes.element.removeChild(lifes.element.lastChild);
          }
          focos.splice(foc, 1);
          
        }
      }
    } 
  }

  function run () {
    if(!gameOver){

      frames++;
      if(frames%60 == 0) game.difficult();
      if (Math.random() * 100 < probFoco) {
        let foco = new FocoIncendio();
        focos.push(foco);
      }
      if ((Math.random() * 100) < probCaveira) {
        let caveira = new Caveira();
        focos.push(caveira);
      }
      update_foco();
    } 
  }

  game = new Game();
  game.menu();
})();
