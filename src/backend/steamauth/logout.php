<?php
session_start();
session_destroy();

$redirect_url = getenv('VITE_FRONTEND_URL') . '/home';
header("Location: $redirect_url");
exit();
?>