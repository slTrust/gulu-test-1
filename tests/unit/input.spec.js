import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Input from '../../src/input'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('Input.vue', () => {
    it('Input存在.', () => {
        expect(Input).to.be.exist
    })
})