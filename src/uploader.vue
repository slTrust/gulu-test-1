<template>
    <div class="gulu-uploader">
        <div @click="onClickUpload" ref="trigger">
            <slot></slot>
        </div>
        <ol class="gulu-uploader-fileList">
            <li v-for="file in fileList" :key="file.name">
                <template v-if="file.status === 'uploading' ">
                    <g-icon name="loading" class="gulu-uploader-spin"></g-icon>
                </template>
                <template v-else-if="file.type.indexOf('image')===0">
                    <img class="gulu-uploader-image" :src="file.url" width="32" height="32" alt="">
                </template>
                <template v-else>
                    <div class="gulu-uploader-defaultImage"></div>
                </template>
                <span class="gulu-uploader-name" :class="{[file.status]:file.status}">{{file.name}}</span>
                <button class="gulu-uploader-remove" @click="onRemoveFile(file)">x</button>
            </li>
        </ol>
        <div ref="temp" style="width:0;height:0;overflow: hidden;"></div>

    </div>
</template>

<script>
    import GIcon from './icon'
    export default {
        name: "GuluUploader",
        components:{GIcon},
        props:{
            name: {type: String, required: true},
            action: {type: String, required: true},
            method: {type: String, default: 'POST'},
            parseResponse: {type: Function, required: true}, // 响应解析函数
            fileList:{type: Array, default: () => []},
            sizeLimit: {type: Number},
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
                    this.uploadFile(input.files[0])
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
            beforeUploadFile(rawFile,newName){
                let {type,size} = rawFile;
                if(size> this.sizeLimit){
                    this.$emit('error','文件大于2MB')
                    return false;
                }else{
                    this.$emit('update:fileList',[...this.fileList,{name:newName,type,size,status:'uploading'}])
                    return true;
                }
            },
            afterUploader(newName,url){
                let file =  this.fileList.filter( f => f.name === newName )[0]
                let index = this.fileList.indexOf(file);
                let fileCopy = JSON.parse(JSON.stringify(file))
                fileCopy.url = url
                fileCopy.status = 'success'
                let fileListCopy = [...this.fileList];
                fileListCopy.splice(index,1,fileCopy)
                console.log(fileListCopy)
                this.$emit('update:fileList',fileListCopy)
            },
            uploadFile(rawFile){
                let {name,size,type} = rawFile;
                let newName = this.generateName(name);
                if(!this.beforeUploadFile(rawFile,newName)) return;
                let formData = new FormData();
                formData.append(this.name,rawFile);
                this.doUploadFile(formData,(response)=>{
                    let url = this.parseResponse(response);
                    this.url = url;
                    this.afterUploader(newName,url)
                },(xhr)=>{
                    this.uploadError(xhr,newName);
                })
            },
            uploadError(xhr,newName){
                let file = this.fileList.filter( f=> f.name===newName)[0];
                let index = this.fileList.indexOf(file)
                let fileCopy = JSON.parse(JSON.stringify(file))
                fileCopy.status = 'fail';
                let fileListCopy = [...this.fileList]
                fileListCopy.splice(index,1,fileCopy)
                this.$emit('update:fileList',fileListCopy)
                let error = '';
                if(xhr.status === 0){
                    error = '网络无法连接'
                }
                this.$emit('error',error);
            },
            generateName(name){
                while(this.fileList.filter(f=>f.name === name).length > 0){
                    let dotIndex = name.lastIndexOf('.');
                    let nameWithoutExtension = name.substring(0,dotIndex);
                    let extension = name.substring(dotIndex);
                    name = nameWithoutExtension + '(1)' + extension;
                }
                return name;
            },
            doUploadFile(formData,success,fail){

                var xhr = new XMLHttpRequest()
                xhr.open(this.method,this.action)
                xhr.onload = ()=>{
                    success(xhr.response)
                }
                xhr.onerror = ()=>{
                    fail(xhr,xhr.status)
                }
                xhr.send(formData)
            },
            createInput(){
                // 用户点击取消后 input也生成了
                // 最简单的是这个 让里面的内容为空
                this.$refs.temp.innerHTML = '';
                let input = document.createElement('input');
                input.type = 'file';
                this.$refs.temp.appendChild(input);
                return input
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .gulu-uploader{
        &-fileList{
            list-style: none;
            > li{
                display: flex;
                align-items: center;
                margin:8px 0;
                border:1px solid darken($grey,10%);
            }
        }
        &-defaultImage{
            border:1px solid red;
            width: 32px;
            height: 32px;
            margin-right: 8px;
        }
        &-image{
            margin-right: 8px;
            border:none;
        }
        &-name{
            margin-right: auto;
            &.success{color:green;}
            &.fail{color:red;}
            &.success{color:green;}
        }
        &-remove{
            width: 32px;
            height: 32px;
        }
        &-spin{
            width: 32px;
            height: 32px;
            @include spin;
        }
    }
</style>