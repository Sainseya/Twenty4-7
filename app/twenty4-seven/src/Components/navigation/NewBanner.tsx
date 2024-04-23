interface NewBannerProps {
  newsText: string;
}

const NewBanner: React.FC<NewBannerProps> = ({ newsText }) => {
  return (
    <div
      id="news"
      className="flex w-full h-10 bg-light_bg border-y-2 border-light_border items-center"
    >
      <p className=" pl-8 text-center font-semibold">
        🎉 New arrivages : {newsText}{" "}
        <a
          href="/"
          className="text-blue-600 hover:text-blue-700 hover:underline"
        >
          click here
        </a>
      </p>
    </div>
  );
};

export default NewBanner;
