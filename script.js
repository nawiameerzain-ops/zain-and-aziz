const cars = {
  "Porsche 911 GT3 RS": {
    facts: [
      "Top speed: 296 km/h",
      "4.0L flat-six engine",
      "518 horsepower",
      "0-100 km/h in 3.0s",
      "Lightweight carbon fiber body"
    ],
    specs: [
      "Engine: 4.0L NA Flat-6",
      "Transmission: 7-speed PDK",
      "Horsepower: 518 hp",
      "Torque: 465 Nm",
      "Weight: 1,450 kg"
    ]
  },
  "Ferrari 488 Pista": {
    facts: [
      "Top speed: 340 km/h",
      "3.9L twin-turbo V8 engine",
      "710 horsepower",
      "0-100 km/h in 2.8s",
      "Track-focused design"
    ],
    specs: [
      "Engine: 3.9L Twin-Turbo V8",
      "Transmission: 7-speed DCT",
      "Horsepower: 710 hp",
      "Torque: 770 Nm",
      "Weight: 1,385 kg"
    ]
  },
  "Lamborghini Huracán EVO": {
    facts: [
      "Top speed: 325 km/h",
      "5.2L V10 engine",
      "631 horsepower",
      "0-100 km/h in 2.9s",
      "All-wheel drive"
    ],
    specs: [
      "Engine: 5.2L V10",
      "Transmission: 7-speed LDF DCT",
      "Horsepower: 631 hp",
      "Torque: 600 Nm",
      "Weight: 1,422 kg"
    ]
  },
  "McLaren 720S": {
    facts: [
      "Top speed: 341 km/h",
      "4.0L twin-turbo V8",
      "710 horsepower",
      "0-100 km/h in 2.9s",
      "Active aerodynamics"
    ],
    specs: [
      "Engine: 4.0L Twin-Turbo V8",
      "Transmission: 7-speed dual-clutch",
      "Horsepower: 710 hp",
      "Torque: 770 Nm",
      "Weight: 1,419 kg"
    ]
  },
  "Nissan GT-R Nismo": {
    facts: [
      "Top speed: 315 km/h",
      "3.8L twin-turbo V6",
      "600 horsepower",
      "0-100 km/h in 2.9s",
      "All-wheel drive grip"
    ],
    specs: [
      "Engine: 3.8L Twin-Turbo V6",
      "Transmission: 6-speed dual-clutch",
      "Horsepower: 600 hp",
      "Torque: 652 Nm",
      "Weight: 1,725 kg"
    ]
  }
};

// image file paths
function getImage(car, type) {
  const base = "images/";
  switch (car) {
    case "Porsche 911 GT3 RS":
      return base + (type === "door" ? "gt3rs_door.jpg" : "gt3rs_side.jpg");
    case "Ferrari 488 Pista":
      return base + (type === "door" ? "488_door.jpg" : "488_side.jpg");
    case "Lamborghini Huracán EVO":
      return base + (type === "door" ? "huracan_door.jpg" : "huracan_side.jpg");
    case "McLaren 720S":
      return base + (type === "door" ? "720s_door.jpg" : "720s_side.jpg");
    case "Nissan GT-R Nismo":
      return base + (type === "door" ? "gtr_door.jpg" : "gtr_side.jpg");
    default:
      return base + "default.jpg";
  }
}

// HOME PAGE
function showList() {
  const list = document.querySelector(".car-list");
  list.style.display = "block";
  list.classList.add("bounce");
}

function showCar() {
  const input = document.getElementById("carInput").value.trim();
  const carDisplay = document.getElementById("carDisplay");
  const factList = document.createElement("ul");
  factList.classList.add("fact-list", "bounce");

  if (cars[input]) {
    localStorage.setItem("selectedCar", input);
    const facts = cars[input].facts;
    carDisplay.innerHTML = `<img src="${getImage(input, "side")}" alt="${input}" class="fade-in">`;
    facts.forEach(fact => {
      const li = document.createElement("li");
      li.textContent = "• " + fact;
      li.classList.add("bounce");
      factList.appendChild(li);
    });
    carDisplay.appendChild(factList);
  } else {
    carDisplay.innerHTML = "<p class='bounce'>Car not found.</p>";
  }
}

// ABOUT PAGE
window.onload = function () {
  const path = window.location.pathname;
  const carName = localStorage.getItem("selectedCar");

  if (path.includes("about.html") && carName) {
    const carNameEl = document.getElementById("carName");
    const carImage = document.getElementById("carImage");
    const carSpecs = document.getElementById("carSpecs");
    const interiorBtn = document.getElementById("interiorBtn");
    const backBtn = document.getElementById("backBtn");

    carNameEl.textContent = carName;
    carImage.src = getImage(carName, "side");

    const specs = cars[carName].specs;
    const specsList = document.createElement("ul");
    specsList.classList.add("specs-section", "bounce");
    specs.forEach(spec => {
      const li = document.createElement("li");
      li.textContent = "• " + spec;
      li.classList.add("bounce");
      specsList.appendChild(li);
    });
    carSpecs.appendChild(specsList);

    // Button event listeners
    interiorBtn.addEventListener("click", showInterior);
    backBtn.addEventListener("click", showSide);
  }
};

function showInterior() {
  const carName = localStorage.getItem("selectedCar");
  const carImage = document.getElementById("carImage");
  const backBtn = document.getElementById("backBtn");
  const interiorBtn = document.getElementById("interiorBtn");
  if (carName) {
    carImage.src = getImage(carName, "door");
    backBtn.classList.remove("hidden");
    interiorBtn.classList.add("hidden");
  }
}

function showSide() {
  const carName = localStorage.getItem("selectedCar");
  const carImage = document.getElementById("carImage");
  const backBtn = document.getElementById("backBtn");
  const interiorBtn = document.getElementById("interiorBtn");
  if (carName) {
    carImage.src = getImage(carName, "side");
    backBtn.classList.add("hidden");
    interiorBtn.classList.remove("hidden");
  }
}