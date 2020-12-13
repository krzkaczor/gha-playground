import { Exec } from '../types'

export async function pushAll(exec: Exec) {
  await exec('git config --global user.email github-actions[bot]@users.noreply.github.com')
  await exec('git config --global user.name github-actions[bot]')
  await exec('git checkout master')

  await exec('git add -A')
  await exec('git commit -m Auto commit')

  await exec('git push')
}
