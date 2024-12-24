import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RequireAuth from '@/components/auth/RequireAuth';
import RoleAuth from '@/components/auth/RoleAuth';
import LayoutDashboard from '@/pages/LayoutDashboard';
import Login from '@/pages/Login';
import Dashboard from '@/container/admin/Dashboard';
import DataAdmin from '@/container/admin/DataAdmin';
import DataPegawai from '@/container/admin/DataPegawai';
import DataAdminPengajuan from '@/container/admin/DataAdminPengajuan';
import DataRuangan from '@/container/admin/DataRuangan';
import BarangMasuk from '@/container/admin/BarangMasuk';
import BarangKeluar from '@/container/admin/BarangKeluar';
import PermintaanBarang from '@/container/admin/PermintaanBarang';
import LaporanPengajuan from '@/container/admin/LaporanPengajuan';
import LaporanPermintaan from '@/container/admin/LaporanPermintaan';
import LaporanStok from '@/container/admin/LaporanStok';
import DataBarangATK from '@/container/admin/DataBarangATK';
import DataBarangARK from '@/container/admin/DataBarangARK';
import PengajuanBarang from '@/container/admin-pengajuan/PengajuanBarang';

const router = createBrowserRouter(
  [
    {path: '/login', element: <Login />},
    {path: '/unauthorized', element: <div>unauthorized</div>},
    {
      path: '',
      element: <RequireAuth />,
      children: [
        {
          path: 'admin',
          element: <RoleAuth requiredRole='Admin' />,
          children: [
            {
              path: '',
              element: <LayoutDashboard />,
              children: [
                {path: 'dashboard', element: <Dashboard />},
                {path: 'data-admin', element: <DataAdmin />},
                {path: 'data-pegawai', element: <DataPegawai />},
                {path: 'data-admin-pengajuan', element: <DataAdminPengajuan />},
                {path: 'data-barang-atk', element: <DataBarangATK />},
                {path: 'data-barang-ark', element: <DataBarangARK />},
                {path: 'data-ruangan', element: <DataRuangan />},

                {path: 'barang-masuk', element: <BarangMasuk />},
                {path: 'barang-keluar', element: <BarangKeluar />},
                {path: 'permintaan-barang', element: <PermintaanBarang />},

                {path: 'laporan-pengajuan', element: <LaporanPengajuan />},
                {path: 'laporan-permintaan', element: <LaporanPermintaan />},
                {path: 'laporan-stok', element: <LaporanStok />},
              ],
            },
          ],
        },
        {
          path: 'admin-pengajuan',
          element: <RoleAuth requiredRole='Admin Pengajuan' />,
          children: [
            {
              path: '',
              element: <LayoutDashboard />,
              children: [
                {path: 'dashboard', element: <Dashboard />},
                {path: 'data-barang-atk', element: <DataBarangATK />},
                {path: 'data-barang-ark', element: <DataBarangARK />},
                {path: 'pengajuan-barang', element: <PengajuanBarang />},
                {path: 'laporan-pengajuan', element: <LaporanPengajuan />},
              ],
            },
          ],
        },
      ],
    },
  ],
  {basename: import.meta.env.BASE_URL}
);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
