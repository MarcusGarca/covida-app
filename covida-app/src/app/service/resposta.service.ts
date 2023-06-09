import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Resposta } from '../model/resposta.model';

@Injectable({
  providedIn: 'root',
})
export class RespostaService {
  // URL de desenvolvimento
  apiUrlDev = 'http://localhost:8080';
  // URL de produção
  apiUrlProd = 'https://covida-api.onrender.com';

  constructor(private http: HttpClient) {}

  // Método GET repostas enviadas
  listRespostas(): Observable<Resposta[]> {
    return this.http.get<Resposta[]>(`${this.apiUrlProd}/respostas`);
  }

  // Método POST para registrar uma nova
  salvarResposta(resposta: any): Observable<Resposta> {
    return this.http
      .post<Resposta>(`${this.apiUrlProd}/respostas`, resposta)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.error(e))
      );
  }
  error(e: any): Observable<any> {
    return throwError(() => 'error');
  }
}
