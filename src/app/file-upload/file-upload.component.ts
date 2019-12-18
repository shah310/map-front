import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  form: FormGroup;
  geoTags;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
    ) {
    this.form = this.fb.group({
      myFile: [null]
    });
  }

  ngOnInit() { }

  uploadFile(event: Event) {
    const img = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      myFile: img
    });
    this.form.get('myFile').updateValueAndValidity();
  }

  submitForm() {
    const formData: any = new FormData();
    formData.append("myFile", this.form.get('myFile').value);

    this.http.post('http://localhost:8080/upload', formData).subscribe(
      // (response) => console.log(response),
      (response) => this.geoTags = response,
      (error) => console.log(error)
    );
    console.log(this.geoTags)
  }
}
