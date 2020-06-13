const checkCardUser = (arrayData, indexCard, type) =>  {
    let checkCard;
    if(type === 'sub') {
        checkCard = arrayData.find(item => item === indexCard);
    } else if(type === 'time') {
        checkCard = arrayData.find(item => item.idCard === indexCard);
    }
    
    if(checkCard) {
        return '#04d13b'
    } else {
        return '#f0f6ff'
    }
}

export default checkCardUser;