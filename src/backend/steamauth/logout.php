<?php
session_start();

require '../../../vendor/autoload.php';

use Dotenv\Dotenv;

// Carregar as variáveis de ambiente
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../../');
$dotenv->load();



session_destroy();

$redirect_url = getenv('VITE_FRONTEND_URL') . '/home';
header("Location: $redirect_url");
exit();
?>