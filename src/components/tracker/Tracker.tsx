import React, { useEffect, useState } from "react";
import './Tracker.css';

interface SafeServerInfo {
    name: string;
    map: string;
    players: number;
    maxPlayers: number;
}

interface ServerResponse {
    safeServerInfo: SafeServerInfo;
    thumbnailUrl: string;
}

const Tracker: React.FC = () => {
    const [serverInfo, setServerInfo] = useState<SafeServerInfo | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const serverIp = '131.196.196.198'; // Substitua pelo IP real do seu servidor
    const serverPort = '27200'; // Substitua pela porta real do seu servidor

    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                const response = await fetch(`http://192.168.15.15:3030/server-info?serverIp=${serverIp}&serverPort=${serverPort}`);
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do servidor');
                }
                const data: ServerResponse = await response.json();
                setServerInfo(data.safeServerInfo);
                setThumbnailUrl(data.thumbnailUrl);
                // console.log(data);
            } catch (error) {
                console.error('Erro ao buscar informações do servidor:', error);
            }
        };

        fetchServerInfo();
    }, []);

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
                                <form action={`steam://connect/${serverIp}:${serverPort}`}>
                                    <button className="btn-connect" type="button">► Jogar</button>
                                </form>
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