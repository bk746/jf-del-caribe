import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/sections/ProductDetailView";
import RelatedProductsSection from "@/components/sections/RelatedProductsSection";
import SiteFooter from "@/components/sections/SiteFooter";
import { SiteNavProvider } from "@/components/sections/SiteNav";
import { getProductDetail } from "@/lib/product-details";
import { getMaterialById, MATERIALS } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return MATERIALS.map((material) => ({ slug: material.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialById(slug);
  const detail = material ? getProductDetail(slug) : undefined;

  if (!material || !detail) {
    return { title: "Producto no encontrado | JF Caribe" };
  }

  return {
    title: detail.seoTitle,
    description: detail.seoDescription,
    openGraph: {
      title: detail.seoTitle,
      description: detail.seoDescription,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const material = getMaterialById(slug);
  const detail = getProductDetail(slug);

  if (!material || !detail) {
    notFound();
  }

  return (
    <SiteNavProvider>
      <main id="main-content">
        <ProductDetailView material={material} detail={detail} />
        <RelatedProductsSection currentMaterial={material} />
      </main>
      <SiteFooter />
    </SiteNavProvider>
  );
}
