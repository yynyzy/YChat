<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-right" @tap="tosign()">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/index/logo.png" />
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">您好，欢迎来到 YChat</view>
			<view class="inputs">
				<input type="text" v-model="user" class="user" placeholder="用户名/邮箱"
					placeholder-style="color:#aaa;font-weight:400;" />
				<input type="password" v-model="psw" class="psw" placeholder="密码"
					placeholder-style="color:#aaa;font-weight:400;" />
			</view>
			<view class="tips" :style="{display:mon}">用户名或密码输入错误</view>
		</view>
		<view class="submit" @tap="login">登录</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: "",
				psw: "",
				token: '',
				mon: 'none'
			};
		},
		onLoad: function(e) {
			if (e.user) {
				this.user = e.user
				uni.showToast({
					title: '注册成功请登录',
					icon: 'none',
					duration: 1500
				})
			}else{
				this.user =e.name
				uni.showToast({
					title: '登录过期请重新登录',
					icon: 'none',
					duration: 1500
				})
			}
		},
		methods: {
			tosign() {
				uni.navigateTo({
					url: "../sign/sign"
				})
			},
			login() {
				if (this.user && this.psw) {
					uni.request({
						url: this.serverUrl + "/signin/match",
						data: {
							data: this.user,
							pwd: this.psw
						},
						method: "POST",
						success: data => {
							let status = data.data.status
							if (status == 200) {
								this.mon = 'none'
								let res = data.data.back
								try {
									uni.setStorage({
										key: 'user',
										data: {
											'id': res.id,
											'name': res.name,
											'imgurl': res.imgurl,
											'token': res.token
										},
										success: function() {
											
										}
									})

								} catch (e) {
									console.log('数据储存出错')
								}

								uni.navigateTo({
									url: '../index/index'
								})
							} else if (status == 400) {
								this.mon = 'block'
								this.psw = ''
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
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.logo {
		text-align: center;

		image {
			padding-top: 256rpx;
			width: 194rpx;
			height: 92rpx;
			margin: 0 auto;
		}
	}

	.main {
		padding: 54rpx $uni-spacing-row-lg 120rpx;

		// width: 100%;
		.title {
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 80rpx;
		}

		.slogan {
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}

		.inputs {
			padding-top: 8rpx;

			input {
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
		}

		.tips {
			float: left;
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
			border-bottom: 1px solid $uni-bg-color;
		}

	}

	.submit {
		margin: 0 auto;
		width: 520rpx;
		height: 96rpx;
		background: $uni-color-primary;
		box-shadow: 0 50rpx 32rpx -36rpx rgba(255, 228, 49, 0.4);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 500;
		color: $uni-text-color;
		line-height: 96rpx;
		text-align: center;
	}
</style>
