/**
 * Utility to export JSON data to CSV and trigger download
 * @param {Array} data - Array of objects
 * @param {string} filename - Filename for the exported file
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || !data.length) {
    return;
  }

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => {
    return Object.values(obj).map(val => {
      // Escape commas and quotes
      const str = String(val).replace(/"/g, '""');
      return str.includes(',') ? `"${str}"` : str;
    }).join(',');
  });

  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
