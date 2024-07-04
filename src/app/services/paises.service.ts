import { Injectable } from '@angular/core';
import { IPais } from '../components/models/IPais';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  url: string = 'https://restcountries.com/v3.1/all';

  constructor(private  http: HttpClient) { }

  getPaises(): Observable<IPais[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(data => data.map(pais => this.transformToIPais(pais)))
    );
  }

  private transformToIPais(item: any): IPais {
    return {
      nombre: item?.name?.common || '',
      imagen: item?.flags?.svg || '',
      moneda: item?.currencies ? Object.keys(item.currencies) : [],
      capital: item?.capital ? item.capital[0] : '',
      region: item?.region || '',
      subregion: item?.subregion || '',
      idioma: item?.languages ? Object.values(item.languages) : [],
      habitantes: item?.population || 0
    };
  }
  

}
