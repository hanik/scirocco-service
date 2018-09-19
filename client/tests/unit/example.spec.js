import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg }
        })
        expect(wrapper.text()).toMatch(msg)
    })
})



// export VUE_CLI_BABEL_TARGET_NODE=true
// export VUE_CLI_BABEL_TRANSPILE_MODULES=true
// ./node_modules/jest/bin/jest.js --clearCache
// node --inspect-brk ./node_modules/jest/bin/jest.js -i