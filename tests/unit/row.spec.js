import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Row from '../../src/grid/row'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('Row.vue', () => {
    it('Row存在.', () => {
        expect(Row).to.be.exist
    })
})