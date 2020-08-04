//모듈 사용
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressErrorHandler = require('express-error-handler');
var ejs=require('ejs');
var fs=require('fs');
var multer = require('multer');
var cors=require('cors');
//var admin=require('firebase-admin');
//var functions = require('firebase-functions');
var passport=require('passport')
,LocalStrategy=require('passport-local').Strategy;
var flash=require('connect-flash');
var parseurl = require('parseurl');
var FileStore = require('session-file-store')(session)
var im = require('imagemagick');
//데이터 베이스연결
var mysql = require('mysql');
var fileType = require('file-type');
var FCM=require('fcm-node');


var router = express.Router()

var database=mysql.createConnection({   
    host:'localhost',
    user:'root',
    password:'baco12',
    database : 'opentutorials'
});


var app = express();

// ejs 사용
app.set('views',__dirname+'/public');
app.set('view engine','ejs');
app.engine('ejs', require('ejs').__express);
//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));

app.use(session({
    secret: 'baco',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//===== body-parser, cookie-parser, express-session 사용 설정 =====//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());


app.use(cors());

//FCM==============================================




//======= passport 로그인 성공 ,실패시 redirect ===================

app.post('/process/login',
         passport.authenticate('local',{
    //successRedirect:'/',
    failureRedirect:'/login',failureFlash:true
     }),function(req,res,next){
   req.session.save(function(){
       res.redirect('/'); 
   })   
    
});

//로그인에 성공했을때 딱한번 호출되어 사용자식별자를 세션스토어에 저장 
passport.serializeUser(function(user,done){
    
   console.log('serialize:',user); //첫번째 인자로 사용자 저장
    done(null,user);
});

//저장된 데이터 기준으로해서 필요한정보를 조회할때 사용
passport.deserializeUser(function(user,done){
      
    done(null,user);
  
});

//====passport로그인 처리===========================
passport.use(new LocalStrategy(
    {
      usernameField:'id',
        passwordField:'password',
        passReqToCallback : true,
    },
function(req,username,password,done){//비교해서 만약 맞다면 세번째 인자인 done에 실제 데이터 주입-> 호출되면 serialize로 넘어감
    console.log('Localstrategy',username,password);
    database.query('SELECT * FROM admin where a_id=?',username,function(err,results,fields){
        if(err){
            console.log('디비오류');
             return done(null,false,{
          message:'Incorrect databas.'
      });
            
        }else{
            if(results.length==0){
                console.log('아이디틀림');
      return done(null,false,{
          message:'Incorrect username.'
      });
            }
            else{
                if(results[0].a_id==username && results[0].a_pw==password){
                    
                console.log('로그인 성공');
                     return done(null,username);//패스포트한테 성공한데이터 주기
                 }else{
                     console.log('비번틀림');
          return done(null,false,{
              message:'Incorrect password.'
          });
                        }
                }
        }
        
    }) 
    }
));

// 로그인 처리 함수
/*
app.post('/process/login', function(req, res) {
    
    console.log('로그인 호출됨.');
    
	var paramId = req.param('id');
	var paramPassword = req.param('password');
	database.query('SELECT * FROM admin where a_id=?',paramId,function(err,results,fields){
        if(err){
            console.log('오류1');
            
             res.send('<script type="text/javascript">alert("로그인 에러"); window.location="/login"</script>');
             return done(null,false,{
          message:'Incorrect databas.'
      });
            
        }else{
            if(results.length==0){
             res.send('<script type="text/javascript">alert("아이디 및 비밀번호가 틀렸습니다. 다시입력해주세요."); window.location="/login"</script>');
                console.log('아이디틀림');
      return done(null,false,{
          message:'Incorrect username.'
      });
                
            }
            
            else{
                if(results[0].a_id==paramId && results[0].a_pw==paramPassword){
                console.log('로그인 성공');
                     return done(null,authData);//패스포트한테 성공한데이터 주기
                  
                 }else{
             res.send('<script type="text/javascript">alert("아이디 및 비밀번호가 틀렸습니다. 다시입력해주세요."); window.location="/login"</script>');
                     console.log('비번틀림');
          return done(null,false,{
              message:'Incorrect password.'
              
          });
                        }
                }
        }
        
    })    
 }); 
  */

// =========================회원가입 처리==============================
app.post('/process/join',function(req,res){
    
    console.log('회원가입 호출'); 
    var paramId = req.param('id');
    var paramName = req.param('name');
    var paramPassword = req.param('password');
    var paramPhone = req.param('phone');
    var paramEmail = req.param('email');
    var paramBirth = req.param('birth');
    var paramSex = req.param('sex');    var paramGym = req.param('gym');
    var paramKind = req.param('kind');
        
    console.log(paramEmail);
    console.log(paramId);
    database.query('SELECT * FROM admin where a_id=?',paramId,function(err,data){
       if(data.length==0){
          database.query(`INSERT INTO admin (a_id, a_pw, a_name, a_phone, a_email, a_sex, a_birth, a_gym, a_kind) VALUES(?, ?, ?, ?, ?, ?, ? ,? , ?)`,[paramId,paramPassword,paramName,paramPhone,paramEmail,paramSex,paramBirth,paramGym,paramKind], 
            function(error, result){
         if(error){
               throw error;
             console.log('회원가입 실패');
         }
         else{
             if(paramPassword.length==0||paramEmail.length==0||paramBirth.length==0||paramId.length==0){
               
             res.send('<script type="text/javascript">alert("필수입력사항을 모두 입력해주세요."); onclick=window.history.back();</script>')   
                
                }else{
         console.log('회원가입 성공');   
             res.send('<script type="text/javascript">alert("회원가입이 정상적으로 완료되었습니다. 로그인 페이지로 이동하시겠습니까?");  window.location="/login"</script>')}    
         }
      
     })   
           
       } else{
             res.send('<script type="text/javascript">alert("아이디 중복입니다. 다시입력하세요"); onclick=window.history.back();</script>') 
           
       } 
    });         
});


app.post('/message',function(req,res){  //알람보내기
    paramme=req.param('message');
    console.log(paramme);
    var serverKey='AAAAYrceYWc:APA91bHnxoTYYPnRnuwfTpm6Oiv9tC1hFYu6hP1BGFfhGfdABMbtwIqjrkMN82D85YcCACjsCbEbFC6N00dda9AoxpFtVjg41PizKuE_DZb2gU99i3K92XjRAqTeksJgJxfNVnYXlcsP';
var fcm=new FCM(serverKey);

var message = {  
    to: 'cjUaCbZGkL0:APA91bHbgX2L1p1ItBFjQtLc7JQCIivSHzSAM8cnDAJVV94AefjzjH-ETWXbGWEcU2LcI91IhSLpsAM-m1kFCVcOnrsecTtyGSxvqnhkMRs5qKtIMF9BRIG_loSwvsregPkFiAhst5w_',  //기기 토큰값
    notification: {
        
        title: 'BACO',   //제목
        body: paramme  //보낼메시지
    },
};


fcm.send(message, function(err, response){
    if (err) {
        console.log("메시지 보내기 오류:"+err);
    } else {
        console.log("메시지 정상적으로 보냄: ", response);
    }
});
    
     res.send('<script type="text/javascript">alert("메시지가 정상적으로 전송되었습니다."); window.location="/member_list"</script>') 
});


let parampose;  // 증상 전역변수
let paraman;    // 각도 전역변수
app.post('/side',function(req,res){ 
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
console.log(today);
    
    
console.log('side.id:'+paramId);
  parampose=req.body.pe;  
  paraman=req.body.angles;
    var an=paraman;
    
    console.log(parampose);
    console.log(an);
    
    database.query('INSERT INTO side (s_pe, s_an,s_id,s_time) VALUES (?,?,?,?)',[parampose,an,paramId,today],function(err,results,fields){
        if(err){
            console.log('자세, 기울기 에러');
             console.log(err);
        }else{
             console.log('자세, 기울기 들어감');

            
        }
        
    })     
})

app.get('/side2',function(req,res){
    var pe=new Array();
    var angles=new Array();
    
    pe[0]=parampose;
    angles[0]=paraman;
    
            var testList = new Array() ;
    
            for(var i=0; i<pe.length; i++){
            var data = new Object() ;
            data.pe = pe[i];
            data.angles = angles[i];
            testList.push(data) ;
        }    
             console.log('side2');
            console.log(testList);
         
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(testList));
				res.end();  
})

app.get('/side1',function(req,res){
    
    database.query('SELECT * FROM exercise,pose where pose.p_pose=?',parampose,function(err,results,fields){
        if(err){
            throw err;
            console.log('추천운동 디비에 없음 다시입력');
        }else
        {
            var ex = new Array();
            var im = new Array();
            var ex1 = new Array();  
            var im1 = new Array();
            for(var i=0;i<results.length;i++){
            if(results[i].e_muscle1==results[0].p_muscle1){
             ex[i]=results[i].e_exercise
             im[i]=results[i].e_img
             
            }    
            if(results[i].e_muscle1==results[0].p_muscle2){   
             ex[i]=results[i].e_exercise 
                 im[i]=results[i].e_img
            }   
            if(results[i].e_muscle1==results[0].p_muscle3){
             ex[i]=results[i].e_exercise
                 im[i]=results[i].e_img
            }
                
           // 22222222222222222222222222222
                
            if(results[i].e_muscle2==results[0].p_muscle1){
             
             ex[i]=results[i].e_exercise 
                im[i]=results[i].e_img
            }
                
            if(results[i].e_muscle2==results[0].p_muscle2){
             
             ex[i]=results[i].e_exercise
                im[i]=results[i].e_img
            }   
            if(results[i].e_muscle2==results[0].p_muscle3){
             
             ex[i]=results[i].e_exercise
                im[i]=results[i].e_img
            }
            
           
          //3333333333333333333333333333
                if(results[i].e_muscle3==results[0].p_muscle1){
             
             ex[i]=results[i].e_exercise 
                    im[i]=results[i].e_img
            }
                
            if(results[i].e_muscle3==results[0].p_muscle2){
             
             ex[i]=results[i].e_exercise 
                im[i]=results[i].e_img
            }   
            if(results[i].e_muscle3==results[0].p_muscle3){
             
             ex[i]=results[i].e_exercise
                im[i]=results[i].e_img
            }
            
                
                //444444444444444444444444444444
                   if(results[i].e_muscle4==results[0].p_muscle1){
             
             ex[i]=results[i].e_exercise 
                       im[i]=results[i].e_img
            }
                
            if(results[i].e_muscle4==results[0].p_muscle2){
             
             ex[i]=results[i].e_exercise 
                im[i]=results[i].e_img
            }   
            if(results[i].e_muscle4==results[0].p_muscle3){
             
             ex[i]=results[i].e_exercise
                im[i]=results[i].e_img
            }
           
            //55555555555555555
                   if(results[i].e_muscle5==results[0].p_muscle1){
             
             ex[i]=results[i].e_exercise 
                       im[i]=results[i].e_img
            }
                
            if(results[i].e_muscle5==results[0].p_muscle2){
             
             ex[i]=results[i].e_exercise 
                im[i]=results[i].e_img
            }   
            if(results[i].e_muscle5==results[0].p_muscle3){
             
             ex[i]=results[i].e_exercise 
                im[i]=results[i].e_img
            }
                
                //6666666666666666666
                   if(results[i].e_muscle6==results[0].p_muscle1){
             
             ex[i]=results[i].e_exercise
                       im[i]=results[i].e_img
            }
                
            if(results[i].e_muscle6==results[0].p_muscle2){
             
             ex[i]=results[i].e_exercise 
                im[i]=results[i].e_img
            }   
            if(results[i].e_muscle6==results[0].p_muscle3){
             
             ex[i]=results[i].e_exercise
                im[i]=results[i].e_img
            }
                  
            }
            
            
            var a=0;
            for(var j=0; j<ex.length;j++){
                if(ex[j]!=null||ex[j]!=undefined||im[j]!=undefined){
                     ex1[a]=ex[j];
                     im1[a]=im[j];
                    a++;
                 }
            }
            
              var testList = new Array() ;
 
        for(var i=0; i<ex1.length; i++){
            // 객체 생성
            var data = new Object() ;
            data.ex1 = ex1[i];
            data.im1 = im1[i];
            testList.push(data) ;
        }    
             console.log('추천운동 보내줌 ');
          
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(testList));
                //res.write(JSON.stringify(im2));
				res.end();  
        }
        
    })     
})



// ==============================post 처리=================================================

// ==============================  ejs 받기 ====================================================



app.get('/test',function(req,res){ //로그인 전 홈페이지
    res.render('test');
    
})

app.get('/be_login',function(req,res){ //로그인 전 홈페이지
    res.render('be_login');
    
})

function authIsOwner(req,res){
       if(req.session.is_logined){
        return true
    }else{
        return false;
    }
}


app.get('/', function(req, res){ //로그인 후 홈페이지
    console.log('/',req.user);
     // if(req.user)있다면true면 로그인 되잇음...passport   
 if(req.user){
     req.session.logined=true;
 }
    if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }
    var sql = 'SELECT a_name FROM admin'; 
    database.query(sql, function(err, topics, fields){
      if(err){
        console.log(err);
        res.status(500).send('불러오기 Error')
      }
        res.render('index', { topics: topics }); //topics라는 배열안에 JSON형식으로 데이터들이 담겨있음. topics라는 변수에 데이터를 담아 add.ejs로 넘겨준다.
    });
});

