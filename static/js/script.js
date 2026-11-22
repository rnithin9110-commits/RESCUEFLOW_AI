
// RESCUEFLOW AI - DASHBOARD JAVASCRIPT

const form = document.getElementById("incident-form");
const message = document.getElementById("message");
const incidentList = document.getElementById("incident-list");

let selectedLatitude = null;
let selectedLongitude = null;
let incidentMap = null;
let selectedMarker = null;
let incidentMarkers = [];

// 1. INITIALIZE MAP
function initializeMap() {
    const mapElement = document.getElementById("incident-map");

    if (!mapElement || typeof L === "undefined") {
        console.error("Map library could not be loaded.");
        return;
    }

    incidentMap = L.map("incident-map").setView(
        [20.5937, 78.9629], 5
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19
        }
    ).addTo(incidentMap);

    incidentMap.on("click", function (event) {
        selectLocation(event.latlng.lat, event.latlng.lng);
    });

    const locationButton = document.getElementById("use-my-location");

    if (locationButton) {
        locationButton.addEventListener("click", getCurrentLocation);
    }
}

// 2. SELECT LOCATION
function selectLocation(latitude, longitude) {
    selectedLatitude = latitude;
    selectedLongitude = longitude;

    if (selectedMarker && incidentMap) {
        incidentMap.removeLayer(selectedMarker);
    }

    selectedMarker = L.marker([latitude, longitude]).addTo(incidentMap);

    selectedMarker.bindPopup("Selected Incident Location").openPopup();

    document.getElementById("selected-location").textContent =
        "Selected coordinates: " +
        latitude.toFixed(6) + ", " +
        longitude.toFixed(6);
}

// 3. CURRENT LOCATION
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert("Your browser does not support GPS location.");
        return;
    }

    const locationText = document.getElementById("selected-location");
    locationText.textContent = "Getting your current location...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            incidentMap.setView([latitude, longitude], 15);
            selectLocation(latitude, longitude);
        },
        function (error) {
            locationText.textContent =
                "Location unavailable. Allow permission or select the map manually.";
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000
        }
    );
}

// 4. UPDATE STATISTICS
function updateStatistics(incidents) {
    const high = incidents.filter(i => i.priority === "High").length;
    const medium = incidents.filter(i => i.priority === "Medium").length;
    const low = incidents.filter(i => i.priority === "Low").length;

    document.getElementById("total-incidents").textContent = incidents.length;
    document.getElementById("high-priority").textContent = high;
    document.getElementById("medium-priority").textContent = medium;
    document.getElementById("low-priority").textContent = low;

    document.getElementById("risk-high").textContent = high;
    document.getElementById("risk-medium").textContent = medium;
    document.getElementById("risk-low").textContent = low;

    let overallRisk = "LOW";

    if (high > 0) overallRisk = "HIGH";
    else if (medium > 0) overallRisk = "MEDIUM";

    const riskElement = document.getElementById("overall-risk");
    riskElement.textContent = overallRisk;

    riskElement.style.color =
        overallRisk === "HIGH" ? "#ff555f" :
        overallRisk === "MEDIUM" ? "#ffbb35" : "#19c99a";
}

// 5. NOTIFICATIONS
function updateNotifications(incidents) {
    const list = document.getElementById("notification-list");
    list.innerHTML = "";

    if (incidents.length === 0) {
        list.textContent = "No notifications available.";
        return;
    }

    incidents.slice(0, 5).forEach(incident => {
        const card = document.createElement("div");
        card.className = "notification-card " + incident.priority.toLowerCase();

        const title = document.createElement("h3");
        title.textContent = incident.title;

        const priority = document.createElement("p");
        priority.textContent = "Priority: " + incident.priority;

        const status = document.createElement("p");
        status.textContent = "Status: " + incident.status;

        card.append(title, priority, status);
        list.appendChild(card);
    });
}

// 6. CATEGORY CHART
function updateCategoryChart(incidents) {
    const chart = document.getElementById("category-chart");
    chart.innerHTML = "";

    const categories = ["Fire", "Medical", "Flood", "Accident", "Other"];

    const counts = categories.map(category =>
        incidents.filter(i => i.incident_type === category).length
    );

    const maxCount = Math.max(...counts, 1);

    categories.forEach((category, index) => {
        const bar = document.createElement("div");
        bar.className = "chart-bar";

        bar.style.height =
            Math.max((counts[index] / maxCount) * 150, 5) + "px";

        bar.title = category + ": " + counts[index];

        const label = document.createElement("span");
        label.textContent = category;

        bar.appendChild(label);
        chart.appendChild(bar);
    });
}

// 7. DISPLAY INCIDENTS
function displayIncidents(incidents) {
    incidentList.innerHTML = "";

    if (incidents.length === 0) {
        incidentList.textContent = "No incidents reported yet.";
        return;
    }

    incidents.forEach(incident => {
        const card = document.createElement("div");
        card.className = "incident-card";

        const title = document.createElement("h3");
        title.textContent = incident.title;

        const description = document.createElement("p");
        description.textContent = incident.description;

        const type = document.createElement("p");
        type.textContent = "Type: " + incident.incident_type;

        const priority = document.createElement("p");
        priority.textContent = "Priority: " + incident.priority;
        priority.className = "priority-" + incident.priority.toLowerCase();

        const status = document.createElement("p");
        status.textContent = "Status: " + incident.status;

        const teamButton = document.createElement("button");
        teamButton.textContent = "Recommend Team";

        const teamResult = document.createElement("p");

        teamButton.addEventListener("click", async function () {
            try {
                const response = await fetch(
                    `/api/incidents/${incident.id}/recommend-team`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Recommendation failed");
                }

                teamResult.textContent = result.recommended_team
                    ? "Recommended Team: " + result.recommended_team
                    : result.message;

            } catch (error) {
                teamResult.textContent = error.message;
            }
        });

        card.append(title, description, type, priority, status,
            teamButton, teamResult);

        incidentList.appendChild(card);
    });
}

// 8. LOAD INCIDENTS AND MAP MARKERS
async function loadIncidents() {
    try {
        const response = await fetch("/api/incidents");

        if (!response.ok) {
            throw new Error("Could not load incidents.");
        }

        const incidents = await response.json();

        updateStatistics(incidents);
        updateNotifications(incidents);
        updateCategoryChart(incidents);
        displayIncidents(incidents);

        incidentMarkers.forEach(marker => {
            incidentMap.removeLayer(marker);
        });

        incidentMarkers = [];

        if (incidentMap) {
            incidents.forEach(incident => {
                if (incident.latitude != null && incident.longitude != null) {
                    const marker = L.marker([
                        incident.latitude,
                        incident.longitude
                    ]).addTo(incidentMap);

                    marker.bindPopup(
                        `<b>${incident.title}</b><br>
                        Priority: ${incident.priority}<br>
                        Status: ${incident.status}<br>
                        Type: ${incident.incident_type}`
                    );

                    incidentMarkers.push(marker);
if (incident.id === 7) {
    incidentMap.setView(
        [incident.latitude, incident.longitude],
        15
    );
}
                }
            });
        }

    } catch (error) {
        incidentList.textContent = error.message;
        console.error(error);
    }
}

// 9. SUBMIT NEW INCIDENT
if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const incidentData = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            incident_type: document.getElementById("incident_type").value
        };

        if (selectedLatitude === null || selectedLongitude === null) {
            message.textContent =
                "Please select an incident location on the map first.";
            return;
        }

        try {
            const response = await fetch("/api/incidents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...incidentData,
                    latitude: selectedLatitude,
                    longitude: selectedLongitude
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Could not create incident.");
            }

            message.textContent = "Incident created successfully!";

            form.reset();
            selectedLatitude = null;
            selectedLongitude = null;

            if (selectedMarker && incidentMap) {
                incidentMap.removeLayer(selectedMarker);
                selectedMarker = null;
            }

            document.getElementById("selected-location").textContent =
                "Click on the map to select an incident location.";

            await loadIncidents();

        } catch (error) {
            message.textContent = error.message;
        }
    });
}

// 10. START DASHBOARD
initializeMap();
loadIncidents();
