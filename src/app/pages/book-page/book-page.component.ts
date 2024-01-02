import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { MaterialModule } from '../../material.module';
import { BookType } from '../../types';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, TopBarComponent],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.sass',
})
export class BookPageComponent {
  book!: BookType;
  @Output() toggleFavorite = new EventEmitter<BookType>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {
    this.book = (this.location.getState() as any).book;
  }
}
