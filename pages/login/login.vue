<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-right" @tap="tosign()">
				<view class="text">注册</view>
			</view>
		</view>
		<view class="logo" @tap="test1">
			<image src="../../static/index/logo.png" />
		</view>
		<view class="main">
			<view class="title">登录</view>
			<view class="slogan">您好，欢迎来到 YChat</view>
			<view class="inputs">
				<input type="text" class="user" placeholder="用户名/邮箱" placeholder-style="color:#aaa;font-weight:400;"
					@blur="getuser" />
				<input type="password" class="psw" placeholder="密码" placeholder-style="color:#aaa;font-weight:400;"
					@blur="getpsw" />
			</view>
			<view class="tips">用户名或密码输入错误</view>
		</view>
		<view class="submit" @tap="test">登录</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: "",
				psw: "",
				token: ''
			};
		},
		methods: {
			tosign() {
				uni.navigateTo({
					url: "../sign/sign"
				})
			},
			getuser(e) {
				this.user = e.target.value
			},
			getpsw(e) {
				this.psw = e.target.value
			},
			login() {
				if (this.user && this.psw) {
					uni.request({
						url: "http://localhost:3000/signup/add",
						data: {
							mail: 'xiaohong@163.com',
							name: '小红',
							pwd: '12345678'
						},
						method: "POST",
						success: data => {
							console.log(data)
						}
					})
				}
			},
			test() {
				uni.request({
					url: "http://localhost:3000/index/updateMsg",
					data: {
						// name: '小白',
						// mail:'xiaobai@163.com',
						// pwd: '12345678'
						// data:'小'
						uid:'61ac70ab62510d4989e0767b',
						fid:'61ac762f697451957fe34579'
					},
					method: "POST",
					success: data => {
						// this.token = data.data.back.token
						console.log(data)
					}
				})

			},
			test1() {
				uni.request({
					url: "http://localhost:3000/index/unreadMsg",
					data: {
						uid:'61ac70ab62510d4989e0767b',
						fid:'61ac762f697451957fe34579'
					},
					method: "POST",
					success: data => {
						console.log(data)
					}
				})

			},
			test2() {
				uni.request({
					url: "http://localhost:3000/friend/updateFriendState",
					data: {
						uid: "61ab3418c3058ec19dba1fb3",
						fid:'61ab3b912b16076963bd99dd',
						// msg:'好友申请3'
					},
					method: "POST",
					success: data => {
						console.log(data)
					}
				})

			}
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
