<template>
	<view class="content">
		<view class="top-bar">
			<view class="search-div">
				<image src="../../static/search/search.png" class="search-img"></image>
				<input type="search" class="search" placeholder="搜索用户/群" placeholder-style="color:#aaa;font-weight:400;"
					@input="search" />
			</view>
			<view class="top-bar-right">
				<view class="text" @tap="backOne">取消</view>
			</view>
		</view>
		<view class="main">
			<view class="search-user result">
				<view class="title" v-if="userarr.length>0">用户</view>
				<view class="list user" v-for="(item,index) in userarr" :key="index">
					<navigator :url="'../userHome/userHome?id='+item._id" hover-class="none">
						<image :src="item.imgurl"></image>
					</navigator>
					<view class=" names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="right-bt send" v-if="item.tip==1">发消息</view>
					<view class="right-bt add" v-if="item.tip==0" @tap="addFriendBtn(item._id)">加好友</view>
				</view>
			</view>
			<view class="modify" :style="{bottom:-+widHeight+'px'}" :animation="animationData">
				<view class="modify-header">
					<view class="close" @tap="modify()">取消</view>
					<view class="title">添加好友</view>
					<view class="define" @tap="addSubmit()">确定</view>
				</view>
				<view class="modify-main">
					<textarea v-model="msg" class="modify-content" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	import myfun from "../../commons/js/myfun.js"

	export default {
		data() {
			return {
				userarr: [],
				uid: "",
				fid:"",
				// imgurl: "",
				token: "",
				myname: "",
				animationData: {},
				isModify: false,
				widHeight: "",
				msg:"",
				data:""
			}
		},
		onLoad() {
			this.getStorages()
		},
		onReady(){
			this.getElementStyle()
		},
		methods: {
			search: myfun.debounce(function(e) {
					this.userarr = []
				let searchVal = e.detail.value
				if (searchVal.length > 0) {
					this.searchUser(searchVal)
				}
			}, 500),
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					this.widHeight = data.height
					console.log(this.widHeight)
				}).exec();
			},
			modify(type,data,isPwd) {
				this.data = data
				this.isModify = !this.isModify
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease"
				})
				if (this.isModify) {
					animation.bottom(0).step()
				} else {
					animation.bottom(-this.widHeight).step()
			
				}
				this.animationData = animation.export()
			
			},
			addFriendBtn(fid) {
				this.fid = fid
				this.msg = this.myname+' 用户请求添加好友!~'
				this.modify()
			},
			addSubmit(fid){
				if(this.msg.length>0){
					this.modify()
					uni.request({
							url: this.serverUrl + "/friend/applyfriend",
							data: {
								uid:this.uid,
								fid:this.fid,
								token: this.token,
								msg:this.msg
							},
							method: "POST",
							success: data => {
								
								let status = data.data.status
								if (status == 200) {
									uni.showToast({
										title: '好友请求发生成功',
										icon: 'none',
										duration: 1500
									})
								} else if (status == 500) {
									uni.showToast({
										title: '服务器出错了',
										icon: 'none',
										duration: 1500
									})
								} else if (status == 300) {
									uni.navigateTo({
										url: '../signin/signin?name=' + this.myname
									})
								}
							}
						})
					
				}
			},
			getStorages: function() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.uid = value.id
						// this.imgurl = this.serverUrl + '/user/' + value.imgurl
						this.token = value.token
						this.myname = value.name

					} else {
						uni.navigateTo({
							url: '../signin/signin'
						})
					}
				} catch (e) {
					console.log(e)
				}
			},

			searchUser(e) {
				uni.request({
					url: this.serverUrl + "/search/user",
					data: {
						data: e,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							let arr = data.data.result
							for (let i = 0; i < arr.length; i++) {
								this.isFriend(arr[i],e)
							}
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 1500
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../signin/signin?name=' + this.myname
							})
						}
					}
				})

			},
			isFriend(arr,e) {
				let exp = eval("/" + e + "/g")
				let tip = 0;
				if (arr._id == this.uid) {
					tip = 2
					arr.tip = tip
					arr.imgurl = this.serverUrl + "/user/" + arr.imgurl
					arr.name = arr.name.replace(exp, "<span style='color:#4AAAFF'>" + e +
						"</span>")
					arr.email = arr.email.replace(exp, "<span style='color:#4AAAFF'>" +
						e + "</span>")
					this.userarr.push(arr)
				} else {
					uni.request({
						url: this.serverUrl + "/search/isFriend",
						data: {
							uid: this.uid,
							fid: arr._id,
							token: this.token
						},
						method: "POST",
						success: data => {
							let status = data.data.status
							if (status == 200) {
								tip = 1
							} else if (status == 400) {
								//不是好友
							} else if (status == 500) {
								uni.showToast({
									title: '服务器出错了',
									icon: 'none',
									duration: 1500
								})
							} else if (status == 300) {
								uni.navigateTo({
									url: '../signin/signin?name=' + this.myname
								})
							}
							arr.tip = tip
							arr.imgurl = this.serverUrl + "/user/" + arr.imgurl
							arr.name = arr.name.replace(exp, "<span style='color:#4AAAFF'>" + e +
								"</span>")
							arr.email = arr.email.replace(exp, "<span style='color:#4AAAFF'>" +
								e+ "</span>")
							this.userarr.push(arr)
						}
					})
				}


			},
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			}
		}
	}
</script>

曰<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 0.96);

		.search-div {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
			box-sizing: border-box;
		}

		.search {
			padding: 0 60rpx 0 12rpx;
			height: 60rpx;
			background: $uni-bg-color-grey;
			border-radius: 10rpx;
		}

		.search-img {
			position: absolute;
			top: 22rpx;
			right: 130rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}

	.main {
		padding: 18rpx $uni-spacing-col-base;

		.result {
			// padding-top: $uni-spacing-col-base;

			.title {
				font-size: 44rpx;
				font-weight: 600;
				color: $uni-text-color;
				line-height: 60rpx;
			}

			.list {
				width: 100%;
				height: 80rpx;
				padding: 20rpx 0;

				image {
					float: left;
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}
			}

			.names {
				float: left;
				padding-left: $uni-spacing-col-base;
			}

			.name {
				font-size: 36rpx;
				color: $uni-text-color;
				line-height: 50rpx;
			}

			.email {
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				line-height: 28rpx;
			}

			.right-bt {
				float: right;
				width: 120rpx;
				height: 48rpx;
				border-radius: 24rpx;
				font-size: $uni-font-size-sm;
				line-height: 48rpx;
				margin-top: 16rpx;
				text-align: center;

			}

			.add {
				background: $uni-color-primary;
				color: $uni-text-color;
			}

			.send {
				background: rgba(74, 170, 255, 0.1);
				color: $uni-color-success;
			}
		}
	}
	.modify {
		position: fixed;
		z-index: 1003;
		// top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fff;
	
		.modify-header {
			border-bottom: 1px solid $uni-border-color;
			width: 100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			display: flex;
			flex-direction: row;
			align-items: center;
	
			.close {
				padding-left: 32rpx;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44px;
			}
	
			.title {
				flex: auto;
				text-align: center;
				font-size: 40rpx;
				color: $uni-text-color;
				line-height: 88rpx;
			}
	
			.define {
				padding-right: $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-color-success;
				line-height: 44px;
			}
		}
	
		.modify-main {
			display: flex;
			padding: $uni-spacing-col-base;
			flex-direction: column;
	
			.modify-pwd {
				padding: 0 20rpx;
				margin-bottom: $uni-spacing-col-base;
				height: 88rpx;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 88rpx;
			}
	
			.modify-content {
				padding: 16rpx 20rpx;
				flex: auto;
				width: 100%;
				box-sizing: border-box;
				height: 386px;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
			}
		}
	}
</style>
