import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, Download } from 'lucide-react';
import { downloadPdf } from '../../utils/downloadPdf';

const SellerReports = () => {
  const [loading, setLoading] = useState({
    stock: false,
    rating: false,
    lowStock: false
  });

  const handleDownload = (key, url, filename) => {
    downloadPdf(url, filename, (isLoading) => {
        setLoading(prev => ({ ...prev, [key]: isLoading }));
    });
  };

  const reports = [
    {
        key: 'stock',
        title: 'Laporan Stok Produk',
        desc: 'Rekapitulasi jumlah stok seluruh produk.',
        icon: <Package size={40} className="text-blue-600" />,
        url: '/api/seller/reports/stock',
        filename: 'Laporan_Stok_Toko.pdf'
    },
    {
        key: 'rating',
        title: 'Analisa Rating',
        desc: 'Urutan produk berdasarkan rating ulasan.',
        icon: <TrendingUp size={40} className="text-purple-600" />,
        url: '/api/seller/reports/rating',
        filename: 'Laporan_Stok_Rating.pdf'
    },
    {
        key: 'lowStock',
        title: 'Laporan Restock',
        desc: 'Daftar barang yang hampir habis (< 2 unit).',
        icon: <AlertTriangle size={40} className="text-orange-500" />,
        url: '/api/seller/reports/low-stock',
        filename: 'Laporan_Restock.pdf'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto font-poppins p-8">
      <div className="mb-8">
        <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-secondary-2 rounded-md"></div>
            <h2 className="text-3xl font-bold text-slate-900">Laporan Toko</h2>
        </div>
        <p className="text-gray-500 mt-1 ml-9">Kelola dan unduh laporan kinerja toko Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="w-full flex items-center justify-center gap-2 bg-white border-2 border-secondary-2 text-secondary-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 font-bold text-sm"
                >
                    {loading[report.key] ? (
                        <span>Processing...</span>
                    ) : (
                        <>
                            <Download size={18} />
                            Download
                        </>
                    )}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SellerReports;