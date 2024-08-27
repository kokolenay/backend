<!-- <template>
<div>
	<div class="header">
	<div class="return">
		<img src="../../assets/背景框/ZS返回.png" alt="返回" width="15%" height="90%" />
	</div>
	<div class="title">新生报到数据看板</div>
	<div class="time">						
		<span class="hour" id="hour">10:52:11</span>
		<br />
		<span class="date" id="date">2024-8-23 星期五</span>
	</div>
	</div>
	<div class="container">
	<div class="left">
		<div class="Chart1" id="Chart1"></div>
		<div class="block1">
		<div class="block1_item">
			<p style="font-size: 35px;text-align: center;font-weight: 450;">床位已入住</p>
			<br />
			<p id="endBed" style="font-size: 60px;text-align: center;font-weight: 500;"></p>
		</div>
		<div class="block1_item">
			<p style="font-size: 35px;text-align: center;font-weight: 450;">床位剩余</p>
			<br />
			<p id="restBed" style="font-size: 60px;text-align: center;font-weight: 500;"></p>
		</div>
		<div class="block1_item">
			<p style="font-size: 35px;text-align: center;font-weight: 450;">床位总数</p>
			<br />
			<p id="Bed" style="font-size: 60px;text-align: center;font-weight: 500;"></p>
		</div>
		</div>
		<div class="Chart2" id="Chart2"></div>
	</div>
	
	<div class="middle">
		<div class="Chart3">
		<div class="C3_title" style="width: 100%;height: 10%;font-size: 30px;font-weight: 600;color:#1670b5;text-align: center;">报到完成率</div>
		<div id="Chart3" style="width: 100%;height: 90%;"></div>
		</div>
		<div class="block2">
		<div class="b2_item">
			<p style="font-size: 25px;margin: left 10px;font-weight: 400; line-height:30px;margin-top: 5px;">&nbsp;今日已报到:</p>
			<br />
			<p id="Check_today" style="font-size: 60px;text-align: center;font-weight: 500;"></p>
		</div>
		<div class="b2_item">
			<p style="font-size: 25px;margin: left 10px;font-weight: 400; line-height:30px;margin-top: 5px">&nbsp;当前批次已报到:</p>
			<br />
			<p id="Check_now" style="font-size: 60px;text-align: center;font-weight: 500;"></p>
		</div>
		</div>
		<div class="Chart4" id="Chart4"></div>
	</div>
	
	<div class="right">
		<div class="block3">
		<div class="b3_text">
			<div style="bwidth: 15%;height: 100%;">
			<img src="../../assets/背景框/日历1.png" style="width: 50px;height: 50px;text-align: center;margin-top: 10px;">
			</div>
			<div id="b3_text_item" style="width: 85%;height: 100%;">
			<p id="start" style="margin-left: 20px; height:100%; width: 60%; font-size: 32px;text-align: center;margin-top:10px;font-weight: 450;color: #fff ;letter-spacing: 3px">报到已开始：4天</p>
			<p id="rest" style="margin-left: 20px; height:100%; width: 50%; font-size: 32px;text-align: center;margin-top:10px;font-weight: 450;color: #fff ;letter-spacing: 3px">截止剩余：1天</p>
			</div>
		</div>
		<div class="b3_gender">
			<div class="gender_item" id="gender_title">新生性别分布</div>
			<div class="gender_item" id="gender_content">
			<div class="gender_item_item" id="female">
				<div style="width: 50%;height: 100%">
				<img src="../../assets/图标/女生.png" style="width:90px;height:90px;margin-top: 10px; float: right;">
				</div>
				<div id="female_data" style="width: 50%;height: 100%;">
				<br />
				<p style="color:#565656 ; font-size: 23px;text-align: center;letter-spacing: 1px;">女性占比</p>
				<br />
				<p id="gender_f" style="color:#565656 ; font-size: 30px; text-align: center;font-weight: 600;">40%</p>
				</div>
			</div>
			<div class="gender_item_item" id="male">
				<div style="width: 50%;height: 100%">
				<img src="../../assets/图标/男生.png" style="width:88px;height:88px;margin-top: 10px; float: right;">
				</div>
				<div style="width: 50%;height: 100%">
				<br />
				<p style="color:#565656 ; font-size: 23px;text-align: center;letter-spacing: 1px;">男性占比</p>
				<br />
				<p id="gender_m" style="color:#565656 ; font-size: 30px; text-align: center;font-weight: 600;">60%</p>
				</div>
			</div>
			</div>
		</div>
		</div>
		<div class="Chart5" id="Chart5"></div>
		<div class="Chart6" id="Chart6"></div>
	</div>
	</div>
</div>
</template>

<script>

export default {
	name: 'Dashboard',

	mounted() {
		// 获得今天报到人数
		this.axios.get("http://127.0.0.1:8081/user/countTime")
		.then((res) => {
			localStorage.setItem("CheckData", res.data.data.at(-1).num);
			document.getElementById("Check_today").innerHTML = parseInt(localStorage.getItem("CheckData"), 10) + " 人";
		})
		.catch((error) => {
			console.error("请求失败", error); // 添加错误处理
		});

		// 性别比例
		this.axios.get("http://127.0.0.1:8081/user/countGender")
		.then((res) => {
			const i = res.data.data[0].num + res.data.data[1].num;
			document.getElementById("gender_f").innerHTML = ((res.data.data[0].num * 100) / i).toFixed(1) + "%";
			document.getElementById("gender_m").innerHTML = ((res.data.data[1].num * 100) / i).toFixed(1) + "%";
		})
		.catch((error) => {
			console.error("请求失败", error); // 添加错误处理
		});
	}
	};
