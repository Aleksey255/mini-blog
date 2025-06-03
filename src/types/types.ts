export type Post = {
  id: number
  title: string
  content: string
}

export type Comment = {
  id: number
  author: string
  text: string
  postId: number
  date: Date
}

export enum Reaction {
  Like = 'LIKE',
  Heart = 'HEART',
  Laugh = 'LAUGH',
  Cry = 'CRY',
}

export type PostReactions = Record<number, Reaction[]>
