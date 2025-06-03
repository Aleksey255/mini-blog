import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import type { Comment } from '../../types/types.ts'
import Box from '@mui/material/Box'

interface CommentItemProps {
  comment: Comment
  postId: number
  onDelete?: (postId: number, commentId: number) => void
  onEdit?: (comment: Comment) => void
}

export default function CommentItem({
  comment,
  postId,
  onDelete,
  onEdit,
}: CommentItemProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(postId, comment.id)
    }
  }

  return (
    <Card sx={{ border: '2px, solid', borderRadius: '20px', mt: '1rem' }}>
      <CardHeader
        avatar={<Avatar aria-label="avatar"></Avatar>}
        title={comment.author}
        subheader={
          comment.date ? new Date(comment.date).toLocaleDateString() : 'Сегодня'
        }
      />
      <CardContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {comment.text}
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={1} sx={{ mt: 1 }}>
          <IconButton
            size="small"
            onClick={() => onEdit?.(comment)}
            color="primary"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDelete} color="error">
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
