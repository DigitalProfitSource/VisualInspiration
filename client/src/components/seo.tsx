import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: object;
}

export function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = "https://replit.com/public/images/opengraph.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? "name" : "property";
      let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    updateMeta("description", description, true);
    updateMeta("og:title", title);
    updateMeta("og:description", description);
    updateMeta("og:type", ogType);
    updateMeta("og:image", ogImage);
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:card", twitterCard);
    updateMeta("twitter:image", ogImage);

    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }

    if (jsonLd) {
      const existingScript = document.querySelector('script[data-seo-jsonld]');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const jsonLdScript = document.querySelector('script[data-seo-jsonld]');
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [title, description, canonicalUrl, ogImage, ogType, twitterCard, jsonLd]);

  return null;
}

export const seoConfig = {
  siteName: "SimpleSequence",
  baseUrl: "https://simplesequence.com",
  defaultImage: "https://replit.com/public/images/opengraph.png",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SimpleSequence",
  description: "AI Implementation Advisor helping service businesses adopt AI with clarity, precision, and real-world leverage.",
  url: "https://simplesequence.com",
  logo: "https://simplesequence.com/favicon.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "English",
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SimpleSequence",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI-powered front desk and follow-up system for service businesses. Handles phone, SMS, chat, and forms automatically.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "297",
    highPrice: "997",
    priceCurrency: "USD",
    offerCount: "3",
  },
};

export function createOfferSchema(tier: {
  name: string;
  description: string;
  price: string;
  buildFee: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: tier.name,
    description: tier.description,
    price: tier.price,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: tier.price,
      priceCurrency: "USD",
      unitText: "month",
    },
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
