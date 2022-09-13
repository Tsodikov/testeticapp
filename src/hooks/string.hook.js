export const useStringOperation = () => {

    const createDelUrl = (url) => {
        const templDel = 'https://www.filestackapi.com/api/file/';
        const key = 'AYPCEnYqQjWoMo2Kpx2h1z';
        const signature = 'c2ee0e0c4f279d607305b6c168506e17ffb5d6ee967c08c1d71d5b64d6e73b36';
        const policy = 'eyJleHBpcnkiOjE2ODc4OTk2MDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdGF0Iiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIiwiY29udmVydCIsInJlbW92ZSIsImV4aWYiLCJydW5Xb3JrZmxvdyJdfQ==';
        const urls = url.slice(33).split(/[?]/);
        return `${templDel}${urls[0]}?key=${key}&policy=${policy}&signature=${signature}`
    };

    const createPushUrl = () => {
        const templPush = 'https://www.filestackapi.com/api/store/S3';
        const key = 'AYPCEnYqQjWoMo2Kpx2h1z';
        const signature = 'c2ee0e0c4f279d607305b6c168506e17ffb5d6ee967c08c1d71d5b64d6e73b36';
        const policy = 'eyJleHBpcnkiOjE2ODc4OTk2MDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdGF0Iiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIiwiY29udmVydCIsInJlbW92ZSIsImV4aWYiLCJydW5Xb3JrZmxvdyJdfQ=='
        return `${templPush}?key=${key}&policy=${policy}&signature=${signature}`
    }

    const createGetUrl = (url) => {
        const templGet = 'https://cdn.filestackcontent.com/';
        const key = 'AYPCEnYqQjWoMo2Kpx2h1z';
        const signature = 'c2ee0e0c4f279d607305b6c168506e17ffb5d6ee967c08c1d71d5b64d6e73b36';
        const policy = 'eyJleHBpcnkiOjE2ODc4OTk2MDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdGF0Iiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIiwiY29udmVydCIsInJlbW92ZSIsImV4aWYiLCJydW5Xb3JrZmxvdyJdfQ=='
        return `${templGet}${url.slice(33)}?key=${key}&policy=${policy}&signature=${signature}`
    }

    return { createDelUrl, createPushUrl, createGetUrl };
}