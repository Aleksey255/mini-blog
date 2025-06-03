import { Link, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
} from '@mui/material'
import {
  BorderColor,
  DeleteOutline,
  KeyboardBackspace,
} from '@mui/icons-material'
import type { Post } from '../types/types.ts'
import { useEffect, useState } from 'react'
import { PostModal } from '../components/Post/PostModal.tsx'
import { usePostContext } from '../providers/PostContext.tsx'
import { DeletePost } from '../components/Post/DeletePost.tsx'
import ReactionBar from '../components/Reaction/ReactionBar.tsx'
import CommentList from '../components/Comment/CommentList.tsx'

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const { posts } = usePostContext()

  useEffect(() => {
    const postId = parseInt(id as string)
    const foundPost = posts.find((p) => p.id === postId)
    setPost(foundPost || null)
  }, [id, posts])

  if (!post) {
    return <div>Пост не найден</div>
  }

  return (
    <Container maxWidth="md">
      <Link to={'/'}>
        <Button variant="text" startIcon={<KeyboardBackspace />}>
          <Typography>Назад к списку</Typography>
        </Button>
      </Link>
      <Card sx={{ position: 'relative' }}>
        <PostModal
          key={post?.id}
          initialData={post}
          title="Редактировать пост"
          trigger={
            <IconButton
              aria-label="edit"
              sx={{ position: 'absolute', right: 40 }}
            >
              <BorderColor />
            </IconButton>
          }
        />
        <DeletePost
          id={post.id}
          trigger={
            <IconButton
              aria-label="delete"
              sx={{ position: 'absolute', right: 0 }}
            >
              <DeleteOutline />
            </IconButton>
          }
        />
        <CardContent sx={{ height: '100%' }}>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            sx={{ mt: '2rem' }}
          >
            {post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <ReactionBar id={post.id} />
        </CardActions>
      </Card>
      <CommentList id={post.id} />
    </Container>
  )
}
