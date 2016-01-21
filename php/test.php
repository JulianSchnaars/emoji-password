<?php
include('connection.php');

$valEmoji = (string)$_POST['emoji'];

$sql2 = "INSERT INTO `emoji_test`(`emoji`) VALUES ('$valEmoji')";

if ($conn->query($sql2) === TRUE) {
    echo "New record created successfully<br>";
} else {
    echo "Error: " . $sql2 . "<br>" . $conn->error;
}

$conn->close();

?>
