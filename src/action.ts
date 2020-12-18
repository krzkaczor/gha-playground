import { fstat } from 'fs-extra'
import { dirSync as tmp } from 'tmp'
import { newPristineBranch, setup } from './git/utils'
import { Exec } from './types'
import { copySync } from 'fs-extra'
import { join } from 'path'

interface ActionCtx {
  exec: Exec
  env: NodeJS.ProcessEnv
  cwd: string
}

interface Options {
  branchName: string
  files: string[]
}

export async function action(ctx: ActionCtx, options: Options) {
  const tmpDir = tmp().name
  console.log('Tmp dir: ', tmpDir)

  // copy deploy files away
  for (const file of options.files) {
    copySync(join(ctx.cwd, file), join(tmpDir, file))
  }

  setup(ctx.exec, ctx.env)
  newPristineBranch(ctx.exec, options.branchName)

  // copy files back

  ctx.exec(`git add -A`)
  ctx.exec(`git commit -m "Automated release" -a`)
  ctx.exec(`git push origin-authorized`)

  // 1. copy files away
  // 2. newPristingeBranch or switch
  // 3. remove all files
  // 4. add & commit & push
  // git add --force dist/index.js
  //         git add action.yml README.md
  //         git stash
  //         git fetch --all
  //         git checkout action
  //         git checkout stash -- .
  //         git commit -m "Automated release" -a
}
