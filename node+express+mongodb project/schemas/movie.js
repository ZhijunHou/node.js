//引入mongoose工具模块
var mongoose = require('mongoose')

var schema = mongoose.Schema;

var ObjectId = schema.Types.ObjectId;
//定义一个movieSchema
var movieSchema = new schema({
	director:String,
	country:String,
	title:String,
	year:Number,
	poster:String,
	language:String,
	flash:String,
	summary:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

movieSchema.pre('save',function(next){
	//do something
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt=Date.now();
	}
	//next
	next();
})

movieSchema.statics = {
	    fetch:function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id})
            .exec(cb)
    }
}

module.exports = movieSchema;

