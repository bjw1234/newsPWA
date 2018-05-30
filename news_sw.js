const VERSION = 'news-1.0.0';
const fileList = [
	'./css/reset.css',
	'./css/main.css',
	'./images/news.png',
	'./images/back.png',
	'./images/0.jpg',
	'./images/1.jpg',
	'./images/2.jpg',
	'./images/3.jpg',
	'./images/4.jpg',
	'./images/news-144.png',
	'./data/latest.json',
	'./article.html',
	'./js/main.js',
	'./js/article.js'
];

// 安装事件
self.addEventListener('install',event => {
	console.log('sw is installing');
	 event.waitUntil(self.skipWaiting());
	event.waitUntil(
		caches.open(VERSION).then(cache =>{
			return cache.addAll(fileList);
		})
	);
});

// 缓存更新
self.addEventListener('activate', event => {
	self.clients.claim();
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					// 如果当前版本和缓存版本不一致
					if (cacheName !== VERSION) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// 网络请求
self.addEventListener('fetch',event => {
	console.log(`request URL： ${event.request.url}`);
	event.respondWith(
		caches.match(event.request, { ignoreSearch: true }).then(response => {
			// 缓存中获取
			if(response){ return response; }
			// 请求服务器
			let requestToCache = event.request.clone();
			return fetch(requestToCache).then(response => {
				// 出错
				if(!response || response.status !==200){
					return response;
				}
				// response ok
				let responseToCache = response.clone();
				caches.open(VERSION).then(cache => {
					// 添加到缓存列表
					cache.put(requestToCache,responseToCache);
				});
				return response;
			});
		})
	);
});

