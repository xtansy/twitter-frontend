import BackspaceIcon from "@mui/icons-material/Backspace";

interface ImageListProps {
    isPosting?: boolean;
    images: string[];
    onClickDeleteImage: (url: string) => void;
}

const ImageList: React.FC<ImageListProps> = ({
    isPosting,
    images,
    onClickDeleteImage,
}) => {
    if (!images.length) {
        return null;
    }
    return (
        <div className="upload__images">
            {images.map((item, i) => {
                return (
                    <div key={i} className="upload__images-item">
                        {isPosting && (
                            <BackspaceIcon
                                onClick={() => onClickDeleteImage(item)}
                                style={{ fill: "pink" }}
                            />
                        )}
                        <img
                            className={
                                isPosting
                                    ? "upload__images-item__img"
                                    : "upload__images-item__img upload__images-item__img_big"
                            }
                            key={item}
                            src={item}
                            alt="img"
                        ></img>
                    </div>
                );
            })}
        </div>
    );
};

export default ImageList;
