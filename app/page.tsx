import AboutSection from "@/components/sections/AboutSection";
import ConversionBridge from "@/components/sections/ConversionBridge";
import FaqSection from "@/components/sections/FaqSection";
import GallerySection from "@/components/sections/GallerySection";
import HeroSection from "@/components/sections/HeroSection";
import LocationSection from "@/components/sections/LocationSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SiteFooter from "@/components/sections/SiteFooter";
import { SiteNavProvider } from "@/components/sections/SiteNav";

export default function Home() {
  return (
    <SiteNavProvider>
      <main id="main-content">
        <HeroSection />
        <ConversionBridge />
        <ProductsSection />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <FaqSection />
        <LocationSection />
      </main>
      <SiteFooter />
    </SiteNavProvider>
  );
}
