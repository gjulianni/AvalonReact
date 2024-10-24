<?php
session_start();
session_destroy();
header("Location: http://localhost:5173/home");
exit();

?>