import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Elemento, ElementoService } from '../services/elemento.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementListComponent {

  constructor(
    public elementoService: ElementoService) {}

  selecionarElemento(elemento: Elemento) {
    this.elementoService.selecionarElemento(elemento);
  }

  alterarFavorito(elemento: Elemento) {
    if (this.elementoService.obterFavoritos().includes(elemento)) {
      this.elementoService.removerFavorito(elemento);
    } else {
      this.elementoService.adicionarFavorito(elemento);
    }
  } 
}
