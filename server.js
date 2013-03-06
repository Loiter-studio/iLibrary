var wechat = require('wechat'),
		http = require('http'),
		iconv = require('iconv-lite'),
		url = require('url'),
		$ = require('jquery'),
		S = require('string');

		
var options = {  
    host: '202.116.64.108',  
    port: 8991,  
    path: '/F?func=find-b&request=' ,
};
function fetch(book_name, res){
	options.path = options.path + book_name;
	
	var html = '';  
	http.get(options, function(res) {  
		res.on('data', function(data) {  
				// collect the data chunks to the variable named "html"  
				html += data;  
		}).on('end', function() {
				// the whole of webpage data has been collected. parsing time!  
				var title = $(html).find("td.col2").each(function(){
					console.log($(this).children('.itemtitle').text());
					var str = $(this).children('table').text().split('\n');
					str = str[6].split("',this)");
					str = str[0]; 
					str = S(str).replaceAll("  ", "").s;
					str = S(str).replaceAll("[0_9]南校区", "\n南校区").s;
					res.reply(str);
					//return str;
				});
		 });  
	});
}

app.use(connect.query());
app.use('/wechat', wechat('iLibrary', wechat.text(function (message, req, res, next) {
	fetch(message.Content, res);
}	




/**
var html = "";
var getURL = url.parse('http://202.116.64.108:8991/F?func=find-b&request=python');

var req = http.get(getURL, function (res) {
    res.setEncoding('binary');//or hex
    res.on('data',function (data) {//加载数据,一般会执行多次
        html += data;
    }).on('end', function () {
            var buf=new Buffer(html,'binary');//这一步不可省略
            var str=iconv.decode(buf, 'utf8');//将GBK编码的字符转换成utf8的
            console.log(str);
        })
		}).on('error', function(err) {
				console.log("http get error:",err);
		});
*/