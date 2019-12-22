import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkerService } from './../_services/marker.service';
import * as L from 'leaflet';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize:     [25, 41],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -34],
  tooltipAnchor:[16, -28],
  shadowSize:   [41, 41]
});
//L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements AfterViewInit {
  form: FormGroup;
  private map;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
    ) {
    this.form = this.fb.group({
      myFile: [null]
    });
  }

  ngAfterViewInit() {
    this.initMap();
    // this.marker.makeMarker(this.map);
  }

  uploadFile(event: Event) {
    const img = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      myFile: img
    });
    this.form.get('myFile').updateValueAndValidity();
  }

  submitForm() {
    const formData: any = new FormData();
    formData.append('myFile', this.form.get('myFile').value);

    this.http.post('http://192.168.31.51/upload', formData).subscribe(
      // (response) => console.log(response),
      (response: Response) => {
        console.log(response)
        let resStr = JSON.stringify(response);
        let geoTags = JSON.parse(resStr);
        L.marker([geoTags.Lat, geoTags.Lng], {icon: iconDefault}).addTo(this.map)
        .bindPopup("Latitude: " + geoTags.Lat + "<br />Longitude: " + geoTags.Lng);
        this.map.setView([geoTags.Lat, geoTags.Lng], 16);
      },
      (error) => console.log(error)
      );
    }
    initMap() {
      const lat = 35.699177;
      const lng = 51.376141;
      this.map = L.map('map', {
        center: [lat, lng],
        zoom: 12
      });
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
      L.marker([lat, lng], {icon: iconDefault}).addTo(this.map);
  }
}
