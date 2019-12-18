import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  pin = '/assets/data/loc.geojson';
  constructor(
    private http: HttpClient
    ) {

  }
  makeMarker(map: L.map): void {
    // const api = 'http://192.168.31.158:8080/upload';
    // this.http.get(api).subscribe((res: any) => {
    //     const lat = res.Lat;
    //     const lng = res.Lon;
    //     const marker = L.marker([lat, lng]).addTo(map);
    //     map.setView([lat, lng], 16);
    // });

    this.http.get(this.pin).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lng = c.geometry.coordinates[1];
        const marker = L.marker([lat, lng]).addTo(map);
        map.setView([lat, lng], 16);

      }
    });
  }
}
