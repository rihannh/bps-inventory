import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RequireAuth from '@/components/auth/RequireAuth'
import RoleAuth from '@/components/auth/RoleAuth'
import LayoutDashboard from '@/pages/LayoutDashboard'
import Login from '@/pages/Login'
import Dashboard from '@/container/admin-1/Dashboard'
import DataAdmin from '@/container/admin-1/DataAdmin'
import DataPegawai from '@/container/admin-1/DataPegawai'
import DataAdminPengajuan from '@/container/admin-1/DataAdminPengajuan'
import DataBarang from '@/container/admin-1/DataBarang'
import DataRuangan from '@/container/admin-1/DataRuangan'
import BarangMasuk from '@/container/admin-1/BarangMasuk'
import BarangKeluar from '@/container/admin-1/BarangKeluar'
import PermintaanBarang from '@/container/admin-1/PermintaanBarang'
import LaporanPengajuan from '@/container/admin-1/LaporanPengajuan'
import LaporanPermintaan from '@/container/admin-1/LaporanPermintaan'
import LaporanStok from '@/container/admin-1/LaporanStok'

const router = createBrowserRouter(
  [
    {path: '/login', element: <Login />},
    {path: '/unauthorized', element: <div>unauthorized</div>},
    {path: '', element: <RequireAuth />, children:[
      {
        path:'admin-sepuh',
        element: <RoleAuth requiredRole="Admin Sepuh"/>,
        children: [
          {
            path: '',
            element: <LayoutDashboard />,
            children: [
              {path: 'dashboard', element: <Dashboard />},
              {path: 'data-admin', element: <DataAdmin />},
              {path: 'data-pegawai', element: <DataPegawai />},
              {path: 'data-admin-pengajuan', element: <DataAdminPengajuan />},
              {path: 'data-barang', element: <DataBarang />},
              {path: 'data-ruangan', element: <DataRuangan />},

              {path: 'barang-masuk', element: <BarangMasuk />},
              {path: 'barang-keluar', element: <BarangKeluar />},
              {path: 'permintaan-barang', element: <PermintaanBarang />},

              {path: 'laporan-pengajuan', element: <LaporanPengajuan />},
              {path: 'laporan-permintaan', element: <LaporanPermintaan />},
              {path: 'laporan-stok', element: <LaporanStok />},
            ]
          }
        ]
      }
    ]},
  ],
  {basename: import.meta.env.BASE_URL}
)

export default function AppRoutes() {

  return (
    <RouterProvider router={router} />
  )
}

