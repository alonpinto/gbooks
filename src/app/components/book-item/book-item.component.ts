import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { BookType } from '../../types';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.sass',
})
export class BookItemComponent {
  @Input() book!: BookType;
  @Input() isFavorite: boolean = false;
  @Output() toggleFavorite = new EventEmitter<BookType>();
  @Output() getMoreInfo = new EventEmitter<BookType>();
}
