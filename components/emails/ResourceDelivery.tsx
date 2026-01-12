import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Button } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const ResourceDelivery = ({ resourceName = "Brand Guide 2.0", downloadLink = "#" }) => {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Space+Mono:wght@400;700&display=swap');
          .logo-dark { display: none !important; }
          .logo-light { display: block !important; }
          @media (prefers-color-scheme: dark) {
            .logo-light { display: none !important; }
            .logo-dark { display: block !important; }
            .bg-mode-body { background-color: #010101 !important; }
            .bg-mode-card { background-color: #0F0328 !important; border-color: #7670C5 !important; }
            .text-mode-primary { color: #F7F7F7 !important; }
            .text-mode-secondary { color: #7670C5 !important; }
            .btn-mode-solid { background-color: #F7F7F7 !important; color: #010101 !important; border-color: #F7F7F7 !important; }
          }
        `}</style>
      </Head>
      <Preview>Your download is ready</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                'brand-purple': '#3A0888',
                'brand-offwhite': '#F7F7F7',
                'brand-yellow': '#FCC803',
                'brand-lavender': '#7670C5',
                'brand-navy': '#0F0328',
                'brand-dark': '#010101',
              },
              fontFamily: {
                sans: ['"Big Shoulders Display"', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['"Space Mono"', 'Courier', 'monospace'],
              }
            },
          },
        }}
      >
        <Body className="bg-mode-body bg-brand-offwhite font-sans my-auto mx-auto px-4 py-12">
          <Container className="mx-auto w-full max-w-[600px]">
            
            <Section className="mb-10 text-center">
              <Img src={`${baseUrl}/static/logo-light-mode.png`} width="100" alt="COOLO" className="logo-light mx-auto" />
              <Img src={`${baseUrl}/static/logo-dark-mode.png`} width="100" alt="COOLO" className="logo-dark mx-auto" />
            </Section>

            <Section className="bg-mode-card bg-white border-2 border-brand-navy p-10 shadow-none">
              
              <Section className="mb-6">
                 <Text className="text-mode-secondary text-brand-navy font-mono text-[11px] font-bold uppercase tracking-widest border border-brand-lavender rounded-full px-3 py-1 inline-block m-0">
                  FILE: READY
                </Text>
              </Section>

              <Heading className="text-mode-primary text-brand-navy font-sans text-[64px] leading-[0.9] font-black uppercase m-0 mb-6">
                HERE IS<br/>
                <span className="text-brand-purple">THE GOODS.</span>
              </Heading>
              
              <Text className="text-mode-primary text-brand-navy/80 font-sans text-[18px] leading-[1.6] mb-8">
                The nuclear option. We built it. Now you own it. Here is the <strong>{resourceName}</strong> file you requested.
              </Text>

              <Button 
                className="btn-mode-solid bg-brand-navy text-brand-offwhite font-mono text-[13px] font-bold py-5 px-8 w-full uppercase tracking-widest hover:bg-brand-purple transition-colors border-2 border-brand-navy"
                href={downloadLink}
              >
                DOWNLOAD NOW
              </Button>

            </Section>

            <Section className="mt-8 text-center">
              <Text className="text-mode-secondary text-brand-navy/40 font-mono text-[10px] uppercase tracking-widest">
                COOLO STUDIO // MOUNT MAUNGANUI, NZ
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResourceDelivery;