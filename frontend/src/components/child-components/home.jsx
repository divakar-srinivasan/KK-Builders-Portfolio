import HeroSlideshow from "./home-components/heroSlideShow";
import InfoSection from "./home-components/infoSection";
import Services from "./home-components/service";
import ProcessFlow from "./home-components/processFlow";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";  
import img3 from "../../assets/3.jpg";
import WhyUs from "./home-components/whyKK";
import VendorSlideshow from "./home-components/vendors";
import Location from "./home-components/location";

function Home() {
  return (
    <div className="w-full flex flex-col items-center bg-white relative">
      <HeroSlideshow images={[img1, img2, img3]} />
      <InfoSection />
      <Services />
      <ProcessFlow />
      <Location /> 
      <WhyUs />
      <VendorSlideshow />
    </div>
  );
}

export default Home;
