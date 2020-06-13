import requestWrapper from '../../../utils/const/requestWrapper';

export const SAVE_TIME_TABLE = 'SAVE_TIME_TABLE';

const dataСonversion = date => {
    return Object.values(date);
}

export function addTimeTable() {
    return async dispatch => {
        requestWrapper('timeTable')
        .then((dataTimeTable) => {
            let arrayData = [];
            dataTimeTable.forEach((data, index) => {
                arrayData[index] = dataСonversion(data);
            });
            dispatch(saveTimeTable(arrayData));
        });
    }
}

export const saveTimeTable = dataTimeTable => {
    return {
        type: SAVE_TIME_TABLE,
        dataTimeTable
    }
}