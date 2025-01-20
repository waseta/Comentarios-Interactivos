<script>
    export let comments = [];
    import Comment from "./Comment.svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function updateComment(updatedComment) {
        const index = comments.findIndex((c) => c.id === updatedComment.id);
        comments[index] = updatedComment;
        dispatch("update", comments);
    }

    function deleteComment(id) {
        comments = comments.filter((c) => c.id !== id);
        dispatch("update", comments);
    }
</script>

<section>
    {#each comments as comment (comment.id)}
        <Comment
            {comment}
            on:update={updateComment}
            on:delete={deleteComment}
        />
    {/each}
</section>
```

<style>
    section {
        width: 90%;
        max-width: 800px;
        margin: 2rem auto;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
    }
</style>
