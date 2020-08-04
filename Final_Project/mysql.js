--
-- Table structure for table `author`
--
  
  
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
  
--
-- Dumping data for table `author`
--
  
INSERT INTO `author` VALUES (1,'egoing','developer');
INSERT INTO `author` VALUES (2,'duru','database administrator');
INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');
  
--
-- Table structure for table `topic`
--
  
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
  
--
-- Dumping data for table `topic`
--
  
INSERT INTO `users_information` VALUES ('dsw','이상민','M',19940924,175,70,'목적','Y','헬스장');
INSERT INTO `topic` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10',1);
INSERT INTO `topic` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10',2);
INSERT INTO `topic` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03',3);
INSERT INTO `topic` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03',1);


  ------------------------------------------디비 테이블

  
    CREATE TABLE `admin` (   
        `a_id` VARCHAR(30) UNIQUE,
        `a_pw` VARCHAR(30) ,
        `a_name` VARCHAR(20),
        `a_phone` int(15) ,
        `a_email` VARCHAR(50),
        `a_sex` VARCHAR(10),
        `a_birth` int(15),
        `a_gym` VARCHAR(50),
        `a_kind` VARCHAR(10),
      PRIMARY KEY (`a_id`) 
     );


CREATE TABLE `user` (
`u_id` VARCHAR(30) UNIQUE,
`u_pw` VARCHAR(30) ,
`u_name` VARCHAR(20),
`u_phone` int(15) ,
`u_email` VARCHAR(50),
`u_sex` VARCHAR(10),
`a_birth` int(15),
`a_id` VARCHAR(30) NULL,
PRIMARY KEY (`u_id`),
FOREIGN KEY(`a_id`)REFERENCES admin(`a_id`)
ON UPDATE CASCADE
);


CREATE TABLE `user_info` ( 
        `ui_id` VARCHAR(30) UNIQUE,
        `ui_tall` int(4),
        `ui_weight` int(4),
        `ui_kind` VARCHAR(30),
        `ui_act` int(5),
        `ui_gym` VARCHAR(10),
      PRIMARY KEY (`ui_id`),
      FOREIGN KEY(`ui_id`)REFERENCES user(`u_id`)
ON UPDATE CASCADE   
ON DELETE CASCADE
     ); //user id 지워지면 지워짐
    
 CREATE TABLE `user_result` (
     `ur_id` VARCHAR(30) ,
     `ur_date` VARCHAR(20),
     `front_sh` int(10),
      `front_pe` int(10),
        `front_leg` int(10),
            `side_neck` int(10),
                `side_pe` int(10),
                    `ur_weight` int(10), 
                        `ur_fat` int(10), 
                            `ur_mus` int(10), 
                                `ur_pose1` VARCHAR(20),
                                    `ur_pose2` VARCHAR(20),
                                        `ur_pose3` VARCHAR(20),
                                            `ur_pose4` VARCHAR(20),
                                                `ur_pose5` VARCHAR(20),
                                                
     `front_img` VARCHAR(150),
     `side_img` VARCHAR(150),
      FOREIGN KEY(`ur_id`)REFERENCES user(`u_id`)
     );

 CREATE TABLE `user_diary` (   
        `ud_year` int(10),
     `ud_month` int(10),
         `ud_day` int(10),
        `ud_food` VARCHAR(20),
        `ud_ex` VARCHAR(20),
        `ud_result` VARCHAR(50),
        `ud_id` VARCHAR(30),
       FOREIGN KEY(`ud_id`)REFERENCES user(`u_id`)
     );
  INSERT INTO `user_diary` VALUES (2019,5,16,'바나나','데드리프트','3시에 헬스장 ,5시 필라테스','test1');
 INSERT INTO `user_diary` VALUES (2019,4,12,'바나나','데드리프트','3am gym','test1');


CREATE TABLE `img` (   
        `i_id` VARCHAR(30),
        `i_img` VARCHAR(200),
        `i_name` VARCHAR(10),
            FOREIGN KEY(`i_id`)REFERENCES user(`u_id`)
     );

CREATE TABLE `food` (   
        `f_name` VARCHAR(30),
        `f_img` VARCHAR(200)
     );

CREATE TABLE `side` (   
        `s_pe` VARCHAR(20),
        `s_an` VARCHAR(20),
        `s_id` VARCHAR(20),
        `s_time`VARCHAR(20)
     );
INSERT INTO `side` VALUES ('거북목과 둥근등',65,'test2','2019-04-20');


INSERT INTO `user_result` VALUES ('test1','2019-06-13',13,24,14,22,12,60,30,10,'거북목','전방경사','허리디스크',0,0,'uploads/images/body_pic.jpg','uploads/images/member_pic.PNG');

