<template>
    <div>
        <g-uploader
                accept="image/*"
                action="https://upload-server01.herokuapp.com/upload"
                name="file"
                fileList.sync="fileList"
                method="POST"
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

            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>