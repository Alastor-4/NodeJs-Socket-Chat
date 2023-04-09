const socket = io();
const params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y sala son necesarios");
}

const user = { name: params.get("nombre"), room: params.get("sala") };

socket.on("connect", () =>
  socket.emit("entrarChat", user, (resp) =>
    console.log("Usuarios conectados", resp)
  )
);

//Escuchar información
socket.on("createMessage", (message) => {
  console.log("Servidor", message);
});

//Escuchar cambios en el servidor

//Usuario entra o sale del chat
socket.on("usersList", (users) => {
  console.log(users);
});

socket.on("privateMessage", (message) => {
  console.log("Mensaje privado", message);
});
