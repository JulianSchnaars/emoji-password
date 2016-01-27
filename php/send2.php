<?php

$valPassword = $_POST['pwReal'];

/* personal information */
$valIdSurvey1 = (int)$_POST['pwId'];
$valBrowser = $_SERVER['HTTP_USER_AGENT'];
$valGroup = (int)$_POST['pwGroup'];
$valPwSkipped = $_POST['pwSkipped'];

$valHash = md5($valPassword);

/* questionnaire */
$valEnterPassword = $_POST['enterPassword'];
$valWrittenOrStored = $_POST['writtenOrStored'];
$valSceneImaginedGeneral = $_POST['sceneImaginedGeneral'];
$valSceneImaginedThisPw = $_POST['sceneImaginedThisPw'];
$valPhraseImagined = $_POST['phraseImagined'];
$valStoryImagined = $_POST['storyImagined'];
$valDifferentForRealAccount = $_POST['differentForRealAccount'];

$sql = "INSERT INTO `survey_2`(
`ID_survey_1`,`browser`,`testGroup`,`pwSkipped`,
`pwHash`,
`enterPassword`,`writtenOrStored`,
`sceneImaginedGeneral`,`sceneImaginedThisPw`,`phraseImagined`,`storyImagined`,
`differentForRealAccount`
)VALUES(
$valIdSurvey1,'$valBrowser',$valGroup,'$valPwSkipped',
'$valHash',
'$valEnterPassword','$valWrittenOrStored',
'$valSceneImaginedGeneral','$valSceneImaginedThisPw','$valPhraseImagined','$valStoryImagined',
'$valDifferentForRealAccount'
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
