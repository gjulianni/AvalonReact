import React, { useRef, useEffect } from 'react';
import './Snowfall.css'

class Snowflake {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 1 + 1; // tamanho do floco de neve
    this.speedX = Math.random() * 0.6 - 0.25; // leve variação horizontal
    this.speedY = Math.random() * 1 + 0.3; // velocidade de queda
  }
  
  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Se o floco sair da tela, recomeça no topo
    if (this.y > canvasHeight) {
      this.x = Math.random() * canvasWidth;
      this.y = -this.radius;
    }
  }
}

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakes: Snowflake[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    
    for (let i = 0; i < 80; i++) {
      snowflakes.push(new Snowflake(canvasWidth, canvasHeight));
    }

    const animate = () => {
      if (!ctx) return;

      // Limpa o canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Desenha cada floco de neve
      snowflakes.forEach((flake) => {
        flake.update(canvasWidth, canvasHeight);
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      });

      // Continua a animação
      requestAnimationFrame(animate);
    };

    // Inicia a animação
    animate();
  }, [snowflakes]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default Snowfall;