import { Component, OnInit } from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading = false;
  disabled: boolean = false;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  days: number = 0;
  animate: boolean = false;
  timer: any;
  dataCasamento = new Date('2023-11-24T19:00:00.817Z');

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.start();
  }

  updataCasamentoTimer() {
    let dataAtual = new Date()

    var timeDiff = Math.abs(this.dataCasamento.getTime() - dataAtual.getTime());
    var resultadoDias = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.days =  resultadoDias;
    this.hours = this.dataCasamento.getHours() - dataAtual.getHours();
    this.minutes = this.dataCasamento.getMinutes() - dataAtual.getMinutes();
    this.seconds = this.dataCasamento.getSeconds();

    const time = this.dataCasamento.getTime();
    this.dataCasamento.setTime(time - 1000); //---

    /*     if (
      this.dataCasamento.getHours() === 0 &&
      this.dataCasamento.getMinutes() === 0 &&
      this.dataCasamento.getSeconds() === 0
    ) {
    } */
  }

  start() {
    this.updataCasamentoTimer();

    this.timer = setInterval(() => {
      this.updataCasamentoTimer();
    }, 1000);
  }
}
