<script>
  import { onMount } from "svelte";
  import CommentList from "./CommentList.svelte"; 
 
  let comments = [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
      user: {
        username: "amyrobson",
        image: { png: "/images/avatars/avatar1.png" },
      },
      score: 12,
      createdAt: "1 month ago",
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      user: {
        username: "maxblagun",
        image: { png: "/images/avatars/avatar2.png" },
      },
      score: 5,
      createdAt: "2 weeks ago",
      replies: [
        {
          id: 3,
          content:
            "If you’re still new, I’d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.",
          user: {
            username: "ramsesmiron",
            image: { png: "/images/avatars/avatar3.png" },
          },
          score: 4,
          createdAt: "1 week ago",
        },
        {
          id: 4,
          content:
            "I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          user: {
            username: "juliusomo",
            image: { png: "/images/avatars/avatar4.png" },
          },
          score: 2,
          createdAt: "2 days ago",
        },
      ],
    },
  ];

  let currentUser = {
    username: "juliusomo",
    image: { png: "/images/avatars/avatar4.png" },
  };

  export let data = null; 
  
  onMount(() => {
    if (data) {
      comments = data.comments;
      currentUser = data.currentUser;
    }
  });

  function addComment(content) {
    const newComment = {
      id: Date.now(),
      content,
      user: currentUser,
      score: 0,
      createdAt: "just now",
      replies: [],
    };
    comments = [...comments, newComment];
  }

  function upvote(comment) {
    comment.score += 1;
  }
</script>

<main>
  <div class="comments-container">
    {#each comments as comment (comment.id)}
      <div class="comment">
        <div class="score">
          <button aria-label="Upvote" on:click={() => upvote(comment)}>+</button
          >
          <span>{comment.score}</span>
          <button aria-label="Downvote">-</button>
        </div>
        <div class="content">
          <div class="user-info">
            <img
              src={comment.user.image.png}
              alt={comment.user.username}
              class="avatar"
            />
            <span class="username">{comment.user.username}</span>
            <span class="created-at">{comment.createdAt}</span>
          </div>
          <p>{comment.content}</p>
          <div class="actions">
            <button class="reply">Reply</button>
            {#if comment.user.username === currentUser.username}
              <button class="delete">Delete</button>
              <button class="edit">Edit</button>
            {/if}
          </div>
        </div>
      </div>

      {#each comment.replies as reply (reply.id)}
        <div class="reply">
          <div class="score">
            <button aria-label="Upvote">+</button>
            <span>{reply.score}</span>
            <button aria-label="Downvote">-</button>
          </div>
          <div class="content">
            <div class="user-info">
              <img
                src={reply.user.image.png}
                alt={reply.user.username}
                class="avatar"
              />
              <span class="username">{reply.user.username}</span>
              <span class="created-at">{reply.createdAt}</span>
            </div>
            <p>{reply.content}</p>
            <div class="actions">
              {#if reply.user.username === currentUser.username}
                <button class="delete">Delete</button>
                <button class="edit">Edit</button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {/each}

    <div class="add-comment">
      <img src={currentUser.image.png} alt="Your Avatar" class="avatar" />
      <textarea bind:this={textarea} placeholder="Add a comment..."></textarea>
      <button on:click={() => addComment(textarea.value)}>SEND</button>
    </div>
  </div>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 2rem;
    max-width: 600px;
    margin: auto;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .comments-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .comment,
  .reply {
    display: flex;
    gap: 1rem;
    background-color: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .reply {
    margin-left: 2rem;
  }

  .score {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 8px;
    padding: 0.5rem;
  }

  .score span {
    color: #007bff;
    font-weight: bold;
  }

  .score button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .content {
    flex: 1;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .username {
    font-weight: bold;
  }

  .created-at {
    color: #777;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    justify-content: flex-end;
  }

  .add-comment {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .add-comment textarea {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.5rem;
    resize: none;
  }

  .add-comment button {
    background-color: #5b5bfb;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>
