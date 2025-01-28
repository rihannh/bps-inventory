import {base} from '../network/base';
import {PDFViewer} from '@react-pdf/renderer';
import {KAK, KAKProps} from '@/components/KAK';
import ReactDOM from 'react-dom';
import { getUser } from './userServices';
import { Karken, KarkenProps } from '@/components/Karken';
import { Document } from '@react-pdf/renderer';

export async function fetchPengajuan() {
  const response = await base.get('/get_transaksi_pengajuan');
  return response.data;
}

export async function fetchPengajuanByUser() {
  const response = await base.get('/get_transaksi_pengajuan');

  const user = getUser();
  // Filter the data based on user.data_ruangan
  const userRuanganIds = user.data_ruangan.map((r) => r.id_ruangan); // Extract ruangan IDs
  const filteredData = response.data.data.filter((item: {id_ruangan: string}) =>
    userRuanganIds.includes(item.id_ruangan)
  );

  console.log(filteredData);
  return {...response, data: filteredData}; // Return filtered data
}

export async function fetchDetailPengajuan(ruangnaID: string, tanggal: string) {
  const response = await base.get(
    `/get_detail_pengajuan/${ruangnaID}/${tanggal}`
  );
  return response.data;
}

export function generateKAK({dataKAK}: {dataKAK: KAKProps}) {
  console.log('dataKAK', dataKAK);
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(`
        <html>
          <head>
            <title>Preview PDF</title>
          </head>
          <body style="margin:0;padding:0;">
            <div id="pdf-viewer" style="width:100vw;height:100vh;"></div>
          </body>
        </html>
      `);

    const container = newWindow.document.getElementById('pdf-viewer');
    if (container) {
      const root = newWindow.document.createElement('div');
      root.style.width = '100%';
      root.style.height = '100%';
      container.appendChild(root);

      ReactDOM.render(
        <PDFViewer width='100%' height='100%'>
          <KAK data={dataKAK} />
        </PDFViewer>,
        root
      );
    }
  }
}


export function generateKarken({dataKarken}: {dataKarken: [KarkenProps]}) {
  console.log('dataKarken', dataKarken);
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(`
        <html>
          <head>
            <title>Preview PDF</title>
          </head>
          <body style="margin:0;padding:0;">
            <div id="pdf-viewer" style="width:100vw;height:100vh;"></div>
          </body>
        </html>
      `);

    const container = newWindow.document.getElementById('pdf-viewer');
    if (container) {
      const root = newWindow.document.createElement('div');
      root.style.width = '100%';
      root.style.height = '100%';
      container.appendChild(root);

      console.log('dataKarkenArray', dataKarken);

      ReactDOM.render(
        <PDFViewer width='100%' height='100%'>
          <Document>
            {dataKarken.map((item: KarkenProps) => (
                <Karken data={item} /> 
            ))}
          </Document>
        </PDFViewer>,
        root
      );
    }
  }
}