import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from "./producto.service"
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements OnInit{

  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  productos = signal<any[]>([]);
  producto_id = signal(0);
  mostrarDialog = signal(false)

  productoForm = this.fb.group({
    categoria_id: [1],
    cod_producto: ['', [Validators.required]],
    descripcion: [''],
    imagen: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
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
    console.log(this.producto_id());
    if(this.producto_id()>0){
      // modificar
      alert("MODIFICANDO")
      this.productoService.modificarProducto(this.producto_id(), this.productoForm.value).subscribe(
        (res: any) => {

          this.listar();
        }
      )
    }else{
      this.productoService.crearProducto(this.productoForm.value).subscribe(res => {
      this.listar();
    })
    this.producto_id.set(0);
    }
  }

  funEditar(prod: any){
    this.producto_id.set(prod.id);
    this.productoForm.patchValue(prod)
  }

  funEliminar(id: number){
    if(confirm("Esta seguro de eliminar?")){
      this.productoService.eliminarProducto(id).subscribe(
        (res) => {
          this.listar();
        }
      )
    }
  }


}
