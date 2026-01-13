import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Button } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://coolo.co.nz";

export const ApplicationReceived = ({ name = "Applicant" }: { name: string }) => {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                'brand-purple': '#3A0888',
                'brand-offwhite': '#F7F7F7',
                'brand-yellow': '#FCC803',
                'brand-navy': '#0F0328',
              },
              fontFamily: {
                sans: ['"Big Shoulders Display"', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['"Space Mono"', 'Courier', 'monospace'],
              }
            },
          },
        }}
      >
        <Head>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Space+Mono:wght@400;700&display=swap');
          `}</style>
        </Head>
        <Preview>Profile Locked: {name}</Preview>
        <Body className="bg-brand-offwhite font-sans my-auto mx-auto px-4 py-12">
          <Container className="mx-auto w-full max-w-[600px]">
            
            <Section className="mb-8 text-center">
               <Img src={`${baseUrl}/assets/logos/logo-dark.svg`} width="100" alt="COOLO" className="mx-auto" />
            </Section>

            <Section className="bg-white border-2 border-brand-navy p-10 shadow-[8px_8px_0px_0px_#0F0328]">
              
              <Text className="text-brand-purple font-mono text-[11px] font-bold uppercase tracking-widest mb-4">
                STATUS: DOSSIER_RECEIVED
              </Text>

              <Heading className="text-brand-navy font-sans text-[64px] leading-[0.9] font-black uppercase m-0 mb-6">
                PROFILE<br/>
                <span className="text-brand-purple">LOCKED.</span>
              </Heading>

              <Text className="text-brand-navy font-sans text-[18px] leading-[1.4] mb-4 font-medium">
                Hey {name},
              </Text>
              <Text className="text-brand-navy/80 font-sans text-[18px] leading-[1.4] mb-8 font-medium">
                We've received your application and portfolio. Your details have been added to our internal talent database. We review new profiles weekly.
              </Text>
              
              <Button 
                className="bg-brand-navy text-brand-offwhite font-mono text-[13px] font-bold py-4 px-8 uppercase tracking-widest hover:bg-brand-purple transition-colors border-2 border-brand-navy w-full text-center"
                href="https://coolo.co.nz"
              >
                RETURN TO STUDIO
              </Button>

            </Section>

            <Section className="mt-8 text-center">
              <Text className="text-brand-navy/40 font-mono text-[10px] uppercase tracking-widest">
                COOLO STUDIO // MOUNT MAUNGANUI, NZ
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ApplicationReceived;