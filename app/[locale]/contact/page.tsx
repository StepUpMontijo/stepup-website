import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import BiginForm from "@/components/bigin-form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageSquare,
} from "lucide-react";
import GridPattern from "@/components/grid-pattern";
import HandwrittenUnderline from "@/components/handwritten-underline";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NavBar" });

  return {
    title: `${t("contact")} - StepUp`,
    description:
      locale === "en"
        ? "Contact StepUp to schedule classes or learn more about our English courses in Montijo."
        : "Entre em contacto com a StepUp para agendar aulas ou saber mais sobre nossos cursos de inglês em Montijo.",
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <div className="relative pt-32 pb-20 bg-gradient-to-b from-white to-slate-50">
      {/* Background decorative elements */}
      <GridPattern />

      <div className="container mx-auto px-4 relative">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-black bg-gradient-to-r from-primary to-secondary">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.5}
              color="#2b085c"
            />
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Main section with contact information and form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Contact information column */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden h-full">
              {/* Google Map */}
              <div className="relative h-64 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.4981390350317!2d-8.975092699999998!3d38.706370799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1939abd3e1828f%3A0x8da1fc98c9dedf3b!2sStepUp%20Escola%20de%20L%C3%ADnguas!5e0!3m2!1spt-PT!2spt!4v1747202633648!5m2!1spt-PT!2spt"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h2 className="text-xl font-bold mb-1">StepUp</h2>
                    <p className="text-white/90">{t("address.full")}</p>
                  </div>
                </div>
              </div>

              {/* Contact information */}
              <div className="p-8 space-y-8">
                <div>
                  <h3 className="font-bold text-xl mb-6 text-slate-900 border-b pb-2 border-slate-100">
                    {t("contactInfo")}
                  </h3>
                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">
                          {t("address.title")}
                        </p>
                        <p className="text-slate-600">{t("address.street")}</p>
                        <p className="text-slate-600">{t("address.city")}</p>
                      </div>
                    </div>

                    {/* Telefone */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">
                          {t("phone.title")}
                        </p>
                        <a
                          href="tel:+351923076858"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          +351 923 076 858
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">
                          {t("email.title")}
                        </p>
                        <a
                          href="mailto:admin@stepupidiomas.pt"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          admin@stepupidiomas.pt
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">
                          {t("hours.title")}
                        </p>
                        <p className="text-slate-600">{t("hours.monday")}</p>
                        <p className="text-slate-600">{t("hours.tuesday")}</p>
                        <p className="text-slate-600">{t("hours.wednesday")}</p>
                        <p className="text-slate-600">{t("hours.closed")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social media */}
                <div>
                  <h3 className="font-bold text-xl mb-2 text-slate-900">
                    {t("socialMedia")}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="Youtube"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
                    <a
                      href="https://wa.me/351923076858"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label="WhatsApp"
                    >
                      <MessageSquare className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div id="contact-form" className="lg:col-span-7 scroll-mt-28">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative overflow-hidden">
              {/* Form decorative elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

              <div className="relative">
                <h2 className="text-2xl font-bold mb-2 text-slate-900">
                  {t("form.title")}
                </h2>
                <p className="text-slate-600 mb-6">{t("form.subtitle")}</p>
                <BiginForm className="p-0" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">
              <HandwrittenUnderline
                text={t("faq.title")}
                highlightText={t("faq.title")}
                delay={0.5}
                color="#8b5cf6"
              />
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              {t("faq.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                {t("faq.q1")}
              </h3>
              <p className="text-slate-600">{t("faq.a1")}</p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                {t("faq.q2")}
              </h3>
              <p className="text-slate-600">{t("faq.a2")}</p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                {t("faq.q3")}
              </h3>
              <p className="text-slate-600">{t("faq.a3")}</p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                {t("faq.q4")}
              </h3>
              <p className="text-slate-600">{t("faq.a4")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
