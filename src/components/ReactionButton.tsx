import {Reaction} from "../types/reaction.ts";
import {Button} from "@mui/material";

type ReactionButtonProps = {
    reaction: Reaction;
    onClick: () => void;
    isActive: boolean
};

export default function ReactionButton ({ reaction, onClick, isActive }: ReactionButtonProps) {

    return (
            <Button
                onClick={onClick}
                style={{
                    backgroundColor: isActive ? '#007bff' : '#1E1E1E',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer'
                }}
            >
                {reaction === 'LIKE' && '👍'}
                {reaction === 'HEART' && '❤️'}
                {reaction === 'LAUGH' && '😂'}
                {reaction === 'CRY' && '😢'}
                {isActive ? 1 : ''}
            </Button>
    );
}