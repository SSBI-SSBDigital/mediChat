import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "min(500px, 100%)",
  boxSizing: "border-box",
};

const PDFPreview: React.FC<{ url: string }> = ({ url }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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
  }, [url]);

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
      <iframe src={pdfUrl} width="100%" height="600"></iframe>
    </Box>
  );
};

export default PDFPreview;
