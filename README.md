# 🚀 Premium Todo App

Modern web teknolojileri kullanılarak "Kusursuz Kullanıcı Deneyimi" (UX) ve yüksek performans odağıyla geliştirilmiş Full-Stack Todo (Görev Yöneticisi) uygulaması.

## ✨ Öne Çıkan Özellikler

- **Gecikmesiz Deneyim (Optimistic UI):** Görev ekleme, silme veya düzenleme süreçlerinde internet gecikmesini (latency) gizleyen mimari. Tıklamalar anında arayüze yansır, arkada API'ye gider.
- **Görsel Şölen (Framer Motion):** Ögelerin silinirken akarak kaybolduğu, menülerin yumuşak geçişlerle açılıp kapandığı akıcı Layout animasyonları.
- **Dark / Light Modu:** Sistem, ayarlarınızı hatırlar. Gece/Gündüz arası pürüzsüz geçiş.
- **Premium UX Arayüzü:** 
  - Karışık butonlar yerine **3 Noktalı (Dropdown)** modern menüler.
  - Gerçek zamanlı titreme (Shake) ve mikro-etkileşimler.
  - Veri gelene kadar kullanıcıyı karşılayan asimetrik **Skeleton Yükleyiciler (Shimmer Effect)**.
  - Tamamlanmış (Completed) görevler içi cam efektli (Glassmorphism) yeşil aydınlatma ve üstü çizili tipografi.

## 🛠️ Kullanılan Teknolojiler

**Frontend (İstemci):** 
- React.js (Vite ile oluşturuldu)
- Tailwind CSS (Stillendirme ve Dark Mode işlemleri)
- Framer Motion (Akıcı Layout animasyonları)
- Lucide-React (Vektör/SVG modern ikon setleri)

**Backend (Sunucu):**
- Node.js & Express.js (Rest API mimarisi)
- PostgreSQL (Veri tabanı kalıcılığı)
- CORS & Dotenv entegrasyonları

## 📂 Proje Dizini

Proje "Monorepo" benzeri iki ayrı klasörden oluşmaktadır:
* `/client/vite-project` -> Önyüz (React) kodları.
* `/server` -> Arkayüz (Node.js) ve veritabanı ayar kodları.

## 🚀 Kurulum ve Çalıştırma

### 1. Backend'i Başlatmak
```bash
cd server
npm install
```
Aynı klasör içine `.env` dosyası oluşturup PostgreSQL bağlantı URL'ini ekleyin:
`DATABASE_URL=postgres://kullanici:sifre@sunucu/db`
```bash
node server.js
```

### 2. Frontend'i Başlatmak
```bash
cd client/vite-project
npm install
```
Aynı klasör içine `.env` dosyanızı oluşturup Backend API adresini ekleyin:
`VITE_API_URL=http://localhost:5000`
```bash
npm run dev
```

## 🌍 Dağıtım (Deployment)
Bu proje, Frontend kısmı için **Vercel**; Backend Node sunucusu ve PostgreSQL veritabanı için ise **Render** üzerinde barındırılmak (Deploy edilmek) üzere özelleştirilmiştir ve uyumludur.
