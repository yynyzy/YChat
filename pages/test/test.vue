<template>
	<view>
		<view class="upload"  @tap="upload()">
			上传图片
		</view>
		<image v-for="(item,index) in img" :key="index" :src="item"></image>
	</view>
</template>

<script>
		import myfun from "../../commons/js/myfun.js"
	export default {
		data() {
			return {
				id:'dad',
				img:[]
			}
		},
		methods: {
			upload:function(){
				let url =myfun.filename(new Date)
				uni.chooseImage({
					count:9,
					sizeType:['original','compressed'],
					sourceType:['album','camera'],
					success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
							for(let i =0;i<tempFilePaths.length;i++){
								const uploadTask = uni.uploadFile({
								    url: this.serverUrl + "files/upload", //仅为示例，非真实的接口地址
								    filePath: tempFilePaths[i],
								    name: 'file',
								    formData: {
								       url:url,
										name:new Date().getTime()+this.id+i
								    },
								    success: (uploadFileRes) => {
										console.log(uploadFileRes)
										let path =this.serverUrl+uploadFileRes.name
										this.img.push(path)
								    }
								});			
								uploadTask.onProgressUpdate((res) => {
									console.log(this.img)
									console.log(uploadFileRes.data)
								    // console.log('上传进度' + res.progress);
								    // console.log('已经上传的数据长度' + res.totalBytesSent);
								    // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
								});
							}
					       
					    }
			})
		}}
	}
</script>

<style lang="scss">
.upload{
	padding-top: 40rpx;
	text-align: center;
}
</style>
