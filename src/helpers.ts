import { context } from '@actions/github'

type Context = typeof context

export function getCommentBody(ctx: Context): string | undefined {
  const body = ctx.payload.comment?.body

  return body
}
