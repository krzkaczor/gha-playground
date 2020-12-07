import { context } from '@actions/github'
import { assert } from 'ts-essentials'

type Context = typeof context

export function getContextBody(ctx: Context): string | undefined {
  const body = ctx.payload.comment?.body

  assert(body !== undefined, "Comment body couldn't be found. Did you setup action to run on `issue_comment` event?")

  return body
}
