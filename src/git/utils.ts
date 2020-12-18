import { Exec } from '../types'

export async function setup(exec: Exec, env: NodeJS.ProcessEnv) {
  await exec('git config --global user.email github-actions[bot]@users.noreply.github.com')
  await exec('git config --global user.name github-actions[bot]')

  await exec(
    `git remote add origin-authorized https://${env.GITHUB_ACTOR}:${env.INPUT_GITHUB_TOKEN}@github.com/${env.GITHUB_REPOSITORY}.git`,
  )
}

export async function newPristineBranch(exec: Exec, branchName: string) {
  await exec(`git checkout --orphan ${branchName}`)
  await exec('git reset') // remove all files from staging area
  await exec('git commit --allow-empty -m "Root commit"')
  await exec(`git push origin-authorized ${branchName}`)
}
