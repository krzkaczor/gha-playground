import { expect } from 'earljs'

import { parseComment } from '../../src/all-contributors/parseComment'

const validComments = [
  '@all-contributors add @user123 for doc',
  '@all-contributors please add @user123 for doc',
  '@all-contributors please add @user123 for doc.',
  `It's a valid comment to parse but adding request is in the middle
  @all-contributors please add @user123 for doc.`,
]

const validCommentWithMultipleContributors = `uhh super comment
@all-contributors please add @user123 for doc
@all-contributors please add @userabc for design.`
;`,
`

describe('parseComment', () => {
  for (const c of validComments) {
    it(`works with valid comment ${c}`, () => {
      const parseResult = parseComment(c)

      expect(parseResult).toEqual([{ who: 'user123', forWhat: ['doc'], unrecognized: [] }])
    })
  }

  it('works with valid comment adding multiple contributors', () => {
    const parseResult = parseComment(validCommentWithMultipleContributors)

    expect(parseResult).toEqual([
      { who: 'user123', forWhat: ['doc'], unrecognized: [] },
      { who: 'userabc', forWhat: ['design'], unrecognized: [] },
    ])
  })
})
