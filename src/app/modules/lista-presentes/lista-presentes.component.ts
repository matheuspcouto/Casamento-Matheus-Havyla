import { ApiErro } from './../../shared/components/erro/erro.component';
import { StatusItem } from './../../shared/enums/status-item.enums';
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
  itensOutros: Item[] = [];
  itensMoveis: Item[] = [];
  itensEletrodomesticos: Item[] = [];
  itensCozinha: Item[] = [];
  itensCamaMesaBanho: Item[] = [];
  item = new Item();
  qtdEscolhida: number = 1;

  constructor(
    private notificationService: ToastrService,
    private listaPresentesService: ListaPresentesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.atualizarItens();
  }

  selecionarItem(itemSelecionado: Item) {
    this.item = itemSelecionado;
    (document.getElementById('qtd') as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  atualizarItens() {
    this.loading = true;
    this.listaPresentesService.getItens().subscribe({
      next: (itens) => {

        if (itens.errorCode) {
          let apiErro = new ApiErro(itens.errorCode, itens.errorName, itens.errorMessage);
          sessionStorage.setItem('erro', JSON.stringify(apiErro));
          this.loading = false;
          this.router.navigate(['erro']);
          return;
        }

        let dados = itens.dados;

        this.itensOutros = dados.filter((i: Item) => i.categoria == 'Outros');
        this.itensMoveis = dados.filter((i: Item) => i.categoria == 'Móveis');
        this.itensEletrodomesticos = dados.filter((i: Item) => i.categoria == 'Eletrodomésticos');
        this.itensCozinha = dados.filter((i: Item) => i.categoria == 'Cozinha');
        this.itensCamaMesaBanho = dados.filter((i: Item) => i.categoria == 'Cama, Mesa e Banho');

        this.loading = false;
      },
      error: (error: any) => {
        let apiErro = new ApiErro(error.errorCode, error.errorName, error.errorMessage);
        sessionStorage.setItem('erro', JSON.stringify(apiErro));
        this.loading = false;
        this.router.navigate(['erro']);
      },
    });
  }

  salvarItem() {

    if (this.qtdEscolhida > this.item.qtdDisponivel) {
      this.notificationService.error('A quantidade informada é maior que a disponível para o item', 'Erro');
      return;
    }

    if (this.qtdEscolhida <= 0) {
      this.notificationService.error('A quantidade deve ser maior no mínimo 1', 'Erro');
      return;
    }

    this.errorsValidators = getItemValidationErrors(this.item);

    if (this.errorsValidators.length == 0) {
      try {
        this.loading = true;

        this.item.qtdDisponivel -= this.qtdEscolhida;
        this.item.status = this.item.qtdDisponivel == 0 ? StatusItem.ESGOTADO : StatusItem.DISPONIVEL;

        this.listaPresentesService.salvarItem(this.item, this.item.id).subscribe({
          next: (error) => {

            if (error.errorCode) {
              let apiErro = new ApiErro(error.errorCode, error.errorName, error.errorMessage);
              sessionStorage.setItem('erro', JSON.stringify(apiErro));
              this.loading = false;
              this.router.navigate(['erro']);
              return;
            }

            this.notificationService.success('Presente reservado com sucesso !', 'Sucesso');
            this.loading = false;
            this.router.navigate(['comprovante']);
          },
          error: (error: any) => {
            let apiErro = new ApiErro(error.errorCode, error.errorName, error.errorMessage);
            sessionStorage.setItem('erro', JSON.stringify(apiErro));
            this.loading = false;
            this.router.navigate(['erro']);
          },
        });
      } catch (error: any) {
        this.notificationService.error(error, 'Erro');
        this.loading = false;
      }
    }
  }

  resetItem() {
    this.item = new Item();
  }
}
