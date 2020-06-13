import { fire } from '../../index';

const requestWrapper = collectionName => {
    return fire.firestore().collection(collectionName)
        .get()
        .then((querySnapshot) => {
            let data = [];
            querySnapshot.forEach(item => {
                data.push(item.data());
            });
            return data;
        })
        .catch(function(error) {
            return error;
        });    
}

export default requestWrapper;