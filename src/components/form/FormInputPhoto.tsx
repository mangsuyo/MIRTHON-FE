import { Controller } from "react-hook-form";
import PictureIcon from "../../assets/svg/PictureIcon";
import { useEffect, useRef, useState } from "react";

interface props {
  name: string;
  required: boolean;
  saveImageEvent: (img: string) => void;
}

const FormInputPhoto = ({ name, required, saveImageEvent }: props) => {
  const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef();

  useEffect(() => {
    imgFile && saveImageEvent(imgFile);
  }, [imgFile]);

  const saveImgFile = () => {
    const file = imgRef && imgRef.current ? imgRef.current.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result as string);
      };
    }
  };
  return (
    <Controller
      name={name}
      rules={{ required: required }}
      render={({ field }) => {
        const { ref: fieldRef, onChange: fieldOnchange, ...imgField } = field;
        return (
          <label
            className={`rounded-xl cursor-pointer flex justify-center items-center max-w-[12.5rem] max-h-[12.5rem] ${
              imgFile ? "" : "bg-my-light-green"
            }`}
            htmlFor={`${name}-image`}
          >
            {imgFile && (
              <img src={`${imgFile}`} className={`object-cover`}></img>
            )}
            {!imgFile && <PictureIcon></PictureIcon>}
            <input
              type="file"
              accept={"image/png, image/gif, image/jpeg"}
              ref={imgRef}
              id={`${name}-image`}
              className={`hidden`}
              onChange={() => {
                saveImgFile();
              }}
              {...imgField}
            ></input>
          </label>
        );
      }}
    ></Controller>
  );
};

export default FormInputPhoto;