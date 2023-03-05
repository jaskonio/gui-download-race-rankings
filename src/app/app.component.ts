import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import csvDownload from 'json-to-csv-export'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'gui-download-race-rankings';

  urlFormControl = new FormControl('', [Validators.required]);

  dataToConvert = {
    data: [],
    filename: 'runner_data',
    delimiter: ',',
    headers: ["id","title","description","price","discountPercentage","rating","stock","brand","category","thumbnail","images"]
  }

  constructor(private http:HttpClient) {
  }
  
  downloadData() {  
    console.log("value: " + this.urlFormControl.value)

    if( this.urlFormControl.value == "") {
      // set error
      return
    }

    this.http.get("https://dummyjson.com/products").subscribe((response: any) => {
      console.log(response['products'])
      this.dataToConvert.data = response['products']

      console.log(this.dataToConvert)
      csvDownload(this.dataToConvert)
    })
  }
}
