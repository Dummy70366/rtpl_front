import { VITE_APP_API_URL } from "@/config";

const ProfileImage = ({
  profileImage,
  size,
}: {
  profileImage: string | null;
  size?: string;
}) => {
  return (
    <span
      className={`bg-primaryBlack/10 block rounded-full w-10 h-10 ${
        size ? size : ""
      }`}
    >
      <img
        src={
          profileImage
            ? profileImage.match(/png|jpeg|jpg/g)
              ? `${VITE_APP_API_URL}${profileImage}`
              : `${profileImage}`
            : "/images/no-image.png"
        }
        className={`rounded-full ${
          size ? size : "w-full h-full"
        } object-cover w-full h-full`}
        alt=""
        crossOrigin="anonymous"
      />
    </span>
  );
};

export default ProfileImage;
