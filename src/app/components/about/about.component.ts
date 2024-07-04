import { Component, Input } from '@angular/core';
import { IPais } from '../models/IPais';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  @Input() paises: IPais[]= [];
}
