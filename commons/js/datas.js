export default {
	getFrinedLists: function() {
		let friendarr = [{
				id: 1,
				imgurl: 'four.png',
				tip: 2,
				name: "大海",
				time: new Date(),
				email: '1601530253@qq.com',
				news: ' TOP常常遇到文章标题列表布局排版时候,有的标题比较长显示不完,这个时候即又不想换行...'
			},
			{
				id: 2,
				imgurl: 'one.png',
				tip: 0,
				name: '山川',
				time: new Date(),
				email: '5301530253@qq.com',
				news: '版时候,有的标题比较长显示不完,这个时候即又不想换'
			}, {
				id: 3,
				imgurl: 'two.png',
				tip: 2,
				name: '小河流',
				time: new Date(),
				email: '4201530253@qq.com',
				news: '有的标题比较长显示不完,这个时'
			}, {
				id: 4,
				imgurl: 'four.png',
				tip: 2,
				name: "大海",
				time: new Date(),
				email: '4201530253@qq.com',
				news: ' TOP常常遇到文章标题列表布局排版时候,有的标题比较长显示不完,这个时候即又不想换行...'
			},
			{
				id: 5,
				imgurl: 'one.png',
				tip: 0,
				name: '山川',
				time: new Date(),
				email: '4201530253@qq.com',
				news: '版时候,有的标题比较长显示不完,这个时候即又不想换'
			}, {
				id: 6,
				imgurl: 'two.png',
				tip: 2,
				name: '小河流',
				time: new Date(),
				email: '4201530253@qq.com',
				news: '有的标题比较长显示不完,这个时'
			}, {
				id: 7,
				imgurl: 'four.png',
				tip: 2,
				name: "大海",
				time: new Date(),
				email: '4201530253@qq.com',
				news: ' TOP常常遇到文章标题列表布局排版时候,有的标题比较长显示不完,这个时候即又不想换行...'
			},
			{
				id: 8,
				imgurl: 'one.png',
				tip: 0,
				name: '山川',
				time: new Date(),
				email: '4201530253@qq.com',
				news: '版时候,有的标题比较长显示不完,这个时候即又不想换'
			}, {
				id: 9,
				imgurl: 'two.png',
				tip: 2,
				name: '小河流',
				time: new Date(),
				email:'4201530253@qq.com',
				news: '有的标题比较长显示不完,这个时'
			}, {
				id: 10,
				imgurl: 'four.png',
				tip: 2,
				name: "大海",
				time: new Date(),
				email:'4201530253@qq.com',
				news: ' TOP常常遇到文章标题列表布局排版时候,有的标题比较长显示不完,这个时候即又不想换行...'
			}
		]
		return friendarr
	},
	isFriend: function() {
		let isfriend = [{
			userid: 1,
			friend: 2
		}, {
			userid: 1,
			friend: 5
		}, {
			userid: 1,
			friend: 6
		}, {
			userid: 1,
			friend: 8
		}]
		return isfriend
	},
	message:function(){
		let msgs=[
			{
				id: 'a',
				imgurl: 'one.png',
				message:{
					voice:'b',
					time:20
				},
				tip: 5,
				types:2,
				time: new Date()
			},
			{
				id: 'b',
				imgurl: 'three.png',
				message:{
					voice:'a',
					time:60
				},
				tip: 6,
				types:2,
				time: new Date()
			},
			{
				id: 'a',
				imgurl: 'one.png',
				message:"TOP常常遇到文章标题列表布局排版时候,有的标题比较长显示不完,这个时候即又不想换行...",
				tip: 0,
				types:0,
				time: new Date()-1000
			},
			
			{
				id: 'a',
				imgurl: 'one.png',
				message:"TOP常常遇到文章标题列表布局排版时候,有的标题比较长显示不完,这个时候即又不想换行...",
				tip: 1,
				types:0,

				time: new Date()-1000*16
			},
			{
				id: 'b',
				imgurl: 'three.png',
				message:"one.png",
				tip: 2,
				types:1,
				time: new Date()-1000*32
			},
			{
				id: 'b',
				imgurl: 'three.png',
				message:"three.png",
				tip: 3,
				types:1,
				time: new Date()-10000000*50
			},
			{
				id: 'a',
				imgurl: 'one.png',
				message:"four.png",
				tip: 4,
				types:1,
				time: new Date()-10000*50
			}
			
		]
		return msgs
	}

}
