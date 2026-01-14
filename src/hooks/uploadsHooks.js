import {useRequest} from 'alova/client';
import {uploadAction} from '../api/upload.api.js';

export default function uploadsHooks() {

    const upload = useRequest(
        (file) => uploadAction.uploads(file),
        {
            immediate:false,
        }
    )

    return {
        upload
    }
}