import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Hr, Row, Column, Link } from '@react-email/components';

const colors = { navy: '#0F0328', offWhite: '#F7F7F7', purple: '#3A0888', yellow: '#FCC803' };

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
      <Head />
      <Body style={{ backgroundColor: colors.offWhite, fontFamily: 'Helvetica, Arial, sans-serif', padding: '40px 0' }}>
        <Container style={{ margin: '0 auto', maxWidth: '600px', padding: '0 20px' }}>
          
          <Section style={{ marginBottom: '32px' }}>
            <Text style={{ fontSize: '11px', fontWeight: 700, color: colors.purple, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Recruitment // New Profile
            </Text>
          </Section>

          <Section style={{ backgroundColor: '#ffffff', border: `2px solid ${colors.navy}`, padding: '48px', boxShadow: `12px 12px 0px 0px ${colors.navy}` }}>
            <Heading style={{ color: colors.navy, fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 32px', lineHeight: '1' }}>
                Candidate:<br/>{name}
            </Heading>

            {/* Role & Rate */}
            <Row style={{ marginBottom: '24px' }}>
                <Column>
                    <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>Primary Role</Text>
                    <Text style={{ fontSize: '16px', color: colors.navy, fontWeight: 700, margin: '4px 0 0' }}>{role}</Text>
                </Column>
                <Column>
                    <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>Day Rate</Text>
                    <Text style={{ fontSize: '16px', color: colors.navy, fontWeight: 700, margin: '4px 0 0' }}>{rate}</Text>
                </Column>
            </Row>

            {/* Email & Portfolio */}
            <div style={{ marginBottom: '32px' }}>
                <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>Email</Text>
                <Text style={{ fontSize: '16px', color: colors.navy, margin: '4px 0 16px' }}>{email}</Text>

                <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>Portfolio URL</Text>
                <Link href={portfolio} style={{ fontSize: '16px', color: colors.purple, fontWeight: 700, textDecoration: 'underline', margin: '4px 0 0', display: 'block' }}>
                    {portfolio}
                </Link>
            </div>

            <Hr style={{ borderColor: '#eee', margin: '32px 0' }} />

            <Text style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
              Review this profile and tag in Resend as "Talent" if valid.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewTalentAlert;