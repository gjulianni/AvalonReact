<?php
session_start(); 
if (empty($_SESSION['steam_uptodate']) or empty($_SESSION['steam_personaname'])) {
    require 'SteamConfig.php';
    $url = file_get_contents("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=".$steamauth['apikey']."&steamids=".$_SESSION['steamid']); 
    $content = json_decode($url, true);
    // Armazenar informações do jogador na sessão
    $_SESSION['steam_steamid'] = $content['response']['players'][0]['steamid'];
    $_SESSION['steam_communityvisibilitystate'] = $content['response']['players'][0]['communityvisibilitystate'];
    $_SESSION['steam_profilestate'] = $content['response']['players'][0]['profilestate'];
    $_SESSION['steam_personaname'] = $content['response']['players'][0]['personaname'];
    $_SESSION['steam_lastlogoff'] = $content['response']['players'][0]['lastlogoff'];
    $_SESSION['steam_profileurl'] = $content['response']['players'][0]['profileurl'];
    $_SESSION['steam_avatar'] = $content['response']['players'][0]['avatar'];
    $_SESSION['steam_avatarmedium'] = $content['response']['players'][0]['avatarmedium'];
    $_SESSION['steam_avatarfull'] = $content['response']['players'][0]['avatarfull'];
    $_SESSION['steam_personastate'] = $content['response']['players'][0]['personastate'];
    
    if (isset($content['response']['players'][0]['realname'])) { 
        $_SESSION['steam_realname'] = $content['response']['players'][0]['realname'];
    } else {
        $_SESSION['steam_realname'] = "Real name not given";
    }

    $_SESSION['steam_primaryclanid'] = $content['response']['players'][0]['primaryclanid'];
    $_SESSION['steam_timecreated'] = $content['response']['players'][0]['timecreated'];
    $_SESSION['steam_uptodate'] = time();
}

// Preparar o array de perfil do Steam para retorno
$steamprofile = [
    'steamid' => $_SESSION['steam_steamid'],
    'communityvisibilitystate' => $_SESSION['steam_communityvisibilitystate'],
    'profilestate' => $_SESSION['steam_profilestate'],
    'personaname' => $_SESSION['steam_personaname'],
    'lastlogoff' => $_SESSION['steam_lastlogoff'],
    'profileurl' => $_SESSION['steam_profileurl'],
    'avatar' => $_SESSION['steam_avatar'],
    'avatarmedium' => $_SESSION['steam_avatarmedium'],
    'avatarfull' => $_SESSION['steam_avatarfull'],
    'personastate' => $_SESSION['steam_personastate'],
    'realname' => $_SESSION['steam_realname'],
    'primaryclanid' => $_SESSION['steam_primaryclanid'],
    'timecreated' => $_SESSION['steam_timecreated'],
    'uptodate' => $_SESSION['steam_uptodate']
];

// Enviar cabeçalho para resposta JSON
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
$allowed_origin = 'https://avalonservers.site';
header("Access-Control-Allow-Origin: $allowed_origin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
echo json_encode($steamprofile);
?>