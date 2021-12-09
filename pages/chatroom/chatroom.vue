<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/common/back.png" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					{{fname}}
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pice"></view>
				<view class="group-img" v-if="type == 0" @tap="goGroupHome">
					<image :src="fimgurl"></image>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="chat" :scroll-into-view="scrollToView" :scrolltoupper="nextPage">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="loading" :class="{displaynone:isloading}">
					<image src="../../static/common/loading.png" class="loading-img" :animation="animationData"></image>
				</view>
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index" :id="'msg'+ item.tip">
					<view class="chat-time" v-if="item.time !==''">
						{{changeTime(item.time)}}
					</view>
					<!-- 对方 -->
					<view class="msg-m msg-left" v-if="item.fromId !=uid">
						<image :src="item.imgurl" class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="previewImage"></image>
						</view>
						<!-- 音频 -->
						<view class="message" v-if="item.types==2">
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}"
								@tap="playVoice(item.message.voice)">
								{{item.message.time}}
								<image src="../../static/submit/yy.png" class="voice-img"></image>
							</view>
						</view>
						<!-- 位置 -->
						<view class="message" v-if="item.types==3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">
									{{item.message.name}}
								</view>
								<view class="map-address">
									{{item.message.address}}
								</view>
								<map :latitude="item.message.latitude" :longitude="item.message.longitude"
									:marker="covers(item.message)"></map>
							</view>
						</view>
					</view>
					<!-- 我 -->
					<view class="msg-m msg-right" v-if="item.fromId ==uid">
						<image :src="item.imgurl" class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img"
								@tap="previewImage(item.message)"></image>
						</view>
						<!-- 音频 -->
						<view class="message" v-if="item.types==2">
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}"
								@tap="playVoice(item.message.voice)">
								{{item.message.time}}
								<image src="../../static/submit/yy.png" class="voice-img"></image>
							</view>
						</view>
						<!-- 位置 -->
						<view class="message" v-if="item.types==3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">
									{{item.message.name}}
								</view>
								<view class="map-address">
									{{item.message.address}}
								</view>
								<map :latitude="item.message.latitude" :longitude="item.message.longitude"
									:marker="covers(item.message)"></map>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<submit @inputs="inputs" @heights="heights"></submit>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	import myfun from "../../commons/js/myfun.js"

	import submit from "../../components/submit/submit.vue"
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				uid:'',
				uimgurl:'',
				token:'',
				uname:'',
				fid:'',
				fname:'',
				fimgurl:'',
				type:'',
				msgs: [],
				imgMsg: [],
				oldTime: 0,
				scrollToView: '',
				inputh: "60",
				animationData: {},
				nowpage: 0,
				pagesize:10,
				loading: '',
				isloading: true,
				beginLoading: true
			}
		},
		onLoad(e) {
			this.fid =e.id
			this.fname=e.name
			this.type =e.type
			this.fimgurl=e.img
			this.getStorages()
			this.getMsg(this.nowpage)
			// this.nextPage()
		},
		comments: {
			submit
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
						this.imgurl = this.serverUrl+ value.imgurl
						this.token = value.token
						this.uname = value.name
			
					} else {
						uni.navigateTo({
							url: '../signin/signin'
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			goGroupHome:function(){
				uni.navigateTo({
					url:'../grouphome/grouphome?gid='+this.fid+'&gimg='+this.fimgurl
				})
			},
			heights(e) {
				this.inputh = e
				this.goBottom()
			},
			goBottom() {
				console.log(1)
				this.scrollToView = ""
				this.$nextTick(function() {
					let len = this.msgs.length - 1
					this.scrollToView = 'msg' + this.msgs[len].tip
				})
			},
			changeTime(date) {
				return myfun.dateTime1(date)
			},
			nextPage() {
				if (this.nowpage > 0 && this.beginLoading) {
					this.isloading = false

					this.beginLoading = false

					var animation = uni.createAnimation({
						duration: 1000,
						timingFunction: 'ease',
					})
					this.animation = animation
					this.animationData = animation.export()
					let i = 1
					this.loading = setInterval(function() {
						animation.rotate(i * 30).step()
						this.animationData = animation.export()
						i++
						if (i > 20) {
							this.getMsg(this.nowpage)
						}

					}.bind(this), 200)
				}
			},
			getMsg(page) {
				uni.request({
					url: this.serverUrl + "/chat/msg",
					data: {
						uid: this.uid,
						fid: this.fid,
						nowPage:this.nowpage,
						pageSize:this.pagesize,
						state:1,
						token: this.token
					},
					method: "POST",
					success: data => {
						let status = data.data.status
						if (status == 200) {
							let msg = data.data.result
							msg.reverse()
							if(msg.length>0){
								let oldtime =msg[0].time
								let imgarr =[]
								for (let i = 0; i < msg.length; i++) {
									msg[i].imgurl =this.serverUrl + msg[i].imgurl
									if (i < msg.length - 1) {
										let t = myfun.spaceTime(oldtime, msg[i].time)
										if (t) {
											oldtime = t
										}
										msg[i].time = t
									}
									if(this.nowpage == 0){
										if(msg[i].time>this.oldTime){
											this.oldTime=msg[i].time
										}
									}
									if (msg[i].types == 1) {
										msg[i].message = this.serverUrl + msg[i].message
										imgarr.push(msg[i].message)
									}
								}
								this.msgs=msg.concat(this.msgs)
								this.imgMsg=imgarr.concat(this.imgMsg)
							}
							if (msg.length ==10) {
								
								this.nowpage++
							} else {
								this.nowpage = -1
							}
							this.$nextTick(function() {
								let len = this.msgs.length
								this.scrollToView = 'msg' + this.msgs[msg.length-1].id
							})
							clearInterval(this.loading)
							
							this.beginLoading = true
							this.isloading = true
						} else if (status == 500) {
							uni.showToast({
								title: '服务器出错了',
								icon: 'none',
								duration: 1500
							})
						} else if (status == 300) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
				
			},
			previewImage(currentUrl) {
				uni.previewImage({
					current: currentUrl,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			playVoice(e) {
				innerAudioContext.src = e;
				innerAudioContext.play()
			},
			covers(e) {
				let map = [{
					latitude: e.latitude,
					longitude: e.longitude,
					iconPath: '../../static/img/one.png'
				}]
				return (map)
			},
			openLocation(e) {
				uni.openLocation({
					latitude: e.latitude,
					longitude: e.longitude,
					name: e.name,
					address: e.address,
					success: function() {
						console.log('success');
					}
				});
			},
			inputs(e) {
				this.receiveMsg(e,this.uid,this.imgurl,0)
			},
			receiveMsg(e,id,img,tip) {
				let len = this.msgs.length
				let nowTime =new Date()
				let t  = myfun.spaceTime(this.oldTime,nowTime)
				if(t){
					this.oldTime =t
				}
				nowTime = t
				let data = {
					fromId: id,
					imgurl: img,
					message: e.message,
					types: e.types,
					time: nowTime,
					id: len,
				}
				console.log(e)
				this.msgs.push(data)
				this.$nextTick(function() {
					this.scrollToView = 'msg' + len
				})
				if (e.types == 1) {
					this.imgMsg.push(e.message)
				}
				//socket提交
				if (e.types == 0) {
				//发送给后端
				this.sendSocket(e)
				}
			},
			sendSocket(e){
				if(this.type ==0){
					//一对一聊天
					this.socket.emit('msg',e,this.uid,this.fid)
				}else{
					//群聊
					this.socket.emit('groupMsg',e,this.uid,this.fid)
				}
			}
			

		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background: rgba(244, 244, 244, 1);
	}

	.top-bar {
		background: rgba(244, 244, 244, 0.96);
		border-bottom: 1px solid $uni-border-color;

		.group-img {
			position: absolute;
			bottom: 10rpx;
			right: $uni-spacing-col-base;
			width: 68rpx;
			height: 68rpx;

			image {
				// margin-top: 10rpx;
				padding: 0;
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
	}

	.chat {
		height: 100%;

		.padbt {
			height: var(--status-bar-height);
			width: 100%;
		}

		.loading {
			text-align: center;

			.loading-img {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			display: flex;
			flex-direction: column;

		}

		.chat-ls {
			.chat-time {
				font-size: $uni-font-size-sm;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					// flex: auto;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}

				.message {
					flex: none;
					max-width: 480rpx;
				}

				.msg-text {
					font-size: $uni-font-size-lg;
					color: $uni-text-color;
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}

				.msg-img {
					max-width: 400rpx;
					border-radius: $uni-border-radius-base;
				}

				.msg-map {
					background: #fff;
					width: 464rpx;

					.map-name {
						font-size: $uni-font-size-lg;
						color: $uni-text-color;
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map-address {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-disable;
						padding: 0 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					map {
						width: 464rpx;
						height: 190rpx;
						padding-top: 8rpx;
					}
				}

				.voice {
					min-width: 80rpx;
					max-width: 400rpx;
				}

				.voice-img {
					width: 28rpx;
					height: 36rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.msg-img {
					margin-left: 16rpx;
				}

				.msg-map {
					margin-left: 16rpx;
					border-radius: 0 20rpx 0 20rpx;
				}

				.voice {
					text-align: right;
				}

				.voice-img {
					float: left;
					transform: rotate (180deg);
					width: 28rpx;
					height: 36rpx;
					padding-bottom: 4rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: #fff260;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.msg-img {
					margin-right: 16rpx;
				}

				.voice {
					text-align: left;
				}

				.voice-img {
					float: right;
					width: 28rpx;
					height: 36rpx;
					padding-top: 4rpx;
				}
			}
		}
	}

	.displaynone {
		display: none;
	}
</style>