</script>

<style scoped>
/* 
定义css样式
*/
*{
margin: 0;  /* 外边距 */
padding: 0; /* 内边距 */
}
html,body{
height: 100%;
}

.header{
width:100%;
height: 6%;
background: #f7f7f7;
display: flex;
}
.container{
width: 100%;
height: 94%;
background: #e2eaf9;
margin-top: 5px;
display: flex;
}

/* header部分 */
.return{
width: 30%;
height: 100%;
background: #f7f7f7; /* 背景颜色可以根据需要调整 */
border-bottom: 5px solid; /* 设置底部边框 */
border-image: linear-gradient(to left, #3498db, #d2fffa); /* 渐变色 */
border-image-slice: 1; /* 应用边框渐变 */
color: #4c4c4c;
font-size: 20px;
font-weight: 500;
}


.title{

background: radial-gradient(circle, #3498db, #a5fffc); /* 设置从中心向外的渐变 */
border-radius: 15px;
width: 50%;
height: 100%;
color: #ffffff;
font-weight: 550;
font-size: 35px;
letter-spacing: 5px; /* 调整字间距 */
display: flex;
align-items: center;  /* 垂直居中 */
justify-content: center; /* 水平居中 */
border-bottom: 5px solid; /* 设置底部边框 */
border-color: #f7f7f7;
}


.time{
width: 30%;
height: 100%;
background: #f7f7f7; /* 背景颜色可以根据需要调整 */
border-bottom: 5px solid; /* 设置底部边框 */
border-image: linear-gradient(to left, #3498db, #d2fffa); /* 渐变色 */
border-image-slice: 1; /* 应用边框渐变 */
}
.hour{
color: #4c4c4c;
font-weight: 600;
font-size: 25px;
margin-left: 70%;
}
.date{
font-weight: 600;
color: #6f6f6f;
margin-left: 68%;

}



.left{
width: 37.5%;
height: 100%;
background: #e2eaf9;
display: flex;
flex-direction: column;
justify-content:space-around;
align-items: center;
}



.Chart1{
width: 98%;
height: 29%;
display: flex;
flex-direction: column;
background: #ffffff;
border-radius: 15px;
border: solid #3fa6cb 3px;
margin-right: 1%;
margin-left: 1%;
margin-top: 1%;

}




.block1{
width: 100%;
height: 20%;
margin: 5px;
background: #e2eaf9;
display: flex;
flex-direction: row;
border-radius: 15px;
}
.block1_item{
width: 49%;
height: 100%;
background: #5fbedd;
margin: 3px;
border-radius: 10px;
color: #fff;
}



.Chart2{
width: 98%;
height: 46%;
margin: 5px;
background: #ffffff;
border-radius: 15px;
border: solid #358fad 3px;
margin-right: 1%;
margin-left: 1%;
margin-top: 1%;
}


.middle{
width: 25%;
height: 100%;
background: #e2eaf9;
display: flex;
flex-direction: column;
}

.Chart3{

width: 98%;
height: 39%;
border-radius: 15px;
background: #fff;
margin: 5px;
display: flex;
flex-direction: column;
border: solid #358fad 3px;
margin-right: 1%;
margin-left: 1%;
margin-top: 1%;
}

.block2{
width: 100%;
height: 20%;
background: #e2eaf9;
margin: 5px;
display: flex;
flex-direction: row;
justify-content:space-around;
align-items: center;
}
.b2_item{
width: 49%;
height: 100%;
background: #59b0cf;
border-radius: 15px;
color: #fff;
}


.Chart4{
width: 98%;
height: 36.3%;
background: #fff;
border-radius: 15px;
border: solid #358fad 3px;
margin-right: 1%;
margin-left: 1%;
margin-top: 1%;
}


.right{
width: 37.5%;
height: 100%;
background: #e2eaf9;
display: flex;
flex-direction: column;
}

.block3{
width: 100%;
height: 30%;
background: #e2eaf9;
margin: 5px;
display: flex;
flex-direction: column;
}
.b3_text{
width: 98%;
height: 30%;
background: #59b0cf;
border-radius: 15px;
margin: 2px;
display: flex;
flex-direction: row;
margin-left: 1%;
}

.b3_gender{
width: 97%;
height: 69%;
background: #ffffff;
border-radius: 15px;
display: flex;
flex-direction: column;
border: solid #358fad 3px;
margin-right: 1%;
margin-left: 1%;
margin-top: 1%;

}
#gender_title{
width: 100%;
height: 20%;
font-size: 25px;
font-weight: 580;
color: #1670b5;
margin-left: 5px;
margin-top: 3px;
}

#b3_text_item{
display: flex;
flex-direction: row;
}
#gender_content{
width: 100%;
height: 80%;
display: flex;
flex-direction: row;

}


.gender_item_item{
width: 49%;
height: 100%;
border-radius: 15px;
}
#female{
background: #fff;
display: flex;
flex: row;
}

#male{

display: flex;
flex: row;
}



.Chart5{
width: 97%;
height: 34%;
background: #fff;
border-radius: 15px;
border: solid #358fad 3px;
margin-right: 1%;
margin-left: 1.8%;

}


.Chart6{
width: 97%;
height: 32%;
background: #fff;
border-radius: 15px;
border: solid #358fad 3px;
margin-right: 1%;
margin-left: 1.8%;
margin-top: 1%;
}

</style> -->
