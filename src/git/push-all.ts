import simpleGit from 'simple-git/promise'
const git = simpleGit()

export async function pushAll() {
  const s = await git.status()
  await git.add(s.modified)
  await git.commit('Auto commit')
  await git.push()
}
