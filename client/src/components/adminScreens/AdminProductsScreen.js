import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Alert,
  IconButton,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { Box, createTheme } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Snackbar from '@mui/material/Snackbar';
import { listProducts, deleteProductById } from '../../actions/product';
import { PRODUCT_DELETE_RESET } from '../../actions/actionTypes';

function AdminUsersScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();

  const [open, setOpen] = useState(true);

  //Product stuff here
  const productList = useSelector((state) => state.productListReducer);
  const {
    loading: LoadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const productDelete = useSelector((state) => state.productDeleteReducer);
  const { success: successProductDelete, error: errorProductDelete } =
    productDelete;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // end product stuff

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: '60px',
              height: '60px',
              border: '1px solid #ededed',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component='img'
              src={params.row.image}
              sx={{
                width: '50px',
                height: '50px',
                background: 'white',
              }}
            />
          </Box>
        );
      },
    },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    { field: 'brand', headerName: 'Brand', width: 120 },
    {
      field: 'countInStock',
      headerName: 'Availability',
      width: 120,

      renderCell: (params) => {
        if (params.row.countInStock === 0) {
          return <Chip color='error' label='Out of stock' />;
        } else if (params.row.countInStock < 5) {
          return (
            <Chip
              color='warning'
              label={`${params.row.countInStock} in stock`}
            />
          );
        } else {
          return (
            <Chip
              color='primary'
              label={`${params.row.countInStock} in stock`}
            />
          );
        }
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      description: 'Edit product',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              navigate(`/admin/dashboard/product/${params.row._id}`);
            }}
          >
            <EditIcon color='info' />
          </IconButton>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      description: 'Delete product',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => dispatch(deleteProductById(params.row._id))}
          >
            <DeleteOutlineOutlinedIcon color='error' />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successProductDelete]);

  useEffect(() => {
    if (successProductDelete || errorProductDelete) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch({ type: PRODUCT_DELETE_RESET });
      }, 2500);
    }
  }, [successProductDelete, errorProductDelete, dispatch]);

  if (LoadingProducts) return;
  if (errorProducts) return <Alert security='error'>{errorProducts}</Alert>;
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
            fontWeight: 'bold',
            marginBottom: theme.spacing(2),
            fontSize: { md: '45px', xs: '20px' },
          }}
        >
          Products
        </Typography>
        <Button
          variant='contained'
          size='large'
          sx={{
            marginBottom: theme.spacing(2),
            fontWeight: 'bold',
            textTransform: 'none',
          }}
          elevation={0}
          onClick={() => navigate('/admin/dashboard/products/create')}
        >
          Create Product
        </Button>
      </Box>
      <Paper elevation={0}>
        <div style={{ height: 800, width: '100%' }}>
          <DataGrid
            rows={products}
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
            }}
          />
        </div>
      </Paper>
      {errorProductDelete ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='warning'
            sx={{ width: '100%' }}
          >
            {errorProductDelete}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      {successProductDelete && (
        <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
              Product delete successfully
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
}

export default AdminUsersScreen;
