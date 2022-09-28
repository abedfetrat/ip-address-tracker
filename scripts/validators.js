// IPv4 address consists of four groups of numbers seperated by a dot (.)
// Each group can have 1-3 digits and the number that is represented by
// the group can not be more than 255
function validateIPv4(str) {
    const parts = str.split('.');
    return parts.every(part => /^\d{1,3}$/.test(part) && part <= 255);
}

// IPv6 address consits of eight groups of hexadecimal numbers
// Each group conists of 1-4 characters (numbers and letters a-f/A-F)
function validateIPv6(str) {
    const parts = str.split(':');
    return parts.every(part => /^[0-9a-fA-F]{1,4}$/.test(part));
}

function isIPAddress(str) {
    if (!str || typeof str != 'string' || str.length === 0) return false;

    if ([...str].filter(char => char === '.').length === 3) {
        return validateIPv4(str);
    } else if ([...str].filter(char => char === ':').length === 7) {
        return validateIPv6(str);
    } else {
        return false;
    }
}

function isDomain(str) {
    if (!str || typeof str != 'string' || str.length === 0) return false;

    return /^((https|http):\/\/)?(www\.)?([0-9a-zA-Z]([0-9a-zA-Z-]{0,61}[0-9a-zA-Z])?)(\.[0-9a-zA-Z]([0-9a-zA-Z-]{0,61}[0-9a-zA-Z])?){1,2}(\/)?$/.test(str);
}

export { isIPAddress, isDomain };