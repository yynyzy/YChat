export default {
	//首页时间转化
	dateTime(e) {
		let old = new Date(e);
		let now = new Date();
		//获取old具体时间
		// let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth() + 1;
		let D = old.getDate();
		//获取now具体时间
		let nd = now.getTime();
		let nh = now.getHours();
		let n = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth() + 1;
		let nD = now.getDate();

		//当天时间
		if (D === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return h + ":" + m
		}
		//前天时间
		if (D + 1 === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return "前天" + h + ":" + m
		} else {
			//大于两天
			return Y + "/" + M + "/" + D
		}
	},
	dateTime1(e) {
		let old = new Date(e);
		let now = new Date();
		//获取old具体时间
		// let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth() + 1;
		let D = old.getDate();
		//获取now具体时间
		let nd = now.getTime();
		let nh = now.getHours();
		let n = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth() + 1;
		let nD = now.getDate();

		//当天时间
		if (D === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return h + ":" + m
		}
		//左天时间
		if (D + 1 === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return "昨天" + h + ":" + m
		} else if
		// 今年
		(Y === nY) {
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return M + "月" + D + "日" + h + ":" + m
		} else {
			//大于今年
			if (h < 10) {
				h = '0' + h;
			}
			if (m < 10) {
				m = '0' + m;
			}
			return Y + "" + M + "月" + D + "日" + h + ":" + m
		}
	},
	spaceTime(old, now) {
		old = new Date(old)
		now = new Date(now)
		var told = old.getTime()
		var tnow = now.getTime()
		if (told > (tnow + 1000 * 60 * 5)) {
			return now
		} else {
			return ''
		}
	},
	detailTime(e) {
		let old = new Date(e);
		let now = new Date();
		//获取old具体时间
		// let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth() + 1;
		let D = old.getDate();
		//获取now具体时间
		let nd = now.getTime();
		let nh = now.getHours();
		let n = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth() + 1;
		let nD = now.getDate();
		if (M < 10) {
			M = '0' + M
		}
		if (D < 10) {
			D = '0' + D
		}
		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		return Y + '-' + M + '-' + D + " " + h + ":" + m
	},
	debounce(fn, delay = 500) {
		let timer = null
		return function() {
			let args = [...arguments]
			let that =this
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				fn.apply(that,args)
				timer=null
			}, delay)
		}
	},
	paixu(arr,obj,tip){
		var s;
		if(tip==0){
			for(let i =1;i<arr.length;i++){
				for(let j=i;j>0;j--){
					if(arr[j][obj]>arr[j-1][obj]){
						s=arr[j]
						arr[j]=arr[j-1]
						arr[j-1]=s
					}
				}
			}
		}else if(tip==1){
			for(let i =1;i<arr.length;i++){
				for(let j=i;j>0;j--){
					if(arr[j][obj]<arr[j-1][obj]){
						s=arr[j]
						arr[j]=arr[j-1]
						arr[j-1]=s
					}
				}
			}
		}
		return arr
	}


}
