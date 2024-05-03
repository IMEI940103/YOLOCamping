
// 모달창 오픈
function modal_window(){
    let target = document.getElementById("modal").classList;

    if(target.item(0) == "modal_n"){
        target.replace("modal_n","modal_b");
    }
    else{
        target.replace("modal_b","modal_n");
    }
}

let roomLen = 0; // 객실 추가 카운팅
let roomNo; // 객실 수정시 필요한 len 값

// 모달창 -> 현 페이지 객실추가
function roomCreate(){
    const roomlist = document.getElementById("roomlist");

    let info = document.querySelectorAll(".modal_roominfo");

    roomlist.innerHTML = roomlist.innerHTML +
                            "<div class='card roomcard'>"+
                                "<div class='btnbox flex j-e'>"+
                                    "<a onclick='roomDelete(" + roomLen + ")' class='btn'> 삭제 </a>"+
                                    "<a onclick='modalUpdate(" + roomLen + ")' class='btn'> 수정 </a>"+
                                "</div>"+
                                "<div class='flex'>"+
                                    "<div class='col-5'>"+
                                        "<img src='/image/camping/' class='card-img' alt='...'>"+
                                    "</div>"+
                                    "<div class='col-7 rinfo'>"+
                                        "<div class='card-body'>"+
                                            "<div class='form-group flex'>"+
                                                "<label for='roomName' class='col-form-label col-4'>객실 이름</label>"+
                                                "<div class='form-control col-8 roominfo roomName'>"+ info[0].value +"</div>"+
                                            "</div>"+
                                         "<div class='form-group flex'>"+
                                            "<label for='price' class='col-form-label col-4'>1박 기준 가격</label>"+
                                            "<div class='form-control col-8 roominfo roomPrice'>"+ info[1].value +"</div>"+
                                         "</div>"+
                                         "<div class='form-group flex'>"+
                                            "<label for='people' class='col-form-label col-4'>최소 / 최대 인원수</label>"+
                                            "<div class='form-control col-3 roominfo roomMin'>"+ info[2].value +"</div>"+
                                            "<div class='col-1 people'> ~ </div>"+
                                            "<div class='form-control col-3 roominfo roomMax'>"+ info[3].value +"</div>"+
                                            "<div class='col-1'>명</div>"+
                                         "</div>"+
                                         "<div class='form-group flex'>"+
                                            "<label for='roomtype' class='col-form-label col-4'>객실타입</label>"+
                                            "<div class='form-control col-8 roominfo roomType'>"+ info[4].value +"</div>"+
                                         "</div>"+
                                         "<div class='form-group flex'>"+
                                            "<label for='people' class='col-form-label col-4'>객실 개수</label>"+
                                            "<div class='form-control col-8 roominfo roomCount'>"+ info[5].value +"</div>"+
                                         "</div>"+
                                         "<div class='form-group'>"+
                                            "<label for='people' class='col-form-label col-4'>객실 정보</label>"+
                                            "<div class='form-control col-8 roominfo roomInfo'>"+ info[6].value +"</div>"+
                                         "</div>"+
                                     "</div>"+
                                 "</div>"+
                             "</div>"+
                         "</div>";
    ++roomLen; //객실개수

    modal_window(); // 작업 완료 후 모달창 닫기
    modal_clear(info);

}

// 객실 삭제
function roomDelete(no){
    let len = parseInt(no);

    console.log("현재 삭제할 객실의 len --------- " + len);

    let roomlist_len = $("#roomlist div.roomcard").length;

    console.log("현재 list의 사이즈 ------- " + roomlist_len);

    // 여러번 삭제시 $()로 검색될 길이와 받아올 no값이 일치하지않음.
    if(roomlist_len < len){// 총 만든 객실 수 - 현재 남은 객실수 차이만큼 값초기화
        for(let x = 1; x == (roomLen - roomlist_len); x++){  --len; }
    }
    else if(roomlist_len == len){ --len; }
    else {}

    console.log("삭제할 객실 정보 ------ "+$("#roomlist .roomcard")[len]);

    $("#roomlist .roomcard")[len].remove();

}

// 현 페이지 --> 모달창 객실값
function modalUpdate(no){

    let len = parseInt(no);

    roomNo = len; // 수정 후 room위치 값

    let target = document.getElementsByClassName("roomcard")[len];

    let update = target.getElementsByClassName("roominfo");

    let modal_info = document.querySelectorAll(".modal_roominfo");

    // 모딜칭에 값 설정.
    for(let i = 0; i < modal_info.length; i++){
        modal_info[i].value = update[i].innerText;
    }

    modal_btn_change(); // 모달창 등록하기버튼 수정

    modal_window(); // 모달 값 입력 후 창열기

}

// 수정 모달창 --> 현페이지 값 수정
function roomUpdate(){

    let target = document.getElementsByClassName("roomcard")[roomNo];

    let info = document.querySelectorAll(".modal_roominfo");

    target.innerHTML = "";
    target.innerHTML =
                    "<div class='btnbox flex j-e'>"+
                        "<a onclick='roomDelete(" + roomNo + ")' class='btn'> 삭제 </a>"+
                        "<a onclick='modalUpdate(" + roomNo + ")' class='btn'> 수정 </a>"+
                    "</div>"+
                    "<div class='flex'>"+
                        "<div class='col-5'>"+
                            "<img src='/image/camping/' class='card-img' alt='...'>"+
                        "</div>"+
                        "<div class='col-7 rinfo'>"+
                            "<div class='card-body'>"+
                                "<div class='form-group flex'>"+
                                    "<label for='roomName' class='col-form-label col-4'>객실 이름</label>"+
                                    "<div class='form-control col-8 roominfo roomName'>"+ info[0].value +"</div>"+
                                "</div>"+
                            "<div class='form-group flex'>"+
                                "<label for='price' class='col-form-label col-4'>1박 기준 가격</label>"+
                                "<div class='form-control col-8 roominfo roomPrice'>"+ info[1].value +"</div>"+
                            "</div>"+
                            "<div class='form-group flex'>"+
                                "<label for='people' class='col-form-label col-4'>최소 / 최대 인원수</label>"+
                                "<div class='form-control col-3 roominfo roomMin'>"+ info[2].value +"</div>"+
                                "<div class='col-1 people'> ~ </div>"+
                                "<div class='form-control col-3 roominfo roomMax'>"+ info[3].value +"</div>"+
                                "<div class='col-1'>명</div>"+
                            "</div>"+
                            "<div class='form-group flex'>"+
                                "<label for='roomtype' class='col-form-label col-4'>객실타입</label>"+
                                "<div class='form-control col-8 roominfo roomType'>"+ info[4].value +"</div>"+
                            "</div>"+
                            "<div class='form-group flex'>"+
                                "<label for='people' class='col-form-label col-4'>객실 개수</label>"+
                                "<div class='form-control col-8 roominfo roomCount'>"+ info[5].value +"</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                                "<label for='people' class='col-form-label col-4'>객실 정보</label>"+
                                "<div class='form-control col-8 roominfo roomInfo'>"+ info[6].value +"</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>";

        modal_window(); // 모달창 닫기
        modal_clear(info); // 모달창 클리어
}

// 모달창 값 초기화
function modal_clear(info){
    for(let i = 0; i < info.length; i++){
        info[i].value="";
    }
}

// 객실수정시 버튼값변경
function modal_btn_change(){
    let target = document.getElementsByClassName("modal_btn")[1];

    if(target.getAttribute("onclick") == "roomCreate()"){
        target.removeAttribute("onclick");
        target.setAttribute("onclick","roomUpdate()");
        target.innerHTML = "수정하기";
    }
    else{
        target.removeAttribute("onclick");
        target.setAttribute("onclick","roomCreate()");
        target.innerHTML = "등록하기";
    }
}

function preview(e){
    let reader = new FileReader();

    reader.onload = function(e){
        let img = document.createElement("img");
        img.setAttribute("src", e.target.result);
        document.querySelector("div#imgae_container").appendChild(img);
    };

    reader.readAsDataURL(e.target.files[0]);
}

// 모든 객실, 캠핑장 정보
function allSave(){
    let campName = document.getElementById("c_name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let campInfo = document.getElementById("info").value;

    let roomlist = document.querySelectorAll(".roomcard");
    let roomName = document.querySelectorAll(".roomName");
    let roomPrice = document.querySelectorAll(".roomPrice");
    let roomMin = document.querySelectorAll(".roomMin");
    let roomMax = document.querySelectorAll(".roomMax");
    let roomType = document.querySelectorAll(".roomType");
    let roomCount = document.querySelectorAll(".roomCount");
    let roomInfo = document.querySelectorAll(".roomInfo");
    let rooms = [];

    for(let x = 0; x < roomlist.length; x++){
        let tmp = {
            "roomName" : roomName[x].innerText,
            "roomPrice" : roomPrice[x].innerText,
            "roomMin" : roomMin[x].innerText,
            "roomMax" : roomMax[x].innerText,
            "roomType" : roomType[x].innerText,
            "roomCount" : roomCount[x].innerText,
            "roomInfo" : roomInfo[x].innerText
        };
        rooms.push(tmp);
    }

    const responseData = {
        "campingName" : campName,
        "address" : address,
        "phone" : phone,
        "campingInfo" : campInfo,
        "rooms" : rooms
    }

    //console.log(JSON.stringify(responseData));

    $.ajax({
        url : "/camp/save",
        dataType : "text",
        contentType : "application/json",
        method: "POST",
        data : JSON.stringify(responseData),
        success : function(){
            alert("등록이 완료되었습니다.");
            location.replace("/admin");
        }
    });

}