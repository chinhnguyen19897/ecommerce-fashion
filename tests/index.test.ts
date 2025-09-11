import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import FormInput from '~/components/base/FormInput.vue'

describe('InputField.vue', () => {
  it('renders label correctly', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'username',
        name: 'username',
        label: 'User Name',
        forLabel: 'username',
        type: 'text',
        placeholder: 'Enter name'
      }
    })

    expect(wrapper.text()).toContain('User Name')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter name')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'username',
        name: 'username',
        label: 'User Name',
        forLabel: 'username',
        type: 'text'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('hello world')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello world'])
  })

  it('emits onblur when input loses focus', async () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'username',
        name: 'username',
        label: 'User Name',
        forLabel: 'username',
        type: 'text'
      }
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.emitted('onblur')).toBeTruthy()
  })
})