INSERT INTO `user_result` VALUES ('test1','2019-07-15',11,21,10,22,12,58,20,15,'거북목','전방경사','허리디스크',0,0,'uploads/images/body_pic.jpg','uploads/images/member_pic.PNG');

INSERT INTO `user_result` VALUES ('test1','2019-08-12',5,15,11,17,12,56,20,20,'거북목','전방경사','허리디스크',0,0,'uploads/images/body_pic.jpg','uploads/images/member_pic.PNG');
INSERT INTO `user_result` VALUES ('test1','2019-09-15',5,15,11,17,12,56,20,20,'거북목','전방경사','허리디스크',0,0,'uploads/images/body_pic.jpg','uploads/images/member_pic.PNG');
INSERT INTO `user_result` VALUES ('test1','2019-10-10',5,15,11,17,12,56,20,20,'거북목','전방경사','허리디스크',0,0,'uploads/images/body_pic.jpg','uploads/images/member_pic.PNG');

INSERT INTO `user_result` VALUES ('test2','2019-08-12',5,15,11,17,12,56,20,20,'후방경사','오다리',0,0,0,'uploads/images/body_pic.jpg','uploads/images/member_pic.PNG');

INSERT INTO `user_result` VALUES ('test2','2019-09-10',3,10,9,10,10,54,18,18,'후방경사','오다리',0,0,0,'uploads/images/body_pic.jpg','uploads/images/member_pic.PNG');

 CREATE TABLE `exercise` (
     `e_exercise` VARCHAR(20),
     `e_muscle1` VARCHAR(20),
      `e_muscle2` VARCHAR(20),
          `e_muscle3` VARCHAR(20),
              `e_muscle4` VARCHAR(20),
                  `e_muscle5` VARCHAR(20),
                      `e_muscle6` VARCHAR(20),
     `img` VARCHAR(150),
         `e_part` VARCHAR(10),
      PRIMARY KEY (`e_exercise`),
       FOREIGN KEY(`e_part`)
     );



 CREATE TABLE `pose` (
     `p_pose` VARCHAR(20),
     `p_muscle1` VARCHAR(20),
         `p_muscle2` VARCHAR(20),
             `p_muscle3` VARCHAR(20),
                 `p_muscle4` VARCHAR(20),
                     `p_muscle5` VARCHAR(20),
                         `p_muscle6` VARCHAR(20),
      PRIMARY KEY (`p_pose`)
     ); 

INSERT INTO `pose` VALUES ('전만증','장요근','대퇴근막장근','대퇴직근','복직근','내복사근','척추기립근');
INSERT INTO `pose` VALUES ('스웨이백','복직근','내복사근','장요근','대둔근','엉덩허리근','늑간근',NULL);
INSERT INTO `pose` VALUES ('편평등자세','복직근','늑간근','엉덩허리근','대둔근',NULL,NULL);
INSERT INTO `pose` VALUES ('거북목과 둥근등','늑간근','대흉근','광배근','견갑거근','능형근',NULL);
INSERT INTO `pose` VALUES ('평평한위쪽 등과 목 자세','견갑골전인근','늑간근','척추기립근',NULL,NULL,NULL );
INSERT INTO `pose` VALUES ('이마면치우침','장요근','박근','내전근',NULL,NULL,NULL);

전만증,다리,
스웨이백,물고기자세,스쿼트자세,다리자세
편평등,고양이,활,슈퍼맨
거북목둥근등,퍼피자세,흉추신전,거북목자세
평평한위쪽 등과 목 자세,고양이자세,다리자세,코브라
이마면치우침,나비자세,비둘기자세,골반비틀기자세

 CREATE TABLE `yoga` (
     `y_pose` VARCHAR(20),
     `yoga1` VARCHAR(20),
         `yoga2` VARCHAR(20),
             `yoga3` VARCHAR(20),
                 `yoga1_im` VARCHAR(200),
                     `yoga2_im` VARCHAR(200),
                         `yoga3_im` VARCHAR(200),
      PRIMARY KEY (`y_pose`)
      FOREIGN KEY(`y_pose`)REFERENCES pose(`p_pose`)
     ); 

