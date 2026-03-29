# Laravel Todo List 📝

Aplikasi Todo List sederhana yang dibangun menggunakan Laravel, Inertia.js, React, dan dijalankan dalam lingkungan Docker.

## Tech Stack

- **Backend** — Laravel 12
- **Frontend** — React + Inertia.js
- **Web Server** — Nginx
- **Database** — MariaDB
- **Containerization** — Docker & Docker Compose
- **DB Management** — phpMyAdmin

## Fitur

- Tambah task baru
- Tandai task sebagai selesai / belum selesai
- Hapus task
- Progress bar realtime
- Tanpa perlu login/register

## Cara Menjalankan

### Prasyarat
- Docker Desktop sudah terinstall dan berjalan

### Langkah

1. Clone repository ini
```bash
   git clone https://github.com/Fawaidahmad/laravel-todo-docker.git
   cd laravel-todo-docker
```

2. Jalankan Docker
```bash
   docker compose up -d --build
```

3. Jalankan migration database
```bash
   docker exec -it laravel_app php artisan migrate
```

4. Build frontend
```bash
   docker exec -it laravel_app npm run build
```

5. Akses aplikasi
   - **Todo App** → http://localhost:8081
   - **phpMyAdmin** → http://localhost:8082

## Login phpMyAdmin

| Field    | Value  |
|----------|--------|
| Username | root   |
| Password | root   |
| Database | laravel |

## Struktur Docker
```
project/
├── docker/
│   ├── nginx/
│   │   └── default.conf
│   └── php/
│       └── Dockerfile
├── todolist/          # Laravel app
├── docker-compose.yml
└── README.md
```

## Perintah Berguna
```bash
# Menjalankan semua container
docker compose up -d

# Menghentikan semua container
docker compose down

# Melihat log
docker compose logs -f

# Masuk ke container Laravel
docker exec -it laravel_app bash
```