import {useEffect, useState} from "react";
import {Reaction} from "../types/reaction.ts";
import ReactionButton from "./ReactionButton.tsx";
import {useReactionContext} from "../hooks/ReactionContext.tsx";


interface ReactionBarProps {
    id: number
}

export default function ReactionBar ({ id }: ReactionBarProps) {

    const [selectedReaction, setSelectedReaction] = useState< Reaction | null>(null);
    const { reactions, setReactions } = useReactionContext();

    useEffect(() => {
        const postReactions = reactions[id] || [];
        const reaction = postReactions[0];
        setSelectedReaction(reaction || null);
    }, [reactions, id]);


    const handleReactionClick = (reactionType: Reaction) => {
        setReactions((prevState) => {
            const currentReactions: Reaction[] = prevState[id] || [];

            const updatedReactions: Reaction[] = currentReactions.includes(reactionType)
                ? currentReactions.filter(r => r !== reactionType)
                : [reactionType];

            return {
                ...prevState,
                [id]: updatedReactions
            };
        });

        setSelectedReaction(prev =>
            prev === reactionType ? null : reactionType
        );
    };

    return (
        <div >
            {Object.values(Reaction).map((reaction) => (
                    <ReactionButton
                        key={reaction}
                        reaction={reaction}
                        isActive={selectedReaction === reaction}
                        onClick={() => handleReactionClick(reaction)}
                    />
            ))}
        </div>
    );
}