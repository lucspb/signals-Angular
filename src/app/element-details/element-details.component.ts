import { Component } from '@angular/core';
import { ElementoService } from '../services/elemento.service';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.css']
})
export class ElementDetailsComponent {

  constructor(public elementoService: ElementoService) {}
}
