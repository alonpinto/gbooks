import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'book-pager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.sass',
})
export class PagerComponent {
  @Input() total: number = 0;
  @Input() skip: number = 0;

  @Output('getNextPage') getNextPage = new EventEmitter<any>();
  @Output('getPrevPage') getPrevPage = new EventEmitter<any>();
}
