const API_BASE_URL = import.meta.env.VITE_API_URL

export const uploadAction = {
    uploads: async (file) => {
        const response = await fetch(`${API_BASE_URL}/uploads`,{
            method: 'POST',
            body: file,
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
}