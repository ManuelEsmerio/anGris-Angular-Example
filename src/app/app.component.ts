import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("agGrid", { static: false }) agGrid!: AgGridAngular;

  title = 'ngGrid';

  columnDefs: ColDef[] = [
    {
      headerName: "Make",
      field: "make",
      rowGroup: true
    },
    { headerName: "Price", field: "price", sortable: true, filter: true }
  ]

  autoGroupColumnDef = {
    headerName: "Model",
    field: "model",
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      checkbox: true
    }
  }

  rowData!: Observable<any[]>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.rowData = this.httpClient.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  getSelectedRows(): void {
    console.log("Click Selected Rows");

    const selectedData = this.agGrid.api.getSelectedNodes()
      .map(node => node.data)
    // .map(node => `${node.make} ${node.model}`)
    // .join(", ");

    console.log(selectedData);
  }
}
