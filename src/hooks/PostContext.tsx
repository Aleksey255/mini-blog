import React, { createContext, useContext, useState, useEffect } from 'react';
import type {Post} from "../types/post.ts";

type PostContextType = {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const PostContext = createContext<PostContextType | null>(null);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>(() => {
        const saved = localStorage.getItem('posts');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};