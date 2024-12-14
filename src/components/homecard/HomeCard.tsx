import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import './HomeCard.css';
import { FaSteam } from 'react-icons/fa';  // Ícone Steam
import { FaDiscord } from 'react-icons/fa';  // Ícone Discord
import { FaCrown } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const VideoComponent = () => {
  const videoRef = useRef<HTMLDivElement>(null); // Referência para o container do vídeo
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade

  const navigate = useNavigate();

  const handleVIPClick = () => {
    navigate('/vip')
  }

  const handleServersClick = () => {
    navigate('/servers')
    window.scrollTo(0, 0);
  }

  const opts = {
    
    playerVars: {
      autoplay: 1,  // Auto play
      controls: 0,  // Não mostrar controles
      showinfo: 0,  // Não mostrar título do vídeo
      modestbranding: 1,  // Esconder logotipo do YouTube
      rel: 0,  // Não mostrar vídeos relacionados ao final
      fs: 0,  // Não permitir fullscreen
      iv_load_policy: 3,
      mute: 1,
      start: 3, // Iniciar a partir de 3 segundos
      end: 60,  // Terminar após 60 segundos
    },
  };

  const videoId = 'jCrBYdMwm8U';

  const onReady = (event: any) => {
    const player = event.target;
    player.playVideo(); 
  };

  const onEnd = (event: any) => {
    const player = event.target;
    player.seekTo(0);
    player.playVideo();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Ativa animação quando o elemento entra na tela
        }
      },
      {
        threshold: 0.5, // O elemento precisa estar 50% visível para ser considerado visível
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current); // Inicia a observação do container
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current); // Para de observar quando o componente for desmontado
      }
    };
  }, []);

  return (
    <div className={`video-container ${isVisible ? 'visible' : ''}`} ref={videoRef}>
      <div className="text-content">
        <h1>AVALON</h1>
        <p>Descubra a experiência única que o AVALON tem a oferecer. Junte-se a nós e viva uma aventura como nunca antes!</p>
        <p>Com modos inovadores, uma comunidade ativa e atualizações constantes, você vai querer jogar sempre mais!</p>
        
        {/* Botões em linha */}
        <div className="button-container">
        <button className="btn" onClick={handleServersClick}>
        <FaSteam style={{ marginRight: '8px' }} />
        Servidores
      </button>
      <button className="btn" onClick={handleVIPClick}>
        <FaCrown style={{ marginRight: '8px' }} />
        VIP
      </button>
      <a href='https://discord.gg/q6CMdxZ9Rd' target='_blank'>
      <button className="btn">
        <FaDiscord style={{ marginRight: '8px' }} />
        Discord
      </button>
      </a>
        </div>
      </div>
      
      <div className="video-wrapper">
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onReady={onReady} 
          onEnd={onEnd}
        />
      </div>
    </div>
  );
};

export default VideoComponent;