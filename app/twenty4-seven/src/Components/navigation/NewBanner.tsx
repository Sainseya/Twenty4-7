import { useNavigate } from "react-router-dom";

interface NewBannerProps {
  newsText: string;
  linkToNewArrivages: string;
}

const NewBanner: React.FC<NewBannerProps> = ({ newsText, linkToNewArrivages }) => {
  let navigate = useNavigate();

  const navigateToNewProduct = () => {
    navigate(`/${linkToNewArrivages}`);
  }

  return (
    <div
      id="newsBanner"
      className="flex w-full h-10 bg-light_bg dark:bg-[#2B2B2B] border-b-2 border-light_border dark:border-dark_border items-center"
    >
      <p className=" pl-8 text-center font-semibold text-txtBlack dark:text-txtWhite">
        🎉 New arrivages : {newsText}{" "}
        <button type="button"
          className="text-blue-600 hover:text-blue-700 hover:underline"
          onClick={navigateToNewProduct}
        >
          click here
        </button>
      </p>
    </div>
  );
};

export default NewBanner;
