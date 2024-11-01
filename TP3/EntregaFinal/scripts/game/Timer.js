

class Timer {
    constructor(time, ctx, game) {
        this.initialTime = time;
        this.ctx = ctx;
        this.game = game;
        this.pausa = false;
        this.remainingtime = time;
        this.empate = false;
        this.contar = setInterval(() => {
            if(this.game.isHabilitado()){
                if (this.remainingtime >= 0  && !this.pausa && !this.empate ) {
                    this.draw(this.remainingtime);
                    this.remainingtime--;

                } else if (this.remainingtime < 0) {
                    alert("Empate! No hay mas tiempo");
                    this.borrarIntervalo();
                    this.empate = true; //empate
                    this.game.finalizarJuego();
                }
            }
        }, 1000);
    }

    resetTimer() {
        this.remainingtime = this.initialTime;
    }

    borrarIntervalo() {
        clearInterval(this.contar);

    }
    
    drawTimer(){
        this.draw(this.remainingtime);
    }
    draw(timeRemaining) {
        // Limpia la zona del temporizador antes de dibujar el nuevo tiempo
        // Limpiar el área del temporizador
        this.ctx.clearRect(40 - 50, 0, 100, 50);  // Borra el área específica del temporizador
        
        // Color de fondo temporal para verificar que el área se está limpiando
        this.ctx.fillStyle = "#1C1F3E";
        this.ctx.fillRect(40 - 50, 0, 100, 50);  // Redibuja un fondo limpio para la zona del temporizador
        
        // Calcula la posición centrada
        const centerX = 1205 / 2;
        
        // Convierte el tiempo restante en minutos y segundos
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        // Da formato al tiempo (ejemplo: "02:05")
        const timeText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Estilo del texto del temporizador
        this.ctx.font = '24px Play';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
    
        // Dibuja el temporizador centrado
        this.ctx.fillText(timeText, 40, 40);
    }

    getRemainingTime(){
        return this.remainingtime;
    }

    setPausa(pausa) {
        this.pausa = pausa; //bool
    }

    isEmpate(){
        return this.empate;
    }

}