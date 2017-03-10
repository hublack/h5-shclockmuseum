/**
 * Created by createc Chris on 8/12/16.
 */

window.onload=function(){

    var buttonOne = false;
    function checkEmpty(a,b){
        var inputText = a.val();
        if(inputText == "" || inputText == " "){
            $(".remind-box").find("div:eq("+b+")").css("display","block").siblings().css("display","none");
            buttonOne = false;
        }else {
            $(".remind-one").css("display","none");
            buttonOne = true;
        }
    }

    var buttonTwo = false;
    function checkPhone(a){
        var phone = a.val();
        if(!(/^1[34578]\d{9}$/.test(phone))){
            // $(".remind-two").css("display","block");
            $(".remind-box").find("div:eq(1)").css("display","block").siblings().css("display","none");
            buttonTwo = false;
        }else {
            $(".remind-two").css("display","none");
            buttonTwo = true;
        }
    }

    var buttonThree = false;
    function checkTimeone(a){
        var timeOne = a.val();
        if(timeOne.indexOf("号") > 0){
            console.info("有中文字");
            $(".remind-three").css("display","none");
            buttonThree = true;
        }else {
            // $(".remind-three").css("display","block");
            $(".remind-box").find("div:eq(2)").css("display","block").siblings().css("display","none");
            buttonThree = false;
        }
    }
    var buttonThreeCopy = false;
    function checkTimeTwo(a){
        var timeTwo = a.val();
        if(timeTwo.indexOf("点") > 0){
            console.info("有中文字");
            $(".remind-ten").css("display","none");
            buttonThreeCopy = true;
        }else {
            // $(".remind-three").css("display","block");
            $(".remind-box").find("div:eq(9)").css("display","block").siblings().css("display","none");
            buttonThreeCopy = false;
        }
    }

    var buttonFour = false;
    function checkShape(a,b){
        var aVal = a.val();
        var bVal = b.val();
        console.info(aVal,bVal);
        if(aVal=="on"){
            $(".remind-four").css("display","none");
            checkNumber($(".team-number"));
            $(".team-number").blur(function(){
                checkNumber($(".team-number"));
            });
        }else if(bVal=="on"){
            $(".remind-four").css("display","none");
            buttonFour = true;
            buttonSix = true;
        }else {
            // $(".remind-four").css("display","block");
            $(".remind-box").find("div:eq(3)").css("display","block").siblings().css("display","none");
            buttonFour = false;
        }
    }



    var buttonFive = false;
    function checkExpress(a,b){
        var aVal = a.val();
        var bVal = b.val();
        if(aVal=="on" || bVal=="on"){
            $(".remind-six").css("display","none");
            buttonFive = true;
        }else {
            // $(".remind-six").css("display","block");
            $(".remind-box").find("div:eq(5)").css("display","block").siblings().css("display","none");
            buttonFive = false;
        }
    }

    var buttonSix = false;
    function checkNumber(a){
        var number = a.val();
        if(isNaN(number)==true || number=="" || number==" "){
            // $(".remind-five").css("display","block");
            $(".remind-box").find("div:eq(4)").css("display","block").siblings().css("display","none");
            buttonSix = false;
        }else {
            $(".remind-five").css("display","none");
            buttonSix = true;
            buttonFour = true;
        }
    }

    var buttonSeven = false;
    function checkList(a){
        var listVal = a.index();
        if(listVal==0){
           // $(".remind-seven").css("display","block");
            $(".remind-box").find("div:eq(6)").css("display","block").siblings().css("display","none");
            buttonSeven = false;
        }else {
            $(".remind-seven").css("display","none");
            buttonSeven = true;
        }
    }

    var buttonEight = false;
    function checkListTwo(a){
        var listVal = a.index();
        if(listVal==0){
            // $(".remind-eight").css("display","block");
            $(".remind-box").find("div:eq(7)").css("display","block").siblings().css("display","none");
            buttonEight = false;
        }else {
            $(".remind-eight").css("display","none");
            buttonEight = true;
        }
    }

    $(".username").blur(function(){
        checkEmpty($(this),0);
    });
    $(".phone").blur(function(){
        checkPhone($(this));
    });
    $(".dater").blur(function(){
        checkTimeone($(this));
    });
    $(".timer").blur(function(){
        checkTimeTwo($(this));
    });


    //获取所有的val值
    function getVal(){
        var userName = $(".username").val(),
            phoneNumber = $(".phone").val(),
            dateVal = $(".dater").val(),
            timeVal = $(".timer").val(),

            teamVal = $(".team:checked").val(),
            singleVal = $(".single:checked").val(),

            teamNumberVal = $(".team-number").val(),

            yesVal = $(".yes:checked").val(),
            noVal = $(".no:checked").val(),

            selectOneVal = $(".list-one option:selected").index(),
            selectTwoVal = $(".list-two option:selected").index();

        var data = {};
        data.name = userName;
        data.phone = phoneNumber;
        data.date = dateVal+"/"+timeVal;

        if(teamVal=="on"){
           data.type="团队";
            data.group_ppl = teamNumberVal;
        }else if(singleVal=="on"){
            data.type="个人";
            data.group_ppl = "0";
        }
        if(yesVal=="on"){
            data.narrator="是";
        }else if(noVal=="on"){
            data.narrator="否";
        }
        if(selectOneVal==1){
            data.item="机芯组装与定制";
        }else if(selectOneVal==2){
            data.item="表带制作";
        }
        switch (selectTwoVal){
            case 1:data.item_time="10:00-11:00";
            break;
            case 2:data.item_time="11:00-12:00";
            break;
            case 3:data.item_time="14:00-15:00";
            break;
            case 4:data.item_time="15:00-16:00";
            break;
        }
        console.info(data);
        $.post('http://shclockmuseum-h5-api.createcdigital.com/booking/store', data, function(data){
            console.log(data.rs); // "success" or "store fail" or "error with message"
            if(data.rs=="success"){
               $(".title-box,.container").css("display","none");
               $(".textBox").css("display","block");
                window.scrollTo(0,0);
            }

        }, "JSON");
    }

    //提交按钮
    $(".over").on("touchend",function(){
        checkListTwo($(".list-two option:selected"));
        checkList($(".list-one option:selected"));
        checkExpress($(".yes:checked"),$(".no:checked"));
        checkShape($(".team:checked"),$(".single:checked"));
        checkTimeTwo($(".timer"));
        checkTimeone($(".dater"));
        checkPhone($(".phone"));
        checkEmpty($(".username"),0);

        if(buttonOne==true && buttonTwo==true && buttonThree==true && buttonThreeCopy ==true && buttonFour==true && buttonFive==true && buttonSix==true && buttonSeven==true && buttonEight==true){
           console.info("可以提交了");
            getVal();

        }else if(buttonOne==false && buttonTwo==false && buttonThree==false && buttonThreeCopy ==false && buttonFour==false && buttonFive==false && buttonSix==false && buttonSeven==false && buttonEight==false){
            $(".remind-box").find("div:eq(8)").css("display","block").siblings().css("display","none");
        }else {
            console.info("错误");
        }

    })



}