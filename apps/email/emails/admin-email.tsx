import { Button, Container, Font, Html } from "@react-email/components";
import * as React from "react";
import EmailTemplate from "@/components/email-template";

interface AdminEmailDataProps {
  email?: string;
  password?: string;
  name?: string;  
}

export default function AdminEmail({ email, password, name }: {
  email?: string;
  password?: string;
  name?: string;
}) {
  return (
    <EmailTemplate>
      <h1>Ciao {name}, sei stato invitato a diventare un admin di Pizzaurum</h1>
      <p>
        Clicca sul pulsante sottostante per accedere al tuo account:
      </p>
      <p>Le tue credenziali sono:</p>
      <p>Email: {email || "email@gmail.com"}</p>
      <p>Password: {password || "Password123"}</p>
      <Button href="https://pizzaurum.com">Accedi</Button>
    </EmailTemplate>
  );
}