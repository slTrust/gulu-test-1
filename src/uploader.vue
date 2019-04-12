<template>
    <div class="gulu-uploader">
        <div @click="onClickUpload" ref="trigger">
            <slot></slot>
        </div>
        <div ref="temp" style="width:0;height:0;overflow: hidden;"></div>
        <ol>
            <li v-for="file in fileList" :key="file.name">
                <img :src="file.url" width="100" height="100" alt="">{{file.name}}
                <button @click="onRemoveFile(file)">x</button>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "GuluUploader",
        props:{
            name:{
                type:String,
                required:true
            },
            action:{
                type:String,
                required:true
            },
            method:{
                type:String,
                default:'POST'
            },
            parseResponse:{ // 响应解析函数
                type:Function,
                required:true
            },
            fileList:{
                type:Array,
                default: ()=> []
            }
        },
        data(){
            return {
                url:'about:blank'
            }
        },
        methods:{
            onClickUpload(){
                let input = this.createInput();
                input.addEventListener('change',()=>{
                    let file = input.files[0];
                    this.uploadFile(file)
                    input.remove()
                })
                input.click()
            },
            onRemoveFile(file){
                let answer = window.confirm('你确定要删除这玩意吗')
                if (answer){
                    let copy = [...this.fileList]
                    let index = copy.indexOf(file)
                    copy.splice(index,1)
                    this.$emit('update:fileList',copy)
                }

            },
            uploadFile(file){
                let formData = new FormData();
                formData.append(this.name,file);
                let {name,size,type} = file;
                this.doUploadFile(formData,(response)=>{
                    let url = this.parseResponse(response);
                    this.url = url;
                    while(this.fileList.filter(f=>f.name === name).length > 0){
                        let dotIndex = name.lastIndexOf('.');
                        let nameWithoutExtension = name.substring(0,dotIndex);
                        let extension = name.substring(dotIndex);
                        name = nameWithoutExtension + '(1)' + extension;
                    }
                    // 合并之前的 fileList
                    this.$emit('update:fileList',[...this.fileList,{name,type,size,url}])
                })
            },
            doUploadFile(formData,success){
                var xhr = new XMLHttpRequest()
                xhr.open(this.method,this.action)
                xhr.onload = ()=>{
                    // let object = JSON.parse(xhr.response) // 反序列化
                    // let url = `http://localhost:3000/preview/${object.id}` // 耦合  ==》 解耦 ——————解析函数
                    success(xhr.response)
                }
                xhr.send(formData)
            },
            createInput(){
                let input = document.createElement('input');
                input.type = 'file';
                this.$refs.temp.appendChild(input);
                return input
            }
        }
    }
</script>

<style scoped lang="scss">
.gulu-uploader{
}
</style>