//로그인
app.get('/login', function(req, res){ 
    var sql = 'SELECT a_name FROM admin'; // topic의 모든 id와 title 불러오기
    
    database.query(sql, function(err, topics, fields){
      if(err){
        console.log(err);
        res.status(500).send('불러오기 Error')
      }
        res.render('login', { topics: topics }); //topics라는 배열안에 JSON형식으로 데이터들이 담겨있음. topics라는 변수에 데이터를 담아 add.ejs로 넘겨준다.
    });
});



app.get('/alarm_class', function(req, res){ 
     if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }
    else{
    var sql = 'SELECT * FROM admin,user WHERE admin.a_id=user.a_id'; // topic의 모든 id와 title 불러오기
    database.query(sql, function(err, topics, fields){
      if(err){
        console.log(err);
        res.status(500).send('불러오기 Error')
      }
        res.render('alarm_class', { topics: topics }); //topics라는 배열안에 JSON형식으로 데이터들이 담겨있음. topics라는 변수에 데이터를 담아 add.ejs로 넘겨준다.
        
    });
    }
});


app.get('/member_list', function(req, res){
     if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }
    else{
     console.log(req.user,'memberlist');
            var loginID=req.user;
    var sql = 'SELECT user.a_id,user.u_name,user.u_birth,user.u_sex,user_info.ui_gym,user_info.ui_kind FROM admin,user,user_info WHERE admin.a_id=user.a_id AND user.u_id=user_info.ui_id AND user.a_id=?';
        
    database.query(sql,loginID, function(err, results, fields){
      if(err){
        console.log(err);
        res.status(500).send('불러오기 Error')
      }
        res.render('member_list', { results: results }); 
    });
    }
});

