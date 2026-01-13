import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Row, Column } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://coolo.co.nz";

interface NewLeadAlertProps {
  name: string;
  email: string;
  vibe: string;
  message: string;
  budget?: string;
}

export const NewLeadAlert = ({ name, email, vibe, message, budget }: NewLeadAlertProps) => {
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
        <Preview>New Lead: {name}</Preview>
        <Body className="bg-brand-offwhite font-sans my-auto mx-auto px-4 py-12">
          <Container className="mx-auto w-full max-w-[600px]">
            
            <Section className="bg-white border-2 border-brand-navy p-10 shadow-[8px_8px_0px_0px_#FCC803]">
              
              <Text className="bg-brand-yellow text-brand-navy font-mono text-[11px] font-bold uppercase tracking-widest px-2 py-1 inline-block mb-4">
                // INBOUND SIGNAL
              </Text>

              <Heading className="text-brand-navy font-sans text-[56px] leading-[0.9] font-black uppercase m-0 mb-8">
                NEW LEAD<br/>DETECTED
              </Heading>

              <Section className="border-t-2 border-brand-navy">
                <Row className="border-b border-brand-navy/10 py-3">
                  <Column className="w-[100px]">
                    <Text className="text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">CLIENT</Text>
                  </Column>
                  <Column>
                    <Text className="text-brand-navy font-sans text-[16px] font-bold m-0">{name}</Text>
                  </Column>
                </Row>
                <Row className="border-b border-brand-navy/10 py-3">
                  <Column className="w-[100px]">
                    <Text className="text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">EMAIL</Text>
                  </Column>
                  <Column>
                    <Text className="text-brand-navy font-sans text-[16px] font-bold m-0">{email}</Text>
                  </Column>
                </Row>
                <Row className="border-b border-brand-navy/10 py-3">
                  <Column className="w-[100px]">
                    <Text className="text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">VIBE</Text>
                  </Column>
                  <Column>
                    <Text className="text-brand-navy font-sans text-[16px] font-bold m-0">{vibe}</Text>
                  </Column>
                </Row>
                {budget && (
                <Row className="border-b border-brand-navy/10 py-3">
                  <Column className="w-[100px]">
                    <Text className="text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">BUDGET</Text>
                  </Column>
                  <Column>
                    <Text className="text-brand-navy font-sans text-[16px] font-bold m-0">{budget}</Text>
                  </Column>
                </Row>
                )}
                <Row className="border-b-2 border-brand-navy py-3">
                  <Column className="w-[100px] align-top">
                    <Text className="text-brand-purple font-mono text-[10px] uppercase tracking-widest m-0">MSG</Text>
                  </Column>
                  <Column>
                    <Text className="text-brand-navy font-sans text-[16px] font-medium m-0 opacity-80">"{message}"</Text>
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