<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center"></view>
			<view class="top-bar-right">
				<view class="more-img" v-if="relation ==0|| relation==1" @tap="userDatail">
					<image src="../../static/userhome/more.png"></image>
				</view>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bai" :animation="animationData4">
				<image :src="user.imgurl" class="bg-img" mode="aspectFill"></image>
			</view>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{background:sexBg}" :animation="animationData3">
					<image :src="seximg"></image>
				</view>
				<image :src="user.imgurl" class="user-img" mode="aspectFill" :animation="animationData2">
				</image>
			</view>
			<view class="user-imf">
				<view class="name">{{markname}}</view>
				<view class="nick">昵称：{{user.name}}</view>
				<view class="intr">{{user.explain}}</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="bottom-btn btn1" @tap="addFriendBtn" v-if="relation == 2">
				加为好友
			</view>
			<view class="bottom-btn btn1" v-if="relation == 1">
				发送消息
			</view>
		</view>
		<view class="add-misg" :style="{height:addHeight+'px',bottom:-+addHeight+'px'}" :animation="animationData">
			<view class="name">
				{{user.name}}
			</view>
			<textarea v-model="msg" :value="myname+'请求加为好友~'" maxlength="120" class="add-main" :cursor-spacing="0" />
		</view>
		<view class="add-bt" :animation="animationData1">
			<view class="close" @tap="addFriendAnimation">取消</view>
			<view class="send" @tap="addSubmit()">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				uid: "",
				token: "",
				myname: "春雨",
				markname: "",
				user: {},
				seximg: '../../static/userhome/asexua.png',
				sexBg: 'rgba(39, 40, 50, 1)',
				relation: "",
				addHeight: "1000",
				animationData: {},
				animationData1: {},
				animationData2: {},
				animationData3: {},
				animationData4: {},
				isAdd: false,
				msg: ""
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getStorages()
			this.getUser()
			this.judgeFriend()
		},
		onReady() {
			this.getElementStyle()
		},
		methods: {
			getStorages: function() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.uid = value.id
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
			userDatail(){
				uni.navigateTo({
					url: '../userdetails/userdetails?id=' + this.id
				})
			},
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
					this.addHeight = data.height - 186
				}).exec();
			},
			addFriendAnimation() {
				this.isAdd = !this.isAdd
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease"
				})
				var animation1 = uni.createAnimation({
					duration: 300,
					timingFunction: "ease"
				})
				var animation2 = uni.createAnimation({
					duration: 300,
					timingFunction: "ease"
				})
				var animation3 = uni.createAnimation({
					duration: 300,
					timingFunction: "ease"
				})
				var animation4 = uni.createAnimation({
					duration: 300,
					timingFunction: "ease"
				})
				if (this.isAdd) {
					animation.bottom(0).step()
					animation1.bottom(0).step()
					animation2.width(120).height(120).step()
					animation3.opacity(0).step()
					animation4.backgroundColor('rgba(255,228,49,0.6)').step()
				} else {
					animation.bottom(-this.addHeight).step()
					animation1.bottom(-100).step()
					animation2.width(200).height(200).top(0).step()
					animation3.opacity(1).step()
					animation4.backgroundColor('rgba(255,228,49,0)').step()
				}
				this.animationData = animation.export()
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
				this.animationData4 = animation4.export()
			},
			getUser() {
				uni.request({
					url: this.serverUrl + "/user/detail",
					data: {
						id: this.id,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							res.imgurl = this.serverUrl  + res.imgurl
							if (typeof(res.explain)) {
								res.explain = '这个人很懒，什么都没留下~'
							}
							if (this.markname.length == 0) {
								this.markname = res.name
							}
							this.sexJudge(res.sex)
							this.user = res
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 2000
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../login/login?name=' + this.myname
							})
						}
					}
				})
			},
			sexJudge(e) {
				if (e == 'female') {
					this.seximg = '../../static/userhome/female.png'
					this.sexBg = 'rgba(255,93,91,1)'
				} else if (e == 'male') {
					this.seximg = '../../static/userhome/male.png'
					this.sexBg = 'rgba(87,153,255,1)'
				} else {
					this.seximg = '../../static/userhome/asexual.png'
					this.sexBg = 'rgba(39,40,50,1)'
				}
			},
			judgeFriend() {
				if (this.id == this.uid) {
					this.relation = 0
				} else {
					uni.request({
						url: this.serverUrl + "/search/isFriend",
						data: {
							uid: this.uid,
							fid: this.id,
							token: this.token
						},
						method: "POST",
						success: data => {
							let status = data.data.status
							if (status == 200) {
								this.relation = 1
								this.getMarkName()
							} else if (status == 400) {
								this.relation = 2
							} else if (status == 500) {
								uni.showToast({
									title: '服务器出错了',
									icon: 'none',
									duration: 1500
								})
							}
						}
					})

				}
			},
			getMarkName() {
				uni.request({
					url: this.serverUrl + "/user/getmarkname",
					data: {
						uid: this.uid,
						fid: this.id,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							if (res.markname!=undefined) {
								this.markname = res.markname
							}
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 1500
							})
						}
					}
				})
			},
			addFriendBtn(fid) {
				this.fid = fid
				this.msg = this.myname + ' 用户请求添加好友!~'
				this.addFriendAnimation()
			},
			addSubmit(fid) {
				if (this.msg.length > 0) {
					uni.request({
						url: this.serverUrl + "/friend/applyfriend",
						data: {
							uid: this.uid,
							fid: this.id,
							token: this.token,
							msg: this.msg
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
									url: '../login/login?name=' + this.myname
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
.top-bar-center{
	z-index: -100;
}
	.bg {
		position: fixed;
		z-index: -2;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;

		.bg-bai {
			width: 100%;
			height: 100%;

		}

		.bg-img {
			opacity: 0.4;
			position: absolute;
			z-index: -1;
			left: -10rpx;
			top: -10rpx;
			width: 110%;
			height: 110%;
			filter: blur(16px);
		}
	}

	.main {
		text-align: center;
		padding-top: 240rpx;

		.user-header {
			margin: 0 auto;
			position: relative;
			width: 412rpx;
			height: 412rpx;

			.sex {
				z-index: 11;
				position: absolute;
				bottom: 22rpx;
				right: 22rpx;
				width: 64rpx;
				height: 64rpx;
				border-radius: $uni-border-radius-circle;

				image {
					padding: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}

			.user-img {
				top: 0;
				z-index: 10;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255, 255, 255, 1);
			}

			.user-imf {
				padding-top: 42rpx;

				.name {
					font-size: 52rpx;
					color: $uni-text-color;
					line-height: 74rpx;
				}

				.nick {
					font-size: $uni-font-size-base;
					line-height: 40rpx;
					color: $uni-text-color;
				}

				.intr {
					padding: 20rpx 100rpx;
					font-size: $uni-font-size-base;
					font-weight: 300;
					color: $uni-text-color;
					line-height: 48rpx;
				}
			}
		}


	}

	.bottom-bar {

		.bottom-btn {
			background: $uni-color-primary;
			margin: 0 $uni-spacing-col-base;
		}
	}



	.add-misg {
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 56rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 40rpx 40rpx 0 0;

		.name {
			padding: 168rpx 0 40rpx;
			font-size: 52rpx;
			color: $uni-text-color;
			line-height: 74rpx;
		}

		.add-main {
			box-sizing: border-box;
			padding: 18rpx 22rpx;
			height: 420rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			line-height: 44rpx;
		}
	}

	.add-bt {
		position: fixed;
		bottom: -104rpx;
		width: 100%;
		height: 104rpx;
		box-sizing: border-box;
		padding: 12rpx $uni-spacing-col-base;
		z-index: 100;
		display: flex;

		.close {
			width: 172rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			height: 80rpx;
			background: $uni-bg-color-hover;
			border-radius: $uni-border-radius-sm;
		}

		.send {
			margin-left: $uni-spacing-col-base;
			;
			flex: auto;
			text-align: center;
			line-height: 80rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color;
			height: 80rpx;
			background: $uni-color-primary;
			border-radius: $uni-border-radius-sm;
		}
	}
</style>