INSERT INTO `yoga` VALUES ('전만증','다리자세','로우런지','고양이자세','http://172.20.10.2:3000/public/uploads/images/다리자세.jpg','http://172.20.10.2:3000/public/uploads/images/로우런지.jpg','http://172.20.10.2:3000/public/uploads/images/고양이자세.jpg');
INSERT INTO `yoga` VALUES ('스웨이백','물고기자세','스쿼트','다리자세','http://172.20.10.2:3000/public/uploads/images/물고기자세.jpg','http://172.20.10.2:3000/public/uploads/images/스쿼트.jpg','http://172.20.10.2:3000/public/uploads/images/다리자세.jpg');
INSERT INTO `yoga` VALUES ('편평등자세','고양이자세','활자세','슈퍼맨자세','http://172.20.10.2:3000/public/uploads/images/고양이자세.jpg','http://172.20.10.2:3000/public/uploads/images/활자세.jpg','http://172.20.10.2:3000/public/uploads/images/슈퍼맨자세.png');
INSERT INTO `yoga` VALUES ('거북목과 둥근등','퍼피자세','흉추신전','거북목스트레칭','http://172.20.10.2:3000/public/uploads/images/퍼피자세.jpg','http://172.20.10.2:3000/public/uploads/images/흉추신전.jpg','http://172.20.10.2:3000/public/uploads/images/거북목스트레칭.jpg');
INSERT INTO `yoga` VALUES ('평평한위쪽 등과 목 자세','고양이자세','다리자세','코브라자세','http://172.20.10.2:3000/public/uploads/images/고양이자세.jpg','http://172.20.10.2:3000/public/uploads/images/다리자세.jpg','http://172.20.10.2:3000/public/uploads/images/코브라자세.jpg');
INSERT INTO `yoga` VALUES ('이마면치우침','나비자세','비둘기자세','골반비틀기자세','http://172.20.10.2:3000/public/uploads/images/나비자세.jpg','http://172.20.10.2:3000/public/uploads/images/비둘기자세.jpg','http://172.20.10.2:3000/public/uploads/images/골반비틀기자세.jpg');


전만증,장요근,대퇴근막장근,대퇴직근,복직근,내복사근,척추기립근
'스웨이백','복직근','내복사근','장요근','대둔근','엉덩허리근','늑간근',NULL
'편평등자세','복직근','늑간근','엉덩허리근','대둔근',NULL,NULL
거북목과 둥근등,'늑간근','대흉근','광배근','견갑거근','능형근',NULL
평평한위쪽 등과 목 자세,'견갑골전인근','늑간근','척추기립근',NULL,NULL,NULL 
이마면치우침,'장요근','박근','내전근',NULL,NULL,NULL

CREATE TABLE `admin_contact` (   
        `ac_id` VARCHAR(30),
       `ac_name` VARCHAR(20),
        `ac_sub` VARCHAR(50),
        `ac_message` TEXT,
        
       FOREIGN KEY(`ac_id`)REFERENCES admin(`a_id`)
     );



delete from exercise where e_exercise='머신스쿼트';
------------------디비 값 

INSERT INTO `user_info` VALUES ('test',174,70,'헬스',300,'수원헬스');
INSERT INTO `user_info` VALUES ('test1',175,75,'요가',300,'수원요가');
INSERT INTO `user_info` VALUES ('test2',167,49,'요가',300,'수원요가');
INSERT INTO `user_info` VALUES ('test3',174,66,'헬스',300,'강남헬스');

INSERT INTO `user_info` VALUES ('1',174,66,'te',300,'te');

INSERT INTO `user` VALUES ('test','test12','이상민',01011111,'dsw@naver.com','M','19940924',NULL);
INSERT INTO `user` VALUES ('test1','test12','홍길동',01011111,'QWE1@naver.com','F','19214233','baco');
INSERT INTO `user` VALUES ('test2','test12','박경희',01011113,'QWE2@naver.com','F','19530924','baco');
INSERT INTO `user` VALUES ('test3','test12','김길순',01011112,'QW3@naver.com','M','19630924','baco');
`INSERT INTO user (u_id, u_pw, u_name, u_phone, u_email, u_sex, u_birth, a_id) VALUES(6, 1, 1, 1, 1, 1, 1 ,NULL)`
SELECT FROM TABLE WHERE id IN (
SELECT A.id id FROM ( SELECT id FROM TABLE
            GROUP BY col2, col3, col4, col5, col6
                 HAVING COUNT(*)  >  1)  A)
SELECT * FROM exercise,pose where pose.p_pose='전망증';

UPDATE pose SET p_muscle6 = ISNULL(p_muscle6, '0');
UPDATE exercise SET img = '1234' WHERE (img IS NULL);

UPDATE exercise SET img = 'uploads/images/크런치.PNG' WHERE e_exercise = '크런치';


INSERT INTO `exercise` VALUES ('바벨숄더프레스','전면삼각근',NULL,NULL,'측면삼각근','삼두근','승모근','uploads/images/바벨숄더프레스.PNG','어깨');

INSERT INTO `exercise` VALUES ('머신숄더프레스','전면삼각근',NULL,NULL,'측면삼각근','삼두근','승모근','uploads/images/머신숄더프레스.PNG','어깨');

