import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import TabsItem from '../../src/tabs/tabs-item'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('TabsItem.vue', () => {
    it('TabsItem 存在.', () => {
        expect(TabsItem).to.be.exist
    })
})