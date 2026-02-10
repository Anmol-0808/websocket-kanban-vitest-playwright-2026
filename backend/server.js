const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


let tasks = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("sync:tasks", tasks);

 
  socket.on("task:create", (data) => {
    const newTask = {
      id: uuidv4(),
      title: data.title,
      description: data.description || "",
      status: "todo",
      priority: data.priority || "low",
      category: data.category || "feature",
      attachments: data.attachments || [],
    };

    tasks.push(newTask);
   
    io.emit("sync:tasks", tasks);
  });


  socket.on("task:update", (updatedTask) => {
    tasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );

    io.emit("sync:tasks", tasks);
  });

  socket.on("task:move", ({ taskId, status }) => {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );

    io.emit("sync:tasks", tasks);
  });

  socket.on("task:delete", (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    io.emit("sync:tasks", tasks);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("WebSocket server running on http://localhost:5000");
});
