// express 모듈 불러온 후 express 변수에 저장
// npm install express -save 명령어로 express 모듈을 활용하여 Node.js 서버 개발 위함
// 설치한 express 모듈을 불러옴
var express = require('express');

// http 모듈 불러온 후 http 변수에 저장
var http = require('http');

// body-parser 모듈을 불러온 후 bodyParser 변수에 저장
var bodyParser = require('body-parser');

// express 객체를 app 변수에 저장
var app = express();

// body-parser 미들웨어 사용을 위한 설정 코드
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// http://localhost:9090/keyboard
app.get('/keyboard', function(req, res) {
    console.log("GO!");
    //전달할 데이터
    var data = {
        'type' : 'buttons',
        'buttons' : ['과일', '채소', '정보']
    };

    // JSON 형식으로 응답
    res.json(data);
 });

 app.post('/message', function(req, res){
     //유저가 대화방에 입력한 데이터

     //req : 요청 객체
     //body : POST 데이터는 body에 포함되어 전달
     //content : API문서에는 content는 사용자가 입력한 데이터라고 명시 
     var msg = req.body.msg; //msg를 카카오톡 API연동시 content로 수정하세요.
     console.log('전달받은 메세지 : ' + msg);
     
     //사용자에게 응답할 데이터
     var send = {};

     switch(msg) {
         case '과일' :
            send = {
                'message' : {
                    'text' : '과일을 선택하였습니다.'
                }
            }
            break;

        default :
            send = {

            }
            break;
     }

     //send 변수에 저장된 데이터 전달
     res.json(send);
 });

 // 9090포트로 서버 실행
 http.createServer(app).listen(9090, function(){
     console.log("STARTING SERVER...");
 });

 //app.get() 라우팅 처리란?
 //https://www.naver.com/login
 //https://www.naver.com/search 등의 url 접속시 어떻게 응답을 할지에 대한 네비게이션
 //data변수는 위 주소로 접속했을 때 제공할 데이터

 //post 데이터를 쉽게 읽고 사용하기 위하여 npm install body-parser --save를 이용
