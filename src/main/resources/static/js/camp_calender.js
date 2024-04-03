    //$(document).ready(function() {    JQuery 3.0 버전에서 지원 X
    $(document).ready(function(){
        calendarInit();
        calendarSet();
    });


    $("#show").on("click",function(){
        let target = document.getElementsByClassName("sec_cal")[0];
        let style = target.style;

        if(style.height == "0px"){ style.height = "500px"; }
        else{ style.height = "0px"; }
    });


    let checking = true;

    //날짜 정보 가져오기
    let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
    let tomorrow = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);

    let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체

    let thisMonthDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1);
    let thisDayOfWeek = thisMonthDayOfWeek.getDay(); // 이번 달 첫째날 요일구하기.

    let currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    let currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    let currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    /*
        기본 입퇴실일 설정.

        입실일 : 현재날짜
        퇴실일 : 현재날짜기준 +1일

    */
    function calendarInit(){
        let viewS = document.getElementsByClassName("startday")[0]; // 화면에 보이는 입실일 - mm.dd
        let viewE = document.getElementsByClassName("endday")[0]; // 화면에 보이는 퇴실일 - mm.dd
        let sDate = document.getElementById("startDate"); //  param값으로 전달할 값 - Long
        let eDate = document.getElementById("endDate"); //  param값으로 전달할 값 - Long

        if(sDate.value == "" && eDate.value == ""){
            // Param 으로 전달할 값 Long
            sDate.value = today.getTime();
            eDate.value = tomorrow.getTime();
            // mm.dd
            viewS.innerText = calendarViewMonth(today.getMonth(), today.getDate());
            viewE.innerText = calendarViewMonth(tomorrow.getMonth(), tomorrow.getDate());
        }
        else{
            let tmp = parseInt(sDate.value);
            let tmpStart = new Date(tmp);

            tmp = parseInt(eDate.value);
            let tmpEnd = new Date(tmp);

            viewS.innerText = calendarViewMonth(tmpStart.getMonth(), tmpStart.getDate());
            viewE.innerText = calendarViewMonth(tmpEnd.getMonth(), tmpEnd.getDate());
        }
    }

    // 화면에 표기될 월일 형식정리 MM.DD
    function calendarViewMonth(sch_Month,sch_Day){
        let tempMonth = sch_Month + 1; // 1월 = 0, 2월 = 1....
        let tempDay = sch_Day;

        if(tempDay < 10){
            tempDay = "0" + sch_Day;
        }

        let tempValue = tempMonth.toString() + "." + tempDay;

        if(sch_Month < 10){
            tempValue = "0" + tempValue;
        }

        return tempValue;
    }

    /*
        달력 렌더링 할 때 필요한 정보 목록

        현재 월(초기값 : 현재 시간)
        금월 마지막일 날짜와 요일
        전월 마지막일 날짜와 요일
    */
    function calendarSet() { //달력 생성.

        // 캘린더 렌더링
        renderCalender(thisMonth);

        function renderCalender(thisMonth) {
            // 렌더링을 위한 데이터 정리
            currentYear = thisMonth.getFullYear();
            currentMonth = thisMonth.getMonth();
            currentDate = thisMonth.getDate();

            // 이전 달의 마지막 날 날짜와 요일 구하기
            let startDay = new Date(currentYear, currentMonth, 0);
            let prevDate = startDay.getDate();
            let prevDay = startDay.getDay();

            // 이번 달의 마지막날 날짜와 요일 구하기
            let endDay = new Date(currentYear, currentMonth + 1, 0);
            let nextDate = endDay.getDate();
            let nextDay = endDay.getDay();

            //console.log(prevDate, prevDay, nextDate, nextDay);

            // 현재 월 표기
            $('.year-month').text(currentYear + '.' + (currentMonth + 1));

            // 현재 연월 확인 후 prev 비활성화
            if(today.getFullYear() == thisMonth.getFullYear() && today.getMonth() == thisMonth.getMonth()){
                $('.go-prev').css('visibility','hidden');
            }
            else{
                $('.go-prev').css('visibility','visible');
            }

            // 렌더링 html 요소 생성
            calendar = document.querySelector('.dates')
            calendar.innerHTML = '';

            /* 지난달 disable 처리
                for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
                    calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>';
                }
            */

            //지난달 none 처리
            for(let i = 0; i < prevDay + 1 && prevDay + 1 != 7; i++){   // for조건문 이전달의 값이 7이상일 경우 달력표기시 줄띄워짐 방지
                calendar.innerHTML = calendar.innerHTML + '<div class="day"></div>';
            }

            // 이번달

            if(today.getFullYear() == currentYear){ // 올해 년도 비교

                if(today.getMonth() != currentMonth){

                    for (let i = 1; i <= nextDate; i++) {
                        calendar.innerHTML = calendar.innerHTML + '<div class="day current monthday">' + i + '</div>';
                    }

                }
                else{
                    for(let i = 1; i < today.getDate(); i++){ // 오늘 기준 이전날짜 비활성화
                        calendar.innerHTML = calendar.innerHTML + '<div class="day disable monthday">' + i + '</div>';
                    }
                    for(let i = today.getDate(); i <= nextDate; i++){
                        calendar.innerHTML = calendar.innerHTML + '<div class="day current monthday">' + i + '</div>';
                    }
                }
            }
            else{ // 올해 이후의 년도

               for (let i = 1; i <= nextDate; i++) {
                   calendar.innerHTML = calendar.innerHTML + '<div class="day current monthday">' + i + '</div>';
               }

            }

            /* 다음달
                for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
                    calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>';
                }
            */
                eventCreat();

                function eventCreat(){ // 클릭 이벤트추가

                    let monthdaylist = document.body.querySelectorAll(".monthday");
                    let disdays = document.body.querySelectorAll(".disable");
                    let len = disdays.length;

                    for(let i = len; i < monthdaylist.length; i++){                                   ;
                        monthdaylist[i].addEventListener("click", function(){
                            schedulerSet(monthdaylist[i]);
                        }); //이벤트 핸들러 추가
                    }

                    calendarMark();

                }

        }//renderCalender() end

        // 이전달로 이동
        $('.go-prev').on('click', function() {
            thisMonth = new Date(currentYear, currentMonth - 1, 1);
            renderCalender(thisMonth);
        });

        // 다음달로 이동
        $('.go-next').on('click', function() {
            thisMonth = new Date(currentYear, currentMonth + 1, 1);
            renderCalender(thisMonth);
        });

    }// calenderSet() end

    let sDate; // 조회할 예정 시작일
    let cDate; // 마지막으로 선택한 날짜

    // 선택된 날짜 css변경
    function schedulerSet(e){

        let viewS = document.getElementsByClassName("startday")[0]; // 화면에 보이는 입실일
        let viewE = document.getElementsByClassName("endday")[0]; // 화면에 보이는 퇴실일
        let unSet = e.innerText; // 사용자가 선택한 일(Day)

        // 비교를 위한 데이터정리
        let startMonth = parseInt(viewS.innerText.split(".")[0]);
        let startDay = parseInt(viewS.innerText.split(".")[1]);

        cDate = new Date(currentYear,currentMonth,unSet);

        // 시작일과 선택한 날짜 비교 후 이전 일 경우 초기화
        if(sDate >= cDate && checking == false){ checking = true; }


        if(checking){ // 입실일 설정

            sDate = new Date(thisMonth.getFullYear(),currentMonth,unSet);

            let days = document.querySelectorAll('.stay'); //이전 숙박기간

            if(days.length != 0){// 존재 할 경우

                for(let i = 0; i < days.length; i++){
                    days[i].classList.remove('stay');
                }

            }

            e.classList.add('stay');

            viewS.innerText = calendarViewMonth(sDate.getMonth(),sDate.getDate());
            setStartDate(sDate);

            viewE.innerText = '';
            setEndDate(sDate);

            checking = false;

        }
        else{   // 퇴실일 설정

            let days = document.querySelectorAll('.stay'); //이전 숙박기간

            if(days.length != 0){
                e.classList.add('stay');
            }

            viewE.innerText = calendarViewMonth(cDate.getMonth(),cDate.getDate());
            setEndDate(cDate);

            calendarMark();

            checking = true;

        }

    }

    // 일정기간 css변경
    function calendarMark(){
        let start = getStartDate();
        let end = getEndDate();

        let day = document.querySelectorAll(".monthday");

        if(end.getFullYear() == currentYear){ // 연도가 같을 경우
            if(start.getMonth() != end.getMonth()){ // 표기날과 달월이 맞지 않을 경우
                if(end.getMonth() == currentMonth){                 // 현재 표기날과 마지막날이 같을때
                    for(let x = 0; x < end.getDate(); x++){
                        day[x].classList.add("stay");
                    }
                }
                else if(start.getMonth() == currentMonth){  // 현재 표기날과 시작일이 같을때
                    for(let x = start.getDate()-1; x < day.length; x++){
                        day[x].classList.add("stay");
                    }
                }
                else{ return ; } // 현재표기날이 일정날과 맞지않을때
            }
            else{     // 표기날과 달월이 맞을 경우
                if(currentMonth == start.getMonth()){
                    for(let x = start.getDate()-1; x < end.getDate(); x++){
                        day[x].classList.add("stay");
                    }
                }
                else{ return ; }
            }
        }
        else{ return ; }// 연도가 같지 않을경우


    }

    const setStartDate = function (date){
        let target = document.getElementById("startDate");
        target.value = date.getTime();
    }

    const setEndDate = function (date){
        let target = document.getElementById("endDate");
        target.value = date.getTime();
    }

    //return startDate Date 타입
    const getStartDate = function (){
      let target = document.getElementById("startDate").value;
      let tmp = parseInt(target);
      let targetDate = new Date(tmp);

      return targetDate;
    }

    //return endDate Date타입
    const getEndDate = function (){
      let target = document.getElementById("endDate").value;
      let tmp = parseInt(target);
      let targetDate = new Date(tmp);

      return targetDate;
    }


    function calender_submit(){
        let url = new URL(window.location.href);
        let urlpath = url.pathname;
        let target = urlpath.split("/")[2];

        let param = "&start=" + document.getElementById("startDate").value;
        param += "&end=" + document.getElementById("endDate").value;

        $.ajax({
            url: "/search/rest?campingNo=" + target + param,
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            method: "Get",
            success : function(result){
                roomRest(result);
            }
        })
    }

    function roomRest(result){
        let box = document.getElementsByClassName("room")[0];
        box.innerHTML = "";

        let restlist = result.Restcamp.roomDto;
        for(let i = 0; i < restlist.length; i++){
            let room = restlist[i];

            let str;
            if(room.roomCount != 0){ // 예약가능한 방이 존재 할 경우 활성화
               str = "<a onclick='selection(" + room.roomName + ")' class='btn booking'>예약하기</a>";
            }
            else{ // 예약가능한 방이 없을경우
               str = "<a class='btn booking disable'>예약하기</a>" ;
            }

            box.innerHTML = box.innerHTML +
                                "<div class='card'>" +
                                    "<div class='flex'>" +
                                        "<div class='col-5'>" +
                                            "<img src='/image/camping/" + room.roomImg + "' class='card-img' alt='...'>" +
                                        "</div>" +
                                        "<div class='col-7 rinfo'>" +
                                            "<div class='card-body'>" +
                                                "<h5 class='card-title'>" +
                                                    "<div>" + room.roomName + "</div>" +
                                                    "<div>" + room.roomPrice + "원</div>" +
                                                "</h5>" +
                                                "<p class='card-text'>기본정보 : 최소인원 - " + room.roomMin + "인 / 최대인원 - " + room.roomMax + "인 </p>" +
                                                "<p class='card-text'>객실타입 : " + room.roomType + "</p>" +
                                                "<p class='card-text'>남은객실 : " + room.roomCount + "</p>" +
                                                "<p class='card-text'>객실설명 : " + room.roomInfo + "</p>" +
                                            "</div>" +
                                                str + // 예약가능한 방 존재여부에 따라 다른값
                                        "</div>" +
                                    "</div>" +
                                "</div>" ;

        }
    }