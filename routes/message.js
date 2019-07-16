var express = require('express');
var router = express.Router();

var tokenConfig = require('../conf/token_conf').slack;
const { RTMClient } = require('@slack/client');
const slackToken = tokenConfig.slackToken;

const rtm = new RTMClient(slackToken, {logLevel: 'error'});
rtm.start();

var mysql_dbc = require('../conf/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

rtm.on('message', (message) => {
    var channel = message.channel;
    var text = message.text;

    rtm.sendMessage(text, channel);
});

// http://localhost:9090/keyboard
router.get('/', function(req, res) {
    console.log("!!!here");
 });

 router.post('/message', function(req, res){
     
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

 //모듈에 등록해야 app.js에서 app.use 함수를 통해서 사용 가능
 module.exports = router;


 //app.get() 라우팅 처리란?
 //https://www.naver.com/login
 //https://www.naver.com/search 등의 url 접속시 어떻게 응답을 할지에 대한 네비게이션
 //data변수는 위 주소로 접속했을 때 제공할 데이터

 //post 데이터를 쉽게 읽고 사용하기 위하여 npm install body-parser --save를 이용
