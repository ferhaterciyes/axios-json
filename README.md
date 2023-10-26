# Axios

Axios ve Fetch en popüler iki veri çekme kütüphanesi.

Faydaları:

- Özelleştirilebilir
- Axios, otomatik olarak Json verilerini işliyor
- Hata ayıklama özellikleri var
- HTTP isteklerini (get,post,put) daha kolay yapılmasını sağlar

Kullanım:

- npm i axios
- import axios from "axios"

HTTP İsteği Yapma:

- Veri alma isteği
- axios.get("url")

- Yeni veri ekleme isteği:
- axios.post("url", {gönderilecek veri})

- Olan veriyi güncelleme isteği:
- axios.put("url/id", {güncellenmiş veri})

- Veri silme isteği:
- axios.delete("url/id")

# Json Server

- Sahte bir API oluşturmaya yarar
- Bu kütüphane kendi bilgisayrımızda çalışan bir api oluşturur
- Oluşturduğu apinin temeli bir json dosyadsıdır

Faydaları:

- Prototip Oluşturma: gerçek api kullanılmadaığı zaman hızlıca basit bir versiyonunu oluşturabilir.
- Frontend geliştermesinde kolaylık sağlar
- Kullanımı Basit

Kullanım:

- npm i json-server
- proje klasörü içerisine bir .json dosyası oluştur
- json dosyası içerisine veri ekle
- package.json a apiyi çalıştırmak için komut ekle
- server : `json-server --watch db.json --port 3030`
- tanımladığın scripti çalıştır : npm run server