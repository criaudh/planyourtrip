import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/drptitlu/cl0jemmcl000014swqupx0m9z",
      attributionControl: false,
    })
    this.#addMarkersToMap()
    this.#fitMapToMarkers()

    const map = this.map
    this.map.on("load", function() {
      const tabEl = document.querySelector('button[data-bs-target="#confirmed-trips"]')
      tabEl.addEventListener('shown.bs.tab', function (event) {
        map.resize()
      })
    })

  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window)
      const customMarker = document.createElement("div")
      customMarker.className = "marker"
      customMarker.style.backgroundImage = `url('${marker.image_url}')`
      customMarker.style.backgroundSize = "cover"
      customMarker.style.width = "50px"
      customMarker.style.height = "50px"
      customMarker.style.color = "F78764"
      new mapboxgl.Marker(customMarker)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
    });
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 10, duration: 0 })
  }


}
