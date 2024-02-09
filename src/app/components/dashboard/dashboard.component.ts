import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  titlEName: string = 'New Post';
  buttonName: string = 'Create Post';
  postForm!: FormGroup;
  posts: any[] = [];
  userData: any[] = [];
  editingPostId: string | null = null;
  constructor(private fb: FormBuilder, private postService: PostService,
    private userService: UserService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.initializeForm();
    this.posts = this.postService.getPosts();
    this.userData = this.userService.getCurrentLogin().fName;
    console.log(this.userData);
  }

  initializeForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', Validators.required],
      active: [false]
    });
  }

  submitForm() {
    const postData = this.postForm?.value;
    postData.tags = postData.tags.split(' ').filter((tag: string) => tag.trim() !== '');

    if (this.editingPostId) {
      const updatedPost = { id: this.editingPostId, ...postData };
      this.postService.updatePost(updatedPost);
      this.toastr.success('Post Updated successfully', 'Success');
    } else {
      this.postService.addPost(postData);
      this.toastr.success('Post created successfully', 'Success');
    }

    this.posts = this.postService.getPosts();
    this.postForm?.reset();
    this.editingPostId = null;
  }



  editPost(postId: string) {
    this.titlEName = 'Updated post'
    this.buttonName = 'Update'
    this.editingPostId = postId;
    const postToEdit = this.postService.getPostById(postId);

    this.postForm.setValue({
      title: postToEdit.title,
      body: postToEdit.body,
      tags: postToEdit.tags.join(' '),
      active: postToEdit.active
    });
  }

  deletePost(postId: string) {
    this.toastr.success('Post Deleted successfully', 'Success');
    this.postService.deletePost(postId);
    this.posts = this.postService.getPosts();
  }
}
