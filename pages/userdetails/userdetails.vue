<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					详情
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice">
				</view>
			</view>
		</view>
		<view class="main">
			<view class="column heads">
				<view class="row head">
					<view class="title">头像</view>
					<view class="user-head" v-if="id==uid">
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
						<image :src="cropFilePath" @tap="upload" class="user-img"></image>
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
					<image :src="cropFilePath" class="user-img" v-if="id!=uid"></image>
				</view>
				<view class="row" @tap="modify('explain','签名',user.explain,false)" :animation="animationData"
					v-if="id==uid">
					<view class="title">签名</view>
					<view class="cont">
						{{user.explain}}
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row" v-if="id!=uid">
					<view class="title">签名</view>
					<view class="cont">
						{{user.explain}}
					</view>
				</view>
				<view class="row">
					<view class="title">
						注册
					</view>
					<view class="cont">
						{{timeChange(user.time)}}
					</view>
				</view>
			</view>
			<view class="column">
				<view class="row" @tap="modify('name','昵称',user.name,false)" v-if="id==uid">
					<view class="title">昵称</view>
					<view class="cont">{{user.name}}</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row" @tap="modify('markname','昵称',markname,false)" v-if="id!=uid">
					<view class="title">
						昵称
					</view>
					<view class="cont">
						{{markname}}
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						性别
					</view>
					<view class="cont">
						<picker @change="bindPickerChange" :value="index" :range="array" v-if="id==uid">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
						<view class="uni-input" v-if="id!=uid">{{array[index]}}</view>
					</view>
					<view class="more" v-if="id==uid">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						生日
					</view>
					<view class="cont">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange"
							v-if="id==uid">
							<view class="uni-input">{{date}}</view>
						</picker>
						<view class="uni-input" v-if="id!=uid">{{date}}</view>
					</view>
					<view class="more" v-if="id==uid">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="column">
				<view class="row" @tap="modify('电话',dataArr.name,false)" v-if="id==uid">
					<view class="title">
						电话
					</view>
					<view class="cont">
						{{user.phone}}
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row" v-if="id!=uid">
					<view class="title">
						电话
					</view>
					<view class="cont">
						{{user.phone}}
					</view>
				</view>
				<view class="row" v-if="id==uid" @tap="modify('email','邮箱',user.email,false)">
					<view class="title">邮箱</view>
					<view class="cont">{{user.email}}</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row" v-if="id!=uid">
					<view class="title">
						邮箱
					</view>
					<view class="cont">
						{{user.email}}
					</view>
				</view>
			</view>
			<view class="column" v-if="id==uid"  @tap="modify('psw','密码','',false)">
				<view class="row" >
					<view class="title">
						密码
					</view>
					<view class="cont">
						******
					</view>
					<view class="more">
						<image src="../../static/common/more.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<view class="btn2" v-if="id==uid" @tap="quit()">退出登录</view>
			<view class="btn2" v-if="id!=uid" @tap="deleteFriend()">删除好友</view>
		</view>
		<view class="modify" :style="{bottom:-+widHeight+'px'}" :animation="animationData">
			<view class="modify-header">
				<view class="close" @tap="modify()">
					取消
				</view>
				<view class="title">
					签名
				</view>
				<view class="define" @tap="modifySubmit()">
					确定
				</view>
			</view>
			<view class="modify-main">
				<input type="text" v-model="pwd" class="modify-pwd" placeholder="请输入原密码"
					placeholder-style="color:#aaa;font-weight:400;" :style="{display:isPwd}" />
				<textarea v-model="data" class="modify-content" />
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	import myFun from "../../commons/js/myfun.js"
	export default {
		components: {
			ImageCropper,
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				modifyType: "",
				cropFilePath: "../../static/img/three.png",
				array: ["男", "女", "未知"],
				index: 0,
				date: currentDate,
				tempFilePath: '',
				data: "",
				olddata: '',
				animationData: {},
				isModify: false,
				pwd: undefined,
				type: "",
				widHeight: "",
				isPwd: 'none',
				markname: "",
				uid: "",
				myname: "",
				token: "",
				id: "",
				user: {},
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getStorages()
			this.getUser()
			this.getMarkName()
		},
		onReady() {
			this.getElementStyle()
		},
		methods: {
			backOne() {
				uni.navigateBack({
					detail: 1
				})
			},
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
							this.cropFilePath = this.serverUrl + res.imgurl
							if (res.explain == undefined) {
								res.explain = '这个人很懒，什么都没留下~'
							}
							if (res.birth == undefined) {
								this.date = '0000-00-00'
							} else {
								this.date = res.birth
							}
							if (res.phone == undefined) {
								res.phone = '000'
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
					this.index = 1
				} else if (e == 'male') {
					this.index = 0
				} else {
					this.index = 2
				}
			},
			getMarkName() {
				if (this.id !== this.uid) {
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
								console.log(data.data)
								if (res.markname != undefined) {
									this.markname = res.markname
								}
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

			},
			timeChange(date) {
				return myFun.detailTime(date)
			},
			bindPickerChange: function(e) {
				let oldindex = this.index
				this.index = e.target.value
				if (this.index != oldindex) {
					let sex = 'asexual'
					if (this.index == 0) {
						sex = 'male'
					} else if (this.index == 1) {
						sex = "female"
					}
					this.update(sex, 'sex', undefined)
				}

			},
			bindDateChange: function(e) {
				let olddate = this.date
				this.date = e.target.value
				if (this.date != olddate) {
					this.update(this.date, 'birth', undefined)
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = "";
				this.cropFilePath = e.detail.tempFilePath;
				uni.uploadFile({
					url: this.serverUrl + "/files/upload",
					filePath: this.cropFilePath,
					name: "file",
					fileType: "image",
					formData: {
						url: 'user',
						name: this.uid,
						token: this.token
					},
					success: (uploadFileRes) => {
						var backstr = uploadFileRes.data;
						//自定义操作
						try {
							console.log('数据储存出错')
							uni.setStorage({
								key: 'user',
								data: {
									'id': this.id,
									'name': this.name,
									'imgurl': backstr,
									'token': this.token
								}
							})
						} catch (e) {
							console.log('数据储存出错')
						}
						this.update(backstr, 'imgurl', undefined)
					},
					fail(e) {
						console.log("this is errormes " + e.message);
					},
				});
			},
			update(data, type, pwd) {
				uni.request({
					url: this.serverUrl + "/user/update",
					data: {
						id: this.uid,
						data: data,
						type: type,
						psw: pwd,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {} else if (status == 500) {
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
			},
			cancel() {
				console.log('canceled')
			},
			getElementStyle() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					this.widHeight = data.height
					console.log(this.widHeight)
				}).exec();
			},
			modify(t, type, data, isPwd) {
				if (isPwd) {
					this.isPwd = 'block'
				} else {
					this.isPwd = 'none'
					this.pwd = undefined
				}
				this.type = t
				this.modifyType = type
				this.data = data
				this.olddata = data
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
			modifySubmit() {
				if (this.data.length > 0 && this.data !== this.olddata) {
					if (this.type == 'markname') {
						this.updateFriendName()
						this.markname = this.data
					} else {
						this.update(this.data, this.type, this.pwd)
					}

					this.user[this.type] = this.data
				}
				this.modify()
			},
			updateFriendName() {
				if (this.data.length > 0 && this.data !== this.olddata) {
					uni.request({
						url: this.serverUrl + "/user/updatemarkname",
						data: {
							uid: this.uid,
							fid: this.id,
							name: this.data,
							token: this.token
						},
						method: "POST",
						success: data => {
							let status = data.data.status
							if (status == 200) {
								let res = data.data.result
								if (res.markname != undefined) {
									this.markname = res.markname
								}
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

			},
			quit() {
				uni.removeStorage({
					key: 'user',
					success() {
						console.log('success')
					}
				})
				uni.navigateTo({
					url: '../login/login'
				})
			},
			deleteFriend(){
				uni.showModal({
					title:'提示',
					content:'确定删除该好友吗？',
					success(res){
						if(res.confirm){
						uni.request({
							url: this.serverUrl + "/friend/deleteFriend",
							data: {
								uid: this.uid,
								fid:this.id,
								token: this.token
							},
							method: "POST",
							success: data => {
								let status = data.data.status
								if (status == 200) {
									uni.navigateTo({
										url: '../index/index'
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
						}else if(res.cancel){
							
						}
					}
				})
			}
		}



	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		background: rgba(255, 255, 255, 0.96);

		.top-bar-center {
			z-index: -100;
		}
	}

	.main {
		padding-top: 130rpx;
		// display: flex;
		// flex-direction: column;

		.column {
			display: flex;
			flex-direction: column;
			padding-top: 12rpx;
			width: 100%;

			// border-bottom: 1px solid $uni-border-color;
			.heads {}

			.row {
				display: flex;
				flex-direction: row;
			}

			.title {
				flex: none;
				padding: 0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 112rpx;
			}

			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
			}

			.user-head {
				flex: auto;
			}

			.user-img {
				margin-top: 22rpx;
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
			}

			.cont {

				flex: auto;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.more {
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;
				margin-right: 10rpx;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
	}

	.btn2 {
		margin-top: 130rpx;
		text-align: center;
		font-size: $uni-font-size-lg;
		color: $uni-color-warning;
		line-height: 88rpx;
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
