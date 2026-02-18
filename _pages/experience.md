---
layout: archive
title: "Experience"
permalink: /experience/
author_profile: true
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
#journey-map {
  width: 100%;
  height: 520px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-bottom: 1.5em;
  z-index: 1;
}

.map-legend {
  display: flex;
  gap: 1.5em;
  margin-bottom: 1.5em;
  font-size: 0.9em;
  color: #636e72;
  flex-wrap: wrap;
}

.map-legend span {
  display: flex;
  align-items: center;
  gap: 0.4em;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.legend-dot.physical { background: #6c5ce7; }
.legend-dot.remote { background: #00b894; border: 2px dashed #00b894; background: rgba(0,184,148,0.3); }
.legend-dot.path { background: none; border-top: 2px solid rgba(108,92,231,0.4); width: 20px; height: 0; border-radius: 0; }

.leaflet-popup-content-wrapper {
  border-radius: 10px !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
  font-family: 'Inter', sans-serif !important;
}

.leaflet-popup-content {
  margin: 14px 16px !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}

.popup-city {
  font-weight: 700;
  font-size: 15px;
  color: #2d3436;
  margin-bottom: 4px;
}

.popup-year {
  font-size: 12px;
  color: #6c5ce7;
  font-weight: 600;
  margin-bottom: 6px;
}

.popup-desc {
  color: #636e72;
  font-size: 13px;
}

/* Custom marker styles */
.marker-physical {
  background: #6c5ce7;
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(108,92,231,0.4);
}

.marker-remote {
  background: rgba(0,184,148,0.3);
  border: 2px dashed #00b894;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,184,148,0.3);
}

.marker-birth {
  background: #fd79a8;
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(253,121,168,0.4);
}

/* Arrow markers for the path */
.path-arrow {
  color: rgba(108,92,231,0.5);
}
</style>

My journey so far — hover over the pins to explore.

<div class="map-legend">
  <span><span class="legend-dot physical"></span> In-person</span>
  <span><span class="legend-dot remote"></span> Remote</span>
  <span><span class="legend-dot" style="background:#fd79a8;"></span> Birthplace</span>
  <span><span class="legend-dot path"></span> Life path</span>
</div>

<div id="journey-map"></div>

<script>
(function() {
  var map = L.map('journey-map', {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([35, 20], 2);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  // Data: all locations
  var locations = [
    {
      lat: 43.8, lng: 87.6, type: 'birth',
      city: 'Xinjiang, China',
      year: '2005',
      desc: 'Birthplace'
    },
    {
      lat: 39.9, lng: 116.4, type: 'physical',
      city: 'Beijing, China',
      year: '2005 – 2014',
      desc: 'Kindergarten + Elementary School (Grades 1–3)'
    },
    {
      lat: 33.75, lng: -84.39, type: 'physical',
      city: 'Atlanta, Georgia, USA',
      year: '2014 – 2017',
      desc: 'Elementary School (Grades 4–5) + Middle School (Grade 6)'
    },
    {
      lat: 40.1, lng: 116.6, type: 'physical',
      city: 'Beijing, China',
      year: '2017 – 2019',
      desc: 'Middle School (Grades 7–8)',
      offset: true
    },
    {
      lat: 53.54, lng: -113.49, type: 'physical',
      city: 'Edmonton, Alberta, Canada',
      year: '2019 – 2023',
      desc: 'Junior High (Grade 9) + High School (Grades 10–12) at Old Scona Academic'
    },
    {
      lat: 53.54, lng: -113.49, type: 'physical',
      city: 'Edmonton, Alberta, Canada',
      year: '2021 – 2023',
      desc: 'Computational Chemistry Research under Prof. Alex Brown, University of Alberta',
      subpin: 1
    },
    {
      lat: 53.54, lng: -113.49, type: 'physical',
      city: 'Edmonton, Alberta, Canada',
      year: 'Summer 2022',
      desc: 'Web Development & RL Intern under Prof. Matthew E. Taylor, University of Alberta',
      subpin: 2
    },
    {
      lat: 43.65, lng: -79.38, type: 'physical',
      city: 'Toronto, Ontario, Canada',
      year: '2023 – Present',
      desc: 'University of Toronto — B.Sc. Computer Science (AI) + Chemistry Minor'
    },
    {
      lat: 43.65, lng: -79.38, type: 'physical',
      city: 'Toronto, Ontario, Canada',
      year: 'Jan 2026 – Apr 2026',
      desc: 'Shopify — Applied ML Engineer Intern, Search Relevance Team',
      subpin: 1
    },
    {
      lat: 1.35, lng: 103.82, type: 'physical',
      city: 'Singapore',
      year: 'Jan 2025',
      desc: 'AAAI 2025 — Undergraduate Consortium Presentation'
    },
    {
      lat: 1.35, lng: 103.82, type: 'physical',
      city: 'Singapore',
      year: 'Summer 2025',
      desc: 'NUS SERIUS Research Internship — LLM fine-tuning for metabolite pathway engineering',
      subpin: 1
    },
    {
      lat: 49.25, lng: -122.95, type: 'remote',
      city: 'Burnaby, BC (Remote)',
      year: 'Summer 2023',
      desc: 'SFU Invent the Future AI4ALL — Teaching Assistant'
    },
    {
      lat: 41.31, lng: -72.92, type: 'remote',
      city: 'Yale University (Remote)',
      year: 'Fall 2025',
      desc: 'Gerstein Lab — Protein inverse folding research, Nature Comp. Sci. paper'
    }
  ];

  // Physical path (main life moves, chronological)
  var physicalPath = [
    [43.8, 87.6],     // Xinjiang
    [39.9, 116.4],    // Beijing
    [33.75, -84.39],  // Atlanta
    [40.1, 116.6],    // Beijing (return)
    [53.54, -113.49], // Edmonton
    [43.65, -79.38],  // Toronto
    [1.35, 103.82],   // Singapore (AAAI)
    [43.65, -79.38],  // Toronto (return)
    [1.35, 103.82],   // Singapore (NUS)
    [43.65, -79.38]   // Toronto (return)
  ];

  // Draw path with animated dashes
  L.polyline(physicalPath, {
    color: '#6c5ce7',
    weight: 2,
    opacity: 0.35,
    dashArray: '8, 8',
    smoothFactor: 1
  }).addTo(map);

  // Add arrow decorators along the path using simple mid-point markers
  function addArrow(from, to) {
    var midLat = (from[0] + to[0]) / 2;
    var midLng = (from[1] + to[1]) / 2;
    var angle = Math.atan2(to[1] - from[1], to[0] - from[0]) * (180 / Math.PI);

    var arrowIcon = L.divIcon({
      className: 'path-arrow',
      html: '<div style="transform: rotate(' + (-angle + 90) + 'deg); color: rgba(108,92,231,0.5); font-size: 14px; line-height: 1;">&#9660;</div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    L.marker([midLat, midLng], { icon: arrowIcon, interactive: false }).addTo(map);
  }

  for (var i = 0; i < physicalPath.length - 1; i++) {
    addArrow(physicalPath[i], physicalPath[i + 1]);
  }

  // Dashed lines from remote locations to Toronto (base)
  var remoteLines = [
    { from: [49.25, -122.95], to: [43.65, -79.38] },  // Burnaby -> Toronto
    { from: [41.31, -72.92], to: [43.65, -79.38] }     // Yale -> Toronto
  ];

  remoteLines.forEach(function(line) {
    L.polyline([line.from, line.to], {
      color: '#00b894',
      weight: 1.5,
      opacity: 0.3,
      dashArray: '4, 8'
    }).addTo(map);
  });

  // Create markers
  function makeIcon(type, subpin) {
    var size = type === 'birth' ? 16 : 14;
    var cls = 'marker-' + type;
    var offset = subpin ? (subpin * 6) : 0;

    return L.divIcon({
      className: cls,
      iconSize: [size, size],
      iconAnchor: [size/2 + offset, size/2 - offset]
    });
  }

  locations.forEach(function(loc) {
    var popupContent =
      '<div class="popup-city">' + loc.city + '</div>' +
      '<div class="popup-year">' + loc.year + '</div>' +
      '<div class="popup-desc">' + loc.desc + '</div>';

    var marker = L.marker([loc.lat, loc.lng], {
      icon: makeIcon(loc.type, loc.subpin || 0)
    }).addTo(map);

    marker.bindPopup(popupContent, {
      closeButton: false,
      offset: [0, -4],
      minWidth: 180,
      maxWidth: 260
    });

    marker.on('mouseover', function(e) { this.openPopup(); });
    marker.on('mouseout', function(e) { this.closePopup(); });
  });
})();
</script>

---

## Work Experience

### Shopify — Applied Machine Learning Engineer Intern
January – April 2026 | Toronto, ON
- Part of the Core — Search Relevance (Metric) Team. Integrating LLM in search relevance judgment; building world-best product search engine with machine learning.

---

### University of Toronto — DCS Ambassador
September 2025 – Present | Toronto, ON
- **Represent the department at DCS events**, including university fairs, open house, company visits, networking panels, and information sessions.
- Host weekly **resume review sessions** for CS students, providing personalized feedback and career guidance.
- Develop and create blogs, guides, media content, and resources for the CS community.
- Compile and share student tips and job postings via the weekly DCS newsletter.
- Collaborate on departmental projects, including website overhaul/rebrand, media documentation, and alumni mentorship initiatives.

---

### Simon Fraser University — Invent the Future AI4ALL Summer Program
**Teaching Assistant — AI Summer Program** | May – July 2023 | Remote

- Mentored high school students in learning scikit-learn, pandas, PyTorch, TensorFlow, and MONAI Medical Imaging library to apply **computer vision and NLP techniques to computational biology**.
- Worked in a team of 5 to **organise technical workshops**, create resources, plan networking events, and host an **online hackathon** to encourage gender minorities to enter technology.

---

### University of Alberta — The Intelligent Robot Learning Lab
**Intern — Web Development** | June – August 2022 | Edmonton, AB

- Led a team of 4 interns to develop a **Django web app** that reminds people to drink water.
- Connected the web app with **Firebase database** to collect users' daily water intake. Data collected were used to train a **reinforcement learning model** that can recognise water consumption patterns.

---

## Leadership & Outreach

### University of Toronto Women in Computer Science (WiCS) — Co-president
**October 2023 – Present** | Toronto, ON

- Organize and promote events to encourage women in CS, including an AI Ethics Hackathon, mentorship sessions for high school and first-year students, and community-building initiatives.
- Secured over $5,000 in sponsorships and partnered with UofT DCS, Block, SAP, Okta, Hubspot, and other organizations to host office visits, career panels, interview prep sessions, and industry/academic networking events.
- Oversee strategic outreach and engagement initiatives to foster mentorship, professional development, and representation of women in computing.

---

### Toronto Ethics in AI Symposium (TEAS) — Founder, Organizer
**November 2023 – June 2024** | Toronto, ON

- Founded Toronto's **first undergraduate ethics in AI conference**, hosting 120+ participants from Toronto and beyond.
- Organized a full-day, free-to-attend event featuring researchers, industry professionals, United Nations representatives, policymakers, and philosophers.
- Secured $2,000 in funding from the Vector Institute to support the event.

---

### National Center for Women & Information Technology (NCWIT) — Campus Representative
**September 2024 – May 2025** | Toronto, ON

- Promoted NCWIT initiatives at UofT and organized events supporting women in CS, leveraging resources and programs across North America.
- Helped run the 2024 CAN-CWiC (Canadian Celebration of Women in Computing) and presented awards to NCWIT Aspirations in Computing National winners.
- Identified, funded, and supported local women in CS events in Toronto.
- Coordinated the Ontario high school award ceremony, including event organization, promotion, and serving as a panelist to engage high school students.
