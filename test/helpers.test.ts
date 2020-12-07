import { expect } from 'earljs'

import { getContextBody } from '../src/helpers'

const event = require('./fixtures/validEvent.json')

describe('getContextBody', () => {
  it('works', () => {
    expect(getContextBody(event)).toEqual('@all-contributors please add @user123 for doc')
  })
})
