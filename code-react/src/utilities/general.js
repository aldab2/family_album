function timeAgo(datetime) {
    const dateTime = new Date(datetime);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateTime) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} mins ago`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
        // Format the date as 'YYYY-MM-DD' for more than a day
        return dateTime.toISOString().split('T')[0];
    }
}


export { timeAgo }