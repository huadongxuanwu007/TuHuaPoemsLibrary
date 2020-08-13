export default {
	isEmpty(obj) {
		if (typeof obj == "undefined" || obj == null || obj == "") {
			return true;
		} else {
			return false;
		}
	},
	NumberFormat(a) {
		var res;
		if (a >= 100000) {
			var b = Math.floor(a / 10000);
			res = b + "万+";
		} else if (a >= 10000) {
			var b = Math.floor(a / 10000);
			var c = Math.ceil((a % 10000) / 1000);
			res = b + "." + c + "万+";
		} else if (a >= 1000) {
			var b = Math.floor(a / 1000);
			var c = Math.ceil((a % 1000) / 100);
			res = b + "." + c + "千+";
		} else {
			res = a.toString();
		}
		return res;
	},
	format(str) {
		for (var i = 1; i < arguments.length; i++) {
			var parent = "\\{" + (i - 1) + "\\}";
			var reg = new RegExp(parent, "g")
			str = str.replace(reg, arguments[i]);
		}
		return str;
	},
	addDateTimeStamp(days) {

		return new Date(addDays(days)).getTime() / 1000;
	},
	addDays(days) {
		var d = new Date();
		d.setMilliseconds(d.getMilliseconds() + (days * 24 * 60 * 60 * 1000));
		var month = d.getMonth() + 1;
		var day = d.getDate();
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		var val = d.getFullYear() + "-" + month + "-" + day;

		return val;
	},
	getSumFromArray(data, j) {
		let sum = 0;
		for (let i = 1; i < j; i++) {
			sum += parseInt(data[i]);
		}
		return sum
	},

	// 对Date的扩展，将 Date 转化为指定格式的String   
	// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
	// 例子：   
	// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18   
	dateFormat(fmt) { //author: meizz   

		return String.Format("{0}月{1}日", fmt.substring(4, 6), fmt.substring(6, 8));
	},
	clone(Obj) {
		var buf;
		if (Obj instanceof Array) {
			buf = [];
			var i = Obj.length;
			while (i--) {
				buf[i] = this.clone(Obj[i]);
			}
			return buf;
		} else if (Obj instanceof Object) {
			buf = {};
			for (var k in Obj) {
				buf[k] = this.clone(Obj[k]);
			}
			return buf;
		} else {
			return Obj;
		}
	},

};
