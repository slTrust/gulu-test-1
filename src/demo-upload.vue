<template>
    <div>
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
            <button>上传</button>
            <template slot="tips">
                <div>只能上传 300kb 以内的 png、jpeg文件</div>
            </template>
        </g-uploader>
        <button>保存</button>
    </div>
</template>

<script>
    import GUploader from './uploader'
    export default {
        name: "demo-upload.vue",
        components:{GUploader},
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

<style scoped>

</style>