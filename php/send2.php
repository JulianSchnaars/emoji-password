<?php
//header("Location: ./email.html");

include('connection.php');

/* password meta-data */
$valGroup = 1;
//$valGroup = (int)$_POST['pwGroup'];
$valLength = (int)$_POST['pwLength'];
$valNumbers = (int)$_POST['pwNumbers'];
$valLower = (int)$_POST['pwLower'];
$valUpper = (int)$_POST['pwUpper'];
$valSpecial = (int)$_POST['pwSpecial'];
$valEmoji = (int)$_POST['pwEmoji']; // Emoji !
$valScore = (int)$_POST['pwScore'];
$valGuesses = (int)$_POST['pwGuesses'];

/* questionnaire */
$valLearningPasswordAnnoying = $_POST['learningPasswordAnnoying'];
$valLearningPasswordDifficult = $_POST['learningPasswordDifficult'];
$valLearningPasswordFun = $_POST['learningPasswordFun'];
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

/* personal information */
$valGender = $_POST['gender'];
$valAge = (int)$_POST['age'];

$sql = "INSERT INTO `survey_1`(`testGroup`, `gender`, `age`, `pwLength`, `pwNumbers`, `pwLower`, `pwUpper`, `pwSpecial`, `pwEmoji`, `pwScore`, `pwGuesses`, `learningPasswordAnnoying`, `learningPasswordDifficult`, `learningPasswordFun`, `passwordReuse`, `passwordReuseSlightModification`, `realPwUpper`, `realPwLower`, `realPwNumbers`, `realPwSpecial`, `isMoreSecure`, `isAnnoying`, `isEasier`, `nrAccounts`, `nrAccountsMobile`, `altAuthenticationMobile`, `desktopVsMobile`) VALUES ($valGroup,'$valGender',$valAge,$valLength,$valNumbers,$valLower,$valUpper,$valSpecial,$valEmoji,$valScore,$valGuesses,'$valLearningPasswordAnnoying','$valLearningPasswordDifficult','$valLearningPasswordFun','$valPasswordReuse','$valPasswordReuseSlightModification',$valRealPwUpper,$valRealPwLower,$valRealPwNumbers,$valRealPwSpecial,'$valIsMoreSecure','$valIsAnnoying','$valIsEasier',$valNrAccounts,$valNrAccountsMobile,'$valAltAuthenticationMobile','$valDesktopVsMobile')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully<br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
