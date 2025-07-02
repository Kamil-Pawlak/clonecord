# clonecord

A simple Discord clone. This project demonstrates core skills in building real-time communication applications and user interfaces.

## Overview

clonecord replicates essential features of Discord such as text chats and user groups. It is designed to showcase development abilities in responsive web design and scalable architecture.

## Features

- Real-time messaging
- User authentication
- Channel-based communication
- Clean and modern interface

### Tech Stack
- Electron + React (Vite) for desktop client
- Express + MongoDB for backend API
- JWT authentication
- Jest/Supertest for backend testing

### Structure
- `electron-app/` – client
- `server/` – backend API


## MVP Checklist

- Authorization
    - Registration (email + password)
    - Login (JWT)
    - Endpoint security (middleware)
- User
    - Change password
    - Edit profile
    - List of servers user joined
- Servers
    - Creating server
    - Edit / delete server (only owner)
    - Joining server with code or invite link
- Channels
    - Creating channels on server
    - Edit / delete channels (owner/admin)
    - list of channels in given server
- Text chat
    - Sending messages (POST)
    - Downloading chat history (GET)
    - Edit/ delete messages
    - MVP version: refreshing every x seconds (polling)
    - Bonus: WebSocket (socket.io) in later phases