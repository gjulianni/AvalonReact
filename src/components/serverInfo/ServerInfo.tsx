import React, { useEffect, useState } from 'react';

interface ServerInfo {
    name: string;
    map: string;
    players: number;
    maxPlayers: number;
}

const ServerInfo: React.FC = () => {
    const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                const response = await fetch(`https://malachite-bloom-bayberry.glitch.me/server-info/zombieEscape`);
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do servidor');
                }
                const data = await response.json();
                setServerInfo({
                    name: data.serverInfo.name,
                    map: data.serverInfo.map,
                    players: data.serverInfo.players,
                    maxPlayers: data.serverInfo.maxPlayers,
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Erro desconhecido')
                }
            }
        };

        fetchServerInfo();
    }, []);

    if(error) {

    }
    if(!serverInfo) {
        console.log("nao tem nada")
    }

    return null;
};

export default ServerInfo;