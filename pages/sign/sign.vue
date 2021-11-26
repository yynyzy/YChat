<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @tap="toLogin()">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>
	</view>
		<view class="logo">
			<image src="../../static/index/logo.png" />
		</view>
			<view class="main">
				<view class="title">注册</view>
				<view class="inputs">

					<view class="inputs-div">
						<input type="text" class="user" placeholder="请输入用户名"
							placeholder-style="color:#aaa;font-weight:400;" />
						<view class="employ" v-if="employ">已占用</view>
						<image src="../../static/sign/right1.png" class="ok" v-if="isuser"></image>
					</view>
					<view class="inputs-div">
						<input type="text" class="email" placeholder="请输入邮箱"
							placeholder-style="color:#aaa;font-weight:400;" @blur="isEmail" />
						<view class="employ" v-if="employ">已占用</view>
						<view class="employ" v-if="invalid">邮箱无效</view>
						<image src="../../static/sign/right1.png" class="ok" v-if="isemail"></image>
					</view>
					<view class="inputs-div">
						<input :type="type" class="psw" placeholder="请输入密码"
							placeholder-style="color:#aaa;font-weight:400;" />
						<view class="employ" v-if="employ">密码无效</view>
						<image :src="lookurl" class="ok" @tap="looks"></image>
					</view>
				</view>
				<!-- 	<view class="tips">用户名或密码输入错误</view> -->
			</view>
			<view class="submit">注册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "password",
				isuser: true,
				isemail: false,
				look: true,
				lookurl: "../../static/sign/look.png",
				invalid: true,
				employ: false,
				email:""
			};
		},
		methods: {
			looks() {
				if (this.look) {
					this.type = "password"
					this.look = !this.look
					this.lookurl = "../../static/sign/biyan.png"
				} else {
					this.type = "text"
					this.look = !this.look
					this.lookurl = "../../static/sign/look.png"
				}
			},
			isEmail(e) {
				const reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
				this.email = e.target.value
				if (this.email.length) {
					if (reg.test(this.email)) {
						this.invalid = false
					} else {
						this.invalid = true
					}

				}
			},
			toLogin(){
				uni.navigateBack({
					detail:1
				})
			}
		}}
</script>

<style lang="scss">
	.content {
		padding-bottom: var(--status-bar-height);
	}

	.top-bar {
		position: fixed;
		z-index: 1001;
		top: 0;
		left: 0;
		width: 100%;
		height: 88rpx;
		padding-top: var(--status-bar-height);
		background: $uni-bg-color;

		.top-bar-left {
			float: left;
			padding-left: 32rpx;
			width: 88rpx;
			height: 88rpx;

			.back-img {
				margin-top: 21rpx;
				width: 26rpx;
				height: 46rpx;

			}
		}

	}

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

		.inputs {
			padding-top: 8rpx;

			input {
				padding-top:40rpx ;
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1px solid $uni-border-color;
			}
		}

		.inputs-div {
			position: relative;
		}

		.employ,
		.invalid {
			position: absolute;
			top: 40rpx;
			right: 0;
			font-size: $uni-font-size-base;
			font-weight: 500;
			color: $uni-color-warning;
			line-height: 88rpx;
		}

		.ok {
			position: absolute;
			right: 0;
			top: 76rpx;
			width: 38rpx;
			height: 30rpx;
		}

		.look {
			position: absolute;
			right: 0;
			top: 76rpx;
			width: 32rpx;
			height: 18 rpx;
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
