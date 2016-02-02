<?php
//header("Location: ../thank-you.html");

include('connection.php');

if (isset($_COOKIE['emojiPassword']) || isset($_COOKIE['emojiPasswordGroup'])) {
    $valCookieSet = 'true';
} else {
    $valCookieSet = 'false';
}
$valEmail = $_POST['emailAddress'];

$sql2 = "INSERT INTO `email_addresses`(
`email`,`cookieSet`
) VALUES (
'$valEmail','$valCookieSet'
)";

if ($conn->query($sql2) === true) {
    echo "New record created successfully<br>";
} else {
    echo "Error: " . $sql2 . "<br>" . $conn->error;
}
$conn->close();
