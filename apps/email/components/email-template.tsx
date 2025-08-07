import { Container, Font, Head, Html } from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Html lang="it">
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Container>
        {children}
      </Container>
    </Html>
  );
}