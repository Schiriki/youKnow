import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, CardContent } from '@mui/material';

const DataTable = () => {
  const {state} = useLocation();
  const {data} = state;
  const keys = Object.keys(data[0])
  let counter = 0
  
  const columns = keys.map(key => {
    return {field: key, headerName: (key.charAt(0).toUpperCase() + key.slice(1)), width: 325}
  })

  // adding a unique identifier to each data entry
  const rows = data.map(entry => {
    const newValue = {...entry, uniqueId : counter}
    counter++
    return newValue
  })

  const createCSV = () => {
    // get the values of the data array
    const dataValues = data.map(e => {return Object.values(e)})

    // prepare the data for the download
    const csvContent = dataValues.map(row =>
      row
      .map(String)  // convert every value to String
      .map(v => v.replaceAll('"', '""'))  // escape double colons
      .map(v => `"${v}"`)  // quote it
      .join(',')  // comma-separated
    ).join('\r\n');  // rows starting on new lines

    // Create a blob
    const blob = new Blob([csvContent], { type: "data:text/csv;charset=utf-8,"  });
    const url = URL.createObjectURL(blob);

    // download the file via dummy link
    const dummy = document.createElement('a');
    dummy.href = url;
    dummy.setAttribute('download', 'export.csv');
    dummy.click();
  }
  
  return (
    <Card>
      <CardContent>
        <Button variant='contained' onClick={createCSV} sx={{mb: 2}}>CSV Herunterladen</Button>
        <DataGrid
          rows={rows}
          getRowId={(row) => row.uniqueId}
          columns={columns}
          checkboxSelection
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

export default DataTable