app.get('/member_list_search', function(req, res){
     if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }
   
    var paramName=req.param('name');
    console.log('맴버검색함');
     console.log(paramName);
    database.query('SELECT * FROM user,user_info WHERE user.u_id=user_info.ui_id AND user.u_name= ?',[paramName],function(err,results,fields){
             if(err){
    console.log('err');    
    }  
       res.render('member_list_search', { results: results });
    
        });
});

app.get('/member_change',function(req,res){ //로그인 전 홈페이지
     if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }
   else{
     var paramName=req.param('name'); 
    var paramid=req.param('id'); 
    console.log(paramName); 
       
     database.query('SELECT  user.u_name,user.u_birth,user.u_sex,user_info.ui_gym,user_info.ui_kind,img.i_img  FROM user,user_info ,img WHERE user.u_id=user_info.ui_id AND img.i_id=user.u_id AND user.u_name= ?',[paramName],function(err,results,fields){
             if(err){
    console.log('member change_err1');    
    }         
         
        database.query('SELECT user_result.front_img,user_result.side_img ,user_result.ur_date,user_result.front_sh,user_result.front_pe,user_result.front_leg,user_result.side_neck,user_result.side_pe,user_result.ur_weight,user_result.ur_fat,user_result.ur_mus,user_result.ur_pose1,user_result.ur_pose2,user_result.ur_pose3,user_result.ur_pose4,user_result.ur_pose5 FROM  user_result,user WHERE user.u_id=user_result.ur_id AND user.u_name= ?',[paramName],function(err,result,fields){
              if(err){
                  console.log('member change_err2'); 
                  console.log(err)
              }     
            database.query('SELECT DISTINCT side.s_pe, side.s_an FROM side,user WHERE side.s_id=user.u_id AND user.u_name= ?',[paramName],function(err,sider,fields){
                 if(err){
                  console.log('change_next_err3'); 
                  console.log(err)
              }    
                 
                database.query('SELECT DISTINCT side.s_pe FROM side,user WHERE user.u_id=side.s_id AND user.u_name=?',[paramName],function(err,sider1,fields){
                     if(err){
                  console.log('change_next_err4'); 
                  console.log(err)
              }    
                  res.render('member_change', { results: results ,result: result, sider:sider,sider1:sider1});  
                })
                  
             })
              
        })
        });
   }
})

