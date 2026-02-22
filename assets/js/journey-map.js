(function() {
  var mapEl = document.getElementById('journey-map');
  if (!mapEl) return;

  var map = L.map('journey-map', {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([35, 10], 2);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

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
        { year: '2005 \u2013 2014', desc: 'Kindergarten + Elementary School (Grades 1\u20133)' },
        { year: '2017 \u2013 2019', desc: 'Middle School (Grades 7\u20138)' }
      ]
    },
    {
      lat: 33.75, lng: -84.39, type: 'physical',
      city: 'Atlanta, Georgia, USA',
      entries: [
        { year: '2014 \u2013 2017', desc: 'Elementary School (Grades 4\u20135) + Middle School (Grade 6)' }
      ]
    },
    {
      lat: 53.54, lng: -113.49, type: 'physical',
      city: 'Edmonton, Alberta, Canada',
      entries: [
        { year: '2019 \u2013 2023', desc: 'Junior High (Grade 9) + High School (Grades 10\u201312) at Old Scona Academic' },
        { year: '2021 \u2013 2023', desc: 'Computational Chemistry Research under Prof. Alex Brown, University of Alberta' },
        { year: 'Summer 2022', desc: 'Web Development & RL Intern under Prof. Matthew E. Taylor, University of Alberta' }
      ]
    },
    {
      lat: 50.45, lng: -104.62, type: 'physical',
      city: 'Regina, Saskatchewan, Canada',
      entries: [
        { year: 'Summer 2022', desc: 'FNJA \u2014 The National Ambassador Youth Forum (French/English Bilingual)' }
      ]
    },
    {
      lat: 43.65, lng: -79.38, type: 'current',
      city: 'Toronto, Ontario, Canada',
      entries: [
        { year: '2023 \u2013 Present', desc: 'University of Toronto \u2014 B.Sc. Computer Science (AI) + Chemistry Minor' },
        { year: 'Jan \u2013 Apr 2026', desc: 'Shopify \u2014 Applied ML Engineer Intern, Search Relevance Team' }
      ]
    },
    {
      lat: 1.35, lng: 103.82, type: 'physical',
      city: 'Singapore',
      entries: [
        { year: 'Jan 2025', desc: 'AAAI 2025 \u2014 Undergraduate Consortium Presentation' },
        { year: 'Summer 2025', desc: 'NUS SERIUS Research Internship \u2014 LLM fine-tuning for metabolite pathway engineering' }
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
        { year: 'Summer 2023', desc: 'SFU Invent the Future AI4ALL \u2014 Teaching Assistant' }
      ]
    },
    {
      lat: 41.31, lng: -72.92, type: 'remote',
      city: 'Yale University',
      entries: [
        { year: 'Fall 2025', desc: 'Gerstein Lab \u2014 Protein inverse folding research, Nature Comp. Sci. paper' }
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

  var lifePath = [
    [43.8, 87.6],
    [39.9, 116.4],
    [33.75, -84.39],
    [39.9, 116.4],
    [53.54, -113.49],
    [50.45, -104.62],
    [53.54, -113.49],
    [43.65, -79.38],
    [1.35, 103.82],
    [43.65, -79.38],
    [1.35, 103.82],
    [43.65, -79.38],
    [40.71, -74.01],
    [43.65, -79.38]
  ];

  L.polyline(lifePath, {
    color: '#6c5ce7',
    weight: 2,
    opacity: 0.45,
    smoothFactor: 1
  }).addTo(map);

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
