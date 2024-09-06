import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filtering-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,

    FormsModule
  ],
  templateUrl: './filtering-dialog.component.html',
  styleUrl: './filtering-dialog.component.scss'
})
export class FilteringDialogComponent {
  shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FilteringDialogComponent>)
  data = inject(MAT_DIALOG_DATA);

  selectedLanguages: string[] = this.data.selectedLanguages;
  selectedGenres: string[] = this.data.selectedGenres;
  selectedAuthors: string[] = this.data.selectedAuthors;
  selectedPublishers: string[] = this.data.selectedPublishers;

  applyFilters() {
    console.log('Selected Languages:', this.selectedLanguages);
    console.log('Selected Genres:', this.selectedGenres);
    console.log('Selected Authors:', this.selectedAuthors);
    console.log('Selected Publishers:', this.selectedPublishers);

    this.dialogRef.close({
      selectedLanguages: this.selectedLanguages,
      selectedGenres: this.selectedGenres,
      selectedAuthors: this.selectedAuthors,
      selectedPublishers: this.selectedPublishers
    });
  }
}
