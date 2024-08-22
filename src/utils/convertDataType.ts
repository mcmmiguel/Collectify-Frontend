
const convertDataType = (data: Date | string | number | boolean) => {
    if (typeof data === 'string' && !isNaN(Date.parse(data))) { //Convert 
        const date = new Date(data);
        return date.toLocaleDateString();
    } else if (data instanceof Date) {
        return data.toLocaleDateString();
    }
    if (typeof data === 'boolean') {
        if (data) return 'Yes'
        else return 'No'
    }
    return data.toString();
}

export default convertDataType;