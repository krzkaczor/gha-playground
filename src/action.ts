import { copySync } from 'fs-extra'
import { join } from 'path'
import { dirSync as tmp } from 'tmp'

import { Exec } from './exec'
import { newPristineBranch, setup } from './git/utils'

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
    const fullOutputPath = join(tmpDir, file)

    // ensureDirSync(dirname(fullOutputPath))
    copySync(join(ctx.cwd, file), fullOutputPath)
  }

  await setup(ctx.exec, ctx.env)
  await newPristineBranch(ctx.exec, options.branchName)

  // copy files back
  for (const file of options.files) {
    await ctx.exec(`git add --force ${file}`)
  }

  await ctx.exec(`git commit -m "Automated release" -a`)
  await ctx.exec(`git push origin-authorized`)
}
