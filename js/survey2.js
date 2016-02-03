/*global $, document */
"use strict";

var regExSpecial = /[^~`!#@\$%\^&*+=\-\[\]\\';,§\/{}()|\\":.<>\?≠¿¡“¶¢‘±œπæ–…∞µ~∫√ç≈¥å‚∂ƒ©ªº]/g;

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

function notMobileWarning() {
    $('#mobile').toggleClass('half-opacity');
    $('#desktop').toggleClass('hidden');
    //alert("This is not a mobile device");
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function setUserData(passwordString) {
    var id = getCookie('emojiPasswordId');
    var group = getCookie('emojiPasswordGroup');

    $('#password-id').val(id);
    $('#password-group').val(group);
    $('#password-real').val(passwordString);
}

$(document).ready(function () {
    var pwField1 = $('#password-1');
    var savedPassword = decodeURIComponent(getCookie('emojiPassword'));
    //alert(savedPassword);

    //var group = getCookie('emojiPasswordGroup');
    var group = 1;
    /* emoji area */
    if (group === 1) {
        $.emojiarea.path = '../jquery-emojiarea-master/packs/basic/images';
        pwField1.emojiarea({
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

    /* key events in input field - password */
    pwField1.on('change', function () {
        var input = $(this).val();
        var output = (emojione.shortnameToUnicode(input)).replace(/\s/g, ''); // click on emoji pastes shortname; has to be converted
        $(this).val(output);
        $(this).focus();
    }).on('keyup', function () {
        setUserData($(this).val());
    });

    /* button for clearing password fields */
    $("#clear").click(function () {
        clearPwds();
    });

    /* in case password was forgotten */
    $("#forgot-password").click(function () {
        $('#questions').removeClass('hidden');
        $('#password').addClass('hidden');
        $('#password-skipped').val('true');
        setUserData('');
    });

    /* next button for sections */
    $('#questionsNext').click(function () {
        var realPassword = pwField1.val();
        pwField1.closest('.form-group').removeClass('has-error');
        if (savedPassword === realPassword) {
            //alert('all right');
            /* get group and id from last time + password */
            setUserData(realPassword);
            $('#questions').removeClass('hidden');
            $('#password').addClass('hidden');
        } else {
            pwField1.closest('.form-group').addClass('has-error');
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
