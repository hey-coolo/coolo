import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Row, Column } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const NewLeadAlert = ({ email = "test@test.com", message = "Pricing inquiry", source = "Website" }) => {
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
            .border-mode-div { border-color: #3A0888 !important; }
          }
        `}</style>
      </Head>
      <Preview>New Lead: {source}</Preview>
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
              
              <Text className="bg-brand-yellow text-brand-navy font-mono text-[11px] font-bold uppercase tracking-widest px-2 py-1 inline-block mb-4">
                // INBOUND SIGNAL
              </Text>

              <Heading className="text-mode-primary text-brand-navy font-sans text-[56px] leading-[0.9] font-black uppercase m-0 mb-8">
                INBOUND<br/>REQUEST
              </Heading>

              <Section className="border-t-2 border-brand-navy border-mode-div">
                <Row className="border-b border-brand-lavender/30 py-3">
                  <Column className="w-[100px]">
                    <Text className="text-mode-secondary text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">SOURCE</Text>
                  </Column>
                  <Column>
                    <Text className="text-mode-primary text-brand-navy font-bold font-sans text-[14px] m-0">{source}</Text>
                  </Column>
                </Row>
                <Row className="border-b border-brand-lavender/30 py-3">
                  <Column className="w-[100px]">
                    <Text className="text-mode-secondary text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">EMAIL</Text>
                  </Column>
                  <Column>
                    <Text className="text-mode-primary text-brand-navy font-bold font-sans text-[14px] m-0">{email}</Text>
                  </Column>
                </Row>
                <Row className="border-b-2 border-brand-navy border-mode-div py-3">
                  <Column className="w-[100px] align-top">
                    <Text className="text-mode-secondary text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">MSG</Text>
                  </Column>
                  <Column>
                    <Text className="text-mode-primary text-brand-navy font-sans text-[14px] italic m-0 opacity-80">"{message}"</Text>
                  </Column>
                </Row>
              </Section>

            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewLeadAlert;