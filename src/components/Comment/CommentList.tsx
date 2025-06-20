import {
  Button,
  Card,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { useCommentContext } from '../../providers/CommentContext.tsx'
import CommentItem from './CommentItem.tsx'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import type { Comment } from '../../types/types.ts'

interface CommentListProps {
  initialData?: Comment
  id: number
}

export default function CommentList({ id, initialData }: CommentListProps) {
  const { comments, setComments, addComment, deleteComment } =
    useCommentContext()

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

  const [commentForm, setCommentForm] = useState({
    text: initialData?.text || '',
    author: initialData?.author || '',
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const filteredComments = comments.filter((comment) => comment.postId === id)

  const handleDelete = (postId: number, commentId: number) => {
    deleteComment(postId, commentId)
    enqueueSnackbar('Комментарий успешно удален!', { variant: 'success' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCommentForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    if (!commentForm.text.trim()) {
      enqueueSnackbar('Комментарий не может быть пустым', {
        variant: 'warning',
      })
      return
    }

    if (editingCommentId !== null) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, text: commentForm.text, author: commentForm.author }
            : comment
        )
      )
      enqueueSnackbar('Комментарий успешно обновлён!', { variant: 'success' })
      setEditingCommentId(null)
    } else {
      addComment(id, commentForm.text, commentForm.author)
      enqueueSnackbar('Комментарий успешно добавлен!', { variant: 'success' })
    }

    setCommentForm({
      text: '',
      author: '',
    })
  }

  const handleCancel = () => {
    setCommentForm({
      text: '',
      author: '',
    })
    setEditingCommentId(null)
  }

  const handleEditClick = (comment: Comment) => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    setCommentForm({
      text: comment.text,
      author: comment.author,
    })
    setEditingCommentId(comment.id)
  }

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments])

  return (
    <>
      <Card sx={{ mt: '2rem', p: '1rem' }}>
        <Typography variant="h6" component="h3">
          Комментарии( {filteredComments.length} )
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="author"
          label="Автор"
          name="author"
          autoComplete="author"
          inputRef={inputRef}
          value={commentForm.author}
          onChange={handleChange}
        />
        <TextareaAutosize
          aria-label="Напишите комментарий"
          minRows={5}
          placeholder="Напишите комментарий ...."
          style={{ width: '100%' }}
          name="text"
          value={commentForm.text}
          onChange={handleChange}
        />
        {editingCommentId ? (
          <Button
            sx={{ mr: '1rem' }}
            variant="contained"
            size="small"
            onClick={() => handleCancel()}
          >
            Отмена
          </Button>
        ) : (
          ''
        )}

        <Button variant="contained" size="small" onClick={handleSubmit}>
          {editingCommentId ? 'Сохранить' : 'Отправить'}
        </Button>
      </Card>
      <Card sx={{ p: '1rem' }}>
        {filteredComments.length > 0
          ? filteredComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={id}
                onDelete={handleDelete}
                onEdit={handleEditClick}
              />
            ))
          : ''}
      </Card>
    </>
  )
}
