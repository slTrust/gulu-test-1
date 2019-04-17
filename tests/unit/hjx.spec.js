import { expect } from 'chai'
import fn from '../../src/hjx'

describe('分支覆盖率演示',()=>{

    it('存在',()=>{
        expect(fn).to.exist
    })

    it('小',()=>{
        let result = fn(5)
        expect(result).to.equal('小')
    })

    it('大',()=>{
        let result = fn(15);
        expect(result).to.equal('大');
    })

})