import * as core from '@actions/core'
import { exec } from '@actions/exec'

import { action } from './action'

export async function entrypoint() {
  const cwd = process.cwd()
  const env = process.env

  await action({ cwd, exec, env })
}

entrypoint().catch((e) => {
  console.log('Error happened:', e)
  // in case of error mark action as failed
  core.setFailed(e.message)
})
