import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, Alert, IconButton, Typography, Button } from '@mui/material';
import { Box, createTheme } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

import Chip from '@mui/material/Chip';
import { getAllOrders } from '../../actions/order';

function AdminOrdersScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();

  const orderList = useSelector((state) => state.orderListReducer);
  const { loading, error, orders } = orderList;

  const columns = [
    { field: '_id', headerName: 'ID', width: 150, sortable: false },
    {
      field: 'user',
      headerName: 'Customer',
      width: 180,
      renderCell: (params) => {
        if (params.row.user === null) {
          return <Chip color='warning' label='user deleted' />;
        } else {
          return params.row.user.name;
        }
      },
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 150,
      renderCell: (params) => params.row.createdAt.substring(0, 10),
    },
    {
      field: 'totalPrice',
      headerName: 'Total',
      width: 120,
      renderCell: (params) => `$ ${params.row.totalPrice}`,
    },
    {
      field: 'paidAt',
      headerName: 'Paid',
      description: 'Paid At',
      sortable: true,
      width: 150,
      renderCell: (params) => {
        if (params.row.isPaid === true) {
          return (
            <Chip color='success' label={params.row.paidAt.substring(0, 10)} />
          );
        } else {
          return (
            <IconButton>
              <Chip label='Not Paid' color='error' />
            </IconButton>
          );
        }
      },
    },
    {
      field: 'isDelievered',
      headerName: 'Delievered',
      description: 'Is Delievered',
      sortable: true,
      width: 150,
      renderCell: (params) => {
        if (params.row.isDelievered === true) {
          return (
            <Chip
              color='success'
              label={params.row.delieveredAt.substring(0, 10)}
            />
          );
        } else {
          return (
            <IconButton>
              <Chip label='Not Delievered' color='error' />
            </IconButton>
          );
        }
      },
    },
    {
      field: 'details',
      headerName: 'Details',
      description: 'Is Delievered',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <Button
            variant='outlined'
            onClick={() => navigate(`/order/${params.row._id}`)}
            disabled={params.row.user === null}
          >
            Details
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) return;
  if (error) return <Alert security='error'>{error}</Alert>;
  return (
    <Box sx={{ marginBottom: theme.spacing(4) }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: theme.spacing(5),
          flexDirection: {
            md: 'row',
            xs: 'column',
          },
        }}
      >
        <Typography
          variant='h4'
          sx={{
            marginBottom: theme.spacing(2),
            fontWeight: 700,
            fontSize: { md: '45px', xs: '20px' },
          }}
        >
          Orders
        </Typography>
      </Box>
      <Paper elevation={0}>
        <div style={{ height: 800, width: '100%' }}>
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            getRowId={(row) => row._id}
            disableColumnSelector
            disableColumnFilter
            rowHeight={80}
            headerHeight={90}
            sx={{
              padding: theme.spacing(3),
              fontSize: '20px',
              border: 'none',
              [theme.breakpoints.down('md')]: {
                '& .MuiDataGrid-columnHeader': {},
              },
            }}
          />
        </div>
      </Paper>
    </Box>
  );
}

export default AdminOrdersScreen;
