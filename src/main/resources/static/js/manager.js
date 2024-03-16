function campingUpdate(){
    const responseUrl = "/manager/camp/update";
    const name = document.getElementById("c_name");
    const address = document.getElementById("address");
    let phone = document.getElementById("phone");
    let info = document.getElementById("info");

    let responseData = {
        "campingName" : name.value,
        "campingAddress" : address.value,
        "campingPhone" : phone.value,
        "campingInfo" : info.value
    }

    dataConvey(responseData,responseUrl, "PUT");

}

// 데이터 전달.
function dataConvey(responseData, responseUrl, Method){

    $.ajax({
        url: responseUrl,
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        method: Method,
        data: JSON.stringify(responseData),
        success : function(text){
            alert("작업이 완료되었습니다.");
            location.replace();
        },
        error : function(text){
            alert("다시 시도해주세요.");
        }
    });

}


// 객실 추가
function roomAdd(){

    const roomBox = document.getElementsByClassName("room")[0];

    roomBox.innerHTML = "<div class='card newcard'>"+
                             "<div class='flex'>"+
                                 "<div class='col-5'>"+
                                     "<img src='/image/camping/' class='card-img' alt='...'>"+
                                 "</div>"+
                                 "<div class='col-7 rinfo'>"+
                                     "<div class='card-body'>"+
                                         "<div class='form-group flex'>"+
                                             "<label for='name' class='col-form-label col-4'>객실 이름</label>"+
                                             "<input type='text' class='form-control col-8 roominfo' name='name' value='' />"+
                                         "</div>"+
                                         "<div class='form-group flex'>"+
                                             "<label for='price' class='col-form-label col-4'>1박 기준 가격</label>"+
                                             "<input type='text' class='form-control col-8 roominfo' name='price' value='' />"+
                                         "</div>"+
                                         "<div class='form-group flex'>"+
                                             "<label for='people' class='col-form-label col-4'>최소 / 최대 인원수</label>"+
                                             "<input type='text' class='form-control col-4 roominfo' name='min' value='' />"+
                                             "<input type='text' class='form-control col-4 roominfo' name='max' value='' />"+
                                         "</div>"+
                                         "<div class='form-group flex'>"+
                                             "<label for='roomtype' class='col-form-label col-4'>객실타입</label>"+
                                             "<select name='roomtype' class='form-control roominfo'>"+
                                                 "<option value='glamping'>글램핑</option>"+
                                                 "<option value='auto'>오토캠핑</option>"+
                                                 "<option value='caravan'>카라반</option>"+
                                                 "<option value='pension'>팬션</option>"+
                                             "</select>"+
                                         "</div>"+
                                         "<div class='form-group flex'>"+
                                             "<label for='people' class='col-form-label col-4'>객실 개수</label>"+
                                             "<input type='text' class='form-control col-8 roominfo' name='count' value='' />"+
                                         "</div>"+
                                         "<div class='form-group'>"+
                                             "<label for='people' class='col-form-label col-4'>객실 정보</label>"+
                                             "<textarea class='form-control roominfo'></textarea>"+
                                         "</div>"+
                                     "</div>"+
                                 "</div>"+
                             "</div>"+
                         "</div>"+
                         roomBox.innerHTML;
    btnChange();
}

// 객실 추가취소
function roomCancel(){
    const roomBox = document.getElementsByClassName("newcard")[0];
    roomBox.innerHTML = '';
    btnChange();
}

// 객실 등록
function roomSave(){
    const responseUrl = "/manager/room/save";

    const roomList = document.getElementsByClassName("newcard")[0];
    const roomValue = roomList.querySelectorAll(".roominfo");
    //console.log(roomValue);

    let responseData = {
        "campingNo" : urlPull(),
        "roomName" : roomValue[0].value,
        "roomPrice" : roomValue[1].value,
        "roomMin" : roomValue[2].value,
        "roomMax" : roomValue[3].value,
        "roomType" : roomValue[4].value,
        "roomCount" : roomValue[5].value,
        "roomInfo" : roomValue[6].value
    }

    //console.log(responseData);

    btnChange();
    dataConvey(responseData, responseUrl, "POST");

}

// 객실 수정
function roomUpdate(){
    const responseUrl = "/manager/room/update";

    const valueList = document.querySelectorAll(".rinfo");

    for(let i = 0; i < valueList.length; i++){

    }

    let responseData = {
        "campingNo" : urlPull()
    }

    dataConvey(responseData, responseUrl, "PUT");
}

// 버튼 설정
function btnChange(){
    const target = document.getElementsByClassName("addbtn")[1];
    const btn = document.getElementsByClassName("addbtn")[2];

        if(target.getAttribute("onclick") == "roomAdd()"){
            target.removeAttribute("onclick");
            target.setAttribute("onclick","roomSave()");
            target.innerHTML = "객실 등록";


            btn.removeAttribute("onclick");
            btn.setAttribute("onclick","roomCancel()");
            btn.innerHTML = "등록 취소";
        }
        else{
            target.removeAttribute("onclick");
            target.setAttribute("onclick","roomAdd()");
            target.innerHTML = "객실 추가";

            btn.removeAttribute("onclick");
            btn.setAttribute("onclick","roomUpdate()");
            btn.innerHTML = "객실 수정"
        }
}

// Url -  campingNO값 추출
function urlPull(){
    let url = new URL(window.location.href);
    let urlPath = url.pathname; // /manager/{No}

    let target = urlPath.split("/")[2];
    //console.log(target);

    return target;
}