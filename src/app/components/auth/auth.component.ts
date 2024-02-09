import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSignUpMode = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  showPassword = false;
  showPasswordSignup = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      fName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      gender: ['male', Validators.required],
    });
  }

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  signIn() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      const usersData = this.userService.getUserData();
      const matchedUser = usersData.find(user => user.email === email && user.password === password);
      if (matchedUser) {
        this.userService.setCurrentLogin(matchedUser);
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error('Invalid email or password', 'Error');
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityUp() {
    this.showPasswordSignup = !this.showPasswordSignup;
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { username, fName, email, password, mobileNumber, gender } = this.signUpForm.value;
      const userData = { username, fName, email, password, mobileNumber, gender };

      this.userService.saveUserData(userData);
      this.toastr.success('Registration successful please login!', 'Success');
      this.signUpForm.reset();
    }
  }
}
