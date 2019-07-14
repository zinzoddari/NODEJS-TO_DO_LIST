//필요한 모듈을 선언함
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

//라우팅 모듈 선언
var indexRouter = require('./routes/message');

//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use('/', indexRouter);

//9090포트로 서버 생성 및 실행
 http.createServer(app).listen(9090, function(){
    console.log("STARTING SERVER...");
});
