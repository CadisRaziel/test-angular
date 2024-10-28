import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


//!Coloquei o nome como utils, porem e um service

@Component({
  selector: 'app-confirmation-dialog',
  template: `<h2 mat-dialog-title>Deletar produto</h2>
      <mat-dialog-content>
       Tem certeza que quer deletar esse produto? 
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onNo()" style="background-color: brown;">Não</button>
        <button mat-raised-button (click)="onYes()" cdkFocusInitial style="background-color: green;">Sim</button>
      </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],

})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private matDialog: MatDialog) { }

  openDialog(): Observable<boolean> {
    return this.matDialog.open(ConfirmationDialogComponent)
      .afterClosed()
      //.pipe(filter(answer => answer === true)) //-> Esse cara aqui nao tem que decidir quando o subscribe e rodado ou nao (por isso enviamos ele la no list.component direto na funcao)
  }
}
