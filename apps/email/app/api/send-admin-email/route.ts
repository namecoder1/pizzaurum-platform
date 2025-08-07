import { NextRequest } from "next/server";
import AdminEmail from "@/emails/admin-email";
import { resend } from "@/app/utils/resend";

export async function POST(req: NextRequest) {
	const { 
		email, 
		password,
		name
	 } = await req.json()

	 try {
		const { data, error } = await resend.emails.send({
			from: 'info@pizzaurum.store',
			to: email,
			subject: 'Invito Admin',
			react: AdminEmail({ email, password, name })
		})

		console.log("Email sent successfully:", { data, error })

		if (error) {
			return Response.json({ error }, { status: 500 })
		}

		return Response.json(data)
	 } catch (error) {
			return Response.json({ error }, { status: 500 })
	 }
}