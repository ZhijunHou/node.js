var teacher = require("./teacher.js")
var student = require("./student.js")

function add(teacherName, students){
	teacher.add(teacherName);

	students.forEach(function(item,index){
		student.add(item);
	})
}


exports.add = add;
