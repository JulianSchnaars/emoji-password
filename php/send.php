<?php
//header("Location: ../email.html");

include('connection.php');

/* meta-data */
$valIP = $_SERVER['REMOTE_ADDR'];
$valBrowser = $_SERVER['HTTP_USER_AGENT'];

/* personal information */
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
$valHash = md5($_POST['pwReal']);

/* questionnaire */
$valChoosingPasswordAnnoying = $_POST['choosingPasswordAnnoying'];
$valChoosingPasswordDifficult = $_POST['choosingPasswordDifficult'];
$valChoosingPasswordFun = $_POST['choosingPasswordFun'];
$valPasswordReuse = $_POST['passwordReuse'];
$valPasswordReuseSlightModification = $_POST['passwordReuseSlightModification'];
$valRealPwUpper = (int)$_POST['realPwUpper'];
$valRealPwLower = (int)$_POST['realPwLower'];
$valRealPwNumbers = (int)$_POST['realPwNumbers'];
$valRealPwSpecial = (int)$_POST['realPwSpecial'];
$valIsMoreSecure = $_POST['isMoreSecure'];
$valIsAnnoying = $_POST['isAnnoying'];
$valIsEasier = $_POST['isEasier'];
$valNrAccounts = (int)$_POST['nrAccounts'];
$valNrAccountsMobile = (int)$_POST['nrAccountsMobile'];
$valAltAuthenticationMobile = $_POST['altAuthenticationMobile'];
#$valkindOfaltAuthenticationMobile = $_POST['kindOfAltAuthenticationMobile'];
$valDesktopVsMobile = $_POST['desktopVsMobile'];
$valFewSpecialCharacters = $_POST['fewSpecialCharacters'];
$valEmojiVsSpecial = $_POST['emojiVsSpecial'];
$valEmojiUseGeneral = $_POST['emojiUseGeneral'];

$sql = "INSERT INTO `survey_1`(
`IP`,`browser`,`testGroup`,
`gender`,`age`,`country`,
`pwLength`,`pwNumbers`,`pwLower`,`pwUpper`,`pwSpecial`,`pwEmojiNr`, `pwEmoji`, `pwScore`, `pwGuesses`, `pwHash`,
`choosingPasswordAnnoying`, `choosingPasswordDifficult`, `choosingPasswordFun`,
`passwordReuse`, `passwordReuseSlightModification`,
`realPwUpper`, `realPwLower`, `realPwNumbers`, `realPwSpecial`,
`isMoreSecure`, `isAnnoying`, `isEasier`,
`nrAccounts`, `nrAccountsMobile`, `altAuthenticationMobile`,
`desktopVsMobile`,
`fewSpecialCharacters`,
`emojiVsSpecial`, `emojiUseGeneral`)
VALUES(
'$valIP','$valBrowser',$valGroup,
'$valGender',$valAge,'$valCountry',
$valLength,$valNumbers,$valLower,$valUpper,$valSpecial,$valEmojiNr,'$valEmoji',$valScore,$valGuesses,'$valHash',
'$valChoosingPasswordAnnoying','$valChoosingPasswordDifficult','$valChoosingPasswordFun',
'$valPasswordReuse','$valPasswordReuseSlightModification',
$valRealPwUpper,$valRealPwLower,$valRealPwNumbers,$valRealPwSpecial,
'$valIsMoreSecure','$valIsAnnoying','$valIsEasier',
$valNrAccounts,$valNrAccountsMobile,'$valAltAuthenticationMobile',
'$valDesktopVsMobile',
'$valFewSpecialCharacters',
'$valEmojiVsSpecial','$valEmojiUseGeneral'
)";

if ($conn->query($sql) === true) {
    echo "New record created successfully<br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
