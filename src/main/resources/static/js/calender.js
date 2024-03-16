
    //$(document).ready(function() {    JQuery 3.0 버전에서 지원 X
    $(function(){
        calendarInit();
        calendarSet();
    });

    $("#show").on("click",function(){
        let target = document.getElementsByClassName("sec_cal")[0];
        let style = target.style;

        if(style.height == "0px"){
            style.height = "500px";
        }
        else{
            style.height = "0px";
        }
    });

    let checking = true;

    //날짜 정보 가져오기
    let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
    let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);

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
        let _startDay = document.getElementsByClassName("startday")[0]; // 화면에 보이는 입실일 - mm.dd
        let _endDay = document.getElementsByClassName("endday")[0]; // 화면에 보이는 퇴실일 - mm.dd
        let startDate = document.getElementById("startDate"); //  param값으로 전달할 값 - Long
        let endDate = document.getElementById("endDate"); //  param값으로 전달할 값 - Long

        if(startDate.value == "" && endDate.value == ""){
            // Param 으로 전달할 값 Long
            startDate.value = today.getTime();
            endDate.value = tomorrow.getTime();
            // mm.dd
            _startDay.innerText = calendarViewMonth(today.getMonth(), today.getDate());
            _endDay.innerText = calendarViewMonth(tomorrow.getMonth(), tomorrow.getDate());
        }
        else{
            let tmp = parseInt(startDate.value);
            let tmpStart = new Date(tmp);

            tmp = parseInt(endDate.value);
            let tmpEnd = new Date(tmp);

            _startDay.innerText = calendarViewMonth(tmpStart.getMonth(), tmpStart.getDate());
            _endDay.innerText = calendarViewMonth(tmpEnd.getMonth(), tmpEnd.getDate());
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

        function setStartDate(date){
            let target = document.getElementById("startDate");
            target.value = date.getTime();
        }

        function setEndDate(date){
            let target = document.getElementById("endDate");
            target.value = date.getTime();
        }

    /*
        달력 렌더링 할 때 필요한 정보 목록

        현재 월(초기값 : 현재 시간)
        금월 마지막일 날짜와 요일
        전월 마지막일 날짜와 요일
    */
    function calendarSet() {

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
            if(today.getMonth() != currentMonth && today.getFullYear() == currentYear){

                for (let i = 1; i <= nextDate; i++) {
                    calendar.innerHTML = calendar.innerHTML + '<div class="day current monthday">' + i + '</div>';
                }

            }
            else{// 오늘 날짜 표기

                for (let i = 1; i <= nextDate; i++) {
                    //이전날짜 비활성화
                    if(i < today.getDate()){
                        calendar.innerHTML = calendar.innerHTML + '<div class="day disable monthday">' + i + '</div>';
                    }
                    else{
                        calendar.innerHTML = calendar.innerHTML + '<div class="day current monthday">' + i + '</div>';

                    }
                }

                //오늘 내일날짜에 css추가

                let currentMonthDate = document.querySelectorAll('.dates .current');
                currentMonthDate[0].classList.add('stay');
                currentMonthDate[1].classList.add('stay');

            }

            /* 다음달
                for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
                    calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>';
                }
            */

            // 입퇴실일 날짜 선택
            let monthdaylist = document.body.querySelectorAll(".monthday");
            let disdays = document.body.querySelectorAll(".disable");

            for(let i = 0; i < monthdaylist.length; i++){                                   ;
                monthdaylist[i].addEventListener("click", function(){
                    schedulerSet(monthdaylist[i], monthdaylist);
                }); //이벤트 핸들러 추가
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


    let StartDate = null; // 조회할 예정 입실일
    let EndDate = null; // 조회할 예정 퇴실일

    // 선택된 날짜에 맞춰 css 변경
    function schedulerSet(e, list){

        let setStart = document.getElementsByClassName("startday")[0]; // 화면에 보이는 입실일
        let setEnd = document.getElementsByClassName("endday")[0]; // 화면에 보이는 퇴실일

        let unSet = e.innerText; // 사용자가 선택한 일(Day)


        if(checking){ // 입실일 설정
            StartDate = new Date(currentYear,currentMonth,unSet);

            let days = document.querySelectorAll('.stay'); //이전 숙박기간

            if(days.length != 0){// 존재 할 경우

                for(let i = 0; i < days.length; i++){
                    days[i].classList.remove('stay');
                }

            }

            e.classList.add('stay');

            setStartDate(StartDate);

            setStart.innerText = calendarViewMonth(StartDate.getMonth(),StartDate.getDate());
            setEnd.innerText = "";

            checking = false;

        }
        else{   // 퇴실일 설정
            EndDate = new Date(currentYear,currentMonth,unSet);

            let days = document.querySelectorAll('.stay'); //이전 숙박기간

            if(days.length != 0){
                e.classList.add('stay');
            }

            setEndDate(EndDate);
            setEnd.innerText = calendarViewMonth(EndDate.getMonth(),EndDate.getDate());

            schedulerConfirm(StartDate, EndDate, list);

            checking = true;

        }

        // 숙박기간 css변경
        function schedulerConfirm(StartDate, EndDate, list){
            //일단위 값구하기 날짜를 -로 나눌경우 밀리언초단위로 계산.
            let days = Math.ceil((EndDate-StartDate) / (1000 * 60 * 60 * 24));

            let night = document.getElementById("night");
            night.value = days;

            if(StartDate.getMonth() == EndDate.getMonth() && StartDate.getFullYear() == EndDate.getFullYear()){
                for(let i = StartDate.getDate(); i < EndDate.getDate(); i++){
                    list[i].classList.add('stay');
                }
            }
            else{
                for(let i = 0; i < EndDate.getDate(); i++){
                    list[i].classList.add('stay');
                }
            }
        }

    }

