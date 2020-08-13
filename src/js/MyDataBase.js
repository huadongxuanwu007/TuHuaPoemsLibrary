var dbConfig = require('./db.config');
var mysql = require('mysql');


module.exports = {
	query: function(sql, callback) {
		//每次使用的时候需要创建链接，数据操作完成之后要关闭连接
		const Config = mysql.createPool( dbConfig);
		Config.getConnection(function(err, conn) {
			if (err) {
				callback(err, null, null);
			} else {
				conn.query(sql, values, function(err, results, fields) {
					//释放连接
					//conn.release();
					//事件驱动回调
					callback(err, results, fields);
				});

				Config.releaseConnection(conn);
			}
		});
	}
};

// const pool = mysql.createPool({
//   host     : 'rm-0xwymaoz.mysql.rds.aliyuncs.com',
//   user     : 'tuhua_qiniu',
//   password : 'Cellpark$2013',
//   database : 'db_tuhua'
// })

// let query = function(sql,values,callback){
//   pool.getConnection(function(err,conn){
//     if(err){
//       callback(err,null,null);
//     }else{
//       conn.query(sql,values,function(err,results,fields){
//         //释放连接
//         //conn.release();
//         //事件驱动回调
//         callback(err,results,fields);
//       });

//       pool.releaseConnection(conn);
//     }
//   });
// };


// module.exports=query;


// var sql='select * from tdesk_travel order by tid desc limit 0,10';
// //var sql='select * from hi_test where groupid=1';
// console.log('sql语句',sql);
// query(sql,function (err,res,fields) {
// console.log('sql操作返回：', res);
// if(res!=null){
//   // ws.send(JSON.stringify(res));
// }
// });
