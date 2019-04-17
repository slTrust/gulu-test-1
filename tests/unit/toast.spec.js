import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Toast from '../../src/toast'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('Toast.vue', () => {
    it('Toast 存在.', () => {
        expect(Toast).to.be.exist
    })
})