<?php

$valPassword = $_POST['pwReal'];

/* personal information */
$valBrowser = $_SERVER['HTTP_USER_AGENT'];
$valGender = $_POST['gender'];
$valAge = (int)$_POST['age'];
$valCountry = $_POST['country'];

/* password meta-data */
$valGroup = (int)$_POST['pwGroup'];
$valLength = (int)$_POST['pwLength'];
$valNumbers = (int)$_POST['pwNumbers'];
$valLower = (int)$_POST['pwLower'];
$valUpper = (int)$_POST['pwUpper'];
$valSpecial = (int)$_POST['pwSpecial'];
$valEmojiNr = (int)$_POST['pwEmojiNr'];
$valEmoji = $_POST['pwEmoji'];
$valScore = (int)$_POST['pwScore'];
$valGuesses = (int)$_POST['pwGuesses'];
$valHash = md5($valPassword);

/* questionnaire */
$valPwCreationEffort = $_POST['pwCreationEffort'];
$valChoosingPwDifficult = $_POST['choosingPwDifficult'];
$valChoosingPwAnnoying = $_POST['choosingPwAnnoying'];
$valChoosingPwFun = $_POST['choosingPwFun'];
$valEasilyMemorable = $_POST['easilyMemorable'];
$valCommunication = $_POST['communication'];
$valMessagesOnPhone = $_POST['messagesOnPhone'];
$valEmojiUseGeneral = $_POST['emojiUseGeneral'];
$valPasswordReuse = $_POST['passwordReuse'];
$valPasswordReuseSlightModification = $_POST['passwordReuseSlightModification'];
$valPwPhrase = $_POST['pwPhrase'];
$valPwPicture = $_POST['pwPicture'];
$valPwStory = $_POST['pwStory'];
$valEmojiVsSpecial = $_POST['emojiVsSpecial'];
$valIsMoreSecure = $_POST['isMoreSecure'];
$valIsAnnoying = $_POST['isAnnoying'];
$valIsEasier = $_POST['isEasier'];
$valDesktopVsMobile = $_POST['desktopVsMobile'];
$valSpecialCharactersDifficultOnMobile = $_POST['specialCharactersDifficultOnMobile'];
$valNrAccounts = (int)$_POST['nrAccounts'];
$valNrAccountsMobile = (int)$_POST['nrAccountsMobile'];
$valAltAuthenticationMobile = $_POST['altAuthenticationMobile'];
$valRealPwUpper = (int)$_POST['realPwUpper'];
$valRealPwLower = (int)$_POST['realPwLower'];
$valRealPwNumbers = (int)$_POST['realPwNumbers'];
$valRealPwSpecial = (int)$_POST['realPwSpecial'];

$sql = "INSERT INTO `survey_1`(
`browser`,`testGroup`,
`gender`,`age`,`country`,
`pwLength`,`pwNumbers`,`pwLower`,`pwUpper`,`pwSpecial`,`pwEmojiNr`, `pwEmoji`, `pwScore`, `pwGuesses`, `pwHash`,
`pwCreationEffort`,
`choosingPwAnnoying`, `choosingPwDifficult`, `choosingPwFun`,
`easilyMemorable`,`communication`,
`messagesOnPhone`,`emojiUseGeneral`,
`passwordReuse`, `passwordReuseSlightModification`,
`pwPhrase`,`pwPicture`,`pwStory`,
`emojiVsSpecial`,
`isMoreSecure`, `isAnnoying`, `isEasier`,
`desktopVsMobile`,`specialCharactersDifficultOnMobile`,
`nrAccounts`, `nrAccountsMobile`, `altAuthenticationMobile`,
`realPwUpper`, `realPwLower`, `realPwNumbers`, `realPwSpecial`
)VALUES(
'$valBrowser',$valGroup,
'$valGender',$valAge,'$valCountry',
$valLength,$valNumbers,$valLower,$valUpper,$valSpecial,$valEmojiNr,'$valEmoji',$valScore,$valGuesses,'$valHash',
'$valPwCreationEffort',
'$valChoosingPwAnnoying','$valChoosingPwDifficult','$valChoosingPwFun',
'$valEasilyMemorable','$valCommunication',
'$valMessagesOnPhone','$valEmojiUseGeneral',
'$valPasswordReuse','$valPasswordReuseSlightModification',
'$valPwPhrase','$valPwPicture','$valPwStory',
'$valEmojiVsSpecial',
'$valIsMoreSecure','$valIsAnnoying','$valIsEasier',
'$valDesktopVsMobile','$valSpecialCharactersDifficultOnMobile',
$valNrAccounts,$valNrAccountsMobile,'$valAltAuthenticationMobile',
$valRealPwUpper,$valRealPwLower,$valRealPwNumbers,$valRealPwSpecial
)";


if (!isset($_COOKIE['emojiPassword']) || !isset($_COOKIE['emojiPasswordGroup'])) {
    /* ##### set cookie #####*/
    $expires = time()+60*60*24*40;  // 40 days
    setcookie('emojiPassword', $valPassword, $expires, '/');
    setcookie('emojiPasswordGroup', $valGroup, $expires, '/');
    //echo "cookie set <br>";

    header("Location: ../email.html");

    /*##### make connection #####*/
    include('connection.php');

    if ($conn->query($sql) === true) {
        $last_id = $conn->insert_id;
        setcookie('emojiPasswordId', $last_id, $expires, '/');
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
} else {
    //header("Location: ../index.html");
    echo "Seems like you already participated.";
}
