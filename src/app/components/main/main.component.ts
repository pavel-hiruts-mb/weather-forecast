import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, TopbarComponent, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
