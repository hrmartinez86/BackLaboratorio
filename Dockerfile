FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

EXPOSE 3000

# Ejecutar en modo desarrollo con ts-node-dev
CMD ["npm", "run", "dev"]
