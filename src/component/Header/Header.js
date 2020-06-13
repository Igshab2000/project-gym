import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import MainButton from '../UI/MainButton/MainButton';
import isEmpty from '../../utils/const/isEmpty';
import save from '../../store/action/save/save';


const buttonsName = [
    {name: 'Главная', type: 'main', href: '/'},
    {name: 'Абонементы', type: 'main', href: '/subscription'},
    {name: 'Расписание', type: 'main', href: '/timetable'},
    {name: 'Войти', type: 'main', href: '/sign-in'}
]

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    minWidth: '830px',
    width: '100%',
    height: '60px',
    zIndex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  blue: {
    backgroundColor: "#61bee8"
  }
}));



const headerButton = (user) => {
    return buttonsName.map((button, index) => {

        if(isEmpty(user) && index === 3) {
            return null;
        }

        return (
            <Link
                key={index}
                to={button.href}
            >
                <MainButton
                    type={button.type}
                    styleCss={{
                        marginRight: '50px'
                    }}
                    onClick={button.onClick ? button.onClick: null}
                >
                {button.name}  
                </MainButton>
            </Link>
            
        )
    })
}

function Header(props) {
  const { user } = props;  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exit = () => {
    const { history, userSave } = props;
    handleClose();
    userSave({});
    history.push('/')
  }

  const goTo = href => {
    const { history } = props;
    handleClose();
    history.push(href);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "#becbcf"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to='/'
              style={{
                cursor: 'pointer',
                outline: 'none',
                color: 'black',
                textDecoration: 'none'
              }}
            >
              Логотип
            </Link>
          </Typography>
          <div className='header-button-panel'>
                {headerButton(user)}
          </div>
          {isEmpty(user) ?  
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar className={classes.blue}>
                  {user.firstName[0] + user.secondName[0]}
                </Avatar>
              </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                    style={{
                      marginTop: '40px'
                    }}
                >
                    <MenuItem onClick={() => goTo('/user-edit')}>Редактировать</MenuItem>
                    <MenuItem onClick={() => goTo('/my-subscription')}>Мои абонементы</MenuItem>
                    <MenuItem onClick={exit}>Выйти</MenuItem>
                </Menu>
            </div>
            :
            null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      user: state.userSave.user,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    userSave: (user) => dispatch(save(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));