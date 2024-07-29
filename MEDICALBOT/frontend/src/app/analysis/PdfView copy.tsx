import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "min(500px, 100%)",
  boxSizing: "border-box",
};

const pdfStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  padding: "30px",
  border: "2px solid #ccc7",
  borderRadius: "12px",
  boxShadow: "0 3px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  overflow: "auto",
};

const PDFPreview: React.FC<{ url: string }> = ({ url }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (error) {
        console.error("Error fetching the PDF:", error);
      }
    };

    fetchPDF();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  if (!pdfUrl) {
    return <p>Loading PDF...</p>;
  }

  return (
    <div style={containerStyle}>
      <div style={pdfStyle}>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
};

export default PDFPreview;
