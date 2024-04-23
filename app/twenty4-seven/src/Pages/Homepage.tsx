import CategoriesCarousel from "../Components/navigation/CategoriesCarousel";
import NewBanner from "../Components/navigation/NewBanner";
import Topbar from "../Components/navigation/Topbar";


const Homepage: React.FC = () => {
  return (
    <div>
      <Topbar nameWebsite="Twenty4/7"/>
      <NewBanner newsText="New Mineblock NFT Collection"/>
      <CategoriesCarousel />
      <h1>Home Page</h1>
    </div>
  );
};

export default Homepage;
