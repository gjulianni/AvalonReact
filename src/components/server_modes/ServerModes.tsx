import { useEffect, useState } from "react";
import GlobalStyles from "../globalstyles/GlobalStyles";
import Nav from "../nav/Nav";
import SteamAuth from "../steam/SteamAuth";
import './ServerModels.css'
import Footer from "../footer/Footer";
import { Jailbreak } from "./jailbreak/rules/Jailbreak";
import { ZombieEscape } from "./jailbreak/rules/ZombieEscape";

interface serverInfo {
    name: string;
    map: string;
    players: number;
    maxPlayers: number;
    ip: string;
    port: string;
}

interface ServerResponse {
    serverInfo: serverInfo;
    thumbnailUrl: string;
}



const ServerModels: React.FC = () => {
    const [selectedMode, setSelectedMode] = useState<'zombieEscape' | 'jailbreak'>('zombieEscape');
    const [serverInfo, setServerInfo] = useState<serverInfo | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    
    const handleModeChange = (mode: 'zombieEscape' | 'jailbreak') => {
      setSelectedMode(mode);
    };

    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                const response = await fetch(`https://malachite-bloom-bayberry.glitch.me/server-info/${selectedMode}`);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do servidor');
                }
                const data: ServerResponse = await response.json();
                console.log('Dados recebidos:', data);
                setServerInfo(data.serverInfo);
                setThumbnailUrl(data.thumbnailUrl);
            } catch (error) {
                console.error('Erro ao buscar informações do servidor:', error);
            }
        };

        fetchServerInfo();
    }, [selectedMode]);  

    const connectServer = () => {
      if(serverInfo && serverInfo !==null ) {
        window.location.href= `steam://connect/${serverInfo.ip}:${serverInfo.port}`
      }
      
    }

    const [copied, setCopied] = useState(false)

    const handleCopyIP = () => {
      if (serverInfo && serverInfo.ip && serverInfo.port) {
          const connectionString = `connect ${serverInfo.ip}:${serverInfo.port}`;
          
          // Copiar para a área de transferência
          navigator.clipboard.writeText(connectionString)
              .then(() => {
                  // Ativar o efeito de copiar
                  setCopied(true);
  
                  // Reverter o efeito após 1 segundo
                  setTimeout(() => setCopied(false), 1000);
              })
              .catch((error) => {
                  console.error('Erro ao copiar texto:', error);
              });
      } else {
          console.error('Informações do servidor não estão completas.');
      }
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Atualiza o estado de largura quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Definindo estilos dinâmicos com base na largura da tela
  const dynamicStyles: React.CSSProperties = {
    backgroundImage: `url(${thumbnailUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '55%',
    height: '100%',
    clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 10% 100%)',
  };

  // Modificando o estilo dependendo da largura da tela
  if (screenWidth <=395) {
    dynamicStyles.backgroundSize = 'auto 100%';
    dynamicStyles.backgroundPosition = 'left center'
    dynamicStyles.clipPath = 'polygon(65% 0, 100% 0, 100% 100%, 30% 100%)';
  }
  else if (screenWidth <= 480) {
    dynamicStyles.backgroundSize = 'auto';
    dynamicStyles.backgroundPosition = 'left top';
    dynamicStyles.clipPath = 'polygon(65% 0, 100% 0, 100% 100%, 10% 100%)';
    dynamicStyles.width = '60%';
  } else if (screenWidth <= 768) {
    dynamicStyles.backgroundSize = 'auto 100%';
    dynamicStyles.backgroundPosition = 'left center';
  } 

  /* 
  
  style={{
                                backgroundImage: `url(${thumbnailUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center right',
                                backgroundRepeat: 'no-repeat',
                                clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 10% 100%)',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '55%',
                                height: '100%',
                            }}
  */

    return (
        <>
        <GlobalStyles />      
            <Nav />
            <SteamAuth />
           
        <div className="server-models">
        <div className="button-group">
        <button
  className={`custom-button ${selectedMode === 'zombieEscape' ? 'active' : ''}`}
  onClick={() => handleModeChange('zombieEscape')}
  id="btn-ze"
>
  Zombie Escape
</button>
          <button
            className={`custom-button ${selectedMode === 'jailbreak' ? 'active' : ''}`}
            onClick={() => handleModeChange('jailbreak')}
            id="btn-jb"
          >
            Jailbreak
          </button>
        </div>
  
        <div className="content-container">
        <div className="tracking-container" style={{ position: 'relative' }}>
        <div className="tracking-side-options">
        <div className="tooltip">
                      <button className="connect-to-server" onClick={connectServer}>▶</button>
                      <span className="tooltip-text">Conectar ao servidor</span>
                    </div>
                    <div className="tooltip">
                    <button
        className={`connect-to-server ${copied ? 'copied' : ''}`}
        onClick={handleCopyIP}
    >
         <span className="icon-original">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 0 20 20" fill="currentColor" style={{ padding: '1px', color: '#01468f', width: '26px', height: '28px' }}>
            <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd"></path>
            <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z"></path>
            <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z"></path>
        </svg>
    </span>
        {copied && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="checkmark-icon">
                <path fillRule="evenodd" d="M16.293 4.293a1 1 0 0 1 1.414 1.414L9 13.414 6.293 10.707a1 1 0 1 1 1.414-1.414L9 10.586l7.293-7.293z" clipRule="evenodd"></path>
            </svg>
        )}
    </button>                   
                      <span className="tooltip-text">Copiar IP para a área de transferência</span>
                    </div>
                    </div>
                    {thumbnailUrl && (
                        <div
                            className="tracking-image"
                            style={
                                dynamicStyles
                            }
                        />
                    )}
            
            {serverInfo ? (
                        <div className="infos-servers">
                            <h3>{serverInfo.name}</h3>
                            <p>Mapa Atual: {serverInfo.map}</p>
                            <p>Jogadores: {serverInfo.players}/{serverInfo.maxPlayers}</p>
                        </div>
                    ) : (
                        <p>Carregando informações do servidor...</p>
                    )}
                    
          </div>
  
          
          
  
          <div className="rules-container">
      <p>
      {selectedMode === "jailbreak" ? (
  <>
    
    {Jailbreak.map((ruleBlock, index) => (
        <div key={index}>
          <h3 className="rules-title-color">{ruleBlock.title}</h3>
          <div className="rules-list">
            {ruleBlock.description.map((rule, idx) => (
              <span key={idx} className="rule-description">
                {rule}
                <br />
              </span>
            ))}
          </div>
          </div>
            ))}
  </>
) : (
          <>
           <h3 className="rules-title-color">Regras Gerais</h3>
           {ZombieEscape[0].description.map((rule, index) => (            
              <span key={index}>
                {rule}
                <br />
              </span>
            ))}
            
          </>
        )}
      </p>
    </div>
        </div>
      </div>
      <div id="teste">
      <Footer />
      </div>
      </>
    );
}

export default ServerModels;