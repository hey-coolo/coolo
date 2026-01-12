import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Button } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const NewTalentAlert = ({ applicantName = "Jane Doe", role = "Senior Designer", portfolioLink = "#" }) => {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Space+Mono:wght@400;700&display=swap');
          @media (prefers-color-scheme: dark) {
            .bg-mode-body { background-color: #010101 !important; }
            .bg-mode-card { background-color: #0F0328 !important; border-color: #7670C5 !important; }
            .text-mode-primary { color: #F7F7F7 !important; }
            .text-mode-secondary { color: #7670C5 !important; }
            .btn-mode-primary { border-color: #F7F7F7 !important; color: #F7F7F7 !important; }
          }
        `}</style>
      </Head>
      <Preview>Talent: {applicantName}</Preview>
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
            
            <Section className="bg-mode-card bg-white border-2 border-brand-navy p-10 shadow-none">
              
              <Text className="text-mode-secondary text-brand-purple font-mono text-[11px] font-bold uppercase tracking-widest mb-2">
                // TALENT APPLICATION
              </Text>
              
              <Heading className="text-mode-primary text-brand-navy font-sans text-[64px] leading-[0.9] font-black uppercase m-0 mb-4">
                {applicantName}
              </Heading>
              
              <Text className="text-mode-primary text-brand-navy font-mono text-[12px] uppercase tracking-widest mb-8 border-b border-brand-lavender/30 pb-4 inline-block">
                ROLE: {role}
              </Text>

              <Section className="bg-brand-offwhite p-6 mb-8 border border-dashed border-brand-lavender text-center">
                <Text className="text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0 mb-2">
                  PORTFOLIO LINK
                </Text>
                <Text className="text-brand-navy font-sans font-bold text-[14px] m-0 break-all underline decoration-brand-purple">
                  {portfolioLink}
                </Text>
              </Section>

              <Button 
                className="btn-mode-primary bg-brand-navy text-brand-offwhite font-mono text-[13px] font-bold py-4 px-8 w-full uppercase tracking-widest hover:bg-brand-purple transition-colors border-2 border-brand-navy"
                href={portfolioLink}
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