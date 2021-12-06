<template>
	<view>
		<view class="upload"  @tap="upload()">
			上传图片
		</view>
		<image v-for="(item,index) in img" :key="index" :src="item"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'dad',
				img:[]
			}
		},
		methods: {
			upload:function(){
				uni.chooseImage({
					count:9,
					sizeType:['original','compressed'],
					sourceType:['album','camera'],
					success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
							for(let i =0;i<tempFilePaths.length;i++){
								const uploadTask = uni.uploadFile({
								    url: 'http://localhost:3000/files/upload', //仅为示例，非真实的接口地址
								    filePath: tempFilePaths[i],
								    name: 'file',
								    formData: {
								       url:'user',
										name:new Date().getTime()+this.id+i
								    },
								    success: (uploadFileRes) => {
										let path ='user/'+uploadFileRes.data
										this.img.push('http://localhost:3000/'+path)
								       console.log(uploadFileRes.data)
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
