import { render } from '@testing-library/svelte';
import App from '../src/App.svelte'; // Ruta corregida

describe('Stress Test for App', () => {
    it('should handle a large number of comments', () => {
        const largeComments = Array.from({ length: 1000 }, (_, i) => ({
            id: i + 1,
            content: `Comment ${i + 1}`,
            user: {
                username: `user${i + 1}`,
                image: { png: "/images/avatars/avatar1.png" },
            },
            score: 0,
            createdAt: "1 month ago",
            replies: [],
        }));

        const { getByText } = render(App, { data: { comments: largeComments } });
        expect(getByText("Comment 1")).toBeInTheDocument();
        expect(getByText("Comment 1000")).toBeInTheDocument();
    });

    it('should handle a large number of replies', () => {
        const commentWithManyReplies = {
            id: 1,
            content: "Parent comment",
            user: {
                username: "user1",
                image: { png: "/images/avatars/avatar1.png" },
            },
            score: 0,
            createdAt: "1 month ago",
            replies: Array.from({ length: 1000 }, (_, i) => ({
                id: i + 2,
                content: `Reply ${i + 1}`,
                user: {
                    username: `user${i + 2}`,
                    image: { png: "/images/avatars/avatar2.png" },
                },
                score: 0,
                createdAt: "1 month ago",
            })),
        };

        const { getByText } = render(App, { data: { comments: [commentWithManyReplies] } });
        expect(getByText("Parent comment")).toBeInTheDocument();
        expect(getByText("Reply 1")).toBeInTheDocument();
        expect(getByText("Reply 1000")).toBeInTheDocument();
    });
});


