
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.email]],
    fecha1: ['', Validators.required],
    hora: ['', Validators.required],
    servicio: ['', Validators.required],
    manos_pies: ['', Validators.required],
    manicuarista: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder,private http: HttpClient) {}

  ngOnInit() {

  }

  async onSubmit() {

  this.http.post('http://localhost:3000/reserva/generar-reserva', this.form.value)
  .subscribe(
    (response:any) => {
      console.log(' servidor:', response);
   
    },
    (error:any) => {
      console.error('Error en la solicitud al servidor:', error);
    
    }
  );
}



  }


