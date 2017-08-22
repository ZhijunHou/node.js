var http = require('http')

var querystring = require('querystring')

var postData = querystring.stringify({
	'comment_text':'老师威武',
	'cid':9
})

var options = {
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
'Accept-Encoding':'gzip, deflate',
'Accept-Language':'en-GB,zh;q=0.8,en;q=0.6,en-US;q=0.4',
'Cache-Control':'no-cache',
'Connection':'keep-alive',
'Content-Length': postData.length,
'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
'Cookie':'imooc_uuid=57009993-ff1d-446b-9aa3-da73fc6b789e; imooc_isnew_ct=1487343664; UM_distinctid=15d84c973bd57-09cef647f8889a-8383667-e1000-15d84c973be126; CNZZDATA1261110065=2083003644-1501169412-null%7C1501169412; loginstate=1; apsid=I3NmEzZjgxNGI1ODBlZDAwMDMzN2UzYTNkN2U0NDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTUyNTA1NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABob3V6aGlqdW45MzAyQGdtYWlsLmNvbQAAAAAAAAAAAGFiMDJjMTAxYjIwZGU5NDYwZGY0NDVhZGE5ZWE0OTA1Ue2BWVHtgVk%3DMT; last_login_username=houzhijun9302%40gmail.com; PHPSESSID=1rc8q52hrnaar9q40lpb7po7f0; IMCDNS=0; imooc_isnew=2; cvde=599c420c7ed22-21; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1503321314,1503326076,1503342471,1503412749; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1503414820',
'Host':'www.imooc.com',
'Origin':'http://www.imooc.com',
'Pragma':'no-cache',
'Referer':'http://www.imooc.com/comment/9',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
'X-Requested-With':'XMLHttpRequest'
	}

}

var req = http.request(options,function(res){
	console.log('statusCode: '+ res.statusCode)
	console.log('req headers: '+JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})

	res.on('end',function(){
		console.log('comment finished!')
	})

})

req.on('error',function(e){
	console.log("ERROR: "+e.message)
})
req.write(postData)
req.end()