INSERT INTO `exercise` VALUES ('덤벨숄더프레스','전면삼각근',NULL,NULL,'측면삼각근','삼두근','승모근','uploads/images/덤벨숄더프레스.PNG','어깨');

INSERT INTO `exercise` VALUES ('덤벨프론트레이즈','전면삼각근',NULL,NULL,'상부대흉근','승모근',NULL,'uploads/images/덤벨프론트레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('바벨프론트레이즈','전면삼각근',NULL,NULL,'측면삼각근','승모근','대흉근쇄골두','uploads/images/바벨프론트레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('케이블프론트레이즈','전면삼각근',NULL,NULL,'측면삼각근','승모근','대흉근쇄골두','uploads/images/케이블프론트레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('덤벨레터럴레이즈','측면삼각근',NULL,NULL,'정면삼각근','후면삼각근','승모근','uploads/images/덤벨레터럴레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('덤벨시티드레터럴레이즈','측면삼각근',NULL,NULL,'정면삼각근','후면삼각근','승모근','uploads/images/덤벨시티드레터럴레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('케이블레터럴레이즈','측면삼각근',NULL,NULL,'정면삼각근','후면삼각근','승모근','uploads/images/케이블레터럴레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('머신레터럴레이즈','측면삼각근',NULL,NULL,'정면삼각근','후면삼각근','승모근','uploads/images/머신레터럴레이즈.PNG','어깨');


    
INSERT INTO `exercise` VALUES ('바벨업라이트로우','측면삼각근','승모근',NULL,'정면삼각근','극상근','극하근','uploads/images/바벨업라이트로우.PNG','어깨');

INSERT INTO `exercise` VALUES ('케이블업라이트로우','측면삼각근','승모근',NULL,'정면삼각근','극상근','극하근','uploads/images/케이블업라이트로우.PNG','어깨');

INSERT INTO `exercise` VALUES ('벤트오버덤벨레이즈','후면삼각근','측면삼각근','승모근','능형근','극하근','소원근','uploads/images/벤트오버덤벨레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('시티드벤트오버덤벨레이즈','후면삼각근','측면삼각근','승모근','능형근','극하근','소원근','uploads/images/시티드벤트오버덤벨레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('케이블벤트오버레이즈','후면삼각근','측면삼각근','승모근','능형근','극하근','소원근','uploads/images/케이블벤트오버레이즈.PNG','어깨');

INSERT INTO `exercise` VALUES ('리버스케이블크로스오버','후면삼각근','측면삼각근','승모근','능형근','극하근','소원근','uploads/images/케이블리버스크로스오버.PNG','어깨');

INSERT INTO `exercise` VALUES ('리어델토이드플라이','후면삼각근','측면삼각근','승모근','능형근','극하근','소원근','uploads/images/리어델토이드플라이.PNG','어깨');


INSERT INTO `exercise` VALUES ('익스터널로테이션','극하근','대원근',NULL,'후면삼각근',NULL,NULL,'uploads/images/익스터널로테이션.PNG','어께');

INSERT INTO `exercise` VALUES ('인터널로테이션','견갑하근',NULL,NULL,'대흉근',NULL,NULL,'uploads/images/인터널로테이션.PNG','어깨');

INSERT INTO `exercise` VALUES ('인클라인사이드레이즈','극상근',NULL,NULL,'측면삼각근','전면삼각근',NULL,'uploads/images/인클라인사이드레이즈.PNG','등');

INSERT INTO `exercise` VALUES ('바벨인클라인프레스','대흉근쇄골두',NULL,NULL,'전면삼각근','삼두근',NULL,'uploads/images/바벨인클라인프레스.PNG','가슴');

INSERT INTO `exercise` VALUES ('덤벨인클라인프레스','대흉근쇄골두',NULL,NULL,'전면삼각근','삼두근',NULL,'uploads/images/덤벨인클라인프레스.PNG','가슴');

INSERT INTO `exercise` VALUES ('덤벨인클라인플라이','대흉근쇄골두',NULL,NULL,'전면삼각근',NULL,NULL,'uploads/images/인클라인사이드레이즈.PNG','가슴');

INSERT INTO `exercise` VALUES ('케이블로우풀리플라이','대흉근쇄골두',NULL,NULL,'전면삼각근',NULL,NULL,'uploads/images/케이블로우풀리플라이.PNG','가슴');

INSERT INTO `exercise` VALUES ('바벨벤치프레스','대흉근',NULL,NULL,'전면삼각근','삼두근',NULL,'uploads/images/바벨벤치프레스.PNG','가슴');

INSERT INTO `exercise` VALUES ('덤벨벤치프레스','대흉근',NULL,NULL,'전면삼각근','삼두근',NULL,'uploads/images/덤벨벤치프레스.PNG','가슴');

INSERT INTO `exercise` VALUES ('덤벨플라이','대흉근',NULL,NULL,'전면삼각근',NULL,NULL,'uploads/images/덤벨플라이.PNG','가슴');

INSERT INTO `exercise` VALUES ('머신플라이','대흉근',NULL,NULL,'전면삼각근',NULL,NULL,'uploads/images/머신플라이.PNG','가슴');

INSERT INTO `exercise` VALUES ('바벨디클라인프레스','하부대흉근',NULL,NULL,'삼두근','전면삼각근',NULL,'uploads/images/바벨디클라인프레스.PNG','가슴');

INSERT INTO `exercise` VALUES ('덤벨디클라인프레스','하부대흉근',NULL,NULL,'삼두근','전면삼각근',NULL,'uploads/images/덤벨디클라인프레스.PNG','가슴');

INSERT INTO `exercise` VALUES ('케이블크로스오버','하부대흉군',NULL,NULL,'삼두근','전면삼각근',NULL,'uploads/images/케이블크로스오버.PNG','가슴');

INSERT INTO `exercise` VALUES ('딥스','하부대흉근',NULL,NULL,'전면삼각근','삼두근',NULL,'uploads/images/딥스.PNG','가슴');

INSERT INTO `exercise` VALUES ('바벨슈러그','승모근',NULL,NULL,'견갑거근','삼각근',NULL,'uploads/images/바벨슈러그.PNG','등');

INSERT INTO `exercise` VALUES ('덤벨슈러그','승모근',NULL,NULL,'견갑거근','삼각근',NULL,'uploads/images/덤벨슈러그.PNG','등');

INSERT INTO `exercise` VALUES ('머신업라이트로우','승모근','삼각근',NULL,'견갑거근','척추기립근',NULL,'uploads/images/머신업라이트로우.PNG','등');

INSERT INTO `exercise` VALUES ('케이블시티드로우','승모근','광배근',NULL,'능형근','삼각근',NULL,'uploads/images/케이블시티드로우.PNG','등');

INSERT INTO `exercise` VALUES ('와이드그립풀다운','광배근',NULL,NULL,'삼각근','승모근','능형근','uploads/images/와이드그립풀다운.PNG','등');

INSERT INTO `exercise` VALUES ('크로스그립풀다운','광배근',NULL,NULL,'삼각근','승모근','능형근','uploads/images/크로스그립풀다운.PNG','등');

INSERT INTO `exercise` VALUES ('와이드그립풀업','광배근',NULL,NULL,'삼각근','승모근','능형근','uploads/images/와이드그립풀업.PNG','등');

INSERT INTO `exercise` VALUES ('바벨로우','광배근',NULL,NULL,'삼각근','승모근','척추기립근','uploads/images/바벨로우.PNG','등');

INSERT INTO `exercise` VALUES ('덤벨로우','광배근',NULL,NULL,'능형근','상완삼두근','척추기립근','uploads/images/바벨로우.PNG','등');

INSERT INTO `exercise` VALUES ('머신로우','광배근',NULL,NULL,'삼각근','승모근','능형근','uploads/images/머신로우.PNG','등');


INSERT INTO `exercise` VALUES ('럼바익스텐션','척추기립근',NULL,NULL,'대둔근','햄스트링',NULL,'uploads/images/럼바익스텐션.PNG','등');


INSERT INTO `exercise` VALUES ('데드리프트','척추기립근','대둔근','햄스트링','광배근','대퇴사두근군','전완근','uploads/images/데드리프트.PNG','등');


INSERT INTO `exercise` VALUES ('머신데드리프트','척추기립근','대둔근','햄스트링','광배근','대퇴사두근군','승모근','uploads/images/머신데드리프트.PNG','등');


INSERT INTO `exercise` VALUES ('굿모닝','척추기립근',NULL,NULL,'광배근','대퇴사두근군','햄스트링','uploads/images/굿모닝.PNG','등');


INSERT INTO `exercise` VALUES ('바벨컬','상완이두근',NULL,NULL,'상완근','삼각근','전완근','uploads/images/바벨컬.PNG','팔');

INSERT INTO `exercise` VALUES ('덤벨컬','상완이두근',NULL,NULL,'상완근','상완요골근','전완근','uploads/images/덤벨컬.PNG','팔');

INSERT INTO `exercise` VALUES ('케이블컬','상완이두근',NULL,NULL,'상완근','삼각근','전완근','uploads/images/케이블컬.PNG','팔');

INSERT INTO `exercise` VALUES ('바벨프리쳐컬','상완이두근',NULL,NULL,'상완근','삼각근','전완근','uploads/images/바벨프리쳐컬.PNG','팔');

INSERT INTO `exercise` VALUES ('덤벨프리쳐컬','상완이두근',NULL,NULL,'상완근','삼각근','전완근','uploads/images/덤벨프리쳐컬.PNG','팔');

INSERT INTO `exercise` VALUES ('머신컬','상완이두근',NULL,NULL,'상완근','삼각근','전완근','uploads/images/머신컬.PNG','팔');


INSERT INTO `exercise` VALUES ('트라이셉스푸시다운','상완삼두근',NULL,NULL,NULL,'삼각근','전완근','uploads/images/트라이셉스푸시다운.PNG','팔');

INSERT INTO `exercise` VALUES ('라잉트라이셉스익스텐션','상완삼두근',NULL,NULL,'대흉근','삼각근','전완근','uploads/images/라잉트라이셉스익스텐션.PNG','팔');


INSERT INTO `exercise` VALUES ('바벨시티드트라이셉스프레스','상완삼두근',NULL,NULL,'대흉근',NULL,'전완근','uploads/images/바벨시티드트라이셉스프레스.PNG','팔');


INSERT INTO `exercise` VALUES ('덤벨시티드트라이셉스프레스','상완삼두근',NULL,NULL,'대흉근',NULL,'전완근','uploads/images/덤벨시티드트라이셉스프레스.PNG','팔');

INSERT INTO `exercise` VALUES ('크로스그립벤치프레스','상완삼두근','대흉근',NULL,NULL,NULL,NULL,'uploads/images/크로스그립벤치프레스.PNG','팔');

INSERT INTO `exercise` VALUES ('덤벨킥백','상완삼두근',NULL,NULL,'삼각근','광배근',NULL,'uploads/images/덤벨킥백.PNG','팔');


INSERT INTO `exercise` VALUES ('리스트컬','장장근','요측수근굴근','척측수근굴근','천지굴근','심지굴근','장무지굴근','uploads/images/리스트컬.PNG','팔');

INSERT INTO `exercise` VALUES ('바벨스탠딩리얼리스트컬','장장근','요측수근굴근','척측수근굴근','천지굴근','심지굴근','장무지굴근','uploads/images/바벨스탠딩리얼리스트컬.PNG','팔');


INSERT INTO `exercise` VALUES ('리버스리스트컬','장요측수근신근','단요측수근신근','척측수근신근','지신근','장무지신근','단무지신근','uploads/images/리버스리스트컬.PNG','팔');

INSERT INTO `exercise` VALUES ('바벨리버스컬','장요측수근신근','단요측수근신근','척측수근신근','지신근','장무지신근','단무지신근','uploads/images/바벨리버스컬.PNG','팔');


INSERT INTO `exercise` VALUES ('햄머컬','상완요골근',NULL,NULL,'상완근','장요측수근신근','단요측수근신근','uploads/images/햄머컬.PNG','팔');


INSERT INTO `exercise` VALUES ('레그익스텐션','대퇴사두근군',NULL,NULL,'전경골근',NULL,NULL,'uploads/images/레그익스텐션.PNG','다리');

INSERT INTO `exercise` VALUES ('바벨스쿼트','대퇴사두근군','대둔근',NULL,'햄스트링','박근','복근','uploads/images/바벨스쿼트.PNG','다리');


INSERT INTO `exercise` VALUES ('머신스쿼트','대퇴사두근군','대둔근',NULL,'햄스트링','대퇴막장근','척추기립근','uploads/images/머신스쿼트.PNG','다리');


INSERT INTO `exercise` VALUES ('레그프레스','대퇴사두근군',NULL,NULL,'대둔근','햄스트링','내전근','uploads/images/레그프레스.PNG','다리');

INSERT INTO `exercise` VALUES ('핵스쿼트','대퇴사두근군',NULL,NULL,'대둔근','햄스트링','내전근','uploads/images/핵스쿼트.PNG','다리');


INSERT INTO `exercise` VALUES ('런지','대퇴사두근군','대둔근',NULL,'박근','햄스트링','내전근','uploads/images/런지.PNG','다리');

INSERT INTO `exercise` VALUES ('라잉레그컬','햄스트링',NULL,NULL,'대둔근','비복근',NULL,'uploads/images/라잉레그컬.PNG','다리');

INSERT INTO `exercise` VALUES ('스탠딩레그컬','햄스트링',NULL,NULL,'대둔근','비복근',NULL,'uploads/images/스텐딩레그컬.PNG','다리');


INSERT INTO `exercise` VALUES ('바벨스티프레그드데드리프트','햄스트링',NULL,NULL,'척추기립근','사두근',NULL,'uploads/images/바벨스티프레그드데드리프트.PNG','다리');


INSERT INTO `exercise` VALUES ('덤벨스티프레그드데드리프트','햄스트링',NULL,NULL,'척추기립근','사두근',NULL,'uploads/images/덤벨스티프레그드데드리프트.PNG','다리');


INSERT INTO `exercise` VALUES ('스탠딩카프레이즈','비복근',NULL,NULL,'넙치근',NULL,NULL,'uploads/images/라잉레그컬.PNG','다리');

INSERT INTO `exercise` VALUES ('덤벨원레그카프레이즈','비복근',NULL,NULL,'넙치근',NULL,NULL,'uploads/images/덤벨원레그카프레이즈.PNG','다리');

INSERT INTO `exercise` VALUES ('덩키카프레이즈','비복근',NULL,NULL,'넙치근',NULL,NULL,'uploads/images/덩키카프레이즈.PNG','다리');

INSERT INTO `exercise` VALUES ('머신카프레이즈','비복근',NULL,NULL,'넙치근',NULL,NULL,'uploads/images/머신카프레이즈.PNG','다리');

INSERT INTO `exercise` VALUES ('시티드카프레이즈','넙치근',NULL,NULL,'비복근',NULL,NULL,'uploads/images/시티드카프레이즈.PNG','다리');



INSERT INTO `exercise` VALUES ('싯업','복직근',NULL,NULL,'대퇴사두근군','엉덩이굴근',NULL,'uploads/images/싯업.PNG','복근');

INSERT INTO `exercise` VALUES ('크런치','복직근',NULL,NULL,'외복사근','내복사근',NULL,'uploads/images/그런치.PNG','복근');

INSERT INTO `exercise` VALUES ('로프크런치','복직근',NULL,NULL,'외복사근','내복사근','전거근','uploads/images/로프크런치.PNG','복근');

INSERT INTO `exercise` VALUES ('머신크런치','복직근',NULL,NULL,'외복사근','내복사근','전거근','uploads/images/머신크런치.PNG','복근');


INSERT INTO `exercise` VALUES ('시티드싯업','복직근','외복사근','내복사근','대퇴사두근군','엉덩이굴근',NULL,'uploads/images/시티드싯업.PNG','복근');


INSERT INTO `exercise` VALUES ('인클라인레그레이즈','복직근',NULL,NULL,'외복사근','내복사근','대퇴직근','uploads/images/인클라인레그레이즈.PNG','복근');


INSERT INTO `exercise` VALUES ('행잉레그레이즈','복직근',NULL,NULL,'외복사근','내복사근','장요근','uploads/images/행잉레그레이즈.PNG','복근');

INSERT INTO `exercise` VALUES ('니업','복직근',NULL,NULL,'외복사근','내복사근','장요근','uploads/images/니업.PNG','복근');

INSERT INTO `exercise` VALUES ('리버스크런치','복직근',NULL,NULL,'외복사근','내복사근','엉덩이굴근','uploads/images/리버스크런치.PNG','복근');

INSERT INTO `exercise` VALUES ('스트레이트레그싯업','복직근',NULL,NULL,'외복사근','내복사근','엉덩이굴근','uploads/images/스트레이트레그싯업.PNG','복근');

INSERT INTO `exercise` VALUES ('트위스팅싯업','복직근','외복사근','내복사근','전거근',NULL,'엉덩이굴근','uploads/images/트위스팅싯업.PNG','복근');

INSERT INTO `exercise` VALUES ('오블리크런치','복직근','외복사근','내복사근','전거근',NULL,NULL,'uploads/images/오블리크런치.PNG','복근');

INSERT INTO `exercise` VALUES ('케이블오블리크런치','전거근','외복사근','내복사근','복직근',NULL,NULL,'uploads/images/케이블오블리크런치.PNG','복근');

INSERT INTO `exercise` VALUES ('덤벨사이드벤드','전거근','외복사근','내복사근','복직근',NULL,'요방형근','uploads/images/덤벨사이드벤드.PNG','복근');

INSERT INTO `exercise` VALUES ('케이블사이드벤드','전거근','외복사근','내복사근','복직근',NULL,'요방형근','uploads/images/케이블사이드벤드.PNG','복근');

INSERT INTO `exercise` VALUES ('덤벨풀오버','전거근','늑간근','광배근','대흉근','소흉근','상완삼두근','uploads/images/덤벨풀오버.PNG','복근');

=================================  food  ============================================

INSERT INTO `food` VALUES ('바나나','http://172.20.10.2:3000/public/uploads/images/바나나.jpg');

INSERT INTO `food` VALUES ('계란','http://172.20.10.2:3000/public/uploads/images/계란.jpg');

INSERT INTO `food` VALUES ('샌드위치','http://172.20.10.2:3000/public/uploads/images/샌드위치.jpg');

INSERT INTO `food` VALUES ('닭가슴살','http://172.20.10.2:3000/public/uploads/images/닭가슴살.jpg');

INSERT INTO `food` VALUES ('두부','http://172.20.10.2:3000/public/uploads/images/두부.jpg');

INSERT INTO `food` VALUES ('오이','http://172.20.10.2:3000/public/uploads/images/오이.jpg');


INSERT INTO `food` VALUES ('연어','http://172.20.10.2:3000/public/uploads/images/연어.jpg');


INSERT INTO `food` VALUES ('샐러드','http://172.20.10.2:3000/public/uploads/images/샐러드.jpg');


INSERT INTO `food` VALUES ('방울토마토','http://172.20.10.2:3000/public/uploads/images/방울토마토.jpg');

INSERT INTO `food` VALUES ('당근','http://172.20.10.2:3000/public/uploads/images/당근.jpg');

INSERT INTO `food` VALUES ('양상추','http://172.20.10.2:3000/public/uploads/images/양상추.jpg');


INSERT INTO `food` VALUES ('고구마','http://172.20.10.2:3000/public/uploads/images/고구마.jpg');


INSERT INTO `food` VALUES ('감자','http://172.20.10.2:3000/public/uploads/images/감자.jpg');

INSERT INTO `food` VALUES ('아몬드','http://172.20.10.2:3000/public/uploads/images/아몬드.jpg');


INSERT INTO `food` VALUES ('버섯','http://172.20.10.2:3000/public/uploads/images/버섯.jpg');

INSERT INTO `food` VALUES ('콩','http://172.20.10.2:3000/public/uploads/images/콩.jpg');


INSERT INTO `food` VALUES ('사과','http://172.20.10.2:3000/public/uploads/images/사과.jpg');

INSERT INTO `food` VALUES ('토마토','http://172.20.10.2:3000/public/uploads/images/토마토.png');


INSERT INTO `food` VALUES ('아보카도','http://172.20.10.2:3000/public/uploads/images/아보카도.jpg');

INSERT INTO `food` VALUES ('빵','http://172.20.10.2:3000/public/uploads/images/빵.jpg');


INSERT INTO `food` VALUES ('자몽','http://172.20.10.2:3000/public/uploads/images/자몽.png');

INSERT INTO `food` VALUES ('잡곡밥','http://172.20.10.2:3000/public/uploads/images/잡곡밥.jpg');

INSERT INTO `food` VALUES ('콩밥','http://172.20.10.2:3000/public/uploads/images/콩밥.jpg');

INSERT INTO `food` VALUES ('현미밥','http://172.20.10.2:3000/public/uploads/images/현미밥.jpg');

INSERT INTO `food` VALUES ('보리밥','http://172.20.10.2:3000/public/uploads/images/보리밥.jpg');

INSERT INTO `food` VALUES ('귀리','http://172.20.10.2:3000/public/uploads/images/귀리.jpg');

INSERT INTO `food` VALUES ('브로콜리','http://172.20.10.2:3000/public/uploads/images/브로콜리.jpg');

INSERT INTO `food` VALUES ('호두','http://172.20.10.2:3000/public/uploads/images/호두.jpg');

INSERT INTO `food` VALUES ('피망','http://172.20.10.2:3000/public/uploads/images/피망.jpg');

INSERT INTO `food` VALUES ('김밥','http://172.20.10.2:3000/public/uploads/images/김밥.jpg');

INSERT INTO `food` VALUES ('우유','http://172.20.10.2:3000/public/uploads/images/우유.jpg');

INSERT INTO `food` VALUES ('빵','http://172.20.10.2:3000/public/uploads/images/빵.jpg');

INSERT INTO `food` VALUES ('말린고구마','http://172.20.10.2:3000/public/uploads/images/말린고구마.jpg');

INSERT INTO `food` VALUES ('포도','http://172.20.10.2:3000/public/uploads/images/포도.jpg');

INSERT INTO `food` VALUES ('배','http://172.20.10.2:3000/public/uploads/images/배.jpg');

INSERT INTO `food` VALUES ('딸기','http://172.20.10.2:3000/public/uploads/images/딸기.jpg');

INSERT INTO `food` VALUES ('콩나물','http://172.20.10.2:3000/public/uploads/images/콩나물.jpg');

INSERT INTO `food` VALUES ('파프리카','http://172.20.10.2:3000/public/uploads/images/파프리카.jpg');

INSERT INTO `food` VALUES ('가지','http://172.20.10.2:3000/public/uploads/images/가지.jpg');

INSERT INTO `food` VALUES ('비빔밥','http://172.20.10.2:3000/public/uploads/images/비빔밥.jpg');

INSERT INTO `food` VALUES ('소고기','http://172.20.10.2:3000/public/uploads/images/소고기.jpg');