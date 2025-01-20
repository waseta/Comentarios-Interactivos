<script>
    export let comment;
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    let isEditing = false;
    let newContent = comment.content;
    let newReply = "";

    function upvote() {
        comment.score++;
        dispatch("update", comment);
        persistToLocalStorage();
    }

    function downvote() {
        if (comment.score > 0) comment.score--;
        dispatch("update", comment);
        persistToLocalStorage();
    }

    function edit() {
        isEditing = true;
    }

    function save() {
        isEditing = false;
        comment.content = newContent;
        dispatch("update", comment);
        persistToLocalStorage();
    }

    function cancel() {
        isEditing = false;
        newContent = comment.content;
    }

    function deleteComment() {
        dispatch("delete", comment.id);
        persistToLocalStorage();
    }

    function addReply() {
        if (newReply.trim() !== "") {
            const reply = {
                id: Date.now(),
                content: newReply,
                createdAt: "Just now",
                score: 0,
                user: comment.user,
                replyingTo: comment.user.username,
            };
            comment.replies = comment.replies
                ? [...comment.replies, reply]
                : [reply];
            newReply = "";
            dispatch("update", comment);
            persistToLocalStorage();
        }
    }

    function persistToLocalStorage() {
        const storedComments =
            JSON.parse(localStorage.getItem("comments")) || [];
        const updatedComments = storedComments.map((c) =>
            c.id === comment.id ? comment : c,
        );
        localStorage.setItem("comments", JSON.stringify(updatedComments));
    }
</script>

<article>
    <div class="comment-header">
        <img
            src={comment.user.image.png}
            alt={comment.user.username}
            class="avatar"
        />
        <h4>{comment.user.username}</h4>
        <span>{comment.createdAt}</span>
    </div>

    {#if isEditing}
        <textarea bind:value={newContent}></textarea>
        <button on:click={save}>Save</button>
        <button on:click={cancel}>Cancel</button>
    {:else}
        <p>{comment.content}</p>
        <div class="actions">
            <button on:click={upvote}>+</button>
            <span>{comment.score}</span>
            <button on:click={downvote}>-</button>
            <button on:click={edit}>Edit</button>
            <button on:click={deleteComment}>Delete</button>
        </div>
    {/if}

    <div class="reply-section">
        <textarea bind:value={newReply} placeholder="Add a reply..."></textarea>
        <button on:click={addReply}>Reply</button>
    </div>
</article>

<style>
    article {
        border-bottom: 1px solid #ccc;
        padding: 1rem 0;
    }

    .comment-header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .actions {
        margin-top: 1rem;
    }

    .reply-section {
        margin-top: 1rem;
    }

    textarea {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    button {
        margin-right: 0.5rem;
        cursor: pointer;
    }
</style>
