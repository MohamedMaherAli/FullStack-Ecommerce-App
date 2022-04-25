import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getLoggedInUserOrders } from '../../actions/order';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@mui/material';

const columns = [
  { field: '_id', headerName: 'ID', width: 300, sortable: false },
  { field: 'createdAt', headerName: 'DATE', width: 130 },
  { field: 'totalPrice', headerName: 'TOTAL', width: 130 },
  {
    field: 'paidAt',
    headerName: 'PAID',
    width: 90,
  },
  {
    field: 'isDelievered',
    headerName: 'DELIVERED',
    description: 'delievered.',
    sortable: false,
    width: 160,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: '150',
    renderCell: (params) => {
      return (
        <Button variant='contained' onClick={() => console.log(params.row._id)}>
          Details
        </Button>
      );
    },
  },
];

export default function DataTable() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.myOrderListReducer);
  const { loading: loadingOrder, error: errorOrder, orderList } = order;
  console.log(orderList);
  useEffect(() => {
    dispatch(getLoggedInUserOrders());
  }, [dispatch]);
  return loadingOrder ? (
    <h1>loading</h1> ? (
      errorOrder
    ) : (
      <h1>error</h1>
    )
  ) : (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orderList}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnSelector
          disableColumnFilter
        />
      </div>
    </>
  );
}
