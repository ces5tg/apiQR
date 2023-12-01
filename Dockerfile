# Usa una imagen base con Node.js
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /app

# Copia el package.json y package-lock.json a la imagen
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación a la imagen
COPY . .

# Expone el puerto 3000 en la imagen
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["node", "app.js"]