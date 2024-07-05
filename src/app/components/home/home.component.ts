import { Component, OnInit } from '@angular/core';
import { IPais } from '../models/IPais';
import { PaisesService } from '../../services/paises.service';
import { CommonModule, NgFor } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AboutComponent, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  paises: IPais[]= [];
  nombre: string = '';
  
  constructor(private paisServicio: PaisesService){}

  ngOnInit(): void {
    this.getPaises();
  }

  buscarXNombre() {
    if (!this.nombre) {
      this.ngOnInit();
      return;
    }else{
    this.paisServicio.getPaisPorNombre(this.nombre).subscribe(
      (data) => {
        this.paises = data;
        console.log(this.paises)
      },
      (error) => {
        console.error('Error al buscar países:', error);
      }
    );
   }
  }

  private getPaises(): void {
    this.paisServicio.getPaises().subscribe((data: IPais[]) => {
      this.paises = data;
    });
  }
  
}
