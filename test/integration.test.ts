import { ensureDirSync, writeFileSync } from 'fs-extra'
import { dirname, join } from 'path'
import simpleGit from 'simple-git/promise'
import { dirSync as tmp } from 'tmp'
import { expect } from 'earljs'

import { action } from '../src/action'
import { Exec, getExec } from '../src/exec'

describe('integration', () => {
  it('works', async () => {
    const workspace = tmp().name
    console.log('Workspace: ', workspace)
    const git = simpleGit(workspace)
    const workspaceFiles = {
      'action.yml': `name: 'action for tests'`,
      'dist/index.js': `console.log('test!')`,
      '.gitignore': 'dist/index.js',
    }
    writeFiles(workspaceFiles, workspace)
    await git.init()
    const realExec = getExec(workspace)
    await realExec('git add .gitignore action.yml')
    await realExec('git commit -m init')

    const filteringExec: Exec = (...args: any[]) => {
      // ignore git pushes
      if (args[0].startsWith('git push')) {
        return // do nothing because push will fail anyway
      }
      return (realExec as any)(...args)
    }

    await action(
      { cwd: workspace, env: {}, exec: filteringExec },
      { branchName: 'action', files: ['action.yml', 'dist/index.js'] },
    )

    const exactOutput = await realExec('git diff-tree --no-commit-id --name-status -r HEAD')
    expect(exactOutput).toMatchSnapshot()
  })
})

function writeFiles(workspaceFiles: Record<string, string>, path: string) {
  for (const [filePath, contents] of Object.entries(workspaceFiles)) {
    const fullPath = join(path, filePath)
    ensureDirSync(dirname(fullPath))
    writeFileSync(fullPath, contents)
  }
}
