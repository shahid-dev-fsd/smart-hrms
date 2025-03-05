const link = path => process.env.REACT_APP_MAIN_SITE + path;

function env(name) {
    const nodeENV = process.env.NODE_ENV.toUpperCase();

    return process.env[`REACT_APP_${nodeENV}_${name}`] || process.env[`REACT_APP_${name}`];
}

const handleAxiosError = (e, showError) => {
    console.log(e);
    if (e?.response?.status === 500) return showError('Something went wrong');
    if (e?.response?.status === 400) return showError(`Ensure you've entered valid information.`);
    if (e?.response?.status === 404) return showError(`We can't find what you are looking for.`);
    if (e?.response?.data) {
        console.log(e.response.data);
        const errors = e.response.data?.errors || [
            'Our server encountered an error, Please try again later',
        ];

        if (typeof errors === 'object' && errors !== null) showError(errors.pop().message);

        showError(errors.pop());
    } else {
        showError('Something went wrong');
    }
};
const isEmpty = obj => Object.keys(obj).length === 0;
const isObject = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

function dirname(filePath) {
    if (typeof filePath !== 'string') {
        throw new TypeError('Path must be a string');
    }

    const separator = '/';
    const lastIndex = filePath.lastIndexOf(separator);
    if (lastIndex === -1) {
        return '.';
    }

    return filePath.slice(0, lastIndex);
}
function escapeDanger(content) {
    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim;

    if (regex.test(content)) return null;
    return content;
}

function basename(filePath, ext = '') {
    if (typeof filePath !== 'string') {
        throw new TypeError('Path must be a string');
    }

    const separator = '/';
    const lastIndex = filePath.lastIndexOf(separator);
    let baseName = filePath.slice(lastIndex + 1);

    if (ext && baseName.endsWith(ext)) {
        baseName = baseName.slice(0, -ext.length);
    }

    return baseName;
}

function formatTimestamp(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMs = now - time;
    const diffInMinutes = Math.floor(diffInMs / 60000); // Convert milliseconds to minutes

    if (diffInMinutes < 1) {
        return 'now';
    } else if (diffInMinutes <= 5) {
        return `${diffInMinutes}m ago`;
    } else {
        // Format time to 9:30 PM
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour format to 12-hour format
        const formattedHours = hours % 12 || 12; // Convert hour '0' to '12'
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${period}`;
    }
}

function formatDateTimestamp(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMs = now - time;
    const diffInMinutes = Math.floor(diffInMs / 60000); // Convert milliseconds to minutes

    if (diffInMinutes < 1) {
        return 'now';
    } else if (diffInMinutes <= 5) {
        return `${diffInMinutes}m ago`;
    } else {
        // Format time to 9:30 PM
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour format to 12-hour format
        const formattedHours = hours % 12 || 12; // Convert hour '0' to '12'
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        // Format date to DD-MM-YYYY
        const day = String(time.getDate()).padStart(2, '0');
        const month = String(time.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = time.getFullYear();

        return `${day}-${month}-${year} ${formattedHours}:${formattedMinutes} ${period}`;
    }
}


export {  formatTimestamp,formatDateTimestamp ,link, env, handleAxiosError,dirname,isEmpty,isObject,escapeDanger,basename };
