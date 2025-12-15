# Product API (Node.js + TypeScript)

A simple REST API for managing products, built with Node.js, Express, TypeScript, Zod, and In-Memory persistence.

## Prerequisites

- Node.js (v18+ LTS recommended)
- npm

## Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run in development mode (hot-reload):**
    ```bash
    npm run dev
    ```
    Server will start at `http://localhost:3000`.
    
    **Swagger Documentation:**
    Access the API documentation at: `http://localhost:3000/api-docs`

3.  **Run tests:**
    ```bash
    npm test
    ```

4.  **Linting:**
    ```bash
    npm run lint
    ```

## Production Build & Run

1.  **Build the project (transpile TS to JS):**
    ```bash
    npm run build
    ```
    This creates a `dist/` folder.

2.  **Start production server:**
    ```bash
    npm start
    ```

## VPS Deployment (Hostinger / Ubuntu)

### 1. Setup VPS
Connect to your VPS via SSH.

### 2. Install Node.js & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### 3. Deploy Code
Clone your repo or upload files to `/var/www/product-api`.

```bash
cd /var/www/product-api
npm ci
npm run build
```

### 4. Start with PM2
```bash
pm2 start dist/server.js --name "product-api"
pm2 save
pm2 startup
```

### 5. Nginx Reverse Proxy (Port 80 -> 3000)
Install Nginx: `sudo apt install nginx`

Edit config: `sudo nano /etc/nginx/sites-available/default`

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Restart Nginx: `sudo systemctl restart nginx`

### 6. Firewall
Allow Nginx and SSH:
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## API Endpoints (Curl Examples)

**Health Check:**
```bash
curl http://localhost:3000/health
```

**List Products (Pagination & Search):**
```bash
curl "http://localhost:3000/products?page=1&pageSize=5"
curl "http://localhost:3000/products?q=Product"
```

**Get Product:**
```bash
curl http://localhost:3000/products/<UUID>
```

**Create Product:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Mouse", "price": 59.99, "active": true}'
```

**Update Product (PUT):**
```bash
curl -X PUT http://localhost:3000/products/<UUID> \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Mouse Pro", "price": 79.99, "active": true}'
```

**Delete Product:**
```bash
curl -X DELETE http://localhost:3000/products/<UUID>
```
