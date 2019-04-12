### uploader.vue

```
<template>
    <div class="gulu-uploader">
        <div @click="onClickUpload" ref="trigger">
            <slot></slot>
        </div>
        <div ref="temp" style="width:0;height:0;overflow: hidden;"></div>
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
            }
        },
        methods:{
            onClickUpload(){
                let input = document.createElement('input');
                input.type = 'file';
                this.$refs.temp.appendChild(input);
                input.addEventListener('change',()=>{
                    let file = input.files[0]
                    input.remove()
                    console.log(file)

                    let formData = new FormData();
                    formData.append(this.name,file)

                    var xhr = new XMLHttpRequest()
                    xhr.open(this.method,this.action)
                    xhr.onload = function(){
                        console.log(xhr.response)
                    }
                    xhr.send(formData)

                })
                input.click()
            }
        }
    }
</script>

<style scoped lang="scss">
.gulu-uploader{
    border:1px solid red;
}
</style>
```

demo.vue

```
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
```

#### HTTP协议传输的是什么？

server.js

```
res.send(JSON.stringify(object)); // 序列化
```

uploader.vue

```
xhr.onload = function(){
    console.log(xhr.response)
    let object = JSON.parse(xhr.response) // 反序列化
}
```

> #### 为什么服务器不直接把对象传递给前端？

- 因为 HTTP 只支持字符串 (http协议是一个字符串协议)
- 或者二进制如图片
- 除此之外所有的格式都要你自己去约定 如JSON格式