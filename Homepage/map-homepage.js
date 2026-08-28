/*
   ═══════════════════════════════════════════════════════════════════════════
   HOPAPCU HOMEPAGE MAP SCRIPT
   File: Homepage/map-homepage.js
   
   WHAT THIS FILE DOES:
   This file creates an interactive satellite map on the homepage.
   Users can zoom in/out with their mouse scroll and drag to pan around.
   There's a red pin showing where the HOPAPCU office is located.
   
   Think of this like putting a digital map on the website that works
   just like Google Maps, but using free satellite imagery.
   ═══════════════════════════════════════════════════════════════════════════
*/

/*
   STEP 1: Wait for the page to fully load before creating the map
   
   Why this matters:
   - The HTML needs to load completely first
   - The map container div (#mapContainer) needs to exist before we can put a map inside it
   - If we run this code before the page loads, the container won't be there yet
   - This waits for the "DOMContentLoaded" event, which means "the page is ready"
*/
document.addEventListener('DOMContentLoaded', function() {
  
  /*
     STEP 2: Define the office location coordinates
     
     Latitude: -11.623556 (negative = South, positive = North)
     Longitude: 33.245531 (negative = West, positive = East)
     
     These coordinates pinpoint exactly where the HOPAPCU office is in Malawi.
     In the Southern Hemisphere (negative latitude), we are south of the equator.
     We are in the Eastern Hemisphere (positive longitude), east of the prime meridian.
     
     Think of latitude and longitude like a grid:
     - Latitude is the horizontal lines (but measures north/south)
     - Longitude is the vertical lines (but measures east/west)
     - Where they cross is your exact location
  */
  const officeLatitude = -11.623556;
  const officeLongitude = 33.245531;
  
  /*
     STEP 3: Create the map object
     
     This is like saying "I want to create a map here"
     We're telling Leaflet:
     - Put it in the HTML element with id "mapContainer"
     - Start zoomed to level 13 (13 = can see the city and surroundings)
     - Center it at the office coordinates
     
     Zoom levels explained:
     - 1 = whole world
     - 5 = country level
     - 10 = city level
     - 13 = neighborhood/building level
     - 18 = street level detail
     
     We chose 13 because it shows the office and nearby landmarks.
  */
  const map = L.map('mapContainer').setView([officeLatitude, officeLongitude], 13);
  
  /*
     STEP 4: Add satellite imagery as the map background layer
     
     What's happening:
     - The map needs tiles (images) to display
     - These tiles come from Esri's World Imagery service (free satellite photos)
     - Each tile is a small image that combines with others to show the full map
     - When user zooms in, more detailed tiles load automatically
     
     The URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
     - {z} = zoom level
     - {y} = vertical position
     - {x} = horizontal position
     - Leaflet fills in these values automatically as the map is used
     
     Attribution: We credit Esri (the service provider) on the map
     maxZoom: 18 = users can zoom in up to level 18 (street view detail)
  */
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
  }).addTo(map);
  
  /*
     STEP 5: Create a red pin (marker) at the office location
     
     A marker is a clickable pin on the map.
     L.marker() creates it, and [latitude, longitude] is where it appears.
     We're putting it exactly where the office is.
  */
  const officeMarker = L.marker([officeLatitude, officeLongitude]);
  
  /*
     STEP 6: Add a popup to the marker
     
     A popup is text that appears when you click the marker.
     It says "HOPAPCU Office" with the address.
     The <br/> creates a line break (shows "Mkondezi" on a new line).
     This helps users understand what the pin represents.
  */
  officeMarker.bindPopup(
    '<strong>HOPAPCU Office</strong><br/>' +
    'FAAD Malawi Building<br/>' +
    'Mkondezi, Nkhata-Bay<br/>' +
    'Malawi'
  );
  
  /*
     STEP 7: Add the marker to the map
     
     This says: "Leaflet, put this marker on the map we just created."
     Now users can see the red pin at the office location.
  */
  officeMarker.addTo(map);
  
  /*
     STEP 8: Make the marker show its popup by default
     
     openPopup() means the popup text shows immediately when the page loads.
     Users don't have to click to see what the pin is.
     They can see "HOPAPCU Office" right away.
  */
  officeMarker.openPopup();
  
  /*
     STEP 9: Disable default map controls we don't need
     
     By default, Leaflet adds zoom buttons (+/-) on the map.
     We don't need them because users can:
     - Scroll their mouse wheel to zoom
     - Use trackpad pinch on mobile
     
     We keep the attribution (credit) at the bottom because Esri requires it.
  */
  map.zoomControl.remove();
  
  /*
     STEP 10: That's it!
     
     The map is now live on the website.
     Users can:
     - Scroll to zoom in/out
     - Click and drag to pan (move around)
     - Click the marker to see the office details
     
     On mobile, they can pinch to zoom and swipe to pan.
     Everything is automatic — Leaflet handles all interactions.
  */
});