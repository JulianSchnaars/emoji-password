<?php

$valPassword = $_POST['pwReal'];

/* personal information */
$valIdSurvey1 = (int)$_POST['pwId'];
$valBrowser = $_SERVER['HTTP_USER_AGENT'];
$valGroup = (int)$_POST['pwGroup'];
$valPwSkipped = $_POST['pwSkipped'];

$valHash = md5($valPassword);

/* questionnaire */
$valEnteredPasswordBy = $_POST['enteredPasswordBy'];
$valWrittenOrStored = $_POST['writtenOrStored'];
$valSceneImagined = $_POST['sceneImagined'];
$valPhraseImagined = $_POST['phraseImagined'];
$valStoryImagined = $_POST['storyImagined'];
$valDifferentForRealAccount = $_POST['differentForRealAccount'];
$valPasswordCharacteristics = $_POST['passwordCharacteristics'];
$valEmojiPolicyAnnoying= $_POST['emojiPolicyAnnoying'];
$valEmojiPinSmartphone = $_POST['emojiPinSmartphone'];
$valWouldUseEmojiPw = $_POST['wouldUseEmojiPw'];

$sql = "INSERT INTO `survey_2`(
`ID_survey_1`,`browser`,`testGroup`,`pwSkipped`,
`pwHash`,
`enteredPasswordBy`,`writtenOrStored`,
`sceneImagined`,`phraseImagined`,`storyImagined`,
`differentForRealAccount`,
`passwordCharacteristics`,`emojiPolicyAnnoying`,`emojiPinSmartphone`,`wouldUseEmojiPw`
)VALUES(
$valIdSurvey1,'$valBrowser',$valGroup,'$valPwSkipped',
'$valHash',
'$valEnteredPasswordBy','$valWrittenOrStored',
'$valSceneImagined','$valPhraseImagined','$valStoryImagined',
'$valDifferentForRealAccount',
'$valPasswordCharacteristics','$valEmojiPolicyAnnoying','$valEmojiPinSmartphone','$valWouldUseEmojiPw'
)";

if (!isset($_COOKIE['emojiPasswordPart2'])) {
    header("Location: ../thank-you.html");

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
