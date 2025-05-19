import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import CTASection from "@/components/cta-section";
import { Book, UserCheck, Zap, MapPin, Clock, Phone } from "lucide-react";
import HandwrittenUnderline from "@/components/handwritten-underline";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: `${t("title")} - StepUp`,
    description: t("subtitle"),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  // Method card component with hover effect
  const MethodCard = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className="group h-full">
      <div className="relative h-full bg-white border border-slate-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-700">{description}</p>
      </div>
    </div>
  );

  // Teacher card component with hover effect
  const TeacherCard = ({
    image,
    name,
    role,
    description,
  }: {
    image: string;
    name: string;
    role: string;
    description: string;
  }) => (
    <div className="group h-full">
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4]">
        <Image
          src={image}
          alt={name}
          width={400}
          height={500}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
          <p className="text-white text-sm opacity-90">{description}</p>
        </div>
      </div>
      <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
      <p className="text-primary font-medium">{role}</p>
    </div>
  );

  return (
    <div className="relative pt-32 pb-20">
      <div className="container mx-auto px-4 relative">
        {/* Page header with animation */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-primary to-secondary text-black">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.5}
              color="#2b085c"
            />
          </h1>
          <p className="text-slate-700 text-xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* School history - Modern layout with image and text side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 mt-20">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-32">
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src="https://placehold.co/700x600/webp"
                    alt="StepUp Team"
                    width={700}
                    height={600}
                    className="w-full h-auto object-cover rounded-3xl shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                      <p className="text-lg font-medium italic text-slate-900">
                        {t("history.quote")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6 flex items-center text-slate-900">
                  <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3">
                    <Book className="h-6 w-6" />
                  </span>
                  <HandwrittenUnderline
                    text={t("history.title")}
                    highlightText={t("history.title")}
                    delay={0.7}
                    color="#3b82f6"
                  />
                </h2>
                <div className="space-y-4 text-lg text-slate-700">
                  <p>{t("history.text1")}</p>
                  <p>{t("history.text2")}</p>
                  <p>{t("history.text3")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Methodology - Modern cards with icons */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 inline-block relative text-slate-900">
              <HandwrittenUnderline
                text={t("methodology.title")}
                highlightText={t("methodology.title")}
                delay={0.7}
                color="#3b82f6"
              />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h2>
            <p className="text-slate-700 text-xl max-w-3xl mx-auto">
              {t("methodology.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MethodCard
              icon={<UserCheck className="h-8 w-8" />}
              title={t("methodology.cards.communicative.title")}
              description={t("methodology.cards.communicative.description")}
            />
            <MethodCard
              icon={<Book className="h-8 w-8" />}
              title={t("methodology.cards.personalized.title")}
              description={t("methodology.cards.personalized.description")}
            />
            <MethodCard
              icon={<Zap className="h-8 w-8" />}
              title={t("methodology.cards.dynamic.title")}
              description={t("methodology.cards.dynamic.description")}
            />
          </div>
        </div>

        {/* Our Team - Cards with hover effect */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 inline-block relative text-slate-900">
              <HandwrittenUnderline
                text={t("teachers.title")}
                highlightText={t("teachers.title")}
                delay={0.7}
                color="#3b82f6"
              />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h2>
            <p className="text-slate-700 text-xl max-w-3xl mx-auto">
              {t("teachers.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeacherCard
              image="https://placehold.co/400x500/webp"
              name={t("teachers.team.pf1.name")}
              role={t("teachers.team.pf1.role")}
              description={t("teachers.team.pf1.description")}
            />
            <TeacherCard
              image="https://placehold.co/400x500/webp"
              name={t("teachers.team.pf2.name")}
              role={t("teachers.team.pf2.role")}
              description={t("teachers.team.pf2.description")}
            />
            <TeacherCard
              image="https://placehold.co/400x500/webp"
              name={t("teachers.team.pf3.name")}
              role={t("teachers.team.pf3.role")}
              description={t("teachers.team.pf3.description")}
            />
            <TeacherCard
              image="https://placehold.co/400x500/webp"
              name={t("teachers.team.pf4.name")}
              role={t("teachers.team.pf4.role")}
              description={t("teachers.team.pf4.description")}
            />
          </div>
        </div>

        {/* Location and Contact */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 inline-block relative text-slate-900">
              <HandwrittenUnderline
                text={t("location.title")}
                highlightText={t("location.title")}
                delay={0.7}
                color="#3b82f6"
              />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h2>
            <p className="text-slate-700 text-xl max-w-3xl mx-auto">
              {t("location.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 h-full flex items-center w-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-100/50 h-full flex items-center w-full hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group">
                <div className="space-y-8 w-full">
                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-xl text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900 flex items-center gap-2">
                        {t("location.address.title")}
                        <span className="h-1 w-1 rounded-full bg-primary/50 animate-pulse"></span>
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {t("location.address.street")}
                        <br />
                        {t("location.address.city")}
                        <br />
                        {t("location.address.country")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-xl text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900 flex items-center gap-2">
                        {t("location.hours.title")}
                        <span className="h-1 w-1 rounded-full bg-primary/50 animate-pulse"></span>
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {t("location.hours.monday")}
                        <br />
                        {t("location.hours.tuesday")}
                        <br />
                        {t("location.hours.wednesday")}
                        <br />
                        {t("location.hours.closed")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-xl text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900 flex items-center gap-2">
                        {t("location.contact.title")}
                        <span className="h-1 w-1 rounded-full bg-primary/50 animate-pulse"></span>
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        <a href="tel:{t('location.contact.phone')}" className="hover:text-primary transition-colors">
                          {t("location.contact.phone")}
                        </a>
                        <br />
                        <a href="mailto:{t('location.contact.email')}" className="hover:text-primary transition-colors">
                          {t("location.contact.email")}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5 h-full">
              <div className="relative h-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform -rotate-1 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl shadow-lg border border-slate-100/50 aspect-video h-full bg-white/80 backdrop-blur-sm group-hover:shadow-2xl transition-all duration-300">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <CTASection namespace="About" />
      </div>
    </div>
  );
}
