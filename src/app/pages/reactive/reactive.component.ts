import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([
        [], [], []
      ])
    });
  }

  cargarDataAlFormulario() {
    // this.form.setValue({
    this.form.reset({
      nombre: 'Alexander',
      apellido: 'Morales',
      correo: 'aball@gmail.com',
      direccion: {
        distrito: 'Caballito',
        ciudad: 'BsAs'
      }
    });
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {

        if (control instanceof FormGroup) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }
      });
    }

    this.form.reset();
  }

  get pasatiempos() {
    return this.form.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get correoNoValido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get distritoNoValido() {
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

}
