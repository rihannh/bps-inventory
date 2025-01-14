import {base} from '../network/base';
import {PDFViewer} from '@react-pdf/renderer';
import {KAK, KAKProps} from '@/components/KAK';
import ReactDOM from 'react-dom';

export async function fetchPengajuan() {
  const response = await base.get('/get_transaksi_pengajuan');
  return response.data;
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
