import React, { useContext, useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResumesContext from '../context/resumes';

export default function DownloadResume() {
    const { resumes } = useContext(ResumesContext);
    const pdfRef = useRef();
    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10; // Adjust the Y-coordinate as needed

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`resume.pdf`);
        });
    }
    return (
        <>
            <div>
                <h2>Submitted Data</h2>
                <pre ref={pdfRef}>{JSON.stringify(resumes, null, 2)}</pre>
            </div>
            <button onClick={downloadPDF}>download PDF</button>
        </>
    )
}
