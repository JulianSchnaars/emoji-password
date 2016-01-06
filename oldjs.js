var passwordValue = "";
            var passwordLength = 0;
            var placeholder = "";
            var newKey = "";

            $(document).ready(function () {
                //$('.noselect').disableSelection();

                $('.password-value').keydown(function (e) { //keyup for triggering backspace
                    if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) { //prevent cursor from moving
                        return false;
                    } else if ((e.which == 8 || e.which == 46) && passwordValue != '') {
                        passwordValue = passwordValue.substring(0, passwordValue.length - 1);
                        passwordLength = passwordValue.length + 1;
                        //alert("backspace");
                    } else {
                        newKey = ($(this).val()).substring($(this).val().length-1,$(this).val().length);
                        passwordValue += newKey;
                        passwordLength = passwordValue.length + 1;
                        placeholder = Array(passwordLength).join("*");
                        $(this).val(placeholder);
                    }
                }).focusout(function () {
                    alert(passwordValue);
                });

            });

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




/*.mouseup(function () {
                    //alert($('.password-value').caret());
                    $('.password-value').caret(-1);
                }).keydown(function (e) {
                    if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) { //prevent cursor from moving
                        return false;
                    }
                });*/