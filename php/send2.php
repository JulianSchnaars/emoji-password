<?php

$valPassword = $_POST['pwReal'];

/* personal information */
$valIdSurvey1 = (int)$_POST['pwId'];
$valBrowser = $_SERVER['HTTP_USER_AGENT'];
$valGroup = (int)$_POST['pwGroup'];

$valHash = md5($valPassword);

/* questionnaire */


$sql = "INSERT INTO `survey_2`(
`ID_survey_1`,`browser`,`testGroup`,
`pwHash`
)VALUES(
$valIdSurvey1,'$valBrowser',$valGroup,
'$valHash'
)";

if (!isset($_COOKIE['emojiPasswordPart2'])) {
    //header("Location: ../thank-you.html");

    /*##### make connection #####*/
    include('connection.php');

    if ($conn->query($sql) === true) {
        $expires = time()+60*60*24*40;  // 40 days
        setcookie('emojiPasswordPart2', 'true', $expires, '/');
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
} else {
    //header("Location: ../index.html");
    echo "Seems like you already participated.";
}
