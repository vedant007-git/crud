import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  userForm: any = {
    id: null,
    firstName: '',
    lastName: '',
    age: null
  };
  isEdit = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res.users || res;
    });
  }

  saveUser() {
    if (this.isEdit) {
      this.userService.updateUser(this.userForm.id, this.userForm).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      const newUser = {
        firstName: this.userForm.firstName,
        lastName: this.userForm.lastName,
        age: this.userForm.age
      };
      this.userService.createUser(newUser).subscribe((createdUser: any) => {
        this.users.unshift(createdUser);
        this.resetForm();
      });
    }
  }

  editUser(user: any) {
    this.userForm = { ...user };
    this.isEdit = true;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  resetForm() {
    this.userForm = {
      id: null,
      firstName: '',
      lastName: '',
      age: null
    };
    this.isEdit = false;
  }
}
