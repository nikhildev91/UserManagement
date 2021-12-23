function validateForm(){
    var valid = $("#signUpForm").validate({
        rules:{
            Name:{
                required: true,
                maxlength: 30,
                lettersonly: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            Email:{
                required: true,
                email: true,
                minlength: 5,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            Password:{
                required: true,
                minlength: 8,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            ConfirmPassword: {
                required: true,
                minlength: 8,
                normalizer: function(value) {
                    return $.trim(value);
                },
                equalTo: "#Password"
            }
        }
    })
    return valid;
}

jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Only letters and spaces are allowed");


$(document).ready(function(){
    validateForm();
})