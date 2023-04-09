class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);

    return this.users;
  }

  getUser(id) {
    const user = this.users.filter((user) => user.id === id)[0]; //filter retorna un arreglo
    return user;
  }

  getUsers() {
    return this.users;
  }

  getUsersRoom(room) {
    return this.users.filter((user) => user.room === room)[0];
  }

  deleteUser(id) {
    const deletedUser = this.getUser(id);
    this.users = this.users.filter((user) => user.id != id); //retorna todas las personas que no coincidan con ese id
    return deletedUser;
  }
}

module.exports = { Users };
