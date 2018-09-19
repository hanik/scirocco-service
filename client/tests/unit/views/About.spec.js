import { shallowMount } from '@vue/test-utils';
import About from '@/views/About.vue';


describe('About.vue', () => {
  it('show message when rendered', () => {
    const msg = 'This is an about page';
    const wrapper = shallowMount(About);
    expect(wrapper.find('h1').text()).toMatch(msg);
  });
});