app.get('/change_next',function(req,res){ //로그인 전 홈페이지
     if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }
   else{
     var paramName=req.param('name'); 
    var paramId=req.param('id'); 
    console.log(paramName);
       console.log(paramId);
     database.query('SELECT  user.u_name,user.u_birth,user.u_sex,user_info.ui_gym,user_info.ui_kind,user_diary.ud_ex,user_diary.ud_food,img.i_img FROM user,user_info, user_diary,img WHERE user.u_id=user_info.ui_id AND user_diary.ud_id=user.u_id AND img.i_id=user.u_id AND user.u_name= ?',[paramName],function(err,results,fields){
             if(err){
                 console.log('change_next_err1'); 
                  console.log(err)  
                 
    }
         database.query('SELECT user_result.front_img,user_result.side_img ,user_result.ur_date,user_result.front_sh,user_result.front_pe,user_result.front_leg,user_result.side_neck,user_result.side_pe,user_result.ur_weight,user_result.ur_fat,user_result.ur_mus,user_result.ur_pose1,user_result.ur_pose2,user_result.ur_pose3,user_result.ur_pose4,user_result.ur_pose5 FROM user_result, user WHERE user.u_id=user_result.ur_id AND user.u_name= ?',[paramName],function(err,result,fields){
              if(err){
                  console.log('change_next_err2'); 
                  console.log(err)
              }     
             
             database.query('SELECT side.s_time, side.s_pe, side.s_an FROM side,user WHERE side.s_id=user.u_id AND user.u_name= ? AND side.s_pe=?',[paramName,paramId],function(err,sider,fields){
                 if(err){
                  console.log('change_next_err3'); 
                  console.log(err)
              }    
                 database.query('SELECT DISTINCT side.s_pe FROM side,user WHERE user.u_id=side.s_id AND user.u_name=?',[paramName],function(err,sider1,fields){
                     if(err){
                  console.log('change_next_err4'); 
                  console.log(err)
              }    
                  res.render('change_next', { results: results ,result: result, id: paramId, sider:sider,sider1:sider1});   
                 })
                  
             })
            
             
            
            
        })
         
    
        });
   }
})

