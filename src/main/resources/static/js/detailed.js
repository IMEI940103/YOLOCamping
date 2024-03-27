
// 상세검색시 실행
const detailed = function (){
    let area = document.getElementById("area").value;
    let type = document.getElementById("type").value;

    let params = "?area=" + area;
    params += "&type=" + type;
    params += "&start=" + getStartDate().getTime();
    params += "&end=" + getEndDate().getTime();

    location.href = "/search/detailed" + params;

}

// icon 클릭시 실행
const icon = function (type){
    //날짜 정보 가져오기
    let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
    let tomorrow = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1); // 한국 시간으로 date 객체 만들기(내일)

    let s = today.getTime();
    let e = tomorrow.getTime();

    let params = "?type=" + type;
    params += "&start=" + s;
    params += "&end=" + e;

    location.href = "/search/type" + params;

  }

// camping 클릭시 실행 필요값 -> 입퇴실날짜
const camping = function (no){
    let params = "?start=" + getStartDate().getTime();
    params += "&end=" + getEndDate().getTime();

    location.href = "/camp/" + no + params;
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

