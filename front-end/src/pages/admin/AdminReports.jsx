import React, { useState } from 'react';
import { FileText, MapPin, Star, Download } from 'lucide-react';
import { downloadPdf } from '../../utils/downloadPdf';

const AdminReports = () => {
  // State untuk loading masing-masing tombol
  const [loading, setLoading] = useState({
    status: false,
    location: false,
    rating: false
  });

  const handleDownload = (key, url, filename) => {
    downloadPdf(url, filename, (isLoading) => {
        setLoading(prev => ({ ...prev, [key]: isLoading }));
    });
  };

  const reports = [
    {
        key: 'status',
        title: 'Laporan Status Penjual',
        desc: 'Daftar akun penjual aktif dan non-aktif.',
        icon: <FileText size={40} className="text-blue-500" />,
        url: '/api/admin/reports/seller-status',
        filename: 'Laporan_Status_Penjual.pdf'
    },
    {
        key: 'location',
        title: 'Laporan Lokasi Toko',
        desc: 'Sebaran penjual berdasarkan provinsi.',
        icon: <MapPin size={40} className="text-green-500" />,
        url: '/api/admin/reports/seller-location',
        filename: 'Laporan_Lokasi_Toko.pdf'
    },
    {
        key: 'rating',
        title: 'Laporan Rating Produk',
        desc: 'Daftar produk dengan rating tertinggi.',
        icon: <Star size={40} className="text-yellow-500" />,
        url: '/api/admin/reports/product-rating',
        filename: 'Laporan_Rating_Produk.pdf'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto font-poppins">
      <div className="mb-8">
        <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-secondary-2 rounded-md"></div>
            <h2 className="text-3xl font-bold text-slate-900">Pusat Laporan</h2>
        </div>
        <p className="text-gray-500 mt-1 ml-9">Unduh laporan statistik platform dalam format PDF.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
            <div key={report.key} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="mb-4 p-4 bg-gray-50 rounded-full">
                    {report.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">{report.desc}</p>
                
                <button
                    onClick={() => handleDownload(report.key, report.url, report.filename)}
                    disabled={loading[report.key]}
                    className="w-full flex items-center justify-center gap-2 bg-secondary-2 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 font-medium text-sm"
                >
                    {loading[report.key] ? (
                        <span className="animate-pulse">Mengunduh...</span>
                    ) : (
                        <>
                            <Download size={18} />
                            Download PDF
                        </>
                    )}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;