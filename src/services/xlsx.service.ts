
import * as XLSX from 'xlsx';

export const exportToXLSX = (data:any, fileName:string) => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, `${fileName}.xlsx`);
}