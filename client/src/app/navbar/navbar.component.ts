import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Efficient video-based motion estimation in autonomous vehicles';
  subtitle = ' @ InescTec';
  
  constructor() { }

  ngOnInit(): void {
  }

}
