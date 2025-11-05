import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-map-view',
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Progress & Geo-Tagging</h2></div>
  <div class="card" style="height:520px;display:grid;place-items:center;border-style:dashed">
    <div style="text-align:center">
      <div style="font-weight:600;margin-bottom:6px">Map Placeholder</div>
      <div class="muted">A full-page map (Leaflet/Google Maps) will be integrated here.</div>
    </div>
  </div>
  `
})
export class MapViewComponent {}
