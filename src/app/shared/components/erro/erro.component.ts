import { Component, OnInit } from '@angular/core';

export class ApiErro {
  errorCode?: string;
  errorName?: string;
  errorMessage?: string;

  constructor(private code: string, private name: string, private message: string) {
    this.errorCode = code;
    this.errorName = name;
    this.errorMessage = message;
  }
}

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {

  loading = false;
  apiError: any;

  ngOnInit() {
    let error = sessionStorage.getItem('erro');

    if (error !== null) {
      this.apiError = JSON.parse(error);
    }
  }

}
