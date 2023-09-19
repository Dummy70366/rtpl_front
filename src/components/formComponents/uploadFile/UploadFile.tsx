import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { CrossIcon, PlusIcon } from "@/components/svgIcons";

import { EnumFileType } from "@/enum/fileTypeEnum";
import { ErrorMessage } from "formik";
import { ToastShow } from "@/redux/slices/toastSlice";
import { VITE_APP_API_URL } from "@/config";
import { useDispatch } from "react-redux";

interface IUploadFile {
  Margin: string;
  Title: string;
  SubTitle?: string;
  setValue: (
    field: string,
    value: (string | File)[] | File | null,
    shouldValidate?: boolean
  ) => void;
  name: string;
  value: File | string | Array<File | string> | null;
  acceptTypes?: string;
  isMulti?: boolean;
  size?: number;
  fileType?: EnumFileType;
}

const imageExtension = [
  ".jpg",
  ".jpeg",
  ".jfif",
  ".pjpeg",
  ".pjp",
  ".png",
  ".svg",
  ".webp",
];
const videoExtension = [
  ".mp4",
  ".mov",
  ".wvm",
  ".mkv",
  ".webm",
  ".avi",
  ".flv",
  "avchd",
];

const videoSize = 500;
const imageSize = 30;
const otherSize = 5;

const checkValidImageSize = (value: File | Blob, size: number) => {
  if (value.size <= size * 1000000) return true;
  else return false;
};

const UploadFile = ({
  Margin,
  Title,
  SubTitle = "",
  setValue,
  name,
  value,
  acceptTypes = "*/*",
  isMulti = false,
  size,
  fileType,
}: IUploadFile) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  return (
    <>
      <div className={`input-item  ${Margin} relative`}>
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
          accept={acceptTypes}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (
              isMulti &&
              event.target.files &&
              event.target.files?.length < 5
            ) {
              const files: File[] = [];

              Array(event.target.files.length)
                .fill(0)
                .forEach((_, index) => {
                  if (event.target.files) files.push(event.target.files[index]);
                });
              if ((value as Array<File | string>).length < 5) {
                setValue(name, [...(value as Array<File | string>), ...files]);
              } else {
                dispatch(
                  ToastShow({
                    message: "Can not upload more then 5 items",
                    type: "error",
                  })
                );
              }
            } else if (
              isMulti === false &&
              event.target.files &&
              event.target.files[0]
            ) {
              setValue(name, event.target.files[0]);
            }
          }}
          multiple={isMulti}
        />

        <div
          className={`flex flex-col items-start justify-center  h-[150px] w-full rounded-10px border border-primaryBlack1/[0.08] bg-primaryGray cursor-pointer `}
        >
          {value && !isMulti && (
            <FileDisplay
              value={value as File | string}
              setValue={setValue}
              name={name}
              Ref={inputRef}
              size={size}
              fileType={fileType}
            />
          )}
          {value && isMulti && (
            <div className="multi-file-wrapper flex flex-wrap -mx-2">
              {(value as Array<File | string>).map(
                (e: File | string, index: number) => (
                  <FileDisplay
                    value={e}
                    Ref={inputRef}
                    key={index}
                    index={index}
                    isMulti={isMulti}
                    setValue={setValue}
                    Values={value as Array<File | string>}
                    name={name}
                    size={size}
                    fileType={fileType}
                  />
                )
              )}
            </div>
          )}
          {(isMulti || !value) && (
            <div
              className="user-text font-FiraSansM show  flex items-center lg:ps-[52px] ps-4"
              onClick={() => {
                if (inputRef.current) inputRef.current.click();
              }}
            >
              <div className="w-[50px] min-w-[50px] h-[50px] border-2 border-dashed border-primaryGold/20 rounded-10px flex items-center justify-center mx-auto">
                <PlusIcon className="w-5 h-5 text-primaryGold" />
              </div>
              <p className="text-[18px] leading-[20px] tracking-03em text-black font-BinerkaDemo py-2 ps-5 pe-2">
                {Title}
              </p>
              <p className="text-14px text-black">{SubTitle}</p>
            </div>
          )}
        </div>
      </div>
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="fm_error text-red-500 text-sm pt-[2px] font-BinerkaDemo">
            {msg}
          </div>
        )}
      </ErrorMessage>
    </>
  );
};

