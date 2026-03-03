import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from "./producto.service"
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements OnInit{

  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  productos = signal<any[]>([]);

  productoForm = this.fb.group({
    categoria_id: [1],
    cod_producto: [''],
    descripcion: [''],
    imagen: [''],
    nombre: [''],
    precio: [''],
    stock: [''],
  })

  ngOnInit() {
    this.listar()
  }

  listar(){
    this.productoService.getProductos().subscribe((res: any) => {
      console.log(res.data);
      this.productos.set(res.data);
    })
  }

  funGuardar(){
    this.productoService.crearProducto(this.productoForm.value).subscribe(res => {
      this.listar();
    })
  }


}
