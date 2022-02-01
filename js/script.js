var canvas, context, barraWidth, barraHeigth, jogadorPosX, jogadorPosY, 
teclaCimaPressionada, teclaBaixoPressionada, oponentePosX,  oponentePosY
oponenteParaCima, bolaRaio, bolaPosX, bolaPosY, bolaParaDireita, bolaAngulo
bolaTempo, velocidadeJogador, velocidadeOponente, velocidadeBola, pontosJogador, pontoOponente;


function iniciarJogo(){

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");


    barraWidth = 30;
    barraHeigth = 90;
    jogadorPosY = (canvas.height - barraHeigth) / 2;
    jogadorPosX = 0;
    teclaBaixoPressionada = false;
    teclaCimaPressionada = false;

    oponentePosX = canvas.width - barraWidth;
    oponentePosY = 0;
    oponenteParaCima = false;

    bolaRaio = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = canvas.height / 2;

    bolaParaDireita = false;
    bolaAngulo = Math.floor(Math.random() * 21) - 10; //faz bola ir para uma direçao aleatoria
    bolaTempo = 0;
    velocidadeJogador = 15;
    velocidadeOponente = 30;
    velocidadeBola = 10;
    pontosJogador = 0;
    pontoOponente = 0;


    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);

    setInterval(loopGame, 30);

}

function keyUp(e){
    if(e.keyCode == 38){
        teclaCimaPressionada = false;
    }else if(e.keyCode == 40){
        teclaBaixoPressionada = false;
    }
}

function keyDown(){
    if(e.keyCode == 38){
        teclaCimaPressionada = true;
    }else if(e.keyCode == 40){
        teclaBaixoPressionada = true;
    }
}

function loopGame(){
    

    //Jogador

    if(teclaCimaPressionada != teclaBaixoPressionada){ //se o usuario pressionar tecla para cima
        if(teclaCimaPressionada){ //se for para cima pressionado
            if(jogadorPosY > 0){ //se a bola não sair da tela
                jogadorPosY -= velocidadeJogador; //muda a posição do jogador
            }
        }
        else { //se for para baixo
            if(jogadorPosY < (canvas.height - barraHeigth)){ //se a bola não saiu da tela
                jogadorPosY += velocidadeJogador; //muda a posição
            }
        }
    }


    //Oponente

    if(oponenteParaCima){ //caso oponente indo para cima
        oponenteParaCima -= velocidadeOponente;
        if(oponentePosY <= 0){ // se a bola estiver saindo da tela
            oponenteParaCima = false;
        }
    }
    else{ //se o oponente estiver se movendo para cima
        oponentePosY >= (canvas.height - barraHeigth){ //caso a bola estiver saindo

        }
    }
}