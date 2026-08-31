/*
  HOPAPCU Contact Page Map — Leaflet.js
  Shows office location in Nkhata-Bay
*/

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('mapContainer');

  if (!mapContainer) return;

  // Initialize map centered on HOPAPCU office
  const map = L.map('mapContainer').setView([-11.623556, 33.245531], 13);

  // Add Esri satellite tiles (free, no API key needed)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 18
  }).addTo(map);

  // Add marker for office
  const marker = L.marker([-11.623556, 33.245531]).addTo(map);
  marker.bindPopup(
    '<strong>HOPAPCU Office</strong><br/>FAAD Malawi Building<br/>Mkondezi, Nkhata-Bay'
  ).openPopup();
});