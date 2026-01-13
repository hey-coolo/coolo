import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Button } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://coolo.co.nz";

interface NewTalentAlertProps {
  name: string;
  email: string;
  role: string;
  rate: string;
  portfolio: string;
}

export const NewTalentAlert = ({ name, email, role, rate, portfolio }: NewTalentAlertProps) => {
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
        <Preview>Talent: {name}</Preview>
        <Body className="bg-brand-offwhite font-sans my-auto mx-auto px-4 py-12">
          <Container className="mx-auto w-full max-w-[600px]">
            
            <Section className="bg-white border-2 border-brand-navy p-10 shadow-[8px_8px_0px_0px_#3A0888]">
              
              <Text className="text-brand-purple font-mono text-[11px] font-bold uppercase tracking-widest mb-2">
                // TALENT APPLICATION
              </Text>
              
              <Heading className="text-brand-navy font-sans text-[64px] leading-[0.9] font-black uppercase m-0 mb-4">
                {name}
              </Heading>
              
              <Text className="text-brand-navy font-mono text-[12px] uppercase tracking-widest mb-8 border-b border-brand-navy/10 pb-4 inline-block">
                ROLE: {role} // RATE: {rate}
              </Text>

              <Section className="bg-brand-offwhite p-6 mb-8 border border-dashed border-brand-purple text-center">
                <Text className="text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0 mb-2">
                  PORTFOLIO LINK
                </Text>
                <Text className="text-brand-navy font-sans font-bold text-[14px] m-0 break-all underline decoration-brand-purple">
                  {portfolio}
                </Text>
              </Section>
              
              <Text className="text-brand-navy font-sans text-[14px] font-medium text-center mb-4">
                Email: {email}
              </Text>

              <Button 
                className="bg-brand-navy text-brand-offwhite font-mono text-[13px] font-bold py-4 px-8 w-full uppercase tracking-widest hover:bg-brand-purple transition-colors border-2 border-brand-navy text-center"
                href={portfolio}
              >
                REVIEW PROFILE
              </Button>

            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewTalentAlert;