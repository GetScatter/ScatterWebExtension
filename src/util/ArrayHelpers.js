export default class ArrayHelpers {

    static groupBy(array, key){
        return array.reduce((acc, item) => {
            (acc[item[key]] = acc[item[key]] || []).push(item);
            return acc;
        }, {});
    }

    static distinct(array){
        return array.reduce((a,b) => (a.includes(b)) ? a : a.concat(b), []);
    }

    static flatten(list){
        return list.reduce(
            (a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []
        );
    }

    static objectToFlatKeys(object){
        return this.flatten(Object.keys(object).map(key => {
            if(object[key] !== null && typeof object[key] === 'object') return this.objectToFlatKeys(object[key])
            else return key;
        }))
    }

}