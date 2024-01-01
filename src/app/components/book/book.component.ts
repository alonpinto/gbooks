import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { BookType } from '../../types';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.sass',
})
export class BookComponent {
  @Input() book!: BookType;
  @Input() isFavorite: boolean = false;
  @Output() toggleFavorite = new EventEmitter<BookType>();
}
