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

// This jQuery Plugin will disable text selection for Android and iOS devices.
// Stackoverflow Answer: http://stackoverflow.com/a/2723677/1195891
$.fn.extend({
    disableSelection: function () {
        this.each(function () {
            this.onselectstart = function () {
                return false;
            };
            this.unselectable = "on";
            $(this).css('-moz-user-select', 'none');
            $(this).css('-webkit-user-select', 'none');
        });
    }
});

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
    //var group = Math.floor(Math.random() * 2);
    var group = 1;
    $('#password-group').val(group);
    if (group === 0) { // no emoji
        $('.group-1').addClass('hidden');
        $('.password-input').prop('type', 'password');
    } else { // emoji
        $('.group-0').addClass('hidden');
    }
    return group;
}

function testOutput(password, passwordConfirm, pos, key) {
    $('#control').html('Caret: ' + pos + '<br> Password: ' + password.join(' ') + '<br>Length: ' + password.length + '<br> Password Confirm: ' + passwordConfirm.join(' ') + '<br>e.which: ' + key);
}

function setMetadata(password) {
    var passwordString = password.join('');
    var result = zxcvbn(passwordString);

    /* replace all but emoji */
    var emojiOutput = encodeURIComponent(passwordString.replace(regExAllButEmoji, 'x'));
    var emojiNr = passwordString.replace(regExAllButEmoji, '').length / 2;

    $('#password-length').val(password.length);
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

    setMetadata([]);
}

function updateCaret(field) {
    return field.caret();
}

function add(passwordField, password, pos) {
    var key = passwordField.val().replace(/•/g, '');
    password.splice(pos - 1, 0, key);
    return password;
}

function remove(password, pos) {
    password.splice(pos, 1);
    return password;
}

function removeAll(passwordField) {
    passwordField.closest('.form-group').addClass('has-warning')
        .delay(600)
        .queue(function () {
            $(this).removeClass('has-warning');
            $(this).dequeue();
        });
    passwordField.val('');
    return [];
}

function setPlaceholder(passwordField, password, pos) {
    //var length = $('#password-real').val().length;
    var length = password.length;
    var placeholder = '';

    if (length === 1) {
        placeholder = '•';
    } else {
        placeholder = new Array(length + 1).join('•');
    }
    passwordField.val('');
    passwordField.val(placeholder);
    passwordField.caret(pos);
}

function notMobileWarning() {
    $('#mobile').toggleClass('half-opacity');
    $('#desktop').toggleClass('hidden');
    //alert("This is not a mobile device");
}

function isPrevented(key) {
    // return true if key event default should be prevented
    // values for: left, right, up, down, shift, cmd, ctr, alt, space, enter, caps, tab, insert
    return (key === 37 || key === 38 || key === 39 || key === 40 || key === 16 || key === 91 || key === 17 || key === 18 || key === 32 || key === 13 || key === 20 || key === 9 || key === 45);
}

$(document).ready(function () {
    var pwField1 = $('#password-1');
    var pwField2 = $('#password-2');
    var pwFields = $('.password-input');
    var realPassword = [];
    var realPasswordConfirm = [];

    /* initialize group */
    var group = initGroup();

    /* emoji area */
    $.emojiarea.path = '../jquery-emojiarea-master/packs/basic/images';
    if (group === 1) {
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
        //notMobileWarning();
    }
    /* disable selection in input field */
    //$('.noselect').disableSelection();

    /* key events in input field - password */
    pwField1.bind('keyup', function (event) {
        var key = event.keyCode || event.which;
        var caretPos = updateCaret(pwField1);

        if (isPrevented(key)) {
            event.preventDefault();
            return false;
        } else if (event.which === 8) { // backspace -> delete
            if (realPassword.length === caretPos + 1) {
                realPassword = remove(realPassword, caretPos);
            } else {
                realPassword = removeAll(pwField1);
            }
        } else {
            realPassword = add(pwField1, realPassword, caretPos);
        }
        //testOutput(realPassword, realPasswordConfirm, caretPos, key);
        setMetadata(realPassword);
        setPlaceholder(pwField1, realPassword, caretPos);
    });

    /* key events in input field - confirm password */
    pwField2.bind('keyup', function (event) {
        var key = event.keyCode || event.which;
        var caretPos = updateCaret(pwField2);
        if (isPrevented(key)) {
            if (event.preventDefault) event.preventDefault(); //normal browsers
            event.returnValue = false; //IE
        } else if (event.which === 8) {
            if (realPasswordConfirm.length === caretPos + 1) {
                realPasswordConfirm = remove(realPasswordConfirm, caretPos);
            } else {
                realPasswordConfirm = removeAll(pwField2);
            }
        } else {
            realPasswordConfirm = add(pwField2, realPasswordConfirm, caretPos);
        }
        //testOutput(realPassword, realPasswordConfirm, caretPos, key);
        //setMetadata(realPassword);
        setPlaceholder(pwField2, realPasswordConfirm, caretPos);
    });

    pwFields.on('touch click', function () {
        $(this).caret($(this).val().length);
    }).on('change', function () {
        var input = $(this).val();
        var output = (emojione.shortnameToUnicode(input)).replace(/\s/g, '');
        $(this).val(output);
    });

    /* button for clearing password fields */
    $("#clear").click(function () {
        realPassword = [];
        realPasswordConfirm = [];
        clearPwds();
    });

    /* next button for sections */
    $('#questionsNext').click(function () {
        var policyError = $('.policy-error');
        policyError.removeClass('policy-error');
        pwField2.closest('.form-group').removeClass('has-error');

        if (realPassword.length >= 12) { // 1. min length of 12
            if (realPassword.join('') === realPasswordConfirm.join('')) { // passwords match
                var passwordString = realPassword.join('');
                var pwUpperCase = passwordString.replace(regExNotLower, '').length;
                var pwLowerCase = passwordString.replace(regExNotSpecial, '').length;
                if (pwUpperCase > 0 && pwLowerCase > 0) { // 2. check for upper and lower case
                    var pwNumbers = passwordString.replace(regExNotNumber, '').length; // 3. check for numbers
                    if (pwNumbers > 0) {
                        if (group === 1) { //check if emoji group
                            var pwEmojis = passwordString.replace(regExAllButEmoji, '').length;
                            if (pwEmojis > 0) { // 4. check for emoji
                                $('#questions').removeClass('hidden');
                                $('#password').addClass('hidden');
                                setMetadata(realPassword);
                            } else {
                                $('.policy-other').addClass('policy-error');
                            }
                        } else { // special character group
                            var pwSpecialChars = passwordString.replace(regExNotSpecial, '').length;
                            if (pwSpecialChars > 0) { // 4. check for special ch
                                $('#questions').removeClass('hidden');
                                $('#password').addClass('hidden');
                                setMetadata(realPassword);
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