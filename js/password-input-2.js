/*global $, document */
"use strict";

/*(function () {
    var pwField = $('#password-1');
})();*/


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

function writePwds(password, pos) {
    $('#control').text('Caret: ' + pos + ' Length: ' + password.length + ' Value: ' + password.join(' '));
}

function updateCaret() {
    return $('#password-1').caret();
}

function add(password, pos) {
    var key = document.getElementById('password-1').value.replace(/•/g, '');
    //var key = $('#password-1').val().replace(/\*/g, '');
    //document.getElementById('password-1').value = '';
    password.splice(pos, 0, key);
    return password;
}

function remove(password, pos) {
    password.splice(pos, 1);
    //password.splice(pos, 1).concat(password.slice(pos));
    return password;
}

function setPlaceholder(password, pos) {
    //var length = $('#password-real').val().length;
    var length = password.length;
    var placeholder = '';

    if (length === 1) {
        placeholder = '•';
    } else {
        placeholder = Array(length + 1).join('•');
    }
    document.getElementById('password-1').value = '';
    document.getElementById('password-1').value = placeholder;
    $('#password-1').caret(pos);
}

$(document).ready(function () {
    var caretPos;
    var realPassword = [];

    $('.noselect').disableSelection();

    $('#password-1').bind('keyup', function (e) {
        caretPos = updateCaret();

        if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40) {
            e.preventDefault();
            return false;
        } else if (e.which === 8) {
            realPassword = remove(realPassword, caretPos);
        } else {
            realPassword = add(realPassword, caretPos);
        }
        writePwds(realPassword, caretPos);
        setPlaceholder(realPassword, caretPos);
    });
});