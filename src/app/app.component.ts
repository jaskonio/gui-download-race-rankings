import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import csvDownload from 'json-to-csv-export'
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'gui-download-race-rankings';

  processing = false

  urlFormControl = new FormControl('', [Validators.required]);

  dataToConvert = {
    data: [],
    filename: 'runner_data',
    delimiter: ',',
    headers: ["id","title","description","price","discountPercentage","rating","stock","brand","category","thumbnail","images"]
  }

  constructor(private http:HttpClient) {
    if (environment.production) {
      console.log("Mode production")
    } else {
      console.log("Mode development")
    }
  }
  
  downloadData() {  
    console.log("value: " + this.urlFormControl.value)

    if( this.urlFormControl.value == "") {
      // set error
      return
    }

    this.processing = true

    let body = {
      url: this.urlFormControl.value
    }

    this.http.post("http://"+ environment.host + ":" + environment.port + "/race/download", body)
    .subscribe(
      {
        next: (data:any) => {
          console.log(data);
          this.dataToConvert.data = data;
          console.log(this.dataToConvert)
          csvDownload(this.dataToConvert)
        },
        error: (e) => {
          console.log("[ERROR] Requests fail");
          this.urlFormControl.setErrors({'failRequests': "Fail Requests"})
        },
        complete: () => {
          console.log('done')
          this.processing = false
        }
      })
  }
}
