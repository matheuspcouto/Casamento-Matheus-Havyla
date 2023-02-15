import { ApiInfo } from '../shared/enums/api-info-enum';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ListaPresentesService {

  constructor(private httpClient: HttpClient) { }

  //private encodeAuth = btoa(ApiInfo.LOGIN + ':' + ApiInfo.PASSWORD);
  //private authorization = `Basic ${this.encodeAuth}`;

  //private headers = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8', 'charset': 'UTF-8', Authorization: this.authorization });
  private headers = new HttpHeaders({'Content-Type': 'text/plain;charset=UTF-8'});

  getItens(): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}?action=getPresentes`, { headers: this.headers });
  }

  getItemByNome(codigoProduto: any): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}/search?nome=${codigoProduto}`, { headers: this.headers });
  }

  salvarItem(body: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.patch<any>(`${ApiInfo.HOST}`, requestBody, { headers: this.headers });
  }
}
