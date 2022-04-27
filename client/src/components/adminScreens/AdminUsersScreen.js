import { useEffect, useState } from 'react';
import { getUserList } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, Alert, IconButton, Typography, Button } from '@mui/material';
import { Box, createTheme } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Snackbar from '@mui/material/Snackbar';
import { deleteUser } from '../../actions/user';

function AdminUsersScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();

  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const userList = useSelector((state) => state.userListReducer);
  const { loading, error, users } = userList;
  const deleteUserState = useSelector((state) => state.userDeleteReducer);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteUserState;

  const columns = [
    { field: '_id', headerName: 'ID', width: 300, sortable: false },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 90,
      renderCell: (params) => {
        return params.row.isAdmin ? (
          <CheckIcon sx={{ color: 'green' }} />
        ) : (
          <CloseIcon color='warning' />
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      description: 'Edit user',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              navigate(`/admin/dashboard/user/${params.row._id}`);
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
      description: 'Delete user',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => dispatch(deleteUser(params.row._id))}>
            <DeleteOutlineOutlinedIcon color='error' />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch, successDelete]);

  if (loading) return;
  if (error) return <Alert security='error'>{error}</Alert>;
  return (
    <>
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
            fontSize: { md: '30px', xs: '20px' },
          }}
        >
          Users
        </Typography>
        <Button
          variant='outlined'
          size='large'
          sx={{
            marginBottom: theme.spacing(2),
            fontWeight: 'bold',
            textTransform: 'none',
          }}
          elevation={0}
          onClick={() => alert('should create an admin')}
        >
          Create Admin
        </Button>
      </Box>
      <Paper elevation={0}>
        <div style={{ height: 800, width: '100%' }}>
          <DataGrid
            rows={users}
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
      {successDelete ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            User Deleted!
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      {errorDelete ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='warning'
            sx={{ width: '100%' }}
          >
            {errorDelete}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default AdminUsersScreen;
