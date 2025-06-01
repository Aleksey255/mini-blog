import {Grid} from "@mui/material";
import PostItem from "./PostItem.tsx";
import {usePostContext} from "../hooks/PostContext.tsx";


export default function PostList() {

    const {posts} = usePostContext();

    return (
        <Grid container spacing={2} >
            {posts.map(post => (
                <PostItem key={post.id} {...post}/>
            ))}
        </Grid>
    );
};