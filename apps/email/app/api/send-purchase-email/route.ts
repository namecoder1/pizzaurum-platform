import { NextRequest } from "next/server";
import PurchaseEmail from "@/emails/purchase-email";
import { resend } from "@/app/utils/resend";

export async function POST(req: NextRequest) {
	const { email, data, title } = await req.json()

	try {
		const { data: emailData, error } = await resend.emails.send({
			from: 'info@pizzaurum.store',
			to: email,
			subject: title,
			react: PurchaseEmail(data)
		})

		console.log('Email sent successfully:', { emailData, error });

		if (error) {
			return Response.json({ error }, { status: 500 })
		}

		return Response.json(emailData)
	} catch (error) {
		return Response.json({ error }, { status: 500 })
	}
}