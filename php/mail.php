<?php
header("Location: ../thank-you.html");

include('connection.php');

$valEmail = $_POST['emailAddress'];

$sql2 = "INSERT INTO `email_addresses`(`email`) VALUES ('$valEmail')";

if ($conn->query($sql2) === TRUE) {
    echo "New record created successfully<br>";
} else {
    echo "Error: " . $sql2 . "<br>" . $conn->error;
}

$conn->close();

?>
