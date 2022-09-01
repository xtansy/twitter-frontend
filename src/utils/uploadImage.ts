import { axios } from "../core/axios";

export interface UploadImageRequestResult {
    height: number;
    size: number;
    url: string;
    width: number;
}
export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    const URL = String(process.env.REACT_APP_API_URL) + "upload" || "/upload";

    const { data } = await axios.post<UploadImageRequestResult>(URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};
