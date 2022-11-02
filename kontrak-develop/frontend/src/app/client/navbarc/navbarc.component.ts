import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbarc',
  templateUrl: './navbarc.component.html',
  styleUrls: ['./navbarc.component.scss']
})
export class NavbarcComponent implements OnInit {

  constructor(private auth: LoginService) { }

  ngOnInit(): void {
  }
  logout() {
    this.auth.logout();
  }

}
