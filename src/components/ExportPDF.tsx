import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileDown } from 'lucide-react';

interface ExportPDFProps {
  canvasId: string;
}

export function ExportPDF({ canvasId }: ExportPDFProps) {
    const handleExportPDF = async () => {
      const canvasElement = document.getElementById(canvasId);
      if (canvasElement) {
        const canvas = await html2canvas(canvasElement);
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'px', 'a4');
        pdf.addImage(imageData, 'PNG', 10, 10, 400, 400);
        pdf.save('canvas-export.pdf');
      }
    };
  
    return <button  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={handleExportPDF}>        <FileDown size={30} /> Export PDF</button>;
  }
  
