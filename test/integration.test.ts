import { expect } from 'earljs'
import { readFileSync } from 'fs-extra'
import { join } from 'path'

import { action } from '../src/action'
import { getFilteringExec, makeWorkspace } from './helpers'

describe('integration', () => {
  it.only('creates new deploy branch', async () => {
    const workspaceFiles = {
      'action.yml': `name: 'action for tests'`,
      'dist/index.js': `console.log('test!')`,
      '.gitignore': 'dist/index.js',
    }
    const { exec, git, workspacePath } = await makeWorkspace(workspaceFiles)
    const filteringExec = getFilteringExec(exec)

    await exec('git add .gitignore action.yml')
    await exec('git commit -m init')

    await action(
      { cwd: workspacePath, env: {}, exec: filteringExec },
      { branchName: 'action', files: ['action.yml', 'dist/index.js'] },
    )

    const distIndexContents = readFileSync(join(workspacePath, 'dist/index.js'), 'utf-8')
    expect(distIndexContents).toEqual(workspaceFiles['dist/index.js'])

    const status = await git.status()
    // .gitignore should be not tracked on this branch
    // @todo due to earl back this requires ...
    expect({ ...status }).toBeAnObjectWith({ created: [], deleted: [], modified: [], not_added: ['.gitignore'] })

    const branchesInfo = await git.branch()
    // @todo due to earl back this requires ...
    expect({ ...branchesInfo }).toBeAnObjectWith({ all: ['action', 'master'], current: 'action' })

    const exactOutput = await exec('git diff-tree --no-commit-id --name-status -r HEAD')
    expect(exactOutput).toMatchSnapshot()
  })

  it('pushes to already existing branch', async () => {
    const workspaceFiles = {
      'action.yml': `name: 'action for tests'`,
      'dist/index.js': `console.log('test!')`,
      '.gitignore': 'dist/index.js',
    }
    const { exec, git, workspacePath } = await makeWorkspace(workspaceFiles)
    const filteringExec = getFilteringExec(exec)

    await exec('git add .gitignore action.yml')
    await exec('git commit -m init')
    // create action branch and switch back to master
    await exec('git checkout -b action')
    await exec('git checkout master')

    await action(
      { cwd: workspacePath, env: {}, exec: filteringExec },
      { branchName: 'action', files: ['action.yml', 'dist/index.js'] },
    )

    const distIndexContents = readFileSync(join(workspacePath, 'dist/index.js'), 'utf-8')
    expect(distIndexContents).toEqual(workspaceFiles['dist/index.js'])

    const status = await git.status()
    // .gitignore should be not tracked on this branch
    // @todo due to earl back this requires ...
    expect({ ...status }).toBeAnObjectWith({ created: [], deleted: [], modified: [], not_added: [] })

    const branchesInfo = await git.branch()
    // @todo due to earl back this requires ...
    expect({ ...branchesInfo }).toBeAnObjectWith({ all: ['action', 'master'], current: 'action' })

    const exactOutput = await exec('git diff-tree --no-commit-id --name-status -r HEAD')
    expect(exactOutput).toMatchSnapshot()
  })
})
