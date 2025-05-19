'use client';

import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useLeadCaptureModal } from '@/hooks/useLeadCaptureModal';
import LeadCaptureModal from '@/components/lead-capture-modal';

type Messages = Record<string, unknown>;

export default function ClientLayout({
  children,
  locale,
  messages,
  timeZone,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
  timeZone: string;
}) {
  const { isOpen, closeModal } = useLeadCaptureModal();

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster closeButton richColors />
        <LeadCaptureModal isOpen={isOpen} onClose={closeModal} />
      </div>
    </NextIntlClientProvider>
  );
} 