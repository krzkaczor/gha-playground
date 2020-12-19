import { ensureDirSync, writeFileSync } from 'fs-extra'
import { dirname, join } from 'path'
import simpleGit, { SimpleGit } from 'simple-git/promise'
import { dirSync as tmp } from 'tmp'

import { Exec, getExec } from '../../src/exec'

export async function makeWorkspace(
  files: Record<string, string>,
): Promise<{ exec: Exec; workspacePath: string; git: SimpleGit }> {
  const workspacePath = tmp().name
  const git = simpleGit(workspacePath)

  writeFiles(files, workspacePath)
  await git.init()
  const exec = getExec(workspacePath)

  return { exec, git, workspacePath }
}

/**
 * Skips side effects that would require real git remote
 */
export function getFilteringExec(realExec: Exec): Exec {
  return (...args: any[]) => {
    // ignore git pushes
    if (args[0].startsWith('git push')) {
      return // do nothing because push will fail anyway
    }
    if (args[0].startsWith('git remote')) {
      return // do nothing because push will fail anyway
    }
    if (args[0].startsWith('git ls-remote --heads origin')) {
      return 'git branch --list' + args[0].slice('git ls-remote --heads origin'.length)
    }
    return (realExec as any)(...args)
  }
}

function writeFiles(workspaceFiles: Record<string, string>, path: string) {
  for (const [filePath, contents] of Object.entries(workspaceFiles)) {
    const fullPath = join(path, filePath)
    ensureDirSync(dirname(fullPath))
    writeFileSync(fullPath, contents)
  }
}
