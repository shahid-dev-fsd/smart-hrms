import Papa from "papaparse";
import * as XLSX from "xlsx";

const ExcelFileReader = (event) => {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0];
    const extension = file.name.split(".").pop();

    if (!file || (extension !== "xls" && extension !== "xlsx")) {
      reject(new Error("File Extension is Invalid"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const excel = new Uint8Array(event.target.result);
        const workbook = XLSX.read(excel, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const header = jsonData[0];
        const data = jsonData.slice(1);

        resolve({ header, data });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

const CSVFileReader = (event) => {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0];
    const extension = file.name.split(".").pop();

    if (!file || extension !== "csv") {
      reject(new Error("File Extension is Invalid"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target.result;
        Papa.parse(csvData, {
          complete: (results) => {
            const header = results.data[0];
            const data = results.data.slice(1);
            resolve({ header, data });
          },
          error: (error) => {
            reject(error);
          },
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

const getFileExtension = (event) => {
  const file = event.target.files[0];
  if (!file) {
    throw new Error("No file selected.");
  }
  const fileName = file.name;
  const extension = fileName.split(".").pop().toLowerCase();
  return extension;
};
const getFileSize = (event) => {
  const file = event.target.files[0];
  if (!file) {
    throw new Error("No file selected.");
  }
  const fileSizeInMB = file.size / (1024 * 1024);
  return fileSizeInMB;
};

export { ExcelFileReader, CSVFileReader, getFileExtension, getFileSize };
