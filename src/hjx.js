function fn(n){

    if(n<10){
        console.log('low')
        if(n<5){
            return '很小'
        }else{
            return '小'
        }
    }else{
        console.log('high')
        return '大'
    }
}

export default fn