import { Component, OnInit } from '@angular/core';
import { IPais } from '../models/IPais';
import { PaisesService } from '../../services/paises.service';
import { NgFor } from '@angular/common';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  paises: IPais[]= [];
  
  constructor(private paisServicio: PaisesService){}

  ngOnInit(): void {
    this.paisServicio.getPaises().subscribe((data)=>{
      console.log(data);  // Mostrar los datos en consola para desarrollar en tiempo real
      this.paises = data;
    })
  }
}
