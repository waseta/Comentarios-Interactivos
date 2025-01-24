import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import App from '@src/App.svelte';


const largeData = require('../src/data.json');

describe('Stress Test - Interactive Comments App', () => {
  let app;

  beforeEach(() => {
    
    app = render(App, { props: { data: largeData } });
  });

  it('loads all comments without crashing', () => {
    
    const comments = app.container.querySelectorAll('.comment');
    expect(comments).not.toBeNull();
    expect(comments.length).toBe(largeData.comments.length);
  });

  it('handles adding a new comment under stress', async () => {
    const textarea = app.container.querySelector('textarea');
    expect(textarea).not.toBeNull();

    const sendButton = app.getByText('SEND');
    expect(sendButton).not.toBeNull();

    await fireEvent.input(textarea, { target: { value: 'New comment under stress!' } });
    await fireEvent.click(sendButton);

    const comments = app.container.querySelectorAll('.comment');
    expect(comments.length).toBe(largeData.comments.length + 1);
  });

  it('handles upvotes efficiently', async () => {
    const upvoteButtons = app.container.querySelectorAll('button[aria-label="Upvote"]');
    expect(upvoteButtons.length).toBeGreaterThan(0);

    for (let i = 0; i < 100; i++) {
      await fireEvent.click(upvoteButtons[0]);
    }

    const firstCommentScore = app.container.querySelector('.comment .score span');
    expect(firstCommentScore).not.toBeNull();
    expect(parseInt(firstCommentScore.textContent, 10)).toBe(largeData.comments[2].score + 100);
  });
});


