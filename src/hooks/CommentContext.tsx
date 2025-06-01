import React, { createContext, useContext, useState, useEffect } from 'react';
import type {Comment} from "../types/comment.ts";

type CommentContextType = {
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    addComment: (postId: number, text: string,  author: string) => void;
    deleteComment: (postId: number, commentId: number) => void;
};

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [comments, setComments] = useState<Comment[]>(() => {
        const saved = localStorage.getItem('comments');
        return saved ? JSON.parse(saved) : [];
    });

    const addComment = (postId: number, text: string, author: string) => {
        const newComment: Comment = {
            id: Date.now(),
            postId,
            text,
            author,
            date: new Date()
        };
        setComments((prev) => [...prev, newComment]);
    };

    const deleteComment = (postId: number, commentId: number) => {
        setComments((prev) =>
            prev.filter((c) => !(c.postId === postId && c.id === commentId))
        );
    };

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    return (
        <CommentContext.Provider value={{ comments, setComments, addComment, deleteComment }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};