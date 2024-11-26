import { useEffect, useState } from "react";
import GlobalStyles from "../globalstyles/GlobalStyles";
import Nav from "../nav/Nav";
import SteamAuth from "../steam/SteamAuth";
import './ServerModels.css'
import Footer from "../footer/Footer";
import { Jailbreak } from "./jailbreak/rules/Jailbreak";

interface serverInfo {
    name: string;
    map: string;
    players: number;
    maxPlayers: number;
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
                // Ajuste da URL com base no modo selecionado
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
                    {thumbnailUrl && (
                        <div
                            className="tracking-image"
                            style={{
                                backgroundImage: `url(${thumbnailUrl})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center right',
                                backgroundRepeat: 'no-repeat',
                                clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 10% 100%)',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '55%',
                                height: '100%',
                            }}
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
  
          <div className="description-container">
            <h2>Descrição do Modo</h2>
            <p>
              {selectedMode === 'zombieEscape'
                ? 'No Zombie Escape, os jogadores precisam fugir dos zumbis até chegarem à zona de escape!'
                : 'No Jailbreak, os guardas devem manter a ordem enquanto os prisioneiros tentam escapar ou completar tarefas!'}
            </p>
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
            1. Os prisioneiros devem obedecer aos comandos dos guardas.
            <br />
            2. Guardas não podem matar prisioneiros sem motivo.
            <br />
            3. Use microfone para liderar como guarda.
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