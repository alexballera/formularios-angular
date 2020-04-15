import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre  : ['Alexander'],
      apellido: ['Ballera'],
      correo  : ['alexballera@gmail.com'],
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
