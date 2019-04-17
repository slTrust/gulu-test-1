import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import TabsBody from '../../src/tabs/tabs-body'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('TabsBody.vue', () => {
    it('TabsBody 存在.', () => {
        expect(TabsBody).to.be.exist
    })
})