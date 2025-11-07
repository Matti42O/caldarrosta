import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Quando qualcuno si collega
io.on("connection", (socket) => {
  console.log("Utente connesso");

  // Se qualcuno invia un cuore ❤️
  socket.on("heart", () => {
    // Invia a tutti gli altri utenti connessi
    socket.broadcast.emit("heart");
  });

  socket.on("disconnect", () => {
    console.log("Utente disconnesso");
  });
});

// Porta del server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server cuoricini attivo su porta ${PORT}`));
