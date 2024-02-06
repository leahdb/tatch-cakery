export function getNestedProperty(obj, propString) {
    const properties = propString.split('.');

    if (properties.length === 1) {
        return obj[propString]
    }

    let currentObj = obj;

    for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];

        // Check if property exists to avoid runtime error
        if (!(prop in currentObj)) {
            return undefined;
        }

        currentObj = currentObj[prop];
    }

    return currentObj;
}