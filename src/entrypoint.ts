import * as core from '@actions/core'
import * as github from '@actions/github'

import { addContributions } from './all-contributors/cli/addContributors'
import { findConfig } from './all-contributors/cli/findConfig'
import { generateContributorsListIntoMarkdown } from './all-contributors/cli/generate'
import { parseComment } from './all-contributors/parseComment'
import { pushAll } from './git/push-all'
import { getCommentBody } from './helpers'

export async function action() {
  const ctx = github.context
  const comment = getCommentBody(ctx)
  if (!comment) {
    throw new Error("Comment body couldn't be found. Did you setup action to run on `issue_comment` event?")
  }

  const cwd = process.cwd()

  const configPath = findConfig(cwd)
  if (!configPath) {
    throw new Error("Can't find all contributors config file!")
  }

  const contributions = parseComment(comment)
  console.log(JSON.stringify(contributions))
  await addContributions(configPath, contributions)
  await generateContributorsListIntoMarkdown({ configPath, cwd })

  await pushAll()
}

action().catch((e) => {
  console.log('Error happened:', e)
  // in case of error mark action as failed
  core.setFailed(e.message)
})
