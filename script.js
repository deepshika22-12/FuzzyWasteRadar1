// Initialize map
const map = L.map('map').setView([11.0168, 76.9558], 16); // Example: Coimbatore

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Add bin markers
const bins = [
  {
    id: 1,
    name: "Library",
    coords: [11.0171, 76.9555],
    level: 25
  },
  {
    id: 2,
    name: "KORE",
    coords: [11.0165, 76.9562],
    level: 55
  },
  {
    id: 3,
    name: "Main Entrance",
    coords: [11.0159, 76.9548],
    level: 90
  }
];

// Status based on fuzzy logic
function getFuzzyStatus(level) {
  if (level < 30) return "Low";
  else if (level < 70) return "Medium";
  else return "High";
}

// Display markers
bins.forEach((bin) => {
  const status = getFuzzyStatus(bin.level);
  L.marker(bin.coords)
    .addTo(map)
    .bindPopup(`<b>${bin.name}</b><br>Status: ${status}<br>Fill: ${bin.level}%`);
});

// Update bins (simulation)
function updateBins() {
  bins.forEach((bin, index) => {
    bin.level = Math.floor(Math.random() * 100);
    const status = getFuzzyStatus(bin.level);

    const binDiv = document.getElementById(`bin${index + 1}`);
    binDiv.querySelector(".status").textContent = status;
    binDiv.querySelector(".level").textContent = `${bin.level}%`;
  });
}
