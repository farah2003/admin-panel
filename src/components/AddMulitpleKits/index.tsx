import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Box, Typography, CircularProgress } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import * as xlsx from 'xlsx';
import { Button } from '../../components';
import { http } from '../../services';
import { Kit } from '../../interfaces';
// percent of n winter  days per contract period

const AddMultipleKits = () => {
  const [uploadedKits, setUploadedKits] = useState([{} as Kit]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      setLoading(true);

      const data = e.target?.result as string;
      const workbook = xlsx.read(data, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json: any = xlsx.utils.sheet_to_json(worksheet, {
        raw: false,
        rawNumbers: false,
      });
      if (!json.length) {
        setError('No kits found in the file');
        return;
      }

      const kits: Array<Kit> = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((ele: any) => {
        if (!ele['QR Code']) {
          setError(
            'No kit QR Code found in the file,please add it and check the spaces'
          );
          setLoading(false);
          setUploadedKits([]);
          return;
        }
        if (!ele['Expiration Date']) {
          setError(
            'No kit Expiration Date found in the file,please add it and check the spaces'
          );
          setLoading(false);
          setUploadedKits([]);
          return;
        }
        if (!ele['Kit Type']) {
          setError(
            'No Kit Type found in the file,please add it and check the spaces'
          );
          setLoading(false);
          setUploadedKits([]);
          return;
        }

        kits.push({
          code: ele['QR Code'],
          expirationDate: ele['Expiration Date'],
          kitType: ele['Kit Type'],
        });
      });
      setUploadedKits(kits);
      setLoading(false);
    };
    reader.readAsBinaryString(file);
  };
  useEffect(() => {
    if (uploadedKits.length > 0) {
      setDisabled(false);
      setError('');
    } else {
      setDisabled(true);
    }
  }, [uploadedKits]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await http.post('api/v1/kits/', {
        kitsQR: uploadedKits,
      });
      toast.success('kits added successfully');
      setLoading(false);
      setError('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setLoading(false);
      if (e.response.data.message) {
        setError(e.response.data.message);
        return;
      }
      setError(e.response.data);
    }
  };
  return (
    <>
      <Box>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={['xlsx', 'xls', 'csv']}
          multiple={false}
          maxSize={10}
          label="Select Excel File that is less than 10MB"
        />
      </Box>

      <Box sx={{ marginTop: '200px' }}>
        <Button disabled={disabled} onClick={handleSubmit}>
          Upload file{' '}
        </Button>
        <br />
        {error && (
          <Typography variant="body1" sx={{ marginTop: '10px' }} color="error">
            {error}
          </Typography>
        )}
        {loading && <CircularProgress sx={{ marginTop: '20px' }} />}
      </Box>
    </>
  );
};

export default AddMultipleKits;
