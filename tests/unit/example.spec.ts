import { shallowMount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props) {
    return () => {
      return h('div', props.msg);
    };
  }
});

beforeAll(() => {
  console.log('before all');
});
afterAll(() => {
  console.log('after all');
});
beforeEach(() => {
  console.log('before each');
});
afterEach(() => {
  console.log('after each');
});

describe('test HelloWorld', () => {
  beforeAll(() => {
    console.log('before test HelloWorld');
  });
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it('test asynchronous function', (done) => {
    setTimeout(() => {
      expect(1 + 1).toBe(2);
      done();
    }, 200);
  });
});
