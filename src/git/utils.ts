import { Exec } from '../types'

export async function setup(exec: Exec, env: NodeJS.ProcessEnv) {
  await exec('git config --global user.email github-actions[bot]@users.noreply.github.com')
  await exec('git config --global user.name github-actions[bot]')

  await exec(
    `git remote add origin-authed https://${env.GITHUB_ACTOR}:${env.INPUT_GITHUB_TOKEN}@github.com/${env.GITHUB_REPOSITORY}.git`,
  )
}

export async function pushAllChangesToGit(exec: Exec) {}
