import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { PostModal } from '../Post/PostModal.tsx'

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Мини- блог
        </Typography>
        <PostModal
          title="Создать новый пост"
          trigger={<Button variant={'contained'}>+ Создать пост</Button>}
        />
      </Toolbar>
    </AppBar>
  )
}
