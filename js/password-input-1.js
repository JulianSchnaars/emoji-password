var pwdValue1 = "";
var pwdValue2 = "";
var pwdLength1 = 0;
var pwdLength2 = 0;
var placeholder1 = "";
var placeholder2 = "";
var newKey = "";
var pos = 0;
var mouseDown1 = false;
var mouseDown2 = false;

function pwdField1() {
    "use strict";

    $('#password-1').keydown(function (e) {
        if (e.which === 46 || e.which === 38 || e.which === 39 || e.which === 40) {
            e.preventDefault();
        }
    }).keyup(function (e) { //keyup for triggering backspace
        pwdLength1 = $(this).val().length;
        if (e.which === 8 || e.which === 37) {
            if (pwdLength1 === 0) {
                pwdValue1 = '';
            } else {
                pwdValue1 = pwdValue1.slice(0, -1);
            }
        } else {
            newKey = $(this).val().replace(/\*/g, '');
            //newKey = $(this).val().slice(-1);
            //pwdValue1 = pwdValue1.substring(0, pos - 1) + newKey + pwdValue1.substring(pos);
            pwdValue1 = pwdValue1 + newKey;
            newKey = '';
        }
        pwdLength1 = pwdValue1.length;

        placeholder1 = Array(pwdLength1 + 1).join("*");
        $(this).val(placeholder1);
        writePwds();
    }).on('', function (e) {
       
        //alert("touch");
    }).bind('touchmove', function (e) {
        //mouseDown1 = false;
        writePwds();
    }).focusout(function () {
        //alert(pwdValue1);
    });
}

function pwdField2() {
    "use strict";

    $('#password-2').keydown(function (e) {
        if (e.which === 46 || e.which === 38 || e.which === 39 || e.which === 40 || e.which === 13) {
            e.preventDefault();
        }
    }).keyup(function (e) {
        if (e.which === 46 || e.which === 38 || e.which === 39 || e.which === 40 || e.which === 13) {
            e.preventDefault();
        }
        pwdLength2 = $(this).val().length;

        if (e.which === 8 || e.which === 37) {
            if (pwdLength2 === 0) {
                pwdValue2 = '';
            } else {
                pwdValue2 = pwdValue2.slice(0, -1);
            }
        } else {
            newKey = $(this).val().replace(/\*/g, '');
            pwdValue2 += newKey;
        }
        pwdLength2 = pwdValue2.length;
        placeholder2 = Array(pwdLength2 + 1).join("*");
        $(this).val(placeholder2);
        writePwds();
    }).on('touchstart', function (e) {
        if (mouseDown2 === false) {
            $(this).caret(-1);
            mouseDown2 = true;
        } else {
            e.preventDefault();
        }
        //alert("touch");
    }).on('touchend', function (e) {
        //mouseDown = false;
    }).focusout(function () {
        //alert(pwdValue1);
    });
}

function writePwds() {
    $("#control").text(pwdValue1 + ' - ' + pwdLength1 + " -- " + pwdValue2 + ' - ' + pwdLength2 + 'caret: ' + $('#password-1').caret());
}

function checkPwds() {
    if (pwdValue1 === pwdValue2) {
        if (pwdLength1 >= 5) {
            $('#password-real').val(pwdValue1); //save password in hidden form field
            //alert(pwdValue1);
            $('#help-text').text('done');
        } else {
            $('#help-text').text('Password must be 5 characters or more.');
        }
    } else {
        $('#help-text').text('Passwords do not match.');
    }
}

function clearPwds() {
    //$(this).trigger("reset");
    $('#password-1').val('');
    $('#password-2').val('');
    pwdValue1 = "";
    pwdValue2 = "";
    pwdLength1 = 0;
    pwdLength2 = 0;
    placeholder1 = "";
    placeholder2 = "";
    newKey = "";
    pos = 0;
    mouseDown1 = false;
    mouseDown2 = false;
    //writePwds();
}
// This jQuery Plugin will disable text selection for Android and iOS devices.
// Stackoverflow Answer: http://stackoverflow.com/a/2723677/1195891
$.fn.extend({
    disableSelection: function () {
        "use strict";
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
function notMobileWarning() {
    $('#mobile').toggleClass('half-opacity');
    $('#desktop').toggleClass('hidden');
    //alert("This is not a mobile device");
}
$(document).ready(function () {
    "use strict";
    if (isNotMobile.any()) {
        //notMobileWarning();
    }
    
    $('.noselect').disableSelection();

    pwdField1();
    pwdField2();

    $('#submit').on('click touchstart', function (e) {
        checkPwds();
    })
    $('#clear').on('click touchstart', function (e) {
        clearPwds()
    })
});