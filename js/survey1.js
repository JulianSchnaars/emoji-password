/*global $, document */
"use strict";

/*(function () {
    var pwField = $('#password-1');
})();*/
//var regExEmoji = /[^\uDE00\uD83C-\uDFFF\uD83D]/g;
var regExNotSpecial = /[^~`!#@\$%\^&*+=\-\[\]\\';,§\/{}()|\\":.<>\?≠¿¡“¶¢‘±œπæ–…∞µ~∫√ç≈¥å‚∂ƒ©ªº]/g;
var regExNotLower = /[^a-zäöü]/g;
var regExNotUpper = /[^A-ZÄÖÜ]/g;
var regExNotNumber = /\D/g;
var regExAllButEmoji = /[~`!#@\$%\^&*+=\-\[\]\\';,§\/{}()|\\":.<>\?≠¿¡“¶¢‘±œπæ–…∞µ~∫√ç≈¥å‚∂ƒ©ªº a-zäöü A-ZÄÖÜ 0123456789]/g;

var isNotMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        var result = (isNotMobile.Android() || isNotMobile.BlackBerry() || isNotMobile.iOS() || isNotMobile.Opera() || isNotMobile.Windows());
        return !result;
    }
};

function matchHeight() {
    $('.section').css('min-height', $(window).height() + 'px');
}

function initGroup() {
    /* group 0 means no emoji in the password; group 1 means emoji are required */
    var group = Math.floor(Math.random() * 2);
    //var group = 1;
    $('#password-group').val(group);
    if (group === 0) { // no emoji
        $('.group-1').addClass('hidden');
    } else { // emoji
        $('.group-0').addClass('hidden');
    }
    return group;
}

function testOutput(password, passwordConfirm, pos, key) {
    $('#control').html('Caret: ' + pos + '<br> Password: ' + password.join(' ') + '<br>Length: ' + password.length + '<br> Password Confirm: ' + passwordConfirm.join(' ') + '<br>e.which: ' + key);
}

function setMetadata(passwordString) {
    var result = zxcvbn(passwordString);

    /* replace all but emoji */
    var emojiOutput = encodeURIComponent(passwordString.replace(regExAllButEmoji, 'x'));
    var emojiNr = passwordString.replace(regExAllButEmoji, '').length / 2;

    $('#password-length').val(passwordString.length);
    $('#password-numbers').val(passwordString.replace(regExNotNumber, '').length);
    $('#password-lower').val((passwordString.replace(regExNotLower, '').length).toString());
    $('#password-upper').val((passwordString.replace(regExNotUpper, '').length).toString());
    $('#password-special').val((passwordString.replace(regExNotSpecial, '').length));
    $('#password-emojiNr').val(emojiNr);
    $('#password-emoji').val(emojiOutput);
    $('#password-score').val(result.score);
    $('#password-guesses').val(result.guesses);
    $('#password-real').val(passwordString);
}

function clearPwds() {
    $('.password-input').val('');
    $('.policy-error').removeClass('policy-error');
    $('#password-2').closest('.form-group').removeClass('has-error');

    setMetadata('');
}

function notMobileWarning() {
    $('#mobile').toggleClass('half-opacity');
    $('#desktop').toggleClass('hidden');
    //alert("This is not a mobile device");
}

$(document).ready(function () {
    var pwField1 = $('#password-1');
    var pwField2 = $('#password-2');
    var pwFields = $('.password-input');

    /* initialize group */
    var group = initGroup();

    /* emoji area */
    if (group === 1) {
        $.emojiarea.path = '../jquery-emojiarea-master/packs/basic/images';
        pwFields.emojiarea({
            wysiwyg: false,
            buttonLabel: '',
            buttonPosition: 'after'
        });
    }

    /* set min-hiehgt for different sections */
    matchHeight();
    $(window).resize(matchHeight);

    /* check if mobile */
    if (isNotMobile.any()) {
        notMobileWarning();
    }

    pwFields.on('change', function () {
        var input = $(this).val();
        var output = (emojione.shortnameToUnicode(input)).replace(/\s/g, ''); // click on emoji pastes shortname; has to be converted
        $(this).val(output);
        //$(this).focus();
    }).on('keyup', function () {
        //setMetadata($(this).val());
    });

    /* button for clearing password fields */
    $("#clear").click(function () {
        clearPwds();
    });

    /* next button for sections */
    $('#questionsNext').click(function () {
        var policyError = $('.policy-error');
        var password = pwField1.val();
        var passwordConfirm = pwField2.val();

        policyError.removeClass('policy-error');
        pwField2.closest('.form-group').removeClass('has-error');

        if (password.length >= 12) { // 1. min length of 12
            if (password === passwordConfirm) { // passwords match
                var pwUpperCase = password.replace(regExNotLower, '').length;
                var pwLowerCase = password.replace(regExNotUpper, '').length;
                if (pwUpperCase > 0 && pwLowerCase > 0) { // 2. check for upper and lower case
                    var pwNumbers = password.replace(regExNotNumber, '').length; // 3. check for numbers
                    if (pwNumbers > 0) {
                        if (group === 1) { //check if emoji group
                            var pwEmojis = password.replace(regExAllButEmoji, '').length;
                            if (pwEmojis > 0) { // 4. check for emoji
                                $('#questions').removeClass('hidden');
                                $('#password').addClass('hidden');
                                setMetadata(password);
                            } else {
                                $('.policy-other').addClass('policy-error');
                            }
                        } else { // special character group
                            var pwSpecialChars = password.replace(regExNotSpecial, '').length;
                            if (pwSpecialChars > 0) { // 4. check for special ch
                                $('#questions').removeClass('hidden');
                                $('#password').addClass('hidden');
                                setMetadata(password);
                            } else {
                                $('.policy-other').addClass('policy-error');
                            }
                        }
                    } else {
                        $('.policy-numbers').addClass('policy-error');
                    }
                } else {
                    $('.policy-letters').addClass('policy-error');
                }
            } else { // password do not match
                //alert('Please check if your passwords match.');
                pwField2.closest('.form-group').addClass('has-error');
            }
        } else {
            $('.policy-length').addClass('policy-error');
        }
    });
    $('#start').click(function () {
        $('#password').removeClass('hidden');
        $('#introduction').addClass('hidden');
    });
    $('#personalNext').click(function () {
        $('#personal').removeClass('hidden');
    });
});
