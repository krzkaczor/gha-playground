import { writeFileSync } from 'fs-extra'
import { join } from 'path'
import { dirSync as tmp } from 'tmp'
import { exec } from '@actions/exec'

import simpleGit from 'simple-git/promise'
import { action } from '../src/action'

describe('integration', () => {
  it('works', async () => {
    const workspace = tmp().name
    console.log({ workspace })
    const git = simpleGit(workspace)
    const workspaceFiles = {
      'a.txt': 'aaaa',
      'b.txt': 'bbbb',
      '.gitignore': 'a.txt',
    }
    writeFiles(workspaceFiles, workspace)
    await git.init()

    const mockExec = (...args: any[]) => {
      if (args[0].startsWith('git push')) {
        return // do nothing
      }
      ;(exec as any)(...args)
    }

    action({ cwd: workspace, env: {}, exec }, { branchName: 'action', files: ['a.txt'] })
  })
})

function writeFiles(workspaceFiles: Record<string, string>, path: string) {
  for (const [filePath, contents] of Object.entries(workspaceFiles)) {
    const fullPath = join(path, filePath)
    writeFileSync(fullPath, contents)
  }
}
