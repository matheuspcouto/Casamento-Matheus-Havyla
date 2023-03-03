import { ApiInfo } from './../shared/enums/api-info-enum';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ListaPresentesService {

  constructor(private httpClient: HttpClient) { }

  private headers = new HttpHeaders({'Content-Type': 'text/plain;charset=UTF-8'});

  getItens(): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}?method=itens`, { headers: this.headers });
  }

  salvarItem(body: any, id: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.post<any>(`${ApiInfo.HOST}?method=item&id=${id}`, requestBody, { headers: this.headers });
  }
}
