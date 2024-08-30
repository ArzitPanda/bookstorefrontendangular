import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { routes } from '../../app/app.routes';
import { NavbarComponent } from "../../app/navbar/navbar.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatSlideToggleModule, RouterModule, NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
