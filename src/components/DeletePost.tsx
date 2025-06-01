import * as React from "react";
import {useState} from "react";
import {usePostContext} from "../hooks/PostContext.tsx";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useReactionContext} from "../hooks/ReactionContext.tsx";
import {useCommentContext} from "../hooks/CommentContext.tsx";

interface ModalTypeProps {
    id: number
    trigger: React.ReactNode;
}

export function DeletePost({id, trigger}: ModalTypeProps) {
    const {posts, setPosts} = usePostContext();
    const { setReactions } = useReactionContext();
    const { setComments } = useCommentContext()
    const navigate = useNavigate();
    const [IsOpen, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDeletePost = (id: number) => {
        setPosts(posts.filter(post => post.id !== id));

        setComments((prev) =>
            prev.filter((c) => !(c.postId === id))
        );

        setReactions((prevState) => {
            const { [id]: removed, ...rest } = prevState;
            console.log(' реакция удалена', removed)
            return rest;
        });

        navigate('/')
    };

    return (
        <div>
             <span style={{ cursor: "pointer" }} onClick={handleOpen}>
                {trigger}
            </span>

            <Dialog
                open={IsOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Подтверждение</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={() => {handleDeletePost(id)}} color="primary" autoFocus>
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}