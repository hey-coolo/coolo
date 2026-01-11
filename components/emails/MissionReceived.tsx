import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Link, Hr, Preview } from '@react-email/components';

// BRAND COLORS
const colors = {
  navy: '#0F0328',
  offWhite: '#F7F7F7',
  purple: '#3A0888',
  yellow: '#FCC803',
};

interface MissionReceivedEmailProps {
  name: string;
}

export const MissionReceivedEmail = ({ name }: MissionReceivedEmailProps) => {
  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Space+Mono:wght@400;700&display=swap');
        `}} />
      </Head>
      <Preview>We received your message.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* HEADER */}
          <Section style={header}>
            <Heading style={brandLogo}>COOLO</Heading>
            <Text style={statusBadge}>STATUS: RECEIVED</Text>
          </Section>

          {/* CONTENT */}
          <Section style={contentSection}>
            <Heading style={h1}>MESSAGE<br/><span style={{color: colors.purple}}>RECEIVED.</span></Heading>
            
            <Text style={paragraph}>
              Hey {name},
            </Text>
            <Text style={paragraph}>
              Thanks for reaching out. We've got your details in our system.
            </Text>
            <Text style={paragraph}>
              We usually reply within 24 hours to set up a chat or clarify the next steps. Sit tight.
            </Text>
            
            <Section style={highlightBox}>
              <Text style={monoText}>TICKET_ID: {Math.floor(Math.random() * 10000)} // COOLO_STUDIO</Text>
            </Section>

            <Link href="https://coolo.co.nz" style={button}>
              RETURN TO SITE
            </Link>
          </Section>

          <Hr style={divider} />

          {/* FOOTER */}
          <Section style={footer}>
              <Text style={footerText}>
                COOLO STUDIO<br/>
                MOUNT MAUNGANUI, NZ<br/>
                <Link href="https://instagram.com/coolo.co" style={link}>INSTAGRAM</Link>
                {' • '}
                <Link href="https://coolo.co.nz/unsubscribepage" style={{...link, color: '#999', textDecoration: 'none'}}>UNSUBSCRIBE</Link>
              </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MissionReceivedEmail;

// --- STYLES ---
const main = {
  backgroundColor: colors.offWhite,
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 0 48px',
  maxWidth: '580px',
};

const header = {
  marginBottom: '32px',
};

const brandLogo = {
  fontFamily: '"Big Shoulders Display", Helvetica, Arial, sans-serif',
  fontSize: '32px',
  fontWeight: 900,
  letterSpacing: '-1px',
  margin: '0',
  color: colors.navy,
};

const statusBadge = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '10px',
  letterSpacing: '0.2em',
  color: colors.purple,
  fontWeight: 700,
  marginTop: '4px',
};

const contentSection = {
  padding: '0 12px',
};

const h1 = {
  fontFamily: '"Big Shoulders Display", Helvetica, Arial, sans-serif',
  fontSize: '64px',
  lineHeight: '0.9',
  fontWeight: 900,
  color: colors.navy,
  margin: '0 0 24px',
  textTransform: 'uppercase' as const,
};

const paragraph = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'rgba(15, 3, 40, 0.7)',
  margin: '0 0 16px',
};

const highlightBox = {
  backgroundColor: 'rgba(15, 3, 40, 0.05)',
  borderLeft: `2px solid ${colors.purple}`,
  padding: '16px',
  margin: '24px 0',
};

const monoText = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '12px',
  color: colors.navy,
  margin: 0,
  letterSpacing: '0.05em',
};

const button = {
  backgroundColor: colors.navy,
  color: colors.offWhite,
  fontFamily: '"Space Mono", monospace',
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  padding: '16px 32px',
  display: 'inline-block',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginTop: '16px',
};

const divider = {
  borderColor: 'rgba(15, 3, 40, 0.1)',
  margin: '48px 0',
};

const footer = {
  textAlign: 'center' as const,
};

const footerText = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '10px',
  color: 'rgba(15, 3, 40, 0.4)',
  letterSpacing: '0.1em',
  lineHeight: '1.8',
};

const link = {
  color: colors.purple,
  textDecoration: 'underline',
};