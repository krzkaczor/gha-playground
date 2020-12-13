import { getOctokit } from '@actions/github'
import { mockFn } from 'earljs'
import { join } from 'path'

import { action } from '../src/action'
import { Exec } from '../src/types'
import { Context } from './helpers/GithubCtxFromEvent'
import { nockTest } from './nockTest'

const event = require('./fixtures/validEvent.json')

describe('integration', () => {
  it(
    'works',
    nockTest(async () => {
      const octokit = getOctokit('NOT_EXISTING_TOKEN')
      const cwd = join(__dirname, '../example')
      const execMock = mockFn<Exec>().resolvesTo(0)
      const ctx = new Context(event)

      await action({ cwd, exec: execMock, octokit, ctx })
    }),
  )
})
