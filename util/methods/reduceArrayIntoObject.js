export default function reduceArrayIntoObject(array) {
    return array.reduce((objectFromArray, value) => {
        return {
            ...objectFromArray,
            [value.id]: value,
        }
    }, {})
}