app.get('/contact',function(req,res){ //로그인 전 홈페이지
     var id=req.user;
     if(req.session.logined!=true){
       res.redirect('/be_login');   
       }else{
  
    res.render('contact',{result:id});
       }
});


app.post('/process/contact',function(req,res){
    
        var id=req.user;
        var paramname=req.param('name');
        var paramsub=req.param('sub');
        var message=req.param('message');
        if(message){
            console.log('메시지 전달댐')
    database.query('INSERT INTO admin_contact (ac_id,ac_name,ac_sub,ac_message) VALUES (?,?,?,?)',[id,paramname,paramsub,message],function(err,results,fields){
        if(err){
            console.log('contact에러:'+err);
        }else{
            console.log('고객센터 문의메시지 들어옴');
             res.send('<script type="text/javascript">alert("문의가 완료되었습니다. 감사합니다."); window.location="/contact"</script>');
        }
    })
        }else{
             res.send('<script type="text/javascript">alert("메시지를 작성해주세요!"); window.location="/contact"</script>');
        }
   
    
})

app.get('/pay_cal',function(req,res){ 
    
     if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }else{
        var id=req.user;
        database.query('SELECT user_diary.ud_year,user_diary.ud_month, user_diary.ud_day, user.u_name, user_diary.ud_result FROM user_diary,user WHERE user_diary.ud_id=user.u_id AND user.a_id=?',id,function(err,result){
            if(err){
                throw err;
                   }
            else{
                for(var i=0;result.length>i;i++){
                result[i].ud_month=result[i].ud_month-1;
                }
                console.log('cal 수업관리!');
                 res.render('pay_cal',{result:result});
            }
        })
       
    }
 
})

app.get('/pay_count',function(req,res){ 
    
     if(req.session.logined!=true){
       res.redirect('/be_login'); 
       }
    else{
        var id=req.user;
        database.query('SELECT user_diary.ud_year,user_diary.ud_month, user_diary.ud_day, user.u_name, user_diary.ud_result FROM user_diary,user WHERE user_diary.ud_id=user.u_id AND user.a_id=?',id,function(err,result){
            if(err){
                throw err;
                   }
            else{
                for(var i=0;result.length>i;i++){
              
                result[i].ud_month=result[i].ud_month-1;
                }
                console.log('count 수업관리!');
                 res.render('pay_count',{result:result});
            }
        })
       
    }
});


app.get('/logout',function(req,res){
  req.session.destroy(function(err){
   res.redirect('/be_login');   
  });
});


//ejs-----------------------------------------------------------------------------


//안드로이드 연결 ------------------------------------------------------------------


//안드로이드에 user 정보 넘겨줌 =======================================
app.post('/user', (req, res) => { 
   console.log('안드로이드에 데이터 넘김');
    database.query('SELECT * FROM user',function(err,results,fields){
        // res.send(JSON.stringify(result))
                res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(results)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
    })
});

//===============안드로이드 회원가입=================================
app.post('/userjoin',function(req,res){
    console.log('안드로이드 회원가입');
    var success;
    var paramId = req.body.u_id;
    var paramName = req.body.u_name;
    var paramPassword = req.body.u_pw;
    var paramPhone = req.body.u_phone;
    var paramEmail =req.body.u_email;
    var paramBirth =req.body.u_birth;
    var paramSex = req.body.u_sex;
    var a_id=null;

     database.query('INSERT INTO user (u_id,u_pw,u_name,u_phone,u_email,u_sex,u_birth,a_id) VALUES(?, ?, ?, ?, ?, ?, ? ,?)',[paramId,paramPassword,paramName,paramPhone,paramEmail,paramSex,paramBirth,a_id],function(error, result){
         
         if(error){
               console.log('안드로이드 회원가입 에러:'+error);
              success=false;
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
         }
         else{
         console.log('회원가입 성공');
                  res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
			success=true;	
             res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
                
         }
     }) 
})

//============= 안드로이드 아이디중복확인==========================================
app.post('/uservalidate', (req, res) => { 
   console.log('안드로이드 아이디 중복확인');
    var inputData;
    var success;
    var paramid=req.body.u_id;
    console.log(paramid);
   req.on('data', (data) => {
     inputData = JSON.parse(data).u_id;
   });
        
     req.on('end', (data) => {
       console.log(inputData);
   });
    
    database.query('SELECT * FROM user WHERE user.u_id=? ',paramid,function(err,results,fields){
        if(err){
            console.log('아이디중복확인 에러:'+err);
        }else{
            if(results.length==0){
                success=true;
                 res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
               
               }
               else{
               success=false;
                    res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
               }
        }
    })
   
});


//==========안드로이드로 운동이미지 넘겨줌==========================
app.get('/userexe', (req, res) => {
   console.log('안드로이드로 운동이미지 넘겨줌');
   var img=req.body.img;
   
    database.query('SELECT * FROM exercise',function(err,results,fields){
         if(err){
             console.log('운동이미지 넘겨주는도중에러:'+err);
         }else{
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(results)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
         }
    })
})

app.get('/food', (req, res) => {
   console.log('안드로이드로 음식이미지 넘겨줌');
   var img=req.body.img;
   
    database.query('SELECT * FROM food',function(err,results,fields){
         if(err){
             
             console.log('음식이미지 넘겨주는도중에러:'+err);
         }else{
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(results)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
         }
    })
})
    
