function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 31.4037192, lng: 34.9606799 },
    zoom: 7,
    styles: stylers,
    disableDefaultUI: true,
  });

  const marker = new google.maps.Marker({
    position: { lat: 31.975194, lng: 34.7433674 },
    title: "Aviv Kandabi",
    icon: "../resources/images/map-marker.png",
    size: new google.maps.Size(4, 4),
  });

  marker.setMap(map);
  console.log("map loaded.");

  var mapInteracted = false;
  map.addListener("center_changed", () => {
    if (!mapInteracted) {
      mapInteracted = true;
      console.log("map_interacted");
      gtag("event", "click", { event_label: "map_interacted" });
    }
  });
}

var stylers = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#1c1c1c",
      },
    ],
  },
  {
    featureType: "administrative.province",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#212121" }],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        color: "#FFA838",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#FFA838",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#141716",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];
