// import React, { useEffect, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { Box, Typography, Button } from "@mui/material";
// import Pagination from "@mui/material/Pagination";

// // Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// const containerStyle: React.CSSProperties = {
//   width: "100%",
//   height: "min(500px, 100%)",
//   boxSizing: "border-box",
// };

// const pdfStyle: React.CSSProperties = {
//   width: "100%",
//   // height: "100%",
//   padding: "30px",
//   border: "2px solid #ccc7",
//   borderRadius: "12px",
//   boxShadow: "0 3px 20px rgba(0, 0, 0, 0.1)",
//   backgroundColor: "white",
//   overflow: "auto",
// };

// const PDFPreview: React.FC<{ url: string }> = ({ url }) => {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [numPages, setNumPages] = useState<number>();
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   useEffect(() => {
//     const fetchPDF = async () => {
//       try {
//         const response = await fetch(url);
//         const blob = await response.blob();
//         const objectUrl = URL.createObjectURL(blob);
//         setPdfUrl(objectUrl);
//       } catch (error) {
//         console.error("Error fetching the PDF:", error);
//       }
//     };

//     fetchPDF();

//     return () => {
//       if (pdfUrl) {
//         URL.revokeObjectURL(pdfUrl);
//       }
//     };
//   }, [url]);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
//     setNumPages(numPages);
//     setPageNumber(1); // Reset to the first page whenever a new document is loaded
//   };

//   const handleChangePage = (
//     event: React.ChangeEvent<unknown>,
//     value: number
//   ) => {
//     setPageNumber(value);
//   };

//   if (!pdfUrl) {
//     return <Typography>Loading PDF...</Typography>;
//   }

//   return (
//     <Box sx={{ ...containerStyle, p: 2 }}>
//       <Box sx={pdfStyle}>
//         <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//           <Page pageNumber={pageNumber} />
//         </Document>
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//         <Pagination
//           count={numPages}
//           page={pageNumber}
//           onChange={handleChangePage}
//           color="primary"
//           variant="outlined"
//           shape="rounded"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default PDFPreview;
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Typography, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "min(500px, 100%)",
  boxSizing: "border-box",
};

const pdfStyle: React.CSSProperties = {
  width: "100%",
  padding: "30px",
  border: "2px solid #ccc",
  borderRadius: "12px",
  boxShadow: "0 3px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  overflow: "auto",
};

const PDFPreview: React.FC<{ url: string }> = ({ url }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (error: any) {
        setError(`Error fetching the PDF: ${error.message}`);
      } finally {
        setLoading(false);
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
    setPageNumber(1); // Reset to the first page whenever a new document is loaded
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          ...containerStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          ...containerStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!pdfUrl) {
    return <Typography>Unable to load PDF.</Typography>;
  }

  return (
    <Box sx={{ ...containerStyle, p: 2 }}>
      <Box sx={pdfStyle}>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={numPages}
          page={pageNumber}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          shape="rounded"
          disabled={numPages === 0}
        />
      </Box>
    </Box>
  );
};

export default PDFPreview;
