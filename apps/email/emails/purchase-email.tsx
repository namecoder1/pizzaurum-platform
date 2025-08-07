import EmailTemplate from '@/components/email-template'
import { Button } from '@react-email/components'
import React from 'react'

interface PurchaseEmailDataProps {
  data: {
    name: string;
    email: string;
    orderId: string;
    items: Array<{
      productName: string;
      quantity: number;
      price: number;
    }>;
  };
}

export default function PurchaseEmail({ data } : PurchaseEmailDataProps) {
  return (
    <EmailTemplate>
      <h1>Acquista Pizzaurum</h1>
      <p>
        Clicca sul pulsante sottostante per accedere al tuo account:
      </p>
      <Button href="https://pizzaurum.com">Accedi</Button>
    </EmailTemplate>
  )
}
