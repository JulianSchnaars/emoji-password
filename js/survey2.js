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

function testOutput(password, pos, key) {
    $('#control').html('Caret: ' + pos + '<br> Password: ' + password.join(' ') + '<br>Length: ' + password.length + '<br>e.which: ' + key);
}

function clearPwds() {
    $('.password-input').val('');
    $('#password-1').closest('.form-group').removeClass('has-error');

    //setMetadata([], []);
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

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function setUserData() {
    var id = getCookie('emojiPasswordId');
    var group = getCookie('emojiPasswordGroup');

    $('#password-id').val(id);
    $('#password-group').val(group);
}

$(document).ready(function () {
    var password1 = $('#password-1');
    var savedPassword = getCookie('emojiPassword');
    var realPassword = [];

    /* get group and id from last time */
    setUserData();

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
        //testOutput(realPassword, caretPos, key);
        setPlaceholder(password1, realPassword, caretPos);
    });

    /* button for clearing password fields */
    $("#clear").click(function () {
        realPassword = [];
        clearPwds();
    });

    /* in case password was forgotten */
    $("#forgot-password").click(function () {
        realPassword = [];
        $('#questions').removeClass('hidden');
        $('#password').addClass('hidden');
    });

    /* next button for sections */
    $('#questionsNext').click(function () {
        password1.closest('.form-group').removeClass('has-error');
        if (savedPassword === encodeURIComponent(realPassword.join(''))) {
            //alert('all right');
            $('#questions').removeClass('hidden');
            $('#password').addClass('hidden');
        } else {
            password1.closest('.form-group').addClass('has-error');
            $('#forgot-password').removeClass('hidden');
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
