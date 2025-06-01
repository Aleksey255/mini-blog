import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList.tsx';
import PostDetail from './components/PostDetail.tsx';
import Header from "./components/Header.tsx";
import {Container} from "@mui/material";
import {PostProvider} from "./hooks/PostContext.tsx";
import {ReactionProvider} from "./hooks/ReactionContext.tsx";
import {CommentProvider} from "./hooks/CommentContext.tsx";

const App = () => {

    return (
        <>
            <PostProvider>
                <CommentProvider>
                    <ReactionProvider>
                        <Header />
                        <Container
                            maxWidth='lg'
                            sx={{mt:'5rem'}}
                        >
                            <Routes>
                                <Route path="/" element={<PostList />} />
                                <Route path="/post/:id" element={<PostDetail />} />
                            </Routes>
                        </Container>
                    </ReactionProvider>
                </CommentProvider>
            </PostProvider>
        </>

    );
};

export default App;
