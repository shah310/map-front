import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkerService } from './../_services/marker.service';
import * as L from 'leaflet';

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

    this.http.post('http://localhost:8080/upload', formData).subscribe(
      (response: Response) => console.log(response.json()),
      // (response) => this.map.setView([response.json().lat, response.lng], 16),
      // (error) => console.log(error)
    );
  }
  initMap() {
    this.map = L.map('map', {
      center: [35.699177, 51.376141],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
}
