import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Link, Hr, Preview, Img } from '@react-email/components';

// UPDATE THIS to your actual live domain (e.g., https://coolo.co.nz)
const BASE_URL = 'https://coolo.co.nz'; 

const colors = {
  navy: '#0F0328',
  offWhite: '#F7F7F7',
  purple: '#3A0888',
  yellow: '#FCC803',
};

interface ResourceDeliveryProps {
  resourceName: string;
  downloadLink: string;
}

export const ResourceDelivery = ({ 
  resourceName = "The Clarity Audit", 
  downloadLink = "#" 
}: ResourceDeliveryProps) => {
  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        `}} />
      </Head>
      <Preview>Download Ready: {resourceName}</Preview>
      <Body style={main}>
        <Container style={container}>
          
          {/* BRAND HEADER - Using your actual asset */}
          <Section style={header}>
            <Img 
                src={`${BASE_URL}/assets/logos/apple-touch-icon.png`} 
                alt="COOLO" 
                width="64" 
                height="64" 
                style={logo} 
            />
          </Section>

          {/* CONTENT CARD */}
          <Section style={contentSection}>
            <Text style={statusBadge}>SECURE FILE TRANSFER</Text>
            
            <Heading style={h1}>FILE<br/><span style={{color: colors.purple}}>UNLOCKED.</span></Heading>
            
            <Text style={paragraph}>
              The <strong>{resourceName}</strong> file you requested has been retrieved from the archive.
            </Text>
            
            <Section style={highlightBox}>
              <Link href={downloadLink} style={button}>
                DOWNLOAD FILE
              </Link>
              <Text style={tinyText}>DIRECT LINK EXPOSED</Text>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              <strong>Mission Protocol:</strong> Use this to audit your brand logic. If you find gaps, reply to this email. We can fix them.
            </Text>
          </Section>

          {/* FOOTER */}
          <Section style={footer}>
            <Text style={footerText}>
              COOLO STUDIO // MOUNT MAUNGANUI<br/>
              <Link href={BASE_URL} style={link}>COOLO.CO.NZ</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResourceDelivery;

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
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  borderRadius: '0px', 
};

const statusBadge = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '10px',
  letterSpacing: '0.2em',
  color: colors.navy,
  fontWeight: 700,
  marginBottom: '16px',
  display: 'block',
  opacity: 0.5,
};

const contentSection = {
  padding: '0 24px',
};

const h1 = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '48px',
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
  color: 'rgba(15, 3, 40, 0.8)',
  margin: '0 0 24px',
};

const highlightBox = {
  backgroundColor: '#FFFFFF',
  border: `2px solid ${colors.navy}`,
  padding: '32px',
  textAlign: 'center' as const,
  margin: '32px 0',
  boxShadow: '8px 8px 0px 0px rgba(15, 3, 40, 0.1)',
};

const button = {
  backgroundColor: colors.purple,
  color: colors.offWhite,
  fontFamily: '"Space Mono", monospace',
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  padding: '16px 40px',
  display: 'inline-block',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
};

const tinyText = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '10px',
  color: 'rgba(15, 3, 40, 0.4)',
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