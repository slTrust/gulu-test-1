import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import TabsHead from '../../src/tabs/tabs-head'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('TabsHead.vue', () => {
    it('TabsHead存在.', () => {
        expect(TabsHead).to.be.exist
    })
})