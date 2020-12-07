import { ParsedContribution } from './Contribution'

const CONTRIBUTION_REGEX = /@all-contributors (?:please )?add @(?<name>.*?) for (?<whatFor>.*?)(?:[.\n]|$)/gm

export function parseComment(comment: string): ParsedContribution[] {
  const matches = getAllMatches(CONTRIBUTION_REGEX, comment) as [string, string][]

  const parsedContributions = matches.map(
    ([user, contributionList]): ParsedContribution => {
      return {
        who: user,
        forWhat: parseContributionList(contributionList),
        unrecognized: [],
      }
    },
  )

  return parsedContributions
}

function parseContributionList(contributionList: string): string[] {
  const contributions = contributionList.split(/[, ]/)
  return contributions.map((c) => c.trim())
}

function getAllMatches(regex: any, string: string): any[] {
  const results = []
  let tmp
  while ((tmp = regex.exec(string)) != null) {
    results.push(tmp.slice(1))
  }
  return results
}
