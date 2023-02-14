import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';

export interface ErroItem {
  tipoErro: string;
  controleErro?: string;
  mensagemErro: string;
}

export const qtdValidator = [
  Validators.min(1),
  Validators.required,
  Validators.nullValidator,
];


export function getItemValidationErrors(item: Item): ErroItem[] {
  let errors: ErroItem[] = [];

  var form = new FormGroup({
      quantidade: new FormControl(item.qtdDisponivel, qtdValidator),
  });

  Object.keys(form.controls).forEach((campoErro) => {
    const control = form.get(campoErro);

    var controlErrors: any = control?.errors;

    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((tipoErro) => {
        errors.push({
          controleErro: campoErro,
          tipoErro: tipoErro,
          mensagemErro: campoErro + mensagensErros.get(tipoErro),
        });
      });
    }
  });

  return errors;
}

export const mensagensErros = new Map<string, string>([
  ['required', ' é obrigatório'],
  ['min', ' deve ser no mínimo 1'],
  ['minlength', ' informado é muito curto'],
  ['maxlength', ' informado é muito longo'],
  ['pattern', ' informado é inválido. Insira um formato válido.'],
]);
