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
    <div className="relative pt-32 pb-20 min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-black bg-gradient-to-r from-primary via-blue-600 to-secondary">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.5}
              color="#2b085c"
            />
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Main section with contact information and form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Contact information column */}
          <div className="lg:col-span-5">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100/50 overflow-hidden h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h2 className="text-xl font-bold mb-1">StepUp</h2>
                    <p className="text-white/90">{t("address.full")}</p>
                  </div>
                </div>
              </div>

              {/* Contact information */}
              <div className="p-6">
                <div className="relative space-y-8">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>

                  <div className="relative">
                    <h3 className="font-bold text-2xl mb-6 text-slate-900">
                      <span className="relative">
                        {t("contactInfo")}
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 to-transparent rounded-full"></span>
                      </span>
                    </h3>

                    <div className="grid gap-4">
                      {[
                        {
                          icon: MapPin,
                          title: t("address.title"),
                          content: (
                            <div className="space-y-0.5">
                              <p className="text-slate-600">{t("address.street")}</p>
                              <p className="text-slate-600">{t("address.city")}</p>
                            </div>
                          )
                        },
                        {
                          icon: Phone,
                          title: t("phone.title"),
                          content: (
                            <a href="tel:+351923076858" className="text-primary group-hover:text-primary/80 transition-all duration-300">
                              +351 923 076 858
                            </a>
                          )
                        },
                        {
                          icon: Mail,
                          title: t("email.title"),
                          content: (
                            <a href="mailto:admin@stepupidiomas.pt" className="text-primary group-hover:text-primary/80 transition-all duration-300">
                              admin@stepupidiomas.pt
                            </a>
                          )
                        },
                        {
                          icon: Clock,
                          title: t("hours.title"),
                          content: (
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { text: t("hours.monday"), status: "open" },
                                { text: t("hours.tuesday"), status: "open" },
                                { text: t("hours.wednesday"), status: "open" },
                                { text: t("hours.closed"), status: "closed" }
                              ].map((day, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${day.status === "open" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                                  <p className="text-sm text-slate-600">{day.text}</p>
                                </div>
                              ))}
                            </div>
                          )
                        }
                      ].map((item, index) => (
                        <div key={index} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"></div>
                          <div className="relative flex items-start gap-4 p-4 rounded-2xl border border-slate-100/80 shadow-sm shadow-slate-100/50 backdrop-blur-xl transition-all duration-500 hover:shadow-md">
                            <div className="relative shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur-[2px]"></div>
                              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-transparent">
                                <item.icon className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-base text-slate-900 mb-1">
                                {item.title}
                              </p>
                              {item.content}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="relative">
                    <h3 className="font-bold text-2xl mb-4 text-slate-900">
                      <span className="relative">
                        {t("socialMedia")}
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 to-transparent rounded-full"></span>
                      </span>
                    </h3>
                    <div className="flex gap-3">
                      {[
                        { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                        { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                        { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
                        { icon: MessageSquare, href: "https://wa.me/351923076858", label: "WhatsApp" }
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative"
                          aria-label={social.label}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur transition-all duration-300 group-hover:blur-xl"></div>
                          <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-slate-100/80 shadow-sm shadow-slate-100/50 backdrop-blur-xl transition-all duration-300 group-hover:shadow-md group-hover:scale-110">
                            <social.icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div id="contact-form" className="lg:col-span-7 scroll-mt-28">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100/50 p-8 relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {/* Form decorative elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl"></div>

              <div className="relative">
                <h2 className="text-2xl font-bold mb-2 text-slate-900">
                  {t("form.title")}
                </h2>
                <p className="text-slate-600 mb-8">{t("form.subtitle")}</p>
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
            {/* FAQ Items */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-slate-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  {t(`faq.q${i}`)}
                </h3>
                <p className="text-slate-600">{t(`faq.a${i}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
