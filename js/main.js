const url = './data/latest.json';

const main = document.getElementById('main');

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
		buildWebPage(data.latestNews);
	});
}

// 构建web页面
function buildWebPage(data){
	let mainHTML = '';
	if(data && data.length > 0){
		data.forEach((item,index) => {
			mainHTML += buildNewsItem(item);
		});
		main.innerHTML = mainHTML;
	}
}

// 构建item
function buildNewsItem(item){
	if(item){
		// item模板
		const itemTemplate = `<a class="main-item clearfix" href="./article.html?id=${item.id}">
								<img class="main-item-img" src="${item.image}">
								<div class="main-item-text">
									<p class="main-item-title">${item.title}</p>
									<p class="main-item-desc">${item.desc}</p>
									<div class="main-item-bottom">
										<span class="main-item-type">${item.type}</span>
										<span class="main-item-time">${item.time}</span>
										<span class="main-item-read">${item.read}</span>
									</div>
								</div>			
							</a>`;
		return itemTemplate;
	}
	return '';
}


// 开始-请求数据
requestData(url);







