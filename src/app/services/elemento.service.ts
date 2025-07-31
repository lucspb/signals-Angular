import { computed, effect, Injectable, signal } from '@angular/core';

export interface Elemento {
  nome: string;
  simbolo: string;
  numeroMassa: number;
  pontoFusao: number;
  pontoEbulicao: number;
  numeroNeutrons: number;
  numeroAtomico: number;
}

@Injectable({
  providedIn: 'root'
})
export class ElementoService {
  elementoSelecionado = signal< Elemento | null> (null);
  elementoCalculado1 = signal< Elemento | null> (null);
  elementoCalculado2 = signal< Elemento | null> (null);
  temperatura = signal<any>(25);
  estadoFisico = signal<string>('');
  favoritos = signal<Elemento[]>([]);

  elementos: Elemento[] = [
    { nome: 'Hidrogênio', simbolo: 'H', numeroAtomico: 1, numeroNeutrons: 0, numeroMassa: 1, pontoFusao: -259, pontoEbulicao: -253 },
    { nome: 'Carbono', simbolo: 'C', numeroAtomico: 6, numeroNeutrons: 6, numeroMassa: 12, pontoFusao: 3550, pontoEbulicao: 4027 },
    { nome: 'Nitrogênio', simbolo: 'N', numeroAtomico: 7, numeroNeutrons: 7, numeroMassa: 14, pontoFusao: -210, pontoEbulicao: -196 },
    { nome: 'Oxigênio', simbolo: 'O', numeroAtomico: 8, numeroNeutrons: 8, numeroMassa: 16, pontoFusao: -218, pontoEbulicao: -183 },
    { nome: 'Sódio', simbolo: 'Na', numeroAtomico: 11, numeroNeutrons: 12, numeroMassa: 23, pontoFusao: 98, pontoEbulicao: 883 },
    { nome: 'Cloro', simbolo: 'Cl', numeroAtomico: 17, numeroNeutrons: 18, numeroMassa: 35, pontoFusao: -101, pontoEbulicao: -34 }
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

  obterFavoritos() {
    return this.favoritos();
  }

  obterElementoSelecionado() {
    return this.elementoInfo;
  }

  adicionarFavorito(elemento: Elemento) {
    this.favoritos.update((fav) => [...fav, elemento]);
    console.log(elemento)
  }
  
  removerFavorito(elemento: Elemento) {
    this.favoritos.update((fav) =>
      fav.filter((e) => e !== elemento)
    )
  }

  massaAtomicaTotal = computed(() => {
    const elemento1 = this.elementoCalculado1();
    const elemento2 = this.elementoCalculado2();
    const massa1 = elemento1 ? elemento1.numeroAtomico + elemento1.numeroNeutrons : 0;
    const massa2 = elemento2 ? elemento2.numeroAtomico + elemento2.numeroNeutrons : 0;

    return massa1 + massa2;
  })

  selecionarElemento1(elemento: Elemento) {
    this.elementoCalculado1.set(elemento);
  }
   
  selecionarElemento2(elemento: Elemento) {
    this.elementoCalculado2.set(elemento);
  }
}
