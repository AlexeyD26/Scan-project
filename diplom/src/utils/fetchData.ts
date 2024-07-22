const BASE_URL = 'https://gateway.scan-interfax.ru';

interface Config {
    method: string;
    headers: {
        'Content-Type': string;
        [key: string]: string; // Для дополнительных заголовков
    };
    body?: string; // Добавлено свойство body
}

export const fetchData = async (endpoint: string, method = 'GET', body: any = null, additionalHeaders: Record<string, string> = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...additionalHeaders
    };

    const config: Config = {
        method,
        headers
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
