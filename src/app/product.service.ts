import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
const endpoint = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  responseType: 'text'
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'products').pipe(
      map(this.extractData));
  }

  // getProduct(id): Observable<any> {
  //   return this.http.get(endpoint + 'products/' + id).pipe(
  //     map(this.extractData));
  // }

  addProduct (name: string, price: number): Observable<any> {
    let params = new HttpParams()
    .set('name', name)
    .set('price', price.toString());
    return this.http.post<any>(endpoint +'add', params, { responseType: 'text' as 'json' })
    .pipe(
      map(this.extractData)
    )
    
  }

  

  updateProduct (id, product): Observable<any> {
    return this.http.put(endpoint + 'product/' + id, JSON.stringify(product)).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'product/' + id, { responseType: 'text' as 'json' })
    .pipe(
      map(this.extractData)
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}

