jQuery(document).ready(function () {

    $(".txt-error").hide();

    $("#soil_lo01-form").submit(function () {

        //貴社名のチェック
        if ($("#name").find("input").val() == '') {
            $("#name").find("p.txt-error").show();
            $("#name").parent("td").addClass("error");
        } else {
            $("#name").find("p.txt-error").hide();
            $("#name").parent("td").removeClass("error");
        }

        //貴社名のチェック
        if ($("#name03").find("input").val() == '') {
            $("#name03").find("p.txt-error").show();
            $("#name03").parent("td").addClass("error");
        } else {
            $("#name03").find("p.txt-error").hide();
            $("#name03").parent("td").removeClass("error");
        }
        //メールアドレスのチェック
        if($("#email01")) {
            var pT01 = "";
            var pT02 = "";
            if($("#email01").find("input").val() == ''){
                $("#email01").find("p.email01Error01").show();
                $("#email01").parent("td").addClass("error");
                var pT01 = '';
            } else {
                $("#email01").find("p.email01Error01").hide();
                var pT01 = 1;
            }
            if($("#email01").find("input").val() != '' && !$("#email01").find("input").val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
                $("#email01").find("p.email01Error02").show();
                $("#email01").parent("td").addClass("error");
                var pT02 = '';
            } else {
                $("#email01").find("p.email01Error02").hide();
                var pT02 = 1;
            }
            if( pT01 == 1 && pT02 == 1 ){
                $("#email01").parent("td").removeClass('error');
            }
        }

        //メールアドレス（確認用）のチェック
        if($("#email02")) {
            var pT01 = "";
            var pT02 = "";
            if($("#email02").find("input").val() == ''){
                $("#email02").find("p.email02Error01").show();
                $("#email02").parent("td").addClass("error");
                var pT01 = '';
            } else {
                $("#email02").find("p.email02Error01").hide();
                var pT01 = 1;
            }
            if($("#email02").find("input").val() != '' && $("#email02").find("input").val() != $("#email01").find("input").val()){
                $("#email02").find("p.email02Error02").show();
                $("#email02").parent("td").addClass("error");
                var pT02 = '';
            } else {
                $("#email02").find("p.email02Error02").hide();
                var pT02 = 1;
            }
            if( pT01 == 1 && pT02 == 1 ){
                $("#email02").parent("td").removeClass('error');
            }
        }

        //電話番号のチェック
        if ($("#tel")) {
            var pT01 = "";
            var pT02 = "";
            if($("#tel").find("input").val() == ''){
                $("#tel").find("p.telError01").show();
                $("#tel").parent("td").addClass("error");
                var pT01 = '';
            } else {
                $("#tel").find("p.telError01").hide();
                var pT01 = 1;
            }
            if ($("#tel").find("input").val().match(/[^0-9]+/)) {
                $("#tel").find("p.telError02").show();
                $("#tel").parent("td").addClass('error');
                var pT02 = '';
            } else {
                $("#tel").find("p.telError02").hide();
                var pT02 = 1;
            }
            if (pT02 == 1) {
                $("#tel").parent("td").removeClass('error');
            }
        }

        //お問い合わせ内容
        if ($("#detail").find("textarea").val() == '') {
            $("#detail").find("p.error_mes01").show();
            $("#detail").parent("td").addClass("error");
        } else {
            $("#detail").find("p.error_mes01").hide();
            $("#detail").parent("td").removeClass("error");
        }

        //同意するチェック
        if ($("#agree").find("input").val() == '') {
            $("#agree").find("p.txt-error").show();
            $("#agree").parent("td").addClass("error");
        } else {
            $("#agree").find("p.txt-error").hide();
        }

        if($('#agreeCheck').prop('checked')) {
            $('#agree .txt-error').hide();
            $("#agree").parent("td").removeClass("error");
        }


        //エラーの際の処理
        if ($(".error").size() > 0) {
            $('html,body').animate({scrollTop: $(".error:first").offset().top - 15}, 0);
            return false;
        }
    })

});