import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import TabsPane from '../../src/tabs/tabs-pane'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('TabsPane.vue', () => {
    it('TabsPane 存在.', () => {
        expect(TabsPane).to.be.exist
    })
})