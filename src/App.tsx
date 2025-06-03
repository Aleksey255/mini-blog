import { Route, Routes } from 'react-router-dom'
import PostList from './pages/PostList.tsx'
import PostDetail from './pages/PostDetail.tsx'
import Header from './components/UI/Header.tsx'
import { Container } from '@mui/material'
import { PostProvider } from './providers/PostContext.tsx'
import { ReactionProvider } from './providers/ReactionContext.tsx'
import { CommentProvider } from './providers/CommentContext.tsx'
import { DETAIL_PAGE, LIST_PAGE } from './routes.ts'

const App = () => {
  return (
    <>
      <PostProvider>
        <CommentProvider>
          <ReactionProvider>
            <Header />
            <Container maxWidth="lg" sx={{ mt: '5rem' }}>
              <Routes>
                <Route path={LIST_PAGE} element={<PostList />} />
                <Route path={DETAIL_PAGE} element={<PostDetail />} />
              </Routes>
            </Container>
          </ReactionProvider>
        </CommentProvider>
      </PostProvider>
    </>
  )
}

export default App
