// import { assert } from 'ts-essentials'

// import { addContributions } from '../src/all-contributors/cli/addContributors'
// import { findConfig } from '../src/all-contributors/cli/findConfig'
// import { generateContributorsListIntoMarkdown } from '../src/all-contributors/cli/generate'
// import { parseComment } from '../src/all-contributors/parseComment'
// import { pushAll } from '../src/git/push-all'

// describe('playground', () => {
//   it.only('works', async () => {
//     const cwd = process.cwd()
//     const comment = '@all-contributors add @user123 for doc'

//     const configPath = findConfig(cwd)
//     assert(configPath)

//     const contributions = parseComment(comment)
//     await addContributions(configPath, contributions)
//     await generateContributorsListIntoMarkdown({ configPath, cwd })
//   })
// })
