'use strict';

$(document).ready(function () {
    let disabled = true;
    //date part
    function changeDays(month, year) {
        let number_of_days = 31;
        switch (month) {
            case "February":
                if (year % 4 === 0 || year % 400 === 0) {
                    number_of_days = 29;
                } else {
                    number_of_days = 28;
                }
                break
            case "April":
            case "June":
            case "September":
            case "November":
                number_of_days = 30;
                break;
            default:
                number_of_days = 31;
                break;
        }
        let days_body = ``
        for (let i = 1; i <= number_of_days; i++) {
            days_body += `<option value=${i}>${i}</option>`;
        }
        $("#days").html(days_body);
    }
    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    let months_body = ``;
    for (let i = 1; i <= months.length; i++) {
        months_body += `<option value=${i}>${months[i - 1]}</option>`;
    }
    let days_body = ``
    for (let i = 1; i <= 31; i++) {
        days_body += `<option value=${i}>${i}</option>`;
    }
    let years_body = ``;
    let date = new Date();
    let current_year = date.getFullYear();
    let allowed_year = current_year - 18;
    for (let i = allowed_year; i >= 1920; i--) {
        years_body += `<option value=${i}>${i}</option>`;
    }
    $("#years").html(years_body);
    $("#days").html(days_body);
    $("#months").append(months_body);
    $("#months").change(function () {
        changeDays(months[$("#months").val() - 1], $("#years").val());
    });
    $("#years").change(function () {
        changeDays(months[$("#months").val() - 1], $("#years").val());
    });

    $("form[name=registration_form] :input").each(function () {
        $(this).keyup(() => {
            let input_name = this.name;
            let input_val = $(`input[name=${input_name}]`).val();
            let regex = null;
            switch (input_name) {
                case 'username':
                    regex = /^(?=.{4,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
                    break;
                case 'first_name':
                    // regex = /^[a-zA-z]{1,20}$/g;
                    regex = /^[\p{L}]+$/u;
                    break;
                case 'last_name':
                    // regex = /^[a-zA-Z]{1,20}([ ]{0,1}?[a-zA-Z]{1,20}?)*$/g;
                    regex = /^[\p{L}]+(\s[\p{L}]+)*$/u;
                    break;
                case 'reg_email':
                    regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*.com$/g;
                    break;
                case 'reg_password':
                case 'reg_confirm_password':
                    regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                    break;
                default:
                    break;
            }
            if (regex !== null) {
                if (regex.test(input_val.trim())) {
                    $(`#${input_name}_check`).removeClass('d-none');
                    $(`#${input_name}_check`).addClass('d-block');
                } else {
                    $(`#${input_name}_check`).removeClass('d-block');
                    $(`#${input_name}_check`).addClass('d-none');
                }
            }
        });
    });
    $("input[name=termsCheckBox]").change(function () {
        if ($("input[name=termsCheckBox]:checked").length > 0) {
            $("#regBtn").removeClass('disabled');
            $("#regBtn").prop('disabled', false);
            disabled = false;
        } else {
            $("#regBtn").addClass('disabled');
            $("#regBtn").prop('disabled', true);
        }
    });
    $("form[name=registration_form]").submit(function (e) {
        e.preventDefault();
        if (!disabled) {
            const username = $("input[name=username]").val().trim();
            const first_name = $("input[name=first_name]").val().trim();
            const last_name = $("input[name=last_name]").val().trim();
            const reg_email = $("input[name=reg_email]").val().trim();
            const reg_password = $("input[name=reg_password]").val();
            const reg_confirm_password = $("input[name=reg_confirm_password]").val();
            const username_regex = /^(?=.{4,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
            // const fname_regex = /^[a-zA-z]{1,20}$/g;
            const fname_regex = /^[\p{L}]+$/u;
            //const lname_regex = /^[a-zA-Z]{1,20}([ ]{0,1}?[a-zA-Z]{1,20}?)*$/g;
            const lname_regex = /^[\p{L}]+(\s[\p{L}]+)*$/u;
            const email_reg_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*.com$/sg;
            const reg_password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            let count = 0
            if (!username_regex.test(username)) {
                $("#username_err").removeClass('d-none');
                $("#username_err").addClass('d-block');
                count++;
            }
            if (!lname_regex.test(last_name) || !fname_regex.test(first_name)) {
                $("#name_err").removeClass('d-none');
                $("#name_err").addClass('d-block');
                count++;
            } else {
                if (!$("#name_err").hasClass('d-none')) {
                    $("#name_err").addClass('d-none');
                    $("#name_err").removeClass('d-block');
                }
            }
            if (!email_reg_regex.test(reg_email)) {
                $("#email_err").removeClass('d-none');
                $("#email_err").addClass('d-block');
                count++
            } else {
                if (!$("#email_err").hasClass('d-none')) {
                    $("#email_err").removeClass('d-block');
                    $("#email_err").addClass('d-none');
                }
            }
            if (reg_password !== reg_confirm_password) {
                $("#pass_err2").removeClass('d-none');
                $("#pass_err2").addClass('d-block');
                count++;
            } else {
                if (!$("#pass_err2").hasClass('d-none')) {
                    $("#pass_err2").removeClass('d-block');
                    $("#pass_err2").addClass('d-none');
                }
            }
            if (!reg_password_regex.test(reg_password)) {
                $("#pass_err1").removeClass('d-none');
                $("#pass_err1").addClass('d-block');
                count++;
            } else {
                if (!$("#pass_err1").hasClass('d-none')) {
                    $("#pass_err1").removeClass('d-block')
                    $("#pass_err1").addClass('d-none')
                }
            }
            if (count === 0) {
                e.target.submit();
            }
        }
    });

});
