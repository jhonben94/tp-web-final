import { Injectable } from "@angular/core";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { formatearFecha } from "../utils";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
@Injectable({
  providedIn: "root",
})
export class ReportesService {
  constructor() {}

  public exportPdf(dataParam: any[], listaColumnas: any[], reporte = "N") {
    let prepare = [];
    dataParam.forEach((e) => {
      var tempObj = [];
      listaColumnas.forEach((element) => {
        tempObj.push(this.mostrarCampo(e, element));
      });

      prepare.push(tempObj);
    });

    let columnas = [];
    listaColumnas.forEach((item) => {
      columnas.push(item.descripcion);
    });

    const doc = new jsPDF("l", "mm", "a4");
    console.table(columnas, prepare);

    const head = [columnas];
    const data = prepare;

    autoTable(doc, {
      head: head,
      body: data,
      didDrawCell: (data) => {},
    });
    const date = new Date();
    doc.save("data" + date.getMilliseconds() + ".pdf");
  }

  mostrarCampo(row, columna) {
    if (columna.relacion) {
      if (row[columna.label] == null) return "";
      if (Array.isArray(columna.columnaRelacion)) {
        return this.multipleColumnas(
          row[columna.label],
          columna.columnaRelacion
        );
      }
      return row[columna.label][columna.columnaRelacion];
    } else {
      if (typeof columna.estados != "undefined") {
        const label = row[columna.label]
          ? columna.estados[0]
          : columna.estados[1];
        return label;
      }
      if (columna.fecha) {
        return formatearFecha(new Date(row.fecha));
      }
      if (columna.cliente) {
        let lista = JSON.parse(localStorage.getItem("lista-clientes"));
        const cliente = lista.find((item) => item.idCliente == row.idCliente);
        return cliente.nombre + "  " + cliente.apellido;
      }

      return row[columna.label];
    }
  }

  multipleColumnas(valor: any, listaCol: any[]) {
    let valorRetorno = "";
    for (let index = 0; index < listaCol.length; index++) {
      const property = listaCol[index];
      valorRetorno += valor[property] + " ";
    }
    return valorRetorno;
  }

  public exportExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log("worksheet", worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  mostrarCampoReporteDetalle(row, columna) {
    if (columna.relacion) {
      if (row[columna.label] == null) return "";
      if (Array.isArray(columna.columnaRelacion)) {
        return this.multipleColumnas(
          row[columna.label],
          columna.columnaRelacion
        );
      }

      return row[columna.label][columna.columnaRelacion];
    } else {
      if (columna.fecha) {
        return formatearFecha(new Date(row.fecha));
      }
      if (columna.factura) {
        return row.prefijoFactura + " " + row.nroFactura;
      }
      if (columna.cliente) {
        let lista = JSON.parse(localStorage.getItem("lista-clientes"));
        const cliente = lista.find((item) => item.idCliente == row.idCliente);
        return cliente.nombre + "  " + cliente.apellido;
      }
      return row[columna.label];
    }
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
