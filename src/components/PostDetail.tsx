import {Link} from "react-router-dom"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    Typography
} from "@mui/material";
import {KeyboardBackspace, DeleteOutline, BorderColor} from '@mui/icons-material';
import type {Post} from "../types/post.ts";
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {PostModal} from "./PostModal.tsx";
import {usePostContext} from "../hooks/PostContext.tsx";
import {DeletePost} from "./DeletePost.tsx";
import ReactionBar from "./ReactionBar.tsx";
import CommentList from "./CommentList.tsx";

export default function PostDetail() {

    const {id} = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const {posts} = usePostContext();

    useEffect(() => {
        const postId = parseInt(id as string);
        const foundPost = posts.find(p => p.id === postId);
        setPost(foundPost || null);
    }, [id, posts]);

    if (!post) {
        return <div>Пост не найден</div>;
    }

    return (
        <Container maxWidth='md'>
            <Link to={'/'}>
                <Button variant='text' startIcon={<KeyboardBackspace/>}>
                    <Typography>Назад к списку</Typography>
                </Button>
            </Link>
            <Card sx={{position:'relative'}}>
                <PostModal
                    key={post?.id}
                    initialData={post}
                    title='Редактировать пост'
                    trigger={<IconButton aria-label='edit' sx={{position:'absolute', right: 40}}>
                                <BorderColor/>
                            </IconButton>}
                />
                    <DeletePost
                        id={post.id}
                        trigger={
                            <IconButton
                                aria-label='delete'
                                sx={{position:'absolute', right: 0}}
                            >
                                <DeleteOutline/>
                            </IconButton>
                        }
                    />
                <CardContent sx={{height: '100%'}}>
                    <Typography variant='h5' component='div' >
                        {post.title}
                    </Typography>
                    <Typography variant='body2' component='p' color='textSecondary' sx={{mt: '2rem'}}>
                        {post.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ReactionBar id={post.id}/>
                </CardActions>
            </Card>
            <CommentList id={post.id}/>
        </Container>
    );
};
