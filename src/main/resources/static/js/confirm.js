const confirm = function (){

    let name = document.getElementById("name");
    let phone = document.getElementById("phone");

    if(name.value == "" || phone.value == ""){
        alert("이름과 연락처를 다시 입력해주세요.");
        return false;
    }
    else{
        dataConvey();
    }
}

const dataConvey = function (){

    let name = document.getElementById("name");
    let phone = document.getElementById("phone");

    let params = "name=" + name.value;
    params = params + "&phone=" + phone.value;

    $.ajax({
        url: "/booking/confirm",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        method: "GET",
        data: params,
        success : function(result){
            listViewer(result);
        }
    });

}

const listViewer = function (result){
    const content = document.getElementById("content");
    content.innerHTML = "";

    let tag = "<div class='titlebox'>" +
                "<div class = 'title'> 캠핑장명 </div>" +
                "<div class = 'title'> 객실이름 </div>" +
                "<div class = 'title'> 이용날짜 </div>" +
                "<div class = 'title'> 결제금액 </div>" +
                "<div class = 'title'> 결제사항 </div>" +
                "<div class = 'title'> 예약현황 </div>" +
                "</div>";

    let booking = result.booking;
    let camping = result.camping;

    for(let x = 0; x < camping.length; x++){
        let campingName = camping[x].campingName;
        let dto = camping[x].rooms;

        for(let y = 0; y < dto.length; y++){

            let roomNo = dto[y].roomNo;
            let roomName = dto[y].roomName;

            for(let i = 0; i < booking.length; i++){
                    if(roomNo == booking[i].roomNo){
                        let payment = booking[i].payment;
                        let start = booking[i].start;
                        let end = booking[i].end;
                        let totalPrice = booking[i].totalPrice;

                        tag = tag + "<div class='valuesbox'>" +
                                        "<div class = 'values'>" + campingName + "</div>" +
                                        "<div class = 'values'>" + roomName + "</div>" +
                                        "<div class = 'values'>" + start + "~" + end + "</div>" +
                                        "<div class = 'values'>" + totalPrice +"</div>" +
                                        "<div class = 'values'>" + payment + "</div>" +
                                        "<div class = 'values'> 예약 현황 </div>" +
                                    "</div>";
                    }
            }
        }
    }


    content.innerHTML = tag;

}