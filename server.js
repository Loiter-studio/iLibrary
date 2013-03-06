var wechat = require('wechat'),
		http = require('http'),
		iconv = require('iconv-lite'),
		url = require('url'),
		$ = require('jquery'),
		S = require('string'),
		connect = require('connect');
		
var app = connect();
var options = {  
    host: '202.116.64.108',  
    port: 8991,  
    path: '/F?func=find-b&request=' ,
};

function fetch(book_name, res){
	var _res = res;
	options.path = options.path + book_name;
	var rlt = "";
	
	var html = '';  
	http.get(options, function(res) {  
		res.on('data', function(data) {  
				html += data;  
		}).on('end', function() {
				var title = $(html).find("td.col2").each(function(){
					var name = $(this).children('.itemtitle').text();
					var str = $(this).children('table').text().split('\n');
					str = str[6].split("',this)");
					str = str[0]; 
					str = S(str).replaceAll("  ", "").s;
					
					str = name + "\n" + str;
					rlt = rlt + name + "\n";
					console.log(rlt);
					options.path = "/F?func=find-b&request=";
				});
				_res.reply(rlt);
		 });  
	});
}

app.use(connect.query());
app.use('/wechat', wechat('iLibrary', wechat.text(function (message, req, res, next) {
			fetch(message.Content, res);
		})
	)
);
app.listen(3000);
console.log("listen 3000");
