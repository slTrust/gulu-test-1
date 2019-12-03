<script lang="jsx">
    export default {
        name:'demo-jsx',
        data(){
            return {
                n:123,
                items:[1,2,3,4,5]
            }
        },
        /*
        render(createElement){
            // <h1>标题</h1>
            return createElement(
                'h1',   // 标签名称
                '标题' , // text
            )

            // <h1>你好<span>hello</span></h1>
            return createElement(
                'h1',   // 标签名称
                [
                    '你好',
                    createElement('span','hello')
                ],
            )
        }
        */

        // jsx
        /*
        render(h) {
            return (
                <h1>
                    你好
                    <span>hello</span>
                </h1>
            );
        }
        */

        render( h ){
            return (
                // 注意这里是 class 如果是 react就是 className
                <div class="xxx">
                    {this.n > 10 ?<h1>大</h1>:<h6>小</h6>}
                    <ul>
                        {this.items.map(i =>{
                            return <li>{i}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }
</script>
<style scoped lang="scss">
    .xxx{
        color:red;
    }
</style>