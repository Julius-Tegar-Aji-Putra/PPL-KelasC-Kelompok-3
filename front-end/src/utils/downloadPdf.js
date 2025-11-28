import axios from 'axios';

/**
 * Helper untuk download PDF dari API Laravel
 * @param {string} url - Endpoint URL
 * @param {string} filename - Nama file output
 * @param {function} setLoading - (Optional) State setter untuk loading
 */
export const downloadPdf = async (url, filename, setLoading = null) => {
  try {
    if (setLoading) setLoading(true);

    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert("Anda harus login untuk mengunduh laporan.");
      return;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/pdf',
      },
      responseType: 'blob', // PENTING: Agar dianggap binary file
    });

    // Buat URL object dari blob
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    
    // Trigger download via element anchor
    const link = document.createElement('a');
    link.href = urlBlob;
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(urlBlob);

  } catch (error) {
    console.error("Gagal mendownload PDF:", error);
    alert("Gagal mendownload laporan. Silakan coba lagi.");
  } finally {
    if (setLoading) setLoading(false);
  }
};