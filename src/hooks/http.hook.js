export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch(e) {
            throw e;
        }
    };

    const serverRequest = async (url, method = 'GET', body = null) => {

        try {
            const response = await fetch(url, { 
                // mode: 'cors',
                // credentials: 'include',
                method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                    // 'Origin': 'http://localhost:3000',
                    // 'Access-Control-Request-Method': 'POST',
                    // 'Access-Control-Request-Headers': 'Content-Type'
                }
            });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return { request, serverRequest }
}