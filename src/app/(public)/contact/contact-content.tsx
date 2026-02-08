"use client";

import { PageHero } from "@/components/ui/page-hero";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui/motion";
import { MapPin, Phone, Mail, Printer } from "lucide-react";
import { ContactForm } from "./contact-form";

const defaultContactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Beit Chabab, Quartier Baydar Chouar, Metn, Liban",
    href: "https://maps.app.goo.gl/n8oJmjd1FfVNT2cp9",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@lycee-montaigne.edu.lb",
    href: "mailto:info@lycee-montaigne.edu.lb",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: "+961 4 982 082 / 983 845 / 985 256",
    href: "tel:+9614982082",
  },
  {
    icon: Printer,
    label: "Fax",
    value: "+961 4 985 256",
    href: "tel:+9614985256",
  },
];

export function ContactContent({ settings }: { settings: Record<string, string> }) {
  // Build contact info using DB settings when available, falling back to hardcoded defaults
  const contactInfo = defaultContactInfo.map((item) => {
    if (item.label === "Adresse" && settings.address) {
      return { ...item, value: settings.address };
    }
    if (item.label === "Email" && settings.contactEmail) {
      return { ...item, value: settings.contactEmail, href: `mailto:${settings.contactEmail}` };
    }
    if (item.label === "Telephone" && settings.phone) {
      return { ...item, value: settings.phone };
    }
    return item;
  });

  return (
    <>
      <PageHero title="Contactez-nous" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <FadeInView>
              <div>
                <h2 className="text-2xl font-bold">Formulaire de contact</h2>
                <p className="mt-2 text-text-muted">
                  Envoyez-nous un message et nous vous repondrons dans les plus brefs delais.
                </p>
                <ContactForm />
              </div>
            </FadeInView>

            {/* Contact Info + Map */}
            <FadeInView delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold">Nos coordonnees</h2>
                <StaggerChildren className="mt-6 space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={item.label}>
                        <a
                          href={item.href}
                          target={item.icon === MapPin ? "_blank" : undefined}
                          rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                          className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-background-alt"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text">{item.label}</p>
                            <p className="text-sm text-text-muted">{item.value}</p>
                          </div>
                        </a>
                      </StaggerItem>
                    );
                  })}
                </StaggerChildren>

                {/* Map */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d35.6636834!3d33.923034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU1JzIyLjkiTiAzNcKwMzknNDkuMyJF!5e0!3m2!1sfr!2slb!4v1"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lycee Montaigne - Beit Chabab"
                  />
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>
    </>
  );
}
