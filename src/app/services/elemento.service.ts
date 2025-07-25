import { computed, effect, Injectable, signal } from '@angular/core';


export interface Elemento {
  nome: string;
  simbolo: string;
  numeroMassa: Number;
  pontoFusao: Number;
  pontoEbulicao: Number;
}

@Injectable({
  providedIn: 'root'
})
export class ElementoService {
  elementoSelecionado = signal< Elemento | null> (null);
  temperatura = signal<any>(25);
  estadoFisico = signal<string>('');

  elementos: Elemento[] = [
    { nome: 'Hidrogênio', simbolo: 'H', numeroMassa: 1, pontoFusao: -259, pontoEbulicao: -253 },
    { nome: 'Carbono', simbolo: 'C', numeroMassa: 12, pontoFusao: 3550, pontoEbulicao: 4027 },
    { nome: 'Nitrogênio', simbolo: 'N', numeroMassa: 14, pontoFusao: -210, pontoEbulicao: -196 },
    { nome: 'Oxigênio', simbolo: 'O', numeroMassa: 16, pontoFusao: -218, pontoEbulicao: -183 },
    { nome: 'Sódio', simbolo: 'Na', numeroMassa: 23, pontoFusao: 98, pontoEbulicao: 883 },
    { nome: 'Cloro', simbolo: 'Cl', numeroMassa: 35, pontoFusao: -101, pontoEbulicao: -34 }
  ];

  constructor() {
    effect( () => {
        const elemento = this.elementoSelecionado();
        const temp = this.temperatura();
  
        if(elemento) {
          let estadoFisico = '';
          if ( temp < elemento.pontoFusao) {
            estadoFisico = 'Sólido';
          } else if( temp >= elemento.pontoFusao && temp < elemento.pontoEbulicao) {
            estadoFisico = 'Líquido';
          } else {
            estadoFisico = 'Gasoso';
          }
          this.estadoFisico.set(estadoFisico)
        }
      },
      { allowSignalWrites: true}
    )
  }
      

  selecionarElemento(elemento: Elemento) {
    this.elementoSelecionado.set(elemento);
  }

  ajustarTemperatura(novaTemperatura: Number) {
    this.temperatura.set(novaTemperatura);
  }

  elementoInfo = computed(() => {
      const elemento = this.elementoSelecionado();
      return elemento ? `Nome: ${elemento.nome}, Símbolo: ${elemento.simbolo}, Número de massa: ${elemento.numeroMassa}` : 'Nenhum elemento foi selecionado.'
  }) 
}
