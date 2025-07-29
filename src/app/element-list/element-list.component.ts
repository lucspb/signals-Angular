import { Component } from '@angular/core';
import { Elemento, ElementoService } from '../services/elemento.service';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css'
})
export class ElementListComponent {

  constructor(
    public elementoService: ElementoService) {
  }

  selecionarElemento(elemento: Elemento) {
    this.elementoService.selecionarElemento(elemento)
  }

  alternarFavorito(elemento: Elemento) {
    if(this.elementoService.obterFavoritos().includes(elemento)) {
      this.elementoService.removerFavoritos(elemento)
    } else {
      this.elementoService.adicionarFavorito(elemento)
    }
  }
}
