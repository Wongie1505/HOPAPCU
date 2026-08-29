/*
   HOPAPCU HOMEPAGE MAP SCRIPT
   File: Homepage/map-homepage.js
   
   WHAT THIS FILE DOES:
   This file creates an interactive satellite map on the homepage.
   Users can zoom in/out with their mouse scroll and drag to pan around.
   There's a red pin showing where the HOPAPCU office is located.
   
*/

/*
   STEP 1: Wait for the page to fully load before creating the map
   
   Why:
   - The HTML needs to load completely first
   - The map container div (#mapContainer) needs to exist before the map can be put inside it
*/
document.addEventListener('DOMContentLoaded', function() {
  
  /*
     STEP 2: Define the office location coordinates
  */
  const officeLatitude = -11.623556;
  const officeLongitude = 33.245531;
  
  /*
     STEP 3: Create the map object
     
     Zoom levels explained:
     - 1 = whole world
     - 5 = country level
     - 10 = city level
     - 13 = neighborhood/building level
     - 18 = street level detail
     
  */
  const map = L.map('mapContainer').setView([officeLatitude, officeLongitude], 13);
  
  /*
     STEP 4: Add satellite imagery as the map background layer   
     The URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
     - {z} = zoom level
     - {y} = vertical position
     - {x} = horizontal position
     - Leaflet fills in these values automatically as the map is used
     
     Attribution: Csredit Esri (the service provider) on the map
     maxZoom: 18 = users can zoom in up to level 18 (street view detail)
  */
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
  }).addTo(map);
  
  /*
     STEP 5: Create a red pin (marker) at the office location
  */
  const officeMarker = L.marker([officeLatitude, officeLongitude]);
  
  /*
     STEP 6: Add a popup to the marker
  */
  officeMarker.bindPopup(
    '<strong>HOPAPCU Office</strong><hr/>' +
    'FAAD Malawi Building<br/>' +
    'Mkondezi, Nkhata-Bay<br/>' +
    'Malawi'
  );
  
  /*
     STEP 7: Add the marker to the map
  */
  officeMarker.addTo(map);
  
  /*
     STEP 8: Make the marker show its popup by default
     openPopup() means the popup text shows immediately when the page loads.
     Users don't have to click to see what the pin is.
  */
  officeMarker.openPopup();
  
  /*
     STEP 9: Disabled default map controls not needed.     
     by defaasult, Leaflet adds zoom buttons (+/-) on the map.
     without these users can:
     - Scroll their mouse wheel to zoom
     - Use trackpad pinch on mobile
     
     We keep the attribution (credit) at the bottom because Esri requires it.
  */
  map.zoomControl.remove();
  
});