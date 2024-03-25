function confirm(){

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

function dataConvey(){

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
            console.log(result);
            listViewer(result);
        }
    });

}

function listViewer(result){
    const content = document.getElementById("content");
    content.innerHTML = "";

    let tag = "<div class='form-group flex'>" +
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

        for(let y = 0; y < camping[x].roomDto.length; y++){

            let roomName = camping[x].roomDto[y].roomName;

            for(let i = 0; i < booking.length; i++){
                    let payment = booking[i].payment;
                    let start = booking[i].start;
                    let end = booking[i].end;
                    let totalPrice = booking[i].totalPrice;

                    tag += "<div class='form-group flex'>" +
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


    content.innerHTML = tag;

}