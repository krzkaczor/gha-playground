import { GithubContext, Octokit } from './octokit'

export async function addReaction(octokit: Octokit, ctx: GithubContext, commentId: number) {
  await octokit.reactions.createForIssueComment({
    owner: ctx.repo.owner,
    repo: ctx.repo.repo,
    comment_id: commentId,
    content: '+1',
  })
}
