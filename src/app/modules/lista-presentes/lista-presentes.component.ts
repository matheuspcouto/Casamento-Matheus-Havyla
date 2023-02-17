import { ListaPresentesService } from './../../services/lista-presentes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/item';
import { ErroItem, getItemValidationErrors } from './item.validator';

@Component({
  selector: 'app-lista-presentes',
  templateUrl: './lista-presentes.component.html',
  styleUrls: ['./lista-presentes.component.css'],
})
export class ListaPresenteComponent implements OnInit {
  loading = false;
  disabled: boolean = false;
  errorsValidators: ErroItem[] = [];
  itens: Item[] = [];
  item = new Item();
  qtdEscolhida: number = 1;

  constructor(
    private notificationService: ToastrService,
    private listaPresentesService: ListaPresentesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getItens();
  }

  selecionarItem(itemSelecionado: Item) {
    this.item = itemSelecionado;
  }

  getItens() {
    try {
      this.loading = true;

      this.listaPresentesService.getItens().subscribe({
        next: (itens) => {
          this.itens = itens.dados;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.error(error.message, 'Erro');
          this.loading = false;
        },
      });
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
      this.loading = false;
    }
  }

  salvarItem() {
    this.errorsValidators = getItemValidationErrors(this.item);

    if (this.errorsValidators.length == 0) {
      try {
        this.loading = true;

        this.router.navigate(['comprovante']);

        return;
        this.listaPresentesService.salvarItem(this.item, this.item.id).subscribe({
          next: () => {
            this.notificationService.success('Presente reservado com sucesso !','Sucesso');
            this.loading = false;
            this.router.navigate(['comprovante']);
          },
          error: (error: HttpErrorResponse) => {
            this.notificationService.error(error.message, 'Erro');
          },
        });
      } catch (error: any) {
        this.notificationService.error(error, 'Erro');
        this.loading = false;
      }
    }
  }
}
