<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @tap="back()">
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
					<input type="text" class="user" placeholder="请输入用户名" placeholder-style="color:#aaa;font-weight:400;"
						@blur="matchUser" />
					<view class="employ" v-if="useremploy">已占用</view>
					<image src="../../static/sign/right1.png" class="ok" v-if="isuser"></image>
				</view>
				<view class="inputs-div">
					<input type="text" class="email" placeholder="请输入邮箱" placeholder-style="color:#aaa;font-weight:400;"
						@blur="isEmail" />
					<view class="employ" v-if="emailemploy">已占用</view>
					<view class="invalid" v-if="invalid">邮箱无效</view>
					<image src="../../static/sign/right1.png" class="ok" v-if="isemail"></image>
				</view>
				<view class="inputs-div">
					<input :type="type" class="psw" placeholder="请输入密码" placeholder-style="color:#aaa;font-weight:400;"
						@input="getpsw" />
					<image :src="lookurl" class="ok" @tap="looks"></image>
				</view>
			</view>
			<!-- 	<view class="tips">用户名或密码输入错误</view> -->
		</view>
		<view :class="[{submit:isok},{submit1:!isok}]" @tap="signup">注册</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "password",
				isuser: false,
				isemail: false,
				look: false,
				lookurl: "../../static/sign/biyan.png",
				invalid: false,
				useremploy: false,
				emailemploy: false,
				email: "",
				user: "",
				psw: "",
				isok: false
			};
		},
		computed: {
			isOk: function() {
				let that = this
				if (that.isuser && that.isemail && that.psw.length > 5) {
					that.isok = true
				} else {
					that.isok = false
				}
				return that.isok
			}
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

			matchUser(e) {
				this.user = e.detail.value
				if (this.user.length > 0) {
					uni.request({
						url: this.serverUrl + "/signup/judge",
						data: {
							data: this.user,
							type: 'name'
						},
						method: "POST",
						success: data => {
							let status = data.data.status
							if (status == 200) {
								let res = data.data.result
								if (res > 0) {
									this.useremploy = true
									this.isuser = false
								} else {
									this.useremploy = false
									this.isuser = true
								}
								this.isOk
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
				this.isOk
			},
			isEmail(e) {
				const reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
				this.email = e.detail.value
				if (this.email.length) {
					if (reg.test(this.email)) {
						this.invalid = false
						this.matchEmail()
					} else {
						this.invalid = true
						this.emailemploy = false
						this.isemail = false
					}
				}else{
					this.invalid = false
					this.emailemploy = false
					this.isemail = false
					this.isOk
				}
			},
			matchEmail() {
				uni.request({
					url: this.serverUrl + "/signup/judge",
					data: {
						data: this.email,
						type: 'email'
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							let res = data.data.result
							if (res > 0) {
								this.emailemploy = true
								this.isemail = false
							} else {
								this.emailemploy = false
								this.isemail = true
							}
							this.isOk
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
			getpsw(e) {
				this.psw = e.detail.value
				this.isOk
			},

			back() {
				uni.navigateBack({
					detail: 1
				})
			},
			signup: function() {
				if(this.isOk){
				uni.request({
					url: this.serverUrl + "/signup/add",
					data: {
						name:this.user,
						mail:this.email,
						pwd:this.psw
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							uni.navigateTo({
								url:'../login/login?user='+this.user
							})
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

		.inputs {
			padding-top: 8rpx;

			input {
				padding-top: 40rpx;
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

	.submit1 {
		margin: 0 auto;
		width: 520rpx;
		height: 96rpx;
		background: rgba(39, 40, 50, 0.2);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 500;
		color: $uni-text-color-inverse;
		line-height: 96rpx;
		text-align: center;
	}
</style>
