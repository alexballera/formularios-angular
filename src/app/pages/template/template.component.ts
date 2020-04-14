import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from './../../services/pais.service';

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

  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.paisService.getPaises()
    .subscribe(paises => {
      console.log(paises);
    });
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
