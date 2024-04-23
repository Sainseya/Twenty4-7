import CategoryCarousel from "../Components/Category/CategoryCarousel";
import NewBanner from "../Components/navigation/NewBanner";
import Topbar from "../Components/navigation/Topbar";

const Homepage: React.FC = () => {
  return (
    <div>
      <Topbar nameWebsite="Twenty4/7" />
      <NewBanner newsText="New Mineblock NFT Collection" />
      <CategoryCarousel categoryName={["NFT", "Water", "Courses", "Soon"]} />
      <div className="relative flex flex-col w-full px-44 bg-light_bg pt-1">
        <div id="seperator" className="absolute left-44 right-44 h-2 bg-light_border rounded-xl -top-1"></div>
        <h1>Home Page</h1>
      </div>
    </div>
  );
};

export default Homepage;
