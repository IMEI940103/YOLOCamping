
function selection(roomName){
    const responseData = {
        "roomName" : roomName
    }

    $.ajax({
        url: "/search/roomSelect",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        method: "post",
        data: JSON.stringify(responseData),
        success : function(result){
            modal_window();
            modal_info(result);
        },
        error : function(){
            alert("다시 시도해주세요.");
            close();
        }
    });
}

function modal_window(){
    const target = document.getElementById("modal").classList;
    //console.log(target);
    if(target.item(0) == "modal_n"){
        target.replace("modal_n","modal_b");
    }
    else{
        target.replace("modal_b","modal_n");
    }
}

function modal_info(result){
    let values = document.getElementsByClassName("value");
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");

    let dateValue = parseInt(startDate.value);
    let StartDate = new Date(dateValue);

    dateValue = parseInt(endDate.value);
    let EndDate = new Date(dateValue);

    //일단위 값구하기 날짜를 -로 나눌경우 밀리언초단위로 계산.
    let days = Math.ceil((EndDate-StartDate) / (1000 * 60 * 60 * 24));
    let night = document.getElementById("night");
    night.value = days;

    // 숙박에 맞춰 총 금액 계산.
    let one = result.result.roomPrice;
    let vat = (one * days) * 1/10;
    let total = (one * days) + vat;


    // 화면상의 숙박일
    let start = document.getElementsByClassName("startday")[0].innerText;
    let end = document.getElementsByClassName("endday")[0].innerText;
    let day = start + "  ~  " + end + "   / " + days +" 박";



    //console.log(one,night,vat);

    values[0].innerText = document.getElementById("campingname").innerText;
    values[1].innerText = result.result.roomName;
    values[2].innerText = day;
    values[3].innerText = total;

    document.getElementById("roomNo").value = result.result.roomNo;
    document.getElementById("price").value = result.result.roomPrice;
}

function booking(){

    if(valid()){ // 유효성 검사 완료시

        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let payment = document.getElementById("payment").value;
        let roomNo = document.getElementById("roomNo").value;
        let price = document.getElementById("price").value;
        let total = document.getElementsByClassName("value")[3].innerText;

        const responseData = {
            "roomNo" : roomNo,
            "userName" : name,
            "userPhone" : phone,
            "payment" : payment,
            "start" : getStartDate(), // 다른 js파일에 같은 함수가 있을 경우 제일 먼저 로딩된 함수를 사용함.
            "end" : getEndDate(), // 하여, 가까운 위치에 이동시킴.
            "price" : price,
            "totalPrice" : total
        }
        //console.log(responseData);
        $.ajax({
            url: "/booking/update",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            method: "POST",
            data: JSON.stringify(responseData),
            success : function(){
                alert("예약이 완료되었습니다.");
                location.replace("/yolo");
            },
            error : function(){
                alert("다시 시도해주세요.");
            }
        });
    }

    //return startDate Date 타입
    function getStartDate(){
        let target = document.getElementById("startDate").value;
        let tmp = parseInt(target);
        let targetDate = new Date(tmp);

        let year = targetDate.getFullYear();
        let month = targetDate.getMonth();
        let day = targetDate.getDate();

        return DateFormat(year,month,day);
    }
    //return endDAte Date타입
    function getEndDate(){
        let target = document.getElementById("endDate").value;
        let tmp = parseInt(target);
        let targetDate = new Date(tmp);

        let year = targetDate.getFullYear();
        let month = targetDate.getMonth();
        let day = targetDate.getDate();

        return DateFormat(year,month,day);
    }

    function DateFormat(year,month,day){
        month += 1;
        let tmp = day;

        if(day<10){
            tmp = "0" + tmp
        }

        tmp = month + "." + tmp;

        if(month<10){
            tmp = "0" + tmp;
        }

        tmp = year + "." +tmp

        return tmp;
    }

}

function valid(){
    let name = document.getElementById("name").value;

    let phone = document.getElementById("phone").value;

    if(name == null || name == ""){
        alert('예약자 이름을 작성해주세요.');
        return false;
    }
    if(phone == null || phone == ""){
        alert('휴대폰 번호를 작성해주세요.');
        return false;
    }

    var con1 = !document.getElementById("con1").checked;
    var con2 = !document.getElementById("con2").checked;
    var con3 = !document.getElementById("con3").checked;
    var con4 = !document.getElementById("con4").checked;

    if(con1 || con2 || con3 || con4){
        alert("약관에 동의해주세요.");
        return false;
    }

    return true;
}

