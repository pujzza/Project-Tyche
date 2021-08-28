import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'delete-confirm',
  templateUrl: "DeleteConfirm.html",
  styles: []
})
export class DeleteConfirmComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteConfirmComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.data = false;
    this.dialogRef.close(this.data);
  }

  onOkClick(): void{
      this.data = true;
    this.dialogRef.close(this.data);
  }
}
