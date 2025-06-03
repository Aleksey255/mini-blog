import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import type { Post } from '../../types/types.ts'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { usePostContext } from '../../providers/PostContext.tsx'

interface ModalTypeProps {
  initialData?: Post
  title: string
  trigger: React.ReactNode
}

export function PostModal({ initialData, title, trigger }: ModalTypeProps) {
  const { posts, setPosts } = usePostContext()

  const [IsOpen, setOpen] = useState<boolean>(false)

  const [form, setForm] = useState<Post>({
    id: initialData?.id || Date.now(),
    title: initialData?.title || '',
    content: initialData?.content || '',
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setForm({
      id: Date.now(),
      title: '',
      content: '',
    })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) {
      enqueueSnackbar('Пожалуйста, заполните все поля', { variant: 'warning' })
      return
    }

    setPosts((prev) => [...prev, form])
    enqueueSnackbar('Пост успешно добавлен!', { variant: 'success' })
    handleClose()
  }

  const handleSubmitEdit = () => {
    if (!form.title.trim() || !form.content.trim()) {
      enqueueSnackbar('Пожалуйста, заполните все поля', { variant: 'warning' })
      return
    }

    const updatedPosts = posts.map((post: Post) =>
      post.id === form.id ? form : post
    )
    setPosts(updatedPosts)
    enqueueSnackbar('Пост успешно обновлён!', { variant: 'success' })
    handleClose()
  }

  const handleClick = () => {
    if (initialData) {
      handleSubmitEdit()
    } else {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData?.id,
        title: initialData?.title,
        content: initialData?.content,
      })
    } else {
      setForm({
        id: Date.now(),
        title: '',
        content: '',
      })
    }
  }, [initialData])

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  return (
    <div>
      <span style={{ cursor: 'pointer' }} onClick={handleOpen}>
        {trigger}
      </span>
      <Dialog open={IsOpen} onClose={handleClose} fullWidth maxWidth="md">
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <Typography variant="body2">Заголовок</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Введите заголовок поста"
              name="title"
              autoComplete="title"
              autoFocus
              value={form.title}
              onChange={handleChange}
            />
            <Typography variant="body2">Содержание</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Введите полное содержание поста"
              type="text"
              id="content"
              multiline
              rows={5}
              value={form.content}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Отмена
          </Button>
          <Button onClick={handleClick} variant="contained" color="info">
            {initialData ? 'Сохранить' : 'Создать'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
