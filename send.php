<?php

define('DB_NAME', 'usr_web138276_1');
define('DB_USER', 'web138276');
define('DB_PASSWORD', 'web138276');
define('DB_HOST', 'localhost');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if (!link) {
    die('Could not connect ' . mysql_error());
}

$db_selected = mysql_select_db(DB_NAME, $link);

if (!db_selected) {
    die('Cannot use: ' . DB_NAME . ' ' . mysql_error());
}

echo 'connected successfully';

$value = $_POST['password-1'];

$sql = "INSERT INTO test (password-1) VALUES ('$value')";

if (!mysql_query($sql)) {
    die('Error: ' . mysql_error());
}

mysql_close();

?>