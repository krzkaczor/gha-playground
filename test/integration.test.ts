import { mockFn } from 'earljs'
import { assert } from 'ts-essentials'
import { action } from '../src/action'
import { Exec } from '../src/types'

const event = require('./fixtures/validEvent.json')

describe('integration', () => {
  it.only('works', async () => {
    const cwd = process.cwd()
    const execMock = mockFn<Exec>().resolvesTo(0)

    await action({ cwd, exec: execMock, octokit: null as any, ctx: event })
  })
})
