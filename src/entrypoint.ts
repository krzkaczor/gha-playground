import * as core from '@actions/core'
import * as github from '@actions/github'

export async function action() {
  const ctx = github.context
  console.log(`Hello world!`)
  console.log(JSON.stringify(ctx))
}

action().catch((e) => {
  console.log('Error happened:', e)
  // in case of error mark action as failed
  core.setFailed(e.message)
})
