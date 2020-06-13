import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import './Select.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 230,
    height: 60
  },

  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  avatar: {
      marginRight: '10px',
      width: '45px',
      height: '45px'
  },

  select: {
      height: '50px'
  },

  menuItem: {
     height: '50px'
  }
}));


const MySelect = props => {
    const { header, dataOptions, changeSelect, index } = props;
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">{header}</InputLabel>
            <Select defaultValue="" id="grouped-select" onChange={(event) => changeSelect(event,index)}  className={classes.select}>
                <MenuItem value=''></MenuItem>
                {dataOptions.map((data, index) => {
                    return (
                        <MenuItem  
                            value={data.id} 
                            key={index}
                            className={classes.menuItem}
                        >
                            {data.name ? 
                                <Avatar alt={data.name} src={data.src} className={classes.avatar}/>
                                :
                                null
                            }
                            {data.name ? data.name : data.inf}
                        </MenuItem>
                    ) 
                })}
            </Select>
        </FormControl>
    )
}

export default MySelect;