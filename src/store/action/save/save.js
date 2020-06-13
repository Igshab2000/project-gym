export const SAVE = 'SAVE';

const save = payload => {
    return {
        type: SAVE,
        payload
    }
}

export default save;

