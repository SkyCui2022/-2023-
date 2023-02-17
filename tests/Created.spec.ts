import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Created from '../src/view/Created.vue'
test('第一个测试', async () => {
  expect(1 + 1).toBe(2)
})

const wrapper = shallowMount(Created)
// test('第一个测试', async () => {
//   console.log(wrapper.classes('title'))
// })
