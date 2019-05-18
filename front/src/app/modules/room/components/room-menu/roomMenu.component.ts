import {Component, Inject, OnInit} from '@angular/core';
import {Room} from '../../models/room';
import {User} from '../../../user/models/user';
import {RoomService} from '../../../../services/room.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-room-menu',
  templateUrl: './roomMenu.component.html',
  styleUrls: ['./roomMenu.component.css']
})
export class RoomMenuComponent implements OnInit {
  allRooms: Room[] = [];
  currentUser: User;
  displayedColumns: string[] = ['oneRoom', 'button'];
  dataSource;

  constructor(private roomService: RoomService, private dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if (this.currentUser.role !== 'admin') {
      this.dialog.closeAll();
    }
    this.roomService.getAllRooms().subscribe(data => {
      this.allRooms = data.map(item => {
        return new Room(item.idRoom, item.name, item.address);
      });
      this.dataSource = new MatTableDataSource(this.allRooms);
      this.dataSource.filterPredicate = (result: Room, filter: string) => {
        return (result.name + result.address).toLowerCase().includes(filter);
      };
    });
  }

  public doFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public editRoom(room: Room) {
    this.dialog.open(EditRoomComponent, {width: '40%', data: room});
  }

  public deleteRoom(room: Room) {
    this.roomService.deleteRoom(room.idRoom).subscribe(result => {
      this.allRooms.splice(this.allRooms.indexOf(room), 1);
      this.dataSource = new MatTableDataSource(this.allRooms);
    });
  }

  public createRoom() {
    const dialogRef = this.dialog.open(CreateRoomComponent, {width: '40%', data: this.allRooms});
    dialogRef.afterClosed().subscribe(result => this.dataSource = new MatTableDataSource(this.allRooms));
  }
}

@Component({
  selector: 'edit-room-dialog',
  templateUrl: 'editRoom-dialog.html',
})
export class EditRoomComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public room: Room, private roomService: RoomService) {
  }

  ngOnInit() {
  }

  saveRoom() {
    this.roomService.updateRoom(this.room).subscribe();
  }
}

@Component({
  selector: 'create-room-dialog',
  templateUrl: 'createRoom-dialog.html',
})
export class CreateRoomComponent implements OnInit {

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateRoomComponent>, @Inject(MAT_DIALOG_DATA) public allRooms: Room[],
              private roomService: RoomService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nameFormControl: ['', [
        Validators.required
      ]],
      addressFormControl: ['', [
        Validators.required
      ]]
    });
  }

  saveRoom() {
    if (this.formGroup.invalid) {
      return;
    }
    this.roomService.saveRoom(new Room(null, this.formGroup.get('nameFormControl').value,
      this.formGroup.get('addressFormControl').value)).subscribe(result => {
      this.allRooms.push(new Room(result.idRoom, result.name, result.address));
      this.dialogRef.close();
    });
  }
}
