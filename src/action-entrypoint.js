const { join } = require('path')
require('ts-node').register({ project: join(__dirname, '../tsconfig.prod.json') })

const { action } = require('index.ts')

const core = require('@actions/core')
action().catch((e) => {
  console.log('Error happened:', e)
  // in case of error mark action as failed
  core.setFailed(e.message)
})