export const FileDisplay = ({
  value,
  setValue,
  index,
  isMulti = false,
  Values = [],
  name,
  Ref,
  size,
  fileType,
}: {
  value: File | string;
  index?: number;
  isMulti?: boolean;
  setValue: (
    field: string,
    value: (string | File)[] | File | null,
    shouldValidate?: boolean
  ) => void;
  size?: number;
  Values?: Array<File | string>;
  name: string;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  fileType?: EnumFileType;
}) => {
  const [type, setType] = useState<EnumFileType>(EnumFileType.Document);
  const [source, setSource] = useState<string>();
  const dispatch = useDispatch();
  const checkExtention = () => {
    if (typeof value === "string") {
      const format = value.substr(value.lastIndexOf(".")).toLowerCase();
      if (imageExtension.includes(format)) setType(EnumFileType.Image);
      else if (videoExtension.includes(format)) setType(EnumFileType.Video);
      else setType(EnumFileType.Document);
      setSource(VITE_APP_API_URL + value);
    } else {
      setSource(window?.URL?.createObjectURL(value));
      const format = value.type.split("/")[0];
      if (format === "image") {
        checkAndRemove(value, EnumFileType.Image, size || imageSize);
        setType(EnumFileType.Image);
      } else if (format === "video") {
        setType(EnumFileType.Video);
        checkAndRemove(value, EnumFileType.Video, size || videoSize);
      } else {
        setType(EnumFileType.Document);
        checkAndRemove(value, EnumFileType.Document, size || otherSize);
      }
    }
  };

  useEffect(() => {
    if (value) checkExtention();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const checkAndRemove = (value: File, type: EnumFileType, size: number) => {
    if (fileType && fileType !== type) {
      dispatch(
        ToastShow({ message: `Please select valid ${fileType}`, type: "error" })
      );
      removeFile();
    }
    if (!checkValidImageSize(value, size)) {
      dispatch(
        ToastShow({
          message: `${type} size should be less then ${size} MB`,
          type: "error",
        })
      );
      removeFile();
    }
  };

  const removeFile = () => {
    if (Ref?.current) Ref.current.value = "";
    if (!isMulti) {
      setValue(name, null);
    } else {
      if (index !== undefined) {
        const temp = [...Values];
        temp.splice(index, 1);
        setValue(name, temp);
      }
    }
  };

  return (
    <div
      className={`${
        isMulti ? "w-[calc(100%_/_3)] px-2 h-[100px] mb-1" : "mx-auto"
      }`}
    >
      <div
        className={`relative group flex items-center justify-center`}
        onClick={() => {
          if (Ref && Ref.current) Ref.current.click();
        }}
      >
        <span
          className="edit-btn text-white bg-primaryGold group-hover:opacity-100 opacity-0 cursor-pointer z-10 absolute w-8 h-8 bg-inputBorder shadow-md rounded-full flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeFile();
          }}
        >
          <CrossIcon className=""/>
        </span>

        {type === EnumFileType.Image && source ? (
          <>
            <div
              className={`uploaded-data group ${
                isMulti ? "bg-black rounded-xl" : "h-32  mb-2 "
              } w-full inline-flex relative`}
            >
              <div className="absolute group-hover:opacity-40 opacity-0  top-0 left-0 right-0 bottom-0 bg-black z-[9] rounded-xl"></div>
              <img
                src={source}
                className="w-full h-full object-contain  rounded-xl"
                id={index !== undefined ? index.toString() : undefined}
                alt=""
                width={"100%"}
                height={"100%"}
              />
            </div>
          </>
        ) : type === EnumFileType.Video ? (
          <>
            <div
              className={`uploaded-data group ${
                isMulti ? "bg-black rounded-xl" : "h-32  mb-2 "
              } w-full inline-flex relative`}
            >
              <div className="absolute group-hover:opacity-40 opacity-0  top-0 left-0 right-0 bottom-0 bg-black z-[9] rounded-xl"></div>
              <video
                key={source}
                controls
                width={"100%"}
                height={"100%"}
                className="rounded-xl"
              >
                <source src={source} />
              </video>
            </div>
          </>
        ) : (
          source !== undefined && (
            <>
              <div className="file-icon h-24 flex items-center flex-col justify-center">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40 z-[9] rounded-xl"></div>
                <div className="img">
                  s
                  <img
                    src="/assets/images/file-icon.svg"
                    width={32}
                    height={32}
                    alt=""
                  />
                </div>
                <div>
                  {typeof value !== "string"
                    ? value.name
                    : value.split("/")[value.split("/").length - 1] ?? "file"}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default UploadFile;
