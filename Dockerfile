# Temel imaj olarak Node.js kullan
FROM node:18

# Uygulama dizinini oluştur
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulamanın kaynak kodunu kopyala
COPY . .

# Uygulamanın çalışacağı port
EXPOSE 4880

# Uygulamayı başlat
CMD ["node", "index.js"]