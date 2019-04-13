<template>
    <div style="margin:20px;">
        <div>只能上传 300kb 以内的 png、jpeg文件</div>
        <!--
        action="https://upload-server01.herokuapp.com/upload"
        -->
        <g-uploader
                accept="image/*"
                action="http://localhost:3000/upload"
                name="file"
                :file-list.sync="fileList"
                method="POST"
                :parse-response="parseResponse"
        >
            <!-- 默认的slot 可以 不写 成这样
            <template slot="default">
                <button>上传</button>
            </template>
             -->
            <g-button icon="upload">上传</g-button>
        </g-uploader>
    </div>
</template>

<script>
    import GButton from './button/button'
    import GUploader from './uploader'
    export default {
        name: "demo-upload.vue",
        components:{GUploader,GButton},
        data(){
            return {
                fileList:[]
            }
        },
        methods:{
            parseResponse(response){
                let object = JSON.parse(response);
                let url = `http://127.0.0.1:3000/preview/${object.id}`;

                return url;
            }
        }
    }
</script>

<style>
    * {margin: 0; padding: 0; box-sizing: border-box;}
</style>