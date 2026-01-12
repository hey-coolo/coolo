import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Link, Hr, Preview } from '@react-email/components';

const colors = {
  navy: '#0F0328',
  offWhite: '#F7F7F7',
  purple: '#3A0888',
  yellow: '#FCC803',
};

export const ApplicationReceived = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Space+Mono:wght@400;700&display=swap');
        `}} />
      </Head>
      <Preview>We received your portfolio.</Preview>
      <Body style={{ backgroundColor: colors.offWhite, fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '40px 0 48px', maxWidth: '580px' }}>
          
          <Section style={{ marginBottom: '32px' }}>
            <Heading style={{ fontFamily: '"Big Shoulders Display", Helvetica, Arial, sans-serif', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px', margin: '0', color: colors.navy }}>
              COOLO
            </Heading>
            <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.2em', color: colors.purple, fontWeight: 700, marginTop: '4px' }}>
              STATUS: DOSSIER_RECEIVED
            </Text>
          </Section>

          <Section style={{ padding: '0 12px' }}>
            <Heading style={{ fontFamily: '"Big Shoulders Display", Helvetica, Arial, sans-serif', fontSize: '64px', lineHeight: '0.9', fontWeight: 900, color: colors.navy, margin: '0 0 24px', textTransform: 'uppercase' }}>
              PROFILE<br/><span style={{ color: colors.purple }}>LOCKED.</span>
            </Heading>
            
            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(15, 3, 40, 0.7)', margin: '0 0 16px' }}>
              Hey {name},
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(15, 3, 40, 0.7)', margin: '0 0 16px' }}>
              We've received your application and portfolio. Your details have been added to our internal talent database.
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(15, 3, 40, 0.7)', margin: '0 0 16px' }}>
              We review new profiles weekly. If your work aligns with an upcoming brief or the unit's standard, we will reach out directly to schedule a chat.
            </Text>
            
            <Link href="https://coolo.co.nz" style={{ backgroundColor: colors.navy, color: colors.offWhite, fontFamily: '"Space Mono", monospace', fontSize: '14px', fontWeight: 700, textDecoration: 'none', padding: '16px 32px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '16px' }}>
              RETURN TO STUDIO
            </Link>
          </Section>

          <Hr style={{ borderColor: 'rgba(15, 3, 40, 0.1)', margin: '48px 0' }} />

          <Section style={{ textAlign: 'center' }}>
              <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(15, 3, 40, 0.4)', letterSpacing: '0.1em', lineHeight: '1.8' }}>
                COOLO STUDIO // MOUNT MAUNGANUI, NZ
              </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ApplicationReceived;