import type {Post} from "../types/post.ts";
import { Link } from "react-router-dom"
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Divider, Grid,
    IconButton,
    Typography
} from "@mui/material";
import { Forum, EmojiEmotions, BorderColor, DeleteOutline } from '@mui/icons-material';
import {PostModal} from "./PostModal.tsx";
import {useEffect, useState} from "react";
import {usePostContext} from "../hooks/PostContext.tsx";
import {DeletePost} from "./DeletePost.tsx";

export default function PostItem ({id, title, content}:Post) {

    const {posts} = usePostContext();

    const [post, setPost] = useState<Post>();

    useEffect(() => {
        const foundPost = posts.find(p => p.id === id);
        setPost(foundPost);
    }, [id, posts]);

    return (
            <Grid size={{xs: 12, md: 4}}>
                <Card>
                    <CardActionArea>
                        <Link to={`/post/${id}`} style={{color:'inherit', textDecoration:'none'}}>
                            <CardContent sx={{ height: '100%',  }}>
                                <Typography variant='h5' component='h2' sx={{mb:'1rem'}}>
                                    {title}
                                </Typography>
                                <Divider/>
                                <Typography variant="body2" component='p' color="text.secondary" sx={{mt:'1rem'}}>
                                    {content}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                    <CardActions sx={{ gap: 7 }}>
                        <Link to={`/post/${id}`} style={{color:'inherit', textDecoration:'none'}}>
                            <IconButton>
                                <Forum />
                            </IconButton>
                        </Link>
                        <Link to={`/post/${id}`} style={{color:'inherit', textDecoration:'none'}}>
                            <IconButton>
                                <EmojiEmotions />
                            </IconButton>
                        </Link>
                        <PostModal
                            key={post?.id}
                            initialData={post}
                            title='Редактировать пост'
                            trigger={<IconButton>
                                <BorderColor />
                            </IconButton>}
                        />
                        <DeletePost
                            id={id}
                            trigger={<IconButton >
                                <DeleteOutline />
                            </IconButton>}
                        />
                    </CardActions>
                </Card>
            </Grid>

    )
}