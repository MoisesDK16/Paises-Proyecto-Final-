import { Component, Input, OnInit } from '@angular/core';
import { IPais } from '../models/IPais';
import { PaisesService } from '../../services/paises.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent implements OnInit {

  // Inyectar ActivatedRoute en el constructor
  constructor(private route: ActivatedRoute, private  _paisService: PaisesService) {}

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    if (this.codigo) {
      this._paisService.getDetallesPais(this.codigo).subscribe((data: IPais[]) => {
        if (data && data.length > 0) {
          this.pais = data[0]; 
          console.log(this.pais);  
          console.log(this.pais.region); 
        }
      }, error => {
        console.error('Error al obtener los detalles del país:', error);
      });
    } else {
      console.error('El código de país es nulo o no está definido.');
    }
  }


  codigo: string | null = null;
  pais: IPais | null = null;

}
