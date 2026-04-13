#!/bin/bash


docker run -e 'ACCEPT_EULA=Y' \
           -e 'SA_PASSWORD=YourPassword123' \
           -p 1433:1434 \
           -v sql_server_data:/var/opt/mssql \
           --name sql1 \
           --network denis \
           --restart unless-stopped \
           -d mcr.microsoft.com/mssql/server

docker run --name backend \
            -it\
           --network denis \
           -p 8080:8080 \
           -e DB_CONNECTION_STRING="Server=sql1,1433;Database=InventorySystem;User Id=sa;Password=YourPassword123;TrustServerCertificate=True;" \
           --restart unless-stopped \
           -d backend


docker run -it \
    -v "$(realpath ../frontend)":/app \
    -e BACKEND_URL=http://backend:8080 \
    -e CHOKIDAR_USEPOLLING=true \
    --name frontend \
    --network denis \
    -p 3000:3000\
    --restart unless-stopped \
    -d frontend &&




echo "Aplikacija dostupna na:http://localhost:3000"