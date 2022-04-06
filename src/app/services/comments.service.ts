import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../common/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  public getComments(): Observable<IResponse> {
    return this.http.get<IResponse>(`${environment.BASE_URI}/comments`);
  }

  public newComment(name: string, message: string): Observable<IResponse> {
    const payload = { name, message };
    return this.http.post<IResponse>(
      `${environment.BASE_URI}/create-comment`,
      payload
    );
  }
}
