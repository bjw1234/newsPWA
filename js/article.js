const backBtn = document.querySelector('.back');
const articleWrapper = document.getElementById('article');
const imgWrapper = document.querySelector('.article-header-img-wrapper');

// back
backBtn.addEventListener('click',event => {
	window.history.back();
});

// 根据url获取数据
function requestData(url) {
	fetch(url,{
		method:'GET'
	}).then(result => {
		if(result){
			return result.json();
		}
	}).then(data => {
		console.log(data);
		buildWebPage(data);
	});
}

function buildWebPage(data){
	if(data){
		if(data.image){
			let img = `<img class="article-img" src="${data.image}">`;
			imgWrapper.innerHTML = img;
		}
		if(data.title && data.content){
			let content = `<p class="title">${data.title}</p>
							 <p class="content">${data.content}</p>`;
			articleWrapper.innerHTML = content;				 
		}
	}
}

// 解析url
function queryParameter(url){
	let obj = {};
	url.replace(/([^?&=]+)=([^?&=]+)/g,($0,$1,$2) => {
		obj[$1] = $2;
	});
	return obj;
}


// 开始
let param = queryParameter(document.location.href);
if(param){
	let id = param.id || 0;
	console.log(id);
	let url = `./data/news${id}.json`;
	requestData(url);
}





