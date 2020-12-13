import * as core from '@actions/core'
import * as github from '@actions/github'
import { exec } from '@actions/exec'

import { action } from './action'
import { getOctokit } from './github/octokit'

export async function entrypoint() {
  const ctx = github.context
  const octokit = getOctokit()
  const cwd = process.cwd()

  await action({ cwd, ctx, octokit, exec })
}

entrypoint().catch((e) => {
  console.log('Error happened:', e)
  // in case of error mark action as failed
  core.setFailed(e.message)
})
