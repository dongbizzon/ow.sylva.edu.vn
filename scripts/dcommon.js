var App = App || {};

//---MAIN----
jQuery(function () {
    App.Dev.contactFormValidate();
    App.Dev.contactFormValidate2();
    App.Dev.contactFormValidate3();
    App.Dev.subscribeFormValidate();
    App.Dev.getCurrentDate();
});

//--All site
App.Dev = function(){
    var flag = 1;

    var register = function(){
        if (jQuery('form#ggcontact').valid() && flag) {
            let question1 = getQuestionAnswer(1);
            // let question2 = getQuestionAnswer(2);
            // let question3 = getQuestionAnswer(3);

            var data = jQuery('form#ggcontact').serialize();
            console.log(data);
            jQuery('#gg-submit').text('ĐANG GỬI...');
            
            flag = 0;

            jQuery.ajax({
                type : 'GET',
                url : 'https://script.google.com/macros/s/AKfycbyvKklHSIQ-BNZGTFHt4kwa8aeHXu3fimpkODwHRygKffXMHQZAzdsJEOfpeqxW0B-n/exec',
                dataType:'json',
                crossDomain : true,
                data : data,
                success : function(data)
                {
                    if(data == 'false')
                    {
                        alert('ERROR, Please try again later!');
                    }else{
                        flag = 1;
                        jQuery('#gg-submit').text('GỬI');

                        if (data.result == "success") {
                            gtag('event', 'ga-event-LongForm-submit-success'); //send GA
                            fbq('track', 'SYLVA-Marketing-LP-submitSuccess'); //send Meta

                            jQuery('form#ggcontact')[0].reset();
                            $("#popup-success").fancybox().trigger('click');
                        }
                    }
                }
            });
        }
    }

    var register2 = function(){
        if (jQuery('form#ggcontact2').valid() && flag) {
            let question1 = getQuestionAnswer2(1);
            // let question2 = getQuestionAnswer(2);
            // let question3 = getQuestionAnswer(3);

            var data = jQuery('form#ggcontact2').serialize();
            console.log(data);
            jQuery('#gg-submit2').text('ĐANG GỬI...');
            
            flag = 0;

            jQuery.ajax({
                type : 'GET',
                url : 'https://script.google.com/macros/s/AKfycbyvKklHSIQ-BNZGTFHt4kwa8aeHXu3fimpkODwHRygKffXMHQZAzdsJEOfpeqxW0B-n/exec',
                dataType:'json',
                crossDomain : true,
                data : data,
                success : function(data)
                {
                    if(data == 'false')
                    {
                        alert('ERROR, Please try again later!');
                    }else{
                        flag = 1;
                        jQuery('#gg-submit2').text('GỬI');

                        if (data.result == "success") {
                            gtag('event', 'ga-event-LongForm-submit-success'); //send GA
                            fbq('track', 'SYLVA-Marketing-LP-submitSuccess'); //send Meta

                            jQuery('form#ggcontact2')[0].reset();
                            $.fancybox.close();
                            $("#popup-success").fancybox().trigger('click');
                        }
                    }
                }
            });
        }
    }

    var register3 = function(){
        if (jQuery('form#ggcontact3').valid() && flag) {
            var data = jQuery('form#ggcontact3').serialize();
            console.log(data);
            jQuery('#gg-submit3').text('ĐANG GỬI...');
            
            flag = 0;

            jQuery.ajax({
                type : 'GET',
                url : 'https://script.google.com/macros/s/AKfycbyvKklHSIQ-BNZGTFHt4kwa8aeHXu3fimpkODwHRygKffXMHQZAzdsJEOfpeqxW0B-n/exec',
                dataType:'json',
                crossDomain : true,
                data : data,
                success : function(data)
                {
                    if(data == 'false')
                    {
                        alert('ERROR, Please try again later!');
                    }else{
                        flag = 1;
                        jQuery('#gg-submit3').text('NHẬN TƯ VẤN');

                        if (data.result == "success") {
                            gtag('event', 'ga-event-shortForm-submit-success'); //send GA
                            fbq('track', 'SYLVA-Marketing-LP-submitSuccess'); //send Meta

                            jQuery('form#ggcontact3')[0].reset();
                            $.fancybox.close();
                            $("#popup-success").fancybox().trigger('click');
                        }
                    }
                }
            });
        }
    }


    var getQuestionAnswer = function(num) {
        let answer = '';

        $('#question'+num+' input[type="checkbox"]').each(function(index, element){
            if($(element).is(":checked")) {
                if(answer) {
                    answer += ' - ';
                }

                answer += $(element).next().text();
            }
        })

        $('#answer' + num).val(answer);
        return answer;
    }

    var getQuestionAnswer2 = function(num) {
        let answer = '';

        $('#question2_'+num+' input[type="checkbox"]').each(function(index, element){
            if($(element).is(":checked")) {
                if(answer) {
                    answer += ' - ';
                }

                answer += $(element).next().text();
            }
        })

        $('#answer2_' + num).val(answer);
        return answer;
    }

    var scrollToContactForm = function() {
        $('html, body').animate({
            scrollTop: $("#ggcontact").offset().top - $('.page-header').height() - 30
        }, 1000);
    }

    var contactFormValidate = function(){

        var contactForm = jQuery('form#ggcontact');
        if (contactForm.length < 1) {
            return;
        }

        jQuery.validator.addMethod("validatePhone", function (value, element) {
            var flag = false;
            var phone = value;
            phone = phone.replace('(+84)', '0');
            phone = phone.replace('+84', '0');
            phone = phone.replace('0084', '0');
            phone = phone.replace(/ /g, '');
            if (phone != '') {
                var firstNumber = phone.substring(0, 3);
                var validNumber = ["099","095","092","086","088","096","097","098","032","033","034","035","036","037","038","039","089","090","093","070","079","077","076","078","091","094","083","084","085","081","082","092","056","058"];
                if ((jQuery.inArray(firstNumber,validNumber)!='-1') && phone.length == 10) {
                    if (phone.match(/^\d{10}/)) {
                        flag = true;
                    }
                }
            }
            return flag;
        }, "Invalid phone number format");

        contactForm.validate({
            ignore: "",
            rules: {
                'name': {
                    required: true,
                },
                'company': {
                    required: true,
                },
                'phone': {
                    required: true,
                    validatePhone:true,
                },
                'email': {
                    required: true,
                    email: true
                },
                'position': {
                    required: true,
                }
            },
            messages: {
                'name': {
                    required: "Vui lòng nhập thông tin"
                },
                'company': {
                    required: "Vui lòng nhập thông tin"
                },
                'phone': {
                    required: "Vui lòng nhập số điện thoại",
                    validatePhone: "Vui lòng nhập đúng định dạng"
                },
                'email': {
                    required: "Vui lòng nhập email",
                    email: "Vui lòng nhập đúng định dạng email"
                },
                'position': {
                    required: "Vui lòng nhập thông tin"
                }
            },
            errorElement : 'p',
            errorClass: 'error',
            errorPlacement: function(error, element) {

                error.insertAfter(element);

            },
            highlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').addClass('error');
            },
            unhighlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').removeClass('error');
            },
        });
    }

    var contactFormValidate2 = function(){

        var contactForm = jQuery('form#ggcontact2');
        if (contactForm.length < 1) {
            return;
        }

        jQuery.validator.addMethod("validatePhone", function (value, element) {
            var flag = false;
            var phone = value;
            phone = phone.replace('(+84)', '0');
            phone = phone.replace('+84', '0');
            phone = phone.replace('0084', '0');
            phone = phone.replace(/ /g, '');
            if (phone != '') {
                var firstNumber = phone.substring(0, 3);
                var validNumber = ["099","095","092","086","088","096","097","098","032","033","034","035","036","037","038","039","089","090","093","070","079","077","076","078","091","094","083","084","085","081","082","092","056","058"];
                if ((jQuery.inArray(firstNumber,validNumber)!='-1') && phone.length == 10) {
                    if (phone.match(/^\d{10}/)) {
                        flag = true;
                    }
                }
            }
            return flag;
        }, "Invalid phone number format");

        contactForm.validate({
            ignore: "",
            rules: {
                'name': {
                    required: true,
                },
                'company': {
                    required: true,
                },
                'phone': {
                    required: true,
                    validatePhone:true,
                },
                'email': {
                    required: true,
                    email: true
                },
                'position': {
                    required: true,
                }
            },
            messages: {
                'name': {
                    required: "Vui lòng nhập thông tin"
                },
                'company': {
                    required: "Vui lòng nhập thông tin"
                },
                'phone': {
                    required: "Vui lòng nhập số điện thoại",
                    validatePhone: "Vui lòng nhập đúng định dạng"
                },
                'email': {
                    required: "Vui lòng nhập email",
                    email: "Vui lòng nhập đúng định dạng email"
                },
                'position': {
                    required: "Vui lòng nhập thông tin"
                }
            },
            errorElement : 'p',
            errorClass: 'error',
            errorPlacement: function(error, element) {

                error.insertAfter(element);

            },
            highlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').addClass('error');
            },
            unhighlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').removeClass('error');
            },
        });
    }

    var contactFormValidate3 = function(){

        var contactForm = jQuery('form#ggcontact3');
        if (contactForm.length < 1) {
            return;
        }

        jQuery.validator.addMethod("validatePhone", function (value, element) {
            var flag = false;
            var phone = value;
            phone = phone.replace('(+84)', '0');
            phone = phone.replace('+84', '0');
            phone = phone.replace('0084', '0');
            phone = phone.replace(/ /g, '');
            if (phone != '') {
                var firstNumber = phone.substring(0, 3);
                var validNumber = ["099","095","092","086","088","096","097","098","032","033","034","035","036","037","038","039","089","090","093","070","079","077","076","078","091","094","083","084","085","081","082","092","056","058"];
                if ((jQuery.inArray(firstNumber,validNumber)!='-1') && phone.length == 10) {
                    if (phone.match(/^\d{10}/)) {
                        flag = true;
                    }
                }
            }
            return flag;
        }, "Invalid phone number format");

        contactForm.validate({
            ignore: "",
            rules: {
                'name': {
                    required: true,
                },
                'phone': {
                    required: true,
                    validatePhone:true,
                },
                'email': {
                    required: true,
                    email: true
                }
            },
            messages: {
                'name': {
                    required: "Vui lòng nhập thông tin"
                },
                'phone': {
                    required: "Vui lòng nhập số điện thoại",
                    validatePhone: "Vui lòng nhập đúng định dạng"
                },
                'email': {
                    required: "Vui lòng nhập email",
                    email: "Vui lòng nhập đúng định dạng email"
                }
            },
            errorElement : 'p',
            errorClass: 'error',
            errorPlacement: function(error, element) {

                error.insertAfter(element);

            },
            highlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').addClass('error');
            },
            unhighlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').removeClass('error');
            },
        });
    }

    var subscribe = function(){
        if (jQuery('form#subscribe').valid() && flag) {
            var data = jQuery('form#subscribe').serialize();
            console.log(data);
            jQuery('#sub-submit').val('Sending...');
            
            flag = 0;

            jQuery.ajax({
                type : 'GET',
                url : 'https://script.google.com/macros/s/AKfycbxmly7514LLBxDKCCv_QEE_P7ToC6r3RaQi_ak4NfqEsnLikm__AymCNzrH7pfQngY/exec',
                dataType:'json',
                crossDomain : true,
                data : data,
                success : function(data)
                {
                    if(data == 'false')
                    {
                        alert('ERROR, Please try again later!');
                    }else{
                        flag = 1;
                        jQuery('#sub-submit').val('Contact us');

                        if (data.result == "success") {
                            jQuery('form#subscribe')[0].reset();
                            $.fancybox.close();
                            $("#md-tk").fancybox().trigger('click');
                        }
                    }
                }
            });
        }
    }

    var subscribeFormValidate = function(){

        var contactForm = jQuery('form#subscribe');
        if (contactForm.length < 1) {
            return;
        }

        contactForm.validate({
            ignore: "",
            rules: {
                'email': {
                    required: true,
                    email: true
                }
            },
            messages: {
                'email': {
                    required: "Please fill email",
                    email: "Invalid email address"
                }
            },
            errorElement : 'p',
            errorClass: 'error',
            errorPlacement: function(error, element) {

                error.insertAfter(element.parent());

            },
            highlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').addClass('error');
            },
            unhighlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').removeClass('error');
            },
        });
    }

    var getCurrentDate = function() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        
        $('.current-date').val(today);
    }

    var copyToClipboard = function(num) {
        var $temp = $("<input>");
        $("body").append($temp);
        if (num == 1) {
            $temp.val($("#bank-number").text()).select();
        }

        if (num == 2) {
            $temp.val($("#sms-phonenumber").text()).select();
        }
        
        document.execCommand("copy");
        $temp.remove();
    }

    var phoneChange = function() {
        var phone = $("#phone").val();
        phone = phone.replace('(+84)', '0');
        phone = phone.replace('+84', '0');
        phone = phone.replace('0084', '0');
        phone = phone.replace(/ /g, '');
        if (phone != '') {
            var firstNumber = phone.substring(0, 3);
            var validNumber = ["099","095","092","086","088","096","097","098","032","033","034","035","036","037","038","039","089","090","093","070","079","077","076","078","091","094","083","084","085","081","082","092","056","058"];
            if ((jQuery.inArray(firstNumber,validNumber)!='-1') && phone.length == 10) {
                if (phone.match(/^\d{10}/)) {
                    console.log(phone);
                }
            }
        }
    }

    return {
        register: register,
        register2: register2,
        register3: register3,
        contactFormValidate: contactFormValidate,
        contactFormValidate2: contactFormValidate2,
        contactFormValidate3: contactFormValidate3,
        subscribe: subscribe,
        subscribeFormValidate: subscribeFormValidate,
        getCurrentDate: getCurrentDate,
        copyToClipboard: copyToClipboard,
        phoneChange: phoneChange,
        scrollToContactForm: scrollToContactForm
    };

}();    
//--End All site
