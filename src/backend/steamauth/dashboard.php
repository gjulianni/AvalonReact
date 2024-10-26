<?php
header('Content-Type: application/json');
$allowed_origin = 'http://avalonservers.rf.gd'; // Para produção



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