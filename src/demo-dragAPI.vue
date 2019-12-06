<template>
    <div style="margin:20px;position:relative;">
        <div id="test" draggable="true" style="height:100px;width:100px;border:1px solid red;position:absolute;left:0;top:0;">test</div>
    </div>
</template>

<script>
    export default {
        mounted(){
            let test = document.querySelector('#test');
            let startPosition
            let endPosition 
            test.addEventListener('dragstart',(e)=>{
                let {clientX:x,clientY:y} = e
                startPosition = [x,y];
                setTimeout(()=>{
                    test.classList.add('hide');
                })
            })
            test.addEventListener('dragend',(e)=>{
                let {clientX:x,clientY:y} = e
                endPosition = [x,y];
                let deltaX = endPosition[0] - startPosition[0];
                let deltaY = endPosition[1] - startPosition[1];
                let {left,top} = window.getComputedStyle(test);
                test.style.left = parseInt(left) +  deltaX + 'px';
                test.style.top = parseInt(top) + deltaY + 'px';
                setTimeout(()=>{
                    test.classList.remove('hide')
                })
            })
        }
    }
</script>

<style lang="scss">
    #test{}
    .hide{ transform:translateY( -9999px)}
    *{margin:0;padding:0;box-sizing:border-box;}
</style>