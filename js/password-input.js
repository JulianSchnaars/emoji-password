/*global $, document */
"use strict";

/*(function () {
    var pwField = $('#password-1');
})();*/
var regExSpecial = /[^~`!#@\$%\^&*+=\-\[\]\\';,§\/{}()|\\":.<>\?≠¿¡“¶¢‘±œπæ–…∞µ~∫√ç≈¥å‚∂ƒ©ªº]/g;

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
    var group = Math.floor(Math.random() * 2);
    //var group = 0;
    $('#password-group').val(group);
    if (group === 0) { // no emoji
        $('.group-1').addClass('hidden');
        $('#password-1').prop('type', 'password');
    } else { // emoji
        $('.group-0').addClass('hidden');
    }
    return group;
}

function testOutput(password, passwordConfirm, pos, key) {
    $('#control').html('Caret: ' + pos + '<br> Password: ' + password.join(' ') + '<br>Length: ' + password.length + '<br> Password Confirm: ' + passwordConfirm.join(' ') + '<br>e.which: ' + key);
}

function setMetadata(password, passwordConfirm) {
    var passwordString = password.join('');
    var result = zxcvbn(passwordString);

    /* UTF32 -> UTF16   -   1F600 -> D83D DE00                      */
    /* first part stays the same, only the second part is counted   */
    var emoji = passwordString.replace(/[^\uDE00-\uDFFF]/g, '');
    //var emojiOutput = emojione.toShort(passwordString.replace(/[^\uD83D\uDE00-\uDFFF]/g, ''));
    var emojiOutput = encodeURIComponent(passwordString.replace(/[^\uD83D\uDE00-\uDFFF]/g, ''));
    //var emojiOutput = passwordString.replace(/[\uD83D\u]/g, ' x');

    $('#password-length').val(password.length);
    $('#password-numbers').val(passwordString.replace(/\D/g, '').length);
    $('#password-lower').val((passwordString.replace(/[^a-zäöü]/g, '').length).toString());
    $('#password-upper').val((passwordString.replace(/[^A-ZÄÖÜ]/g, '').length).toString());
    $('#password-special').val((passwordString.replace(regExSpecial, '').length).toString());
    $('#password-emojiNr').val(emoji.length);
    $('#password-emoji').val(emojiOutput);
    $('#password-score').val(result.score);
    $('#password-guesses').val(result.guesses);
    $('#password-real').val(passwordString);
}

function clearPwds() {
    $('.password-input').val('');
    $('.policy-error').removeClass('policy-error');
    $('#password-2').closest('.form-group').removeClass('has-error');

    setMetadata([], []);
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
        placeholder = Array(length + 1).join('•');
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
    var password1 = $('#password-1');
    var password2 = $('#password-2');
    var realPassword = [];
    var realPasswordConfirm = [];

    /* initialize group */
    var group = initGroup();

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
    password1.bind('keyup', function (event) {
        var key = event.keyCode || event.which;
        var caretPos = updateCaret(password1);

        if (isPrevented(key)) {
            event.preventDefault();
            return false;
        } else if (event.which === 8) { // backspace -> delete
            if (realPassword.length === caretPos + 1) {
                realPassword = remove(realPassword, caretPos);
            } else {
                realPassword = removeAll(password1);
            }
        } else {
            realPassword = add(password1, realPassword, caretPos);
        }
        testOutput(realPassword, realPasswordConfirm, caretPos, key);
        setMetadata(realPassword, realPasswordConfirm);
        setPlaceholder(password1, realPassword, caretPos);
    });

    /* key events in input field - confirm password */
    password2.bind('keyup', function (event) {
        var key = event.keyCode || event.which;
        var caretPos = updateCaret(password2);
        if (isPrevented(key)) {
            if (event.preventDefault) event.preventDefault(); //normal browsers
            event.returnValue = false; //IE
        } else if (event.which === 8) {
            if (realPasswordConfirm.length === caretPos + 1) {
                realPasswordConfirm = remove(realPasswordConfirm, caretPos);
            } else {
                realPasswordConfirm = removeAll(password2);
            }
        } else {
            realPasswordConfirm = add(password2, realPasswordConfirm, caretPos);
        }
        //testOutput(realPassword, realPasswordConfirm, caretPos, key);
        //setMetadata(realPassword, realPasswordConfirm);
        setPlaceholder(password2, realPasswordConfirm, caretPos);
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
        password2.closest('.form-group').removeClass('has-error');

        if (realPassword.length >= 12) { // 1. min length of 12
            if (realPassword.join('') === realPasswordConfirm.join('')) { // passwords match
                var passwordString = realPassword.join('');
                var pwUpperCase = passwordString.replace(/[^a-zäöü]/g, '').length;
                var pwLowerCase = passwordString.replace(/[^A-ZÄÖÜ]/g, '').length;
                if (pwUpperCase > 0 && pwLowerCase > 0) { // 2. check for upper and lower case
                    var pwNumbers = passwordString.replace(/\D/g, '').length; // 3. check for numbers
                    if (pwNumbers > 0) {
                        if (group === 1) { //check if emoji group
                            var pwEmojis = passwordString.replace(/[^\uDE00-\uDFFF]/g, '').length;
                            if (pwEmojis > 0) { // 4. check for emoji
                                $('#questions').removeClass('hidden');
                                $('#password').addClass('hidden');
                                setMetadata(realPassword, realPasswordConfirm);
                            } else {
                                $('.policy-other').addClass('policy-error');
                            }
                        } else { // special character group
                            var pwSpecialChars = passwordString.replace(regExSpecial, '').length;
                            if (pwSpecialChars > 0) { // 4. check for special ch
                                $('#questions').removeClass('hidden');
                                $('#password').addClass('hidden');
                                setMetadata(realPassword, realPasswordConfirm);
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
                password2.closest('.form-group').addClass('has-error');
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
