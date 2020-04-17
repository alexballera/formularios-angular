import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario : ['', , this.validadores.existeUsuario],
      pass1   : ['', [Validators.required, Validators.minLength(5)]],
      pass2   : ['', [Validators.required, Validators.minLength(5)]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  cargarDataAlFormulario() {
    // this.form.setValue({
    this.form.reset({
      nombre: 'Alexander',
      apellido: 'Morales',
      correo: 'aball@gmail.com',
      pass1: '12345',
      pass2: '12345',
      direccion: {
        distrito: 'Caballito',
        ciudad: 'BsAs'
      }
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
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

  get usuarioNoValido() {
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  get distritoNoValido() {
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  get pass1NoValido() {
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

}
