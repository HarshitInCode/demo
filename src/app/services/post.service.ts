import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsKey = 'posts';

  constructor() { }

  getPosts(): any[] {
    const storedPosts = localStorage.getItem(this.postsKey);
    return storedPosts ? JSON.parse(storedPosts) : [];
  }

  addPost(post: any): void {
    const posts = this.getPosts();
    post.id = this.generateUniqueId();
    posts.push(post);
    localStorage.setItem(this.postsKey, JSON.stringify(posts));
  }

  private generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  deletePost(postId: string): void {
    console.log('Deleting post with ID:', postId);
    let posts = this.getPosts();
    posts = posts.filter((post: any) => post.id !== postId);
    localStorage.setItem(this.postsKey, JSON.stringify(posts));
    console.log('Posts after deletion:', posts);
  }

  getPostById(postId: string): any | null {
    const posts = this.getPosts();
    const foundPost = posts.find(post => post.id === postId);
    return foundPost ? { ...foundPost } : null;
  }

  updatePost(updatedPost: any): void {
    let posts = this.getPosts();
    const index = posts.findIndex(post => post.id === updatedPost.id);

    if (index !== -1) {
      console.log('Updating post:', updatedPost);
      posts[index] = { ...updatedPost };
      localStorage.setItem(this.postsKey, JSON.stringify(posts));
      console.log('Posts after update:', posts);
    } else {
      console.error('Post not found for updating');
    }
  }

}
