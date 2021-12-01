<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @tap="records">
					<image :src="toc"></image>
				</view>
				<textarea auto-height="true" class="chat-send btn" :class="{displaynone:isrecord}" @input="inputs"
					v-model="msg" />
				<view class="record btn" :class="{displaynone:!isrecord}" @touchstart="touchstart" @touchend="touchend">
					按住说话
				</view>
				<view class="bt-img" @tap="emoji()">
					<image src="../../static/submit/bq.png"></image>
				</view>
				<view class="bt-img" @tap="more()">
					<image src="../../static/submit/tj.png"></image>
				</view>
			</view>
			<view class="emoji" :class="{displaynone:isemoji}">
				表情
			</view>
			<view class="more" :class="{displaynone:ismore}">
				<view class="more-list" @tap="sendImage('album')">
					<image src="../../static/submit/tp.png" ></image>
					<view class="more-list-title">
						图片
					</view>
				</view>
				<view class="more-list" @tap="sendImage('camera')">
					<image src="../../static/submit/pz.png" ></image>
					<view class="more-list-title">
						拍照
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/submit/dw.png"></image>
					<view class="more-list-title">
						定位
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/submit/sp.png"></image>
					<view class="more-list-title">
						视频
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/submit/wj.png" ></image>
					<view class="more-list-title">
						文件
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	
	const recorderManager = uni.getRecorderManager();
	export default {
		name: "submit",
		data() {
			return {
				isemoji: true,
				isrecord: false,
				ismore: true,
				toc: "../../static/submit/yy.png",
				msg: "",
				timer:'	',
				vlength:0
			};
		},
		methods: {
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height)
				}).exec();
			},
			records() {
				this.isemoji = true
				this.ismore=true
				setTimeout(() => {
					this.getElementHeight()
				}, 0)
				if (this.isrecord) {
					this.isrecord = false
					this.toc = "../../static/submit/yy.png"
				} else {
					this.isrecord = true
					this.toc = "../../static/submit/jp.png"
				}
			},
			emoji() {
				this.isemoji = !this.isemoji
				this.ismore=true
				this.isrecord = false
				setTimeout(() => {
					this.getElementHeight()
				}, 0)
			},
			more(){
				this.ismore = !this.ismore
				this.isemoji=true
				this.isrecord = false
				setTimeout(() => {
					this.getElementHeight()
				}, 0)
			},
			inputs(e) {
				let chatm = e.detail.value;
				let pos = chatm.indexOf('\n')
				if (pos != -1 && chatm.length > 1) {
					this.send(this.msg, 0)
				}
			},
			sendImage(e){
				let count =9
				if(e =='album'){
					count =9
				}else{
					count =1
				}
				uni.chooseImage({
				    count: count, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [e], //从相册选择
				    success: (res)=> {
						const filePaths =res.tempFilePaths
						for(let i =0;i<filePaths.length;i++){
							this.send(filePaths[i],1)
						}
				    }
				});
			},
			send(msg, type) {
				let data = {
					message: msg,
					types: type
				}
				this.$emit('inputs', data)
				setTimeout(() => {
					this.msg = ""
				}, 0)
			},
			touchstart(){
				let i =0
				this.timer =setInterval(()=>{
					i++
					if(i>10){
						clearInterval(this.timer)
					}
				},1000)
				recorderManager.start()
			},
			touchend (){
				clearInterval(this.timer)
				recorderManager.stop()
				recorderManager.onStop((res)=>{
					let data ={
						voice:res.tempFilePath,
						time:this.vlength
					}
					console.log(data)
					this.send(data,2)
				})
			}
		}
	}
</script>

<style lang="scss">
	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid $uni-border-color;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.displaynone {
		display: none;
	}

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}

		.record {
			text-align: center;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
		}

	}

	.emoji {
		width: 100%;
		height: 460rpx;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, 0.1);
	}
	.more{
		width: 100%;
		height: 436rpx;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0 -1rpx 0 0 rgba(0, 0, 0, 0.1);
		bottom: env(safe-area-inset-bottom);
		padding:8rpx 20rpx;
		box-sizing: border-box;
		.more-list{
			width: 25%;
			text-align: center;
			float: left;
			padding-top: 32rpx;
			image {
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background: rgba(255,255,255,1);
				border-radius: 24rpx;
			}
			.more-list-title{
				font-size: 24rpx;
				color: rgba(39,40,50,0.5);
				line-height: 34rpx ;
			}
		}
	}
</style>
