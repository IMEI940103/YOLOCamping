let username = document.querySelector("input#name");
let userphone = document.querySelector("input#phone");

username.addEventListener("keydown", event => keydown_kor(event));
userphone.addEventListener("keydown", event => keydown_num(event));

// 한글, 영어, 숫자, 특수문자 구분 정규식 모음
const checkNum = /[0-9]/;
const checkEng = /[a-zA-Z]/;
const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

// 영어 대문자와 소문자는 다음과도 같이 구분가능
//let checkEnga = /[a-z]/;
//let checkEngA = /[A-Z]/;

const keydown_kor = function (event){
    //let key =  event.key || event.keyCode;
    let key = event.keyCode;

    /*
        숫자 0~9 => 48~57
        영문 대문자 => 65~90
        소문자 => 97~122
        한글 가~힣 => 45032~55203
        자음 => 12593~12622
        모음 => 12623~12643W
    */
    if(key > 12592 && key < 12644){
        return ;
    }
    else if(key == 229){ // 아스키코드로 16진수로 변환되어서 나오는 값으로 추정
        return ;
    }
    else if(key == 8){ // 8 --> backspace
        return ;
    }
    else{
        alert("한글만 입력해주세요.");
        event.preventDefault(); //어떤값도 입력 불가. onkeypress, onkeyup 이벤트는 사용불가.
    }
}
const keydown_num = function (event){
    let key = event.keyCode;

    if(key > 47 && key < 58){
        return ;
    }
    else if(key == 8){
        return ;
    }
    else{
        alert("숫자만 입력해주세요.");
        event.preventDefault();
    }
}
const keydown_eng = function (event){
    let key = event.keyCode;

    if(key > 64 && key < 123){
        return ;
    }
    else if(key == 8){
        return ;
    }
    else{
        alert("영문자만 입력해주세요.");
        event.preventDefault();
    }
}



const valid = function (str){

    if(checkNum.test(str)){
        return "num";
    }
    else if(checkEng.test(str)){
        return "eng";
    }
    else if(checkSpc.test(str)){
        return "spc";
    }
    else if(checkKor.test(key)){
        return "kor";
    }
    else{ return null; }

}

