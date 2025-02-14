import { render, fireEvent } from '@testing-library/svelte';
import Comment from './Comment.svelte';

describe('Comment Component', () => {
    const mockComment = {
        id: 1,
        content: "This is a test comment",
        user: {
            username: "testuser",
            image: { png: "/images/avatars/avatar1.png" },
        },
        score: 10,
        createdAt: "1 month ago",
        replies: [],
    };

    it('should render the comment content', () => {
        const { getByText } = render(Comment, { comment: mockComment });
        expect(getByText(mockComment.content)).toBeInTheDocument();
    });

    it('should increment score on upvote', async () => {
        const { getByText, component } = render(Comment, { comment: mockComment });
        const upvoteButton = getByText('+');
        await fireEvent.click(upvoteButton);
        expect(mockComment.score).toBe(11);
    });

    it('should decrement score on downvote', async () => {
        const { getByText, component } = render(Comment, { comment: mockComment });
        const downvoteButton = getByText('-');
        await fireEvent.click(downvoteButton);
        expect(mockComment.score).toBe(9);
    });

    it('should allow editing the comment', async () => {
        const { getByText, getByRole } = render(Comment, { comment: mockComment });
        const editButton = getByText('Edit');
        await fireEvent.click(editButton);
        const textarea = getByRole('textbox');
        expect(textarea).toBeInTheDocument();
    });

    it('should delete the comment', async () => {
        const { getByText, component } = render(Comment, { comment: mockComment });
        const deleteButton = getByText('Delete');
        await fireEvent.click(deleteButton);
       
    });
});