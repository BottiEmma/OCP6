import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  position = new FormControl('start' as 'start' | 'end');
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth >= 600 && this.drawer.opened) {
      this.drawer.close();
    }
  }

  async closeSidenav() {
    if (this.drawer.opened) {
      await this.drawer.close(); // Handle the Promise properly
    }
  }

}
