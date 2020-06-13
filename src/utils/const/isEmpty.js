const isEmpty = (object) => {
    for(let key in object) {
        if(key) {
            return true
        }
    }

    return false;
}

export default isEmpty;