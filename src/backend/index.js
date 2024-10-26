const express = require('express');
const { queryGameServerInfo } = require('steam-server-query');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3030;


app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições, tente novamente mais tarde.'
  });

app.use(limiter);

// Função para converter BigInt em String
const convertBigIntToString = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

const mapData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mapsId', 'map_ids.json'), 'utf-8'));

const getThumbnailUrl = async (mapId) => {
    try {
      const url = `https://steamcommunity.com/sharedfiles/filedetails/?id=${mapId}`;
      const { data } = await axios.get(url, { timeout: 10000 });
      const $ = cheerio.load(data);
      const thumbnailUrl = $('meta[property="og:image"]').attr('content');
      return thumbnailUrl;
    } catch (error) {
      console.error('Error fetching thumbnail URL:', error);
      return null;
    }
  };
  
  const getMapId = (mapName) => {
    return mapData[mapName] || null;
  };

app.get('/server-info', async (req, res) => {
    const { serverIp, serverPort } = req.query;

   
    if (typeof serverIp !== 'string' || typeof serverPort !== 'string') {
        return res.status(400).send('IP do servidor e porta são necessários');
    }

    try {
        const gameServerAddress = `${serverIp}:${serverPort}`;
        const serverInfo = await queryGameServerInfo(gameServerAddress);
        
        // Filtra os dados relevantes
        const filteredInfo = {
            name: serverInfo.name,
            map: serverInfo.map,
            players: serverInfo.players,
            maxPlayers: serverInfo.maxPlayers
        };

        const mapId = getMapId(serverInfo.map);
        const thumbnailUrl = mapId ? await getThumbnailUrl(mapId) : null;

        const safeServerInfo = convertBigIntToString(filteredInfo); 
        res.json({ safeServerInfo, thumbnailUrl });
    } catch (error) {
        console.error('Erro ao obter informações do servidor:', error);
        res.status(500).send('Erro ao obter informações do servidor');
    }
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});