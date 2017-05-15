import { Injectable } from '@angular/core';
import { User } from './user.model';
import { USERS } from './mock-users';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.users = database.list('users');
  }

  getUsers() {
    return this.users;
  }

  addUser(newUser: User) {
    this.users.push(newUser);
  }

  getUserById(userId: string) {
    return this.database.object('/users/' + userId);
  }

  updateUser(localUpdatedUser){
    var userEntryInFirebase = this.getUserById(localUpdatedUser.$key);
    userEntryInFirebase.update({name: localUpdatedUser.name,
                                title: localUpdatedUser.title,
                                image: localUpdatedUser.image,
                                linkedin: localUpdatedUser.linkedin,
                                bio: localUpdatedUser.bio,
                                gender: localUpdatedUser.gender,
                                mentor: localUpdatedUser.mentor,
                                mentee: localUpdatedUser.mentee});
  }

  deleteUser(localUserToDelete){
    var userEntryInFirebase = this.getUserById(localUserToDelete.$key);
    userEntryInFirebase.remove();
  }

}
