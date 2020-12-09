import { expect } from 'earljs'

import { getCommentBody } from '../src/helpers'

const event = require('./fixtures/validEvent.json')

describe('getContextBody', () => {
  it('works', () => {
    expect(getCommentBody(event)).toEqual('@all-contributors please add @user123 for doc')
  })
})
