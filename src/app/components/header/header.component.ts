import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private toatr: ToastrService,
    private renderer: Renderer2,
    private el: ElementRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menuElement = this.el.nativeElement.querySelector('.nav__menu');

    if (menuElement) {
      if (this.isMenuOpen) {
        this.renderer.setStyle(menuElement, 'top', '0');
      } else {
        this.renderer.setStyle(menuElement, 'top', '-100%');
      }
    } else {
      console.error('error: cannot toggle menu');
    }
  }



  logout() {
    this.userService.clearCurrentLogin();
    this.toatr.success('Logged out successfully');
    this.router.navigate(['/']);
  }
}