//================안드로이드로 다이어리 넘겨줌========================
app.post('/userdiary', (req, res) => {
   console.log('안드로이드로 다이어리 넘겨줌');
   var id=req.body.ud_id;
    var year=req.body.ud_year;
    var month=req.body.ud_month;
    var day=req.body.ud_day;
    var food=req.body.ud_food;
    var ex=req.body.ud_ex;
    var result=req.body.ud_result;
    
    database.query(`INSERT INTO user_diary (ud_year,ud_month,ud_day, ud_food, ud_ex,ud_result, ud_id) VALUES(ud_year, ud_month, ud_day, ud_food, ud_ex, ud_result, ud_id)`,[year, month, day, food, ex, result,id],function(err,results,fields){
         if(err){
             console.log('다이어리 insert에러');
         }else{
             console.log('다이어리 insert됨');
         }
    })
   
});

//안드로이드 로그인===================================

let paramId;


app.post('/userlogin', (req, res) => {
   console.log('안드로이드 에서 로그인옴');
   
    var success;
   
    paramId=req.body.u_id;
    var paramPassword=req.body.u_pw;
    
     console.log(paramId);
     console.log(paramPassword);
    
   database.query('SELECT * FROM user WHERE u_id=?',paramId,function(err,results,fields){
        if(err){
            
             console.log('안드로이드 로그인에러:'+err);
            success=false;
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
        }else{
            if(results.length==0){
                console.log('아이디틀림');
                 success=false;
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
            }
            
            else{
                if(results[0].u_id==paramId && results[0].u_pw==paramPassword){
                console.log('로그인 성공');
                     success=true;
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
                    
                 }else{
                     console.log('비번틀림');
                      success=false;
              res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(success)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
        
                        }
                }
        }
   })
});

//====================안드로이드 이미지 처리==================================================================

var upload = multer({
   
    dest:'images/', 
    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
        
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
                  
            return callback(new Error('Only Images are allowed !'), false)
        }
        callback(null, true);
    }
}).single('image')

router.post('/images/upload', (req, res) => {
    console.log(paramId);
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            var path = `/images/${req.file.filename}`
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
            
            database.query('SELECT u_name,u_id FROM user WHERE u_id=?',paramId,function(err,results,field){
            if(err)
                {
                    console.log('이미지 sel 에러')
                }
                else{
                    console.log('이미지경로:'+path);
                    console.log('안드로이드id:'+results[0].u_id);
                    console.log('안드로이드name:'+results[0].u_name);
                    var id =results[0].u_id;
                    var na= results[0].u_name;
                    
                      database.query('INSERT INTO img (i_img,i_id,i_name) VALUES (?,?,?)',[path,id,na],function(err,result,field){
                if(err){
                    
                     console.log('이미지INS 에러:'+err);
                    
                    
                }else{
                    console.log('안드로이드에서 이미지 들어감');
                      
                }
            })
                    
                }
            })
          
        }
    })
})

router.get('/images/:imagename', (req, res) => {
    var imagename = req.params.imagename
    var imagepath = __dirname + "/images/" + imagename
    var image = fs.readFileSync(imagepath)
    var mime = fileType(image).mime
   
	res.writeHead(200, {'Content-Type': mime })
	res.end(image, 'binary')
})

app.use('/', router)

app.use((err, req, res, next) => {
       if (err.code == 'ENOENT') {
        
        res.status(404).json({message: 'Image Not Found !'})

    } else {

        res.status(500).json({message:err.message}) 
    } 
})

app.get('/admin',function(req,res){
    database.query('SELECT a_name,a_gym FROM admin',function(err,results,field){
        if(err){
            console.log('안드 admin 찾기 에러')
            console.log(err);
        }
        console.log('amin 접근');
        res.writeHead('200', {'Content-Type':'application/json;charset=utf8'}); //json으로 넘겨줌
				res.write(JSON.stringify(results)); //results라는 객체가 문자열로 바뀌어서 넘어감x`
				res.end();
    
    })
    
})

//서버 실행=======================================================
http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 연결
	database.connect();
   
});
