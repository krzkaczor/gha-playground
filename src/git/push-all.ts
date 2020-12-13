import simpleGit from 'simple-git/promise'
const git = simpleGit()

export async function pushAll() {
  await git.addConfig('user.email', 'github-actions[bot]@users.noreply.github.com')
  await git.addConfig('user.name', 'github-actions[bot]')
  await git.checkoutBranch('master', 'origin/master')

  const s = await git.status()
  await git.add(s.modified)
  await git.commit('Auto commit')
  const remote = `https://${process.env.GITHUB_ACTOR}:${process.env.INPUT_GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`
  await git.push(remote, 'master')
}
