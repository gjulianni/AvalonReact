import React, { useEffect, useState } from "react";
import './Tracker.css'

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

const Tracker: React.FC = () => {
    const [serverInfo, setServerInfo] = useState<serverInfo | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const serverIp = '131.196.196.198'; 
    const serverPort = '27200'; 

    const connectToServer = () => {
        window.location.href = "steam://connect/131.196.196.198:27200";
    };

    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                const response = await fetch(`https://malachite-bloom-bayberry.glitch.me/server-info/zombieEscape`);
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
    }, []);
    useEffect(() => {
        if (serverInfo) {
            console.log("serverInfo atualizado:", serverInfo);
        } else {
            console.log('aaaaaaaaaaaaaaaaaa')
        }
    }, [serverInfo]);

    return (
        <>
            <section className="tracking" id="tracker">
                <h1 id="title">Tracking</h1>
                <div className="card">
                    <div className="card-left">
                        {serverInfo ? (
                            <>
                                <h1 id="hostname">{serverInfo.name}</h1>
                                <p id="current-map">Mapa Atual: {serverInfo.map}</p>
                                <p id="players">Jogadores: {serverInfo.players}/{serverInfo.maxPlayers}</p>
                                <p id="ip">IP: {serverIp}:{serverPort}</p>
                               
                                    <button className="btn-connect" type="button" onClick={connectToServer}>► Jogar</button>
                                
                            </>
                        ) : (
                            <p>Carregando informações do servidor...</p>
                        )}
                    </div>
                    <div className="card-right" id="thumbnail">
                        {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail do Mapa" />}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tracker;