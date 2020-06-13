import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },

    body: {
      fontSize: 14,
    }

}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
export const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },

    tr: {
      backgroundColor: 'black',
      color: 'white',
    }
    
});

export const useStylesBackDrop = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const times = [
  { id: 0, inf: '9:00' }, 
  { id: 1, inf: '10:30' }, 
  { id: 2, inf: '12:00' },
  { id: 3, inf: '13:30' },
  { id: 4, inf: '15:00' },
  { id: 5, inf: '16:30' } 
];

export const daysWeek = [
  { id: 0, inf: 'ПН' },
  { id: 1, inf: 'ВТ' },
  { id: 2, inf: 'СР' },
  { id: 3, inf: 'ЧТ' },
  { id: 4, inf: 'ПТ' } 
];