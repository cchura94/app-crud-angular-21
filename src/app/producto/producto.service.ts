import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private apiUrl = 'https://laravue2.blumbit.net/back/public/api';
  // private apiUrl = 'http://localhost:8000/api/producto';
  private http = inject(HttpClient);

  getProductos(){
    return this.http.get(`${this.apiUrl}/producto`);
  }

  crearProducto(datosProducto: any){
    return this.http.post(`${this.apiUrl}/producto`, datosProducto);
  }

  modificarProducto(id: number, datosProducto: any){
    return this.http.put(`${this.apiUrl}/producto/${id}`, datosProducto);
  }

  eliminarProducto(id: number){
    return this.http.delete(`${this.apiUrl}/producto/${id}`);
  }
  
}
