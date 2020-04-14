import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Alexander',
    apellido: 'Ballera',
    correo: 'alexballera@gmail.com'
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    console.log(form.value);
  }

}
