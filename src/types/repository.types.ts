export interface RepositoriesSearch {
  items: Repository[]
}

export interface Repository {
  id: number
  full_name: string
  stargazers_count: number
  language: string
}
export interface WeeklyCommitActivity {
  days: number[]
  total: number
  week: number
}
