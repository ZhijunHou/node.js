var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./models/movie')
var _ = require('underscore')


var port = process.env.PORT || 3000;
 
var app = express();
 
var dir = path.join(__dirname, './views/pages/');

// mongoose.connect('mongodb://localhost:27017/imooc');


mongoose.connect('mongodb://127.0.0.1:27017/imooc', { useMongoClient: true })

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb connect error !'))

db.once('open', function() {

    console.log('Mongodb started !')

})

// 使用html模板，需增加  app.engine('html', require('ejs').__express);使用EJS或jade模板，不用配置该项。
 
app.set('views', dir);// 设置模板相对路径(相对当前目录)
app.set('view engine', 'pug');// 设置模板引擎
 

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json());
app.locals.moment=require('moment');
 
/*通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaS cript 文件等。
将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
注意：express 4.x版本之后值保留了express.static这个方法，其他方法都分为中间件另外安装引入
*/
//app.use(express.static(path.join(__dirname, 'bower_components')));
var serveStatic = require('serve-static')

app.use(serveStatic('public'))
// 首页 分割线
app.get('/', function(req, res){

  Movie.fetch(function(err,movies){
    if(err) console.log(err);

    res.render('index', {// 调用当前路径下的 test.jade 模板
    title: '电影网站首页',
    movies: movies,
  });

  })
});
 
// 详情页
app.get('/movie/:id', function(req, res){
var id = req.params.id;
Movie.findById(id,function(err,movie){
   res.render('detail', {
    title: '详情页'+movie.title,
    movie: movie
  });
  })
});

// 后台录入页
app.get('/admin/movie', (req, res)=>{
  res.render('admin', {
    title: '电影录入',
    movie: {
      title: '',
      director: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});
 
app.get('/admin/update/:id',function(req,res){
  var id = req.params.id;
  Movie.findById(id,function(err,movie){
    if(err) console.log(err);
    res.render('admin',{
    title: '电影更新',
    movie: movie
    })
  })
})

app.post('/admin/movie/new',function(req,res){
  var movieObj = req.body.movie
  var _movie
   // var id = req.body.movie._id
   if(req.body.movie._id){
     var id = req.body.movie._id
      Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err)
      }
 
      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err)
        }
 
        res.redirect('/movie/' + movie._id)
      })
    })
   }else{
    _movie = new Movie({
      director: movieObj.director,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })
 
    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }
 
      res.redirect('/movie/' + movie._id)
    })
   }

})

app.delete('/admin/list',function(req,res){
  if(req.query.id){
    var id = req.query.id;
    Movie.remove({_id:id},function(err){
      if(err) console.log(err)
      else{
        res.json({success:1});
      }
    })
  }
})

// 列表页
app.get('/admin/list', function(req, res){
  Movie.fetch(function(err,movies){
    if(err) console.log(err)
    res.render('list', {
    title: '电影列表',
    movies: movies
  });
  })
 
});
 
app.listen(port)
console.log('Servet started on port ' + port)
