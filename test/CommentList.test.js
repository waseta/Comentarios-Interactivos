import { render } from '@testing-library/svelte';
import CommentList from './CommentList.svelte';

describe('CommentList Component', () => {
    const mockComments = [
        {
            id: 1,
            content: "First comment",
            user: {
                username: "user1",
                image: { png: "/images/avatars/avatar1.png" },
            },
            score: 5,
            createdAt: "1 month ago",
            replies: [],
        },
        {
            id: 2,
            content: "Second comment",
            user: {
                username: "user2",
                image: { png: "/images/avatars/avatar2.png" },
            },
            score: 10,
            createdAt: "2 weeks ago",
            replies: [],
        },
    ];

    it('should render a list of comments', () => {
        const { getByText } = render(CommentList, { comments: mockComments });
        expect(getByText("First comment")).toBeInTheDocument();
        expect(getByText("Second comment")).toBeInTheDocument();
    });

    it('should update a comment', async () => {
        const { getByText, component } = render(CommentList, { comments: mockComments });
        
        const updatedComment = { ...mockComments[0], content: "Updated comment" };
        await component.$set({ comments: [updatedComment, mockComments[1]] });
        expect(getByText("Updated comment")).toBeInTheDocument();
    });

    it('should delete a comment', async () => {
        const { getByText, component } = render(CommentList, { comments: mockComments });
        
        await component.$set({ comments: [mockComments[1]] });
        expect(() => getByText("First comment")).toThrow();
    });
});