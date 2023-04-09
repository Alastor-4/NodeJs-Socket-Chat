const { io } = require("../server");
const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");

const users = new Users();

io.on("connection", (socket) => {
  socket.on("entrarChat", (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        error: true,
        msg: "El nombre/sala es necesario",
      });
    }

    socket.join(data.room);

    users.addUser(socket.id, data.name, data.room);

    socket.broadcast
      .to(data.room)
      .emit("usersList", users.getUsersRoom(data.room));

    return callback(users.getUsersRoom(data.room));
  });

  //para escuchar el createMessage, el 2do argumento es lo que recibe
  socket.on("createMessage", (data) => {
    const user = users.getUser(socket.id);
    const message = createMessage(user.name, data.message);
    socket.broadcast.to(user.room).emit("createMessage", message);
  });

  socket.on("disconnect", () => {
    const userDeleted = users.deleteUser(socket.id);

    socket.broadcast
      .to(userDeleted.room)
      .emit(
        "createMessage",
        createMessage("Admin", `${userDeleted.name} salió`)
      );
    socket.broadcast
      .to(userDeleted.room)
      .emit("usersList", users.getUsersRoom(userDeleted.room));
  });

  //Mensaje privado
  socket.on("privateMessage", (data) => {
    const user = users.getUser(data.id);

    //Asi se le manda el mensaje a todos si no se especifica el to()
    socket.broadcast
      .to(data.for)
      .emit("privateMessage", createMessage(user.name, data.message));
  });
});
