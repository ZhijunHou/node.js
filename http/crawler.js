var cheerio = require('cheerio')

var http = require('http')

var url = 'http://www.imooc.com/learn/348'

function htmlFilter(html){

	var $ = cheerio.load(html);
	var chapter = $(".chapter")
	var courseData = []

	chapter.each(function(){
		var chapterTitle = $(this).find('strong').text().trim().split("\n")[0]
		var videos = $(this).find(".video").find("li")

		var chapterItem = {chapterTitle:chapterTitle,videos:[]}
		videos.each(function(){
			var vedio = $(this).find('a')
			var vid = vedio.attr('href').split('video/')[1]
			var vCon =vedio.text().trim().split("\n")[0]+" "+vedio.text().trim().split("\n")[1].trim()
			chapterItem.videos.push({id:vid,title:vCon})
		})

		courseData.push(chapterItem)
	})

	return courseData
}


function printCourseData(courseData){

courseData.forEach(function(item){
	console.log(item.chapterTitle)

	item.videos.forEach(function(vedio){
		console.log("  ["+vedio.id+"]"+vedio.title+"\n")
	})
})

}

http.get(url,function(res){
	var html = ''
	res.on('data',function(data){
		html+=data
	})

	res.on('end',function(){
		var courseData = htmlFilter(html)

		printCourseData(courseData)
	})
}).on("error",function(){
	console.log('read Data error')
})