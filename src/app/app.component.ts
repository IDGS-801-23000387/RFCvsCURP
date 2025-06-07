import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RFCvsCURP';
  curp = '';
  rfc = '';
  mensaje = '';
  resultadoClase = '';

  validarCURP() {
    const curp = this.curp.toUpperCase();

    if (curp.length !== 18) {
      this.mensaje = ' El CURP debe tener 18 caracteres';
      this.resultadoClase = 'alert-danger';
      return;
    }

    const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[0-9A-Z]\d$/;
    if (!regex.test(curp)) {
      this.mensaje = ' Formato de CURP inválido';
      this.resultadoClase = 'alert-danger';
      return;
    }

    const anio = parseInt(curp.slice(4, 6), 10);
    const mes = parseInt(curp.slice(6, 8), 10);
    const dia = parseInt(curp.slice(8, 10), 10);
    const siglo = anio <= 25 ? 2000 : 1900;
    const fecha = new Date(siglo + anio, mes - 1, dia);

    if (
      fecha.getFullYear() !== (siglo + anio) ||
      fecha.getMonth() + 1 !== mes ||
      fecha.getDate() !== dia
    ) {
      this.mensaje = ' Fecha inválida en el CURP';
      this.resultadoClase = 'alert-danger';
      return;
    }

    const genero = curp[10];
    if (genero !== 'H' && genero !== 'M') {
      this.mensaje = ' Género inválido en el CURP (usa H o M)';
      this.resultadoClase = 'alert-danger';
      return;
    }

    const estado = curp.slice(11, 13);
    const estados = ['AS','BC','BS','CC','CL','CM','CS','CH','DF','DG','GT','GR','HG','JC',
      'MC','MN','MS','NT','NL','OC','PL','QT','QR','SP','SL','SR','TC','TS',
      'TL','VZ','YN','ZS','NE'];

    if (!estados.includes(estado)) {
      this.mensaje = ' Código de estado inválido en el CURP';
      this.resultadoClase = 'alert-danger';
      return;
    }

    this.mensaje = 'CURP válida';
    this.resultadoClase = 'alert-success';
  }

  validarRFC() {
    const rfc = this.rfc.toUpperCase();

    if (rfc.length !== 13) {
      this.mensaje = ' El RFC debe tener 13 caracteres';
      this.resultadoClase = 'alert-danger';
      return;
    }

    const regexRFC = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
    if (!regexRFC.test(rfc)) {
      this.mensaje = ' Formato de RFC inválido';
      this.resultadoClase = 'alert-danger';
    } else {
      this.mensaje = ' RFC válido';
      this.resultadoClase = 'alert-success';
    }
  }

  compararCurpRfc() {
    const curp = this.curp.toUpperCase().slice(0, 10);
    const rfc = this.rfc.toUpperCase().slice(0, 10);

    if (curp === rfc) {
      this.mensaje = ' Los primeros 10 caracteres del CURP y RFC coinciden';
      this.resultadoClase = 'alert-success';
    } else {
      this.mensaje = ' CURP y RFC no coinciden en los primeros 10 caracteres';
      this.resultadoClase = 'alert-danger';
    }
  }
}
