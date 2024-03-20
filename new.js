calendar();
var remims = JSON.parse(localStorage.getItem("rem"));
remims = remims || {};
var nowEl = null;
var text = document.querySelector('#text');
var month = document.querySelector("#month");
var tds = document.querySelectorAll(".D");
for(var i = 0;i < tds.length;i++){
	tds[i].onclick = function(){
		if(this.innerHTML){
		text.innerHTML = remims[month.innerHTML+this.innerHTML]||'';
		this.style.backgroundColor = 'white';
		if(nowEl){
		if(nowEl.hasAttribute("hol")){
			nowEl.style.backgroundColor = "red";
		}else{
			nowEl.style.backgroundColor = "green";
		}};
		nowEl = this;
		}
	}
}
var save = document.querySelector("#save");
save.onclick = function(){
	remims[month.innerHTML+nowEl.innerHTML||'not'] = text.innerHTML;
}
window.onunload = function(){
	localStorage.setItem("rem",JSON.stringify(remims));
}

function calendar(){
var month = document.querySelector("#month");
var date = new Date();
var tds = document.getElementsByClassName('D');
var left = document.querySelector("#left");
var right = document.querySelector("#right");
var timer  = document.querySelector("#time");
var time = writeTime();

var Int =  setInterval(function(){
	var Time = new Date();
	if(Time.getMinutes()!=time.getMinutes()){
		writeTime();
	}
},100)


write(date);
draw();
left.onclick = function(){
	date.setMonth(date.getMonth()-1);
	clear();
	write(date);
	draw();
	
}
right.onclick = function(){
	date.setMonth(date.getMonth()+1);
	clear();
	write(date);
	draw();
}

function draw(){
	for(var i = 0;i < tds.length;i++){
		if(Number(tds[i].innerHTML)==0){
			continue;
		}else if(tds[i].hasAttribute("hol")){
			tds[i].style.backgroundColor = "red";
		}else{
			tds[i].style.backgroundColor = "green";
		}
	}
}
function write(date){
var months = ["January",'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
month.innerHTML = months[date.getMonth()]+date.getFullYear();
date.setDate(1);
var day = date.getDay();
var days = func(date.getMonth(),date.getFullYear());
var i = 1;
if(day == 0){
	day = 6;
}else{
	day = day-1;
}
var j = day+days;
for(day;day < j;day++){
	tds[day].innerHTML = i||1;
	i++;
}
}

function clear(){
	for(var i=0;i < tds.length;i++){
		tds[i].innerHTML = "";
		tds[i].style.backgroundColor = "white";
	}
}

function writeTime(){
	var date = new Date();
	timer.innerHTML = date.getHours()+":"+date.getMinutes();
	return date;
}





function func(a,y){
	if(a==0||a==2||a==4||a==6||a==7||a==9||a==11){
		return 31;
	}
	if( a==1 && y % 4 == 0)return 29;
	if(a == 1 && y % 4 != 0)return 28;
	return 30;
}
}

