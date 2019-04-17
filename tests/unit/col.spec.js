import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Col from '../../src/grid/col'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('Col.vue', () => {
    it('col存在.', () => {
        expect(Col).to.be.exist
    })
})