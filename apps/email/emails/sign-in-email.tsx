import EmailTemplate from '@/components/email-template'
import { Button, Container, Hr, Img } from '@react-email/components'
import React from 'react'

export default function SignInEmail({ name }: { name: string }) {
  return (
    <EmailTemplate>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0px', margin: '0px' }}>
        <Img src='/static/logo.png' alt="Pizzaurum" width={50} height={50} />
        <h1 style={{ margin: '0px', fontFamily: 'Cormorant Garamond', fontWeight: 'normal'}}>PIZZAURUM</h1>
      </div>
      <Hr />
      <Container>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>Ciao {name || 'utente'}!</h2>
        <h1 style={{ fontSize: '26px', fontWeight: 'black', color: '#000' }}>Benvenuto su Pizzaurum</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          Grazie per aver creato un account su Pizzaurum.
        </p>
        <div style={{ paddingTop: '4px'}}>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Da oggi puoi accedere a Pizzaurum con il tuo indirizzo email e incominciare a ordinare le tue pizze preferite.
          </p>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Ti ricordiamo che per poter ordinare devi prima confermare il tuo numero di telefono e il tuo indirizzo di consegna.
          </p>
        </div>
        <p style={{ fontSize: '16px', color: '#666', paddingTop: '20px' }}>
          Un saluto da Pizzaurum
        </p>

        <Hr style={{ marginTop: '30px' }} />
        <p style={{ fontSize: '12px', color: '#666' }}>
          &copy; {new Date().getFullYear()} Pizzaurum | Via delle Contramine, 16, 61121 Pesaro PU
        </p>
      </Container>
    </EmailTemplate>
  )
}