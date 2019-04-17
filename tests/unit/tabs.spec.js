import chai,{ expect } from 'chai'
import { shallowMount,mount } from '@vue/test-utils'
import Tabs from '../../src/tabs/tabs'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('Tabs.vue', () => {
    it('Tabs存在.', () => {
        expect(Tabs).to.be.exist
    })
})