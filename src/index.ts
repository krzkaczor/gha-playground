import * as core from '@actions/core'

export function action() {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet')
  console.log(`Hello ${nameToGreet}!`)
  const time = new Date().toTimeString()
  core.setOutput('time', time)
}
