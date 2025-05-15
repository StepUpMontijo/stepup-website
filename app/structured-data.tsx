import Script from "next/script";

interface StructuredDataProps {
  locale?: string;
}

// Component for structured data (JSON-LD)
const StructuredData = ({ locale = "pt" }: StructuredDataProps) => {
  // Data localization
  const localizedData = {
    pt: {
      name: "StepUp Idiomas",
      description:
        "A StepUp é uma escola de inglês que combina inovação com experiência. Adaptamos nossos cursos para diferentes idades e níveis.",
      alternateName: "StepUp",
      url: "https://stepupidiomas.pt/pt",
      logo: "https://stepupidiomas.pt/icon.jpg",
      address: {
        streetAddress: "Praça da República, 52",
        addressLocality: "Montijo",
        postalCode: "2870",
        addressCountry: "PT",
      },
      telephone: "+351 923 076 858",
      email: "admin@stepupidiomas.pt",
      openingHours: [
        "Mo 18:30-21:30",
        "Tu 08:30-10:00,18:30-21:30",
        "We 08:30-10:00,18:00-20:00",
        "Th 00:00-00:00",
        "Fr 00:00-00:00",
        "Sa 00:00-00:00",
        "Su 00:00-00:00",
      ],
      priceRange: "$$",
      sameAs: [
        "https://www.facebook.com/StepUpMontijo",
        "https://www.instagram.com/stepup_linguas",
        "https://www.youtube.com/@StepUpLanguageCentre",
      ],
      courseOffered: [
        {
          "@type": "Course",
          name: "Inglês para Crianças",
          description:
            "Curso de inglês adaptado para crianças com atividades lúdicas e interativas.",
        },
        {
          "@type": "Course",
          name: "Inglês para Adolescentes",
          description:
            "Curso de inglês para adolescentes focado na comunicação e preparação para exames.",
        },
        {
          "@type": "Course",
          name: "Inglês para Adultos",
          description:
            "Curso de inglês para adultos adaptado às necessidades profissionais e pessoais.",
        },
      ],
    },
    en: {
      name: "StepUp Idiomas",
      description:
        "A StepUp is an English school that combines innovation with experience. We adapt our courses to different ages and levels.",
      alternateName: "StepUp",
      url: "https://stepupidiomas.pt/en",
      logo: "https://stepupidiomas.pt/icon.jpg",
      address: {
        streetAddress: "Praça da República, 52",
        addressLocality: "Montijo",
        postalCode: "2870",
        addressCountry: "PT",
      },
      telephone: "+351 923 076 858",
      email: "admin@stepupidiomas.pt",
      openingHours: [
        "Mo 18:30-21:30",
        "Tu 08:30-10:00,18:30-21:30",
        "We 08:30-10:00,18:00-20:00",
        "Th 00:00-00:00",
        "Fr 00:00-00:00",
        "Sa 00:00-00:00",
        "Su 00:00-00:00",
      ],
      priceRange: "$$",
      sameAs: [
        "https://www.facebook.com/StepUpMontijo",
        "https://www.instagram.com/stepup_linguas",
        "https://www.youtube.com/@StepUpLanguageCentre",
      ],
      courseOffered: [
        {
          "@type": "Course",
          name: "English for Children",
          description:
            "English course adapted for children with playful and interactive activities.",
        },
        {
          "@type": "Course",
          name: "English for Teenagers",
          description:
            "English course for teenagers focused on communication and exam preparation.",
        },
        {
          "@type": "Course",
          name: "English for Adults",
          description:
            "English course for adults adapted to professional and personal needs.",
        },
      ],
    },
  };

  // Select the data based on the locale
  const data =
    localizedData[locale as keyof typeof localizedData] || localizedData.pt;

  // Create the JSON-LD object for the LanguageSchool
  const languageSchoolJsonLd = {
    "@context": "https://schema.org",
    "@type": "LanguageSchool",
    ...data,
  };

  // Create the JSON-LD object for LocalBusiness (for local SEO)
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    address: {
      "@type": "PostalAddress",
      ...data.address,
    },
    telephone: data.telephone,
    email: data.email,
    openingHours: data.openingHours,
    priceRange: data.priceRange,
    sameAs: data.sameAs,
  };

  return (
    <>
      <Script
        id="language-school-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(languageSchoolJsonLd),
        }}
      />
      <Script
        id="local-business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
    </>
  );
};

export default StructuredData;
