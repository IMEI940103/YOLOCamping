// 캠핑장 추가
function campingSave(){

    Array roomList = roomAllSave();

    if(roomList == null){
        alert("하나 이상의 객실은 필수적으로 입력해주세요.");
        return false;
    }
    const responseUrl = "/manager/camp/save";

    let name = document.getElementById("c_name");
    let address = document.getElementById("address");
    let phone = document.getElementById("phone");
    let info = document.getElementById("info");

    let responseData = {
        "campingName" : name.value,
        "campingAddress" : address.value,
        "campingPhone" : phone.value,
        "campingInfo" : info.value,
        "roomDto" : roomList
    }

    dataConvey(responseData, responseUrl, "POST");
}

// 객실 전체 저장
function roomAllSave(){
        const valueList = document.querySelectorAll(".rinfo");
        let roomList = new Array();

        if(valueList.length == 0){
            return null;
        }

        for(let i = 0; i < valueList.length; i++){
            let info = valueList[i].querySelectorAll(".roominfo");

            let room = {
                "roomName" : info[0].value,
                "roomPrice" : info[1].value,
                "roomMin" : info[2].value,
                "roomMax" : info[3].value,
                "roomType" : info[4].value,
                "roomCount" : info[5].value,
                "roomInfo" : info[6].value
            }

            roomList.push(room);

        }

        return roomList;
}


// 데이터전달
function dataConvey(responseData, responseUrl, Method){
    $.ajax({
            url: responseUrl,
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            method: Method,
            data: JSON.stringify(responseData),
            success : function(text){
                alert("작업이 완료되었습니다.");
                let url = "localhost:8080/admin";
                location.replace(url);
            },
            error : function(text){
                alert("다시 시도해주세요.");
            }
        });
}

// 객실 추가
function roomAdd(){

    const roomBox = document.getElementsByClassName("room")[0];

    roomBox.innerHTML = "<div class='card'>"+
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
    const roomBox = document.getElementsByClassName("card")[0];
    roomBox.innerHTML = '';
    btnChange();
}

// 버튼 설정
function btnChange(){
    const target = document.getElementsByClassName("addbtn")[1];

        if(target.getAttribute("onclick") == "roomAdd()"){
            target.removeAttribute("onclick");
            target.setAttribute("onclick","roomCancel()");
            target.innerHTML = "등록 취소";
        }
        else{
            target.removeAttribute("onclick");
            target.setAttribute("onclick","roomAdd()");
            target.innerHTML = "객실 추가";
        }
}