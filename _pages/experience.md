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
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  margin-bottom: 1.5em;
  z-index: 1;
}

.map-legend {
  display: flex;
  gap: 1.5em;
  margin-bottom: 1.5em;
  font-size: 0.85em;
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
  flex-shrink: 0;
}

.legend-dot.physical { background: #6c5ce7; }
.legend-dot.remote { background: #b8b5e7; }
.legend-dot.current { background: #00b894; }
.legend-dot.birth { background: #fd79a8; }
.legend-line { width: 20px; height: 0; border-top: 2px solid #6c5ce7; border-radius: 0; }

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

.popup-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.popup-tag.physical { background: rgba(108,92,231,0.1); color: #6c5ce7; }
.popup-tag.remote { background: rgba(184,181,231,0.2); color: #7c78c9; }
.popup-tag.current { background: rgba(0,184,148,0.1); color: #00b894; }

/* Marker styles */
.marker-physical {
  background: #6c5ce7;
  border: 2.5px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(108,92,231,0.35);
}

.marker-remote {
  background: #b8b5e7;
  border: 2.5px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(108,92,231,0.2);
}

.marker-birth {
  background: #fd79a8;
  border: 2.5px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(253,121,168,0.35);
}

.marker-current {
  background: #00b894;
  border: 2.5px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0,184,148,0.2), 0 2px 6px rgba(0,184,148,0.35);
}

.path-arrow {
  color: rgba(108,92,231,0.6);
}
</style>

My journey so far — hover over the pins to explore.

<div class="map-legend">
  <span><span class="legend-dot birth"></span> Birthplace</span>
  <span><span class="legend-dot current"></span> Current</span>
  <span><span class="legend-dot physical"></span> In-person</span>
  <span><span class="legend-dot remote"></span> Remote</span>
  <span><span class="legend-line"></span> Life path</span>
</div>

<div id="journey-map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function() {
  var map = L.map('journey-map', {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([35, 10], 2);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  // Each pin is one city. Entries array holds all things that happened there.
  var pins = [
    {
      lat: 43.8, lng: 87.6, type: 'birth',
      city: 'Xinjiang, China',
      entries: [
        { year: '2005', desc: 'Birthplace' }
      ]
    },
    {
      lat: 39.9, lng: 116.4, type: 'physical',
      city: 'Beijing, China',
      entries: [
        { year: '2005 – 2014', desc: 'Kindergarten + Elementary School (Grades 1–3)' },
        { year: '2017 – 2019', desc: 'Middle School (Grades 7–8)' }
      ]
    },
    {
      lat: 33.75, lng: -84.39, type: 'physical',
      city: 'Atlanta, Georgia, USA',
      entries: [
        { year: '2014 – 2017', desc: 'Elementary School (Grades 4–5) + Middle School (Grade 6)' }
      ]
    },
    {
      lat: 53.54, lng: -113.49, type: 'physical',
      city: 'Edmonton, Alberta, Canada',
      entries: [
        { year: '2019 – 2023', desc: 'Junior High (Grade 9) + High School (Grades 10–12) at Old Scona Academic' },
        { year: '2021 – 2023', desc: 'Computational Chemistry Research under Prof. Alex Brown, University of Alberta' },
        { year: 'Summer 2022', desc: 'Web Development & RL Intern under Prof. Matthew E. Taylor, University of Alberta' }
      ]
    },
    {
      lat: 50.45, lng: -104.62, type: 'physical',
      city: 'Regina, Saskatchewan, Canada',
      entries: [
        { year: 'Summer 2022', desc: 'FNJA — The National Ambassador Youth Forum (French/English Bilingual)' }
      ]
    },
    {
      lat: 43.65, lng: -79.38, type: 'current',
      city: 'Toronto, Ontario, Canada',
      entries: [
        { year: '2023 – Present', desc: 'University of Toronto — B.Sc. Computer Science (AI) + Chemistry Minor' },
        { year: 'Jan – Apr 2026', desc: 'Shopify — Applied ML Engineer Intern, Search Relevance Team' }
      ]
    },
    {
      lat: 1.35, lng: 103.82, type: 'physical',
      city: 'Singapore',
      entries: [
        { year: 'Jan 2025', desc: 'AAAI 2025 — Undergraduate Consortium Presentation' },
        { year: 'Summer 2025', desc: 'NUS SERIUS Research Internship — LLM fine-tuning for metabolite pathway engineering' }
      ]
    },
    {
      lat: 40.71, lng: -74.01, type: 'physical',
      city: 'New York City, USA',
      entries: [
        { year: 'Nov 2025', desc: 'CSAW CTF Competition' }
      ]
    },
    {
      lat: 49.25, lng: -122.95, type: 'remote',
      city: 'Burnaby, BC',
      entries: [
        { year: 'Summer 2023', desc: 'SFU Invent the Future AI4ALL — Teaching Assistant' }
      ]
    },
    {
      lat: 41.31, lng: -72.92, type: 'remote',
      city: 'Yale University',
      entries: [
        { year: 'Fall 2025', desc: 'Gerstein Lab — Protein inverse folding research, Nature Comp. Sci. paper' }
      ]
    },
    {
      lat: 45.42, lng: -75.69, type: 'remote',
      city: 'Ottawa, Ontario, Canada',
      entries: [
        { year: '2020, 2021, 2022', desc: 'CyberTitan National Cyber Defense Competition' }
      ]
    }
  ];

  // Life path
  var lifePath = [
    [43.8, 87.6],     // Xinjiang
    [39.9, 116.4],    // Beijing
    [33.75, -84.39],  // Atlanta
    [39.9, 116.4],    // Beijing (return)
    [53.54, -113.49], // Edmonton
    [50.45, -104.62], // Regina
    [53.54, -113.49], // Edmonton (return)
    [43.65, -79.38],  // Toronto
    [1.35, 103.82],   // Singapore (AAAI)
    [43.65, -79.38],  // Toronto
    [1.35, 103.82],   // Singapore (NUS)
    [43.65, -79.38],  // Toronto
    [40.71, -74.01],  // NYC
    [43.65, -79.38]   // Toronto
  ];

  L.polyline(lifePath, {
    color: '#6c5ce7',
    weight: 2,
    opacity: 0.45,
    smoothFactor: 1
  }).addTo(map);

  // Arrows at midpoints of long segments
  function addArrow(from, to) {
    var midLat = (from[0] + to[0]) / 2;
    var midLng = (from[1] + to[1]) / 2;
    var angle = Math.atan2(to[1] - from[1], to[0] - from[0]) * (180 / Math.PI);
    var arrowIcon = L.divIcon({
      className: 'path-arrow',
      html: '<div style="transform:rotate(' + (-angle + 90) + 'deg);font-size:12px;line-height:1;">&#9660;</div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
    L.marker([midLat, midLng], { icon: arrowIcon, interactive: false }).addTo(map);
  }

  for (var i = 0; i < lifePath.length - 1; i++) {
    var from = lifePath[i], to = lifePath[i + 1];
    var dist = Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
    if (dist > 2) addArrow(from, to);
  }

  // One marker per city, combined popup
  function makeIcon(type) {
    var size = type === 'current' ? 16 : (type === 'birth' ? 15 : 13);
    return L.divIcon({
      className: 'marker-' + type,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  }

  pins.forEach(function(pin) {
    var tagLabel = pin.type === 'current' ? 'current home' : (pin.type === 'remote' ? 'remote' : (pin.type === 'birth' ? 'birthplace' : ''));

    var html = '<div class="popup-city">' + pin.city + '</div>';
    if (tagLabel) html += '<span class="popup-tag ' + pin.type + '">' + tagLabel + '</span>';

    pin.entries.forEach(function(entry, i) {
      if (i > 0) html += '<div style="border-top:1px solid #eee; margin:8px 0;"></div>';
      html += '<div class="popup-year">' + entry.year + '</div>';
      html += '<div class="popup-desc">' + entry.desc + '</div>';
    });

    var marker = L.marker([pin.lat, pin.lng], {
      icon: makeIcon(pin.type)
    }).addTo(map);

    marker.bindPopup(html, {
      closeButton: false,
      offset: [0, -4],
      minWidth: 200,
      maxWidth: 300
    });

    marker.on('mouseover', function() { this.openPopup(); });
    marker.on('mouseout', function() { this.closePopup(); });
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
