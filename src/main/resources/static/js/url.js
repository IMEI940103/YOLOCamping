
// 현 url정보를 가진 객체
const url = new URL(window.location.href);

// URL.SearchParams -- URL 파라미터객체
const urlParams = url.searchParams;
// URLSearchParams(window.location.search); 동일 기능

// 기본값 설정
let area = "전국";
let type = "glamping";

function getToday(){
    let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
    return today;
}
function getTomorrow(today){
    let tomorrow = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1); // 한국 시간으로 date 객체 만들기(내일)
    return tomorrow;
}

let start = getToday().getTime();
let end = getTomorrow(getToday()).getTime();

if(urlParams.has("area")){
    area = urlParams.get("area");
    const areaTag = document.getElementById("area");

    selectedControl(areaTag, area);
}
if(urlParams.has("type")){
    type = urlParams.get("type");
    const typeTag = document.getElementById("type");

    selectedControl(typeTag, type);
}

if(urlParams.has("start")){
    start = urlParams.get("start");
    const startDate = document.getElementById("startDate");

    startDate.value = start;
}
if(urlParams.has("end")){
    end = urlParams.get("end");
    const endDate = document.getElementById("endDate");

    endDate.value = end;
}

function selectedControl(tag, str){
    const len = tag.options.length;

    for(let i = 0; i < len; i++){
        if(tag.options[i].value == str){
            tag.options[i].selected = true;
            break;
        }
    }
}