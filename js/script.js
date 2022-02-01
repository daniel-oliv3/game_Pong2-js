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
        oponentePosY += velocidadeOponente;
        if( oponentePosY >= canvas.height - barraHeigth){ //caso a bola estiver saindo da tela){ 
            oponenteParaCima = true;
        }
    }

    //Bola
    if(bolaTempo <= 0){ // caso a bola estiver em jogo, o tempo e zerado apos marcar ponto, a bola ficara invisivel por um tempo
        if((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)){ // caso o jogador encoste na bola no eixo X
            if((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeigth)){ //caso jogador encoste na bola no eixo Y
                bolaParaDireita = true;
                if(teclaBaixoPressionada){  //se o jogador estiver indo para baixo e tocar na bola 
                    bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda a bola para a diagonal para cima
                }
                else {
                    bolaAngulo = Map.floor(Math.randon() * 10); // manda a bola para a diagonal para baixo
                }
            }
        }
        else{
            if((bolaPosX + bolaRaio) > oponentePosX){ // se o oponente encostar na bola no eixo x
                if((bolaPosY + bolaRaio) > oponentePosY && (bolaPosY - bolaRaio < oponentePosY + barraHeigth)){ // se o oponente encostar na bola no eixo y
                    bolaParaDireita = false;
                    if(oponenteParaCima){ // caso o oponente estiver indo pra cima tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10) - 9; //manda a bola para a diagonal para cima
                    }
                    else { // caso o oponente estiver indo para baixo quando tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10); // manda a bola para a diagonal para baixo
                    }
                }
            }
        }

        //verifica se a bola ta bantendo ara cima ou para baixo na tela
        if((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)){
            bolaAngulo = bolaAngulo * -1; //multiplicamos por -1 para inverter a direção da bola no eixo y
        }
        bolaPosY += bolaAngulo; //move a bola para cima ou para baixo de acordo com o calculo acima

        if(bolaParaDireita){
            bolaPosX += velocidadeBola; //move a bola para direita
        }
        else {
            bolaPosX -= velocidadeBola; //move a bola para esquerda
        }
    }

    if((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)){ // se a bola si da tela
        if(bolaTempo >= 50){ // se o tempo de deixar a bola invisivel passou
            if(bolaPosX <= -bolaRaio){ // se a bola saiu na esquerda
                pontoOponente++;
            }
            else { // se a bola saiu a direita
                pontosJogador++;
            }

            bolaPosX = canvas.width / 2; //coloca a bola no centro da tela
            bolaPosY = canvas.height / 2; //coloca a bola no centro da tela
            
            bolaParaDireita = false;
            bolaAngulo = Math.floor(Math.random() * 21) - 10; 
            bolaTempo = 0; // zera o tempo de deixar a bola invisivel e coloca novamente em jogo
        }
        else { // caso o tempo de deixar a bola invisivel não acabou
            bolaTempo++; 
        }
    }

    // DESENHA TODA A TELA
context.clearRect(0, 0, canvas.width, canvas.height); //limpa a tela antes de desenhar

//Jogador e Oponente
context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeigth); // desenha jogador
context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeigth); // desenha oponente

//Bola
context.beginPath(); // modo desenho
context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); //desenha o circulo com as coordernadas no centro
context.closePath(); // finaliza o caminho "não obrigatorio"
context.fill();

//Placar
var pontosA = pontosJogador; //variaveis temporaria para alterar a pontuação
var pontosB = pontosOponente;

if(pontosA < 10){  //coloca zero a esquerda se for menor 10 a pontuação
    pontosA = "0" + pontosA;
}

if(pontosB < 10){  //coloca zero a esquerda se for menor 10 a pontuação
    pontosA = "0" + pontosB;
}

//desenha o placar
context.font = "38pt Arial"; // tamanho da fonte
context.fillStyle = "#000000";
context.fillText(pontosA + " " + pontosB, (canvas.width / 2) - 70, 50); // escrevendo texto no centro da tela no top


//Linha divisória
context.beginPath();
context.moveTo(canvas.width / 2, 0); //arrumar lapis paa fazer a escrita da linha
context.lineTo(canvas.width / 2, canvas.height); // faz o risco na tela no centro
context.strokeStyle = "#000000";
context.stroke();
context.closePath();
    
}



$(function () {
    iniciarJogo();
});