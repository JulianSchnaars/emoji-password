<?php

define('DB_NAME', 'usr_web138276_1');
define('DB_USER', 'web138276');
define('DB_PASSWORD', 'FR8PXRzGe%xvmur');
define('DB_HOST', 'localhost');
/*
define('DB_NAME', 'usr_web138276_1');
define('DB_USER', 'root');
define('DB_PASSWORD', 'mscBU4zS3jyKW68');
define('DB_HOST', 'localhost');
*/
// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
mysqli_set_charset($conn,"utf8"); //utf8mb4

echo 'Connected successfully<br>';

?>
