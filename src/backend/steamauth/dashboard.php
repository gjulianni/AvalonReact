<?php
header('Content-Type: application/json');
$allowed_origin = 'http://localhost:5173'; // Para desenvolvimento local

// Se o seu frontend estiver em um domínio diferente na produção, adicione aqui
// Exemplo: $allowed_origin = 'https://seu_dominio.com'; 

header("Access-Control-Allow-Origin: $allowed_origin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    header("HTTP/1.1 403 Forbidden");
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$username = $_SESSION['userData']['name'];
$avatar = $_SESSION['userData']['avatar'];

echo json_encode([
    'username' => $username,
    'avatar' => $avatar
]);
?>