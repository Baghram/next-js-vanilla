/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: '100%',
      margin: 0,
      // marginTop: theme.spacing(8),
      overflow: 'hidden',
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: theme.spacing(1),
    },
    contentWrapper: {
      margin: '40px 16px',
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    skelZIndex: {
      zIndex: 3,
    },
  });

export type ContentProps = WithStyles<typeof styles>;

type UsersData = {
  id: number;
  username: string;
};

const dummyUsers: UsersData[] = [
  { id: 1, username: 'asdfa' },
  { id: 1, username: 'asdfa' },
  { id: 1, username: 'asdfa' },
];

const userContainer: UsersData[] = [];

function Users(props: ContentProps) {
  const { classes } = props;
  const [users, setUsers] = useState(userContainer);
  const [dummies, setDummies] = useState(userContainer);
  const [loading, setLoading] = useState(false);

  const Router = useRouter();

  useEffect(() => {
    setLoading(true);
    setDummies(dummyUsers);
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/userdata/user',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token'),
      },
    }).then((res) => {
      // eslint-disable-next-line
      // console.log(res.data.data)
      setUsers(res.data.data);
      // eslint-disable-next-line
      setLoading(false);
      setDummies(userContainer);
    });
  }, [users]);

  const goToCreateUser = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    Router.push('/dashboard/users/create');
  };

  return (
    <>
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                  onClick={(e) => goToCreateUser(e)}
                >
                  Add user
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username (Email)</TableCell>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">password</TableCell>
                <TableCell align="right">Profile</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                {dummies.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <Skeleton>
                        <Typography>asdfasdf@Nutt.co.id</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton>
                        <Typography>id</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton>
                        <Typography>Nope</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton>
                        <Typography>Profile</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton>
                        <Button
                          color="secondary"
                          variant="contained"
                          disableElevation
                        >
                          Edit
                        </Button>
                      </Skeleton>
                      <Skeleton>
                        <Button
                          color="secondary"
                          variant="contained"
                          disableElevation
                        >
                          Edit
                        </Button>
                      </Skeleton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.username}
                    </TableCell>
                    <TableCell align="right">{user.id}</TableCell>
                    <TableCell align="right">Nope</TableCell>
                    <TableCell align="right">Profile</TableCell>
                    <TableCell align="center">
                      <Button
                        color="secondary"
                        variant="contained"
                        disableElevation
                        onClick={(e) => {
                          e.preventDefault();
                          Router.push(`/dashboard/users/update/${user.id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Paper>
    </>
  );
}

export default withStyles(styles)(Users);
