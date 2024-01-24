import { Injectable } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

/**
 * Function that downloads the given Table as CSV
 *
 * @param dataSource The Table to download.
 * @param header The Column names.
 */
handleExportAsCSV(dataSource, header){
  var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    // this is the Title of the File
    // showTitle: true,
    // title: 'User Data',
    useBom: true,
    // this flage locks the download (delete if no lock is needed)
    noDownload: false,
    headers: header
  };
  console.log(dataSource.data)
 
  new ngxCsv(dataSource.data, "user-data", options);
}
}
