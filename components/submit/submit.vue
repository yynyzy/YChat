<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @tap="records">
					<image :src="toc"></image>
				</view>
				<textarea auto-height="true" class="chat-send btn" :class="{displaynone:isrecord}" @input="inputs" v-model="msg"/>
				<view class="record btn" :class="{displaynone:!isrecord}">
					按住说话
				</view>
				<view class="bt-img" @tap="emoji()">
					<image src="../../static/submit/bq.png"></image>
				</view>
				<view class="bt-img">
					<image src="../../static/submit/tj.png"></image>
				</view>
			</view>
			<view class="emoji" :class="{displaynone:isemoji}">
				表情
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "submit",
		data() {
			return {
				isemoji: true,
				isrecord: false,
				toc: "../../static/submit/yy.png",
				msg: ""
			};
		},
		methods: {
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights',data.height)
				}).exec();
			},
			records() {
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
				setTimeout(() => {
					this.getElementHeight()
				}, 0)
			},
			inputs(e) {
				let chatm = e.detail.value;
				let pos = chatm.indexOf('\n')
				if (pos != -1 && chatm.length > 1) {
					this.$emit('inputs', this.msg)
					setTimeout(() => {
						this.msg = ""
					}, 0)

				}
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
		padding-bottom: var(--status-bar-height);
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
		box-shadow: 0 -1 0 0 rgba(0, 0, 0, 0.1);
	}
</style>
