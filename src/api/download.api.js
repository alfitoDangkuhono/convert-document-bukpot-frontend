const API_BASE_URL = import.meta.env.VITE_API_URL

export const downloadAction = {
    downloads: async (filename) => {
        const response = await fetch(`${API_BASE_URL}/downloads/${filename}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Return blob untuk file binary
        return await response.blob();
    }
};