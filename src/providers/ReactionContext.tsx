import React, { createContext, useContext, useEffect, useState } from 'react'
import type { PostReactions } from '../types/types.ts'

type ReactionContextType = {
  reactions: PostReactions
  setReactions: React.Dispatch<React.SetStateAction<PostReactions>>
}

const ReactionContext = createContext<ReactionContextType | null>(null)

export const ReactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reactions, setReactions] = useState<PostReactions>(() => {
    const saved = localStorage.getItem('reactions')
    return saved ? JSON.parse(saved) : {}
  })

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('reactions', JSON.stringify(reactions))
  }, [reactions])

  return (
    <ReactionContext.Provider value={{ reactions, setReactions }}>
      {children}
    </ReactionContext.Provider>
  )
}

export const useReactionContext = () => {
  const context = useContext(ReactionContext)
  if (!context) {
    throw new Error('useReactionContext must be used within a ReactionProvider')
  }
  return context
}
