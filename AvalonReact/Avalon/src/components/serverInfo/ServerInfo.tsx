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
                const response = await fetch('http://localhost:3030/server-info?serverIp=131.196.196.198&serverPort=27200');
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {serverInfo ? (
                <div>
                    <h2>{serverInfo.name}</h2>
                    <p>Map: {serverInfo.map}</p>
                    <p>Players: {serverInfo.players}/{serverInfo.maxPlayers}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ServerInfo;