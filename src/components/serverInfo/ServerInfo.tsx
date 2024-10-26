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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server-info?serverIp=131.196.196.198&serverPort=27200`);
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do servidor');
                }
                const data = await response.json();
                setServerInfo({
                    name: data.name,
                    map: data.map,
                    players: data.players,
                    maxPlayers: data.maxPlayers,
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

    return null;
};

export default ServerInfo;