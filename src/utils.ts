export function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const part = parts[1];
            return part.split(';')[0];
        }
        return undefined;
    }