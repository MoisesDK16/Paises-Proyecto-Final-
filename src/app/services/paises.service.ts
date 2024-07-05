import { Injectable } from '@angular/core';
import { IPais } from '../components/models/IPais';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  url: string = 'https://restcountries.com/v3.1/all';
  urlDetalle: string = 'https://restcountries.com/v3.1/alpha/';
  urlNombre: string = 'https://restcountries.com/v3.1/name/';

  constructor(private  http: HttpClient) { }

  getPaisPorNombre(nombre: string): Observable<IPais[]> {
    const url = `${this.urlNombre}${nombre}`;
    return this.http.get<any[]>(url).pipe(
      map(data => data.map(pais => this.transformToIPais(pais)))
    );
  }

  getPaises(): Observable<IPais[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(data => data.map(pais => this.transformToIPais(pais)))
    );
  }

  getDetallesPais(codigo: string): Observable<IPais[]> {
    return this.http.get<any[]>(`${this.urlDetalle}${codigo}`).pipe(
      map(data => data.map(pais => this.transformToIPais(pais)))
    );
  }

  private transformToIPais(pais: any): IPais {
    return {
      nombre: pais.name?.common || '',
      codigo: pais?.ccn3 || '',
      imagen: pais?.flags?.svg || '',
      moneda: pais?.currencies ? Object.keys(pais.currencies).map(key => ({
        code: key,
        name: pais.currencies[key]?.name || '',
        symbol: pais.currencies[key]?.symbol || ''
      })): [],
      capital: pais?.capital ? pais.capital[0] : '',
      region: pais?.region || '',
      subregion: pais?.subregion || '',
      idioma: pais?.languages ? Object.values(pais.languages) : [],
      habitantes: pais?.population || 0,
      ubicacion: pais?.maps?.openStreetMaps || ''
    };
  }
  

}
