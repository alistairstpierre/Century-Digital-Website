// API endpoint for handling script request form submissions
// Sends form data to support@centurydigital.net via email using Resend
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		
		// Validate required fields
		if (!data.name || !data.email || !data.phone) {
			return new Response(
				JSON.stringify({ success: false, error: 'Missing required fields' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Format email content
		const emailSubject = `New Script Request from ${data.name}`;
		const emailBody = `
New Script Request Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company/Title: ${data.company || 'Not provided'}

SMS Consent: ${data.sms_consent ? 'Yes' : 'No'}
Marketing Consent: ${data.marketing_consent ? 'Yes' : 'No'}
Terms Accepted: ${data.terms_consent ? 'Yes' : 'No'}

Submitted: ${new Date().toLocaleString()}
`;

		// Get configuration from environment variables
		const recipientEmail = import.meta.env.EMAIL_RECIPIENT || 'support@centurydigital.net';
		const resendApiKey = import.meta.env.RESEND_API_KEY;
		const emailFrom = import.meta.env.EMAIL_FROM || 'Century Digital <noreply@centurydigital.net>';

		// Check if Resend API key is configured
		if (!resendApiKey) {
			console.error('RESEND_API_KEY is not configured. Please set it in your environment variables.');
			// In development, log the email content
			console.log('Email would be sent to:', recipientEmail);
			console.log('Email subject:', emailSubject);
			console.log('Email body:', emailBody);
			
			return new Response(
				JSON.stringify({ 
					success: false, 
					error: 'Email service not configured. Please contact the site administrator.' 
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Send email using Resend
		const resend = new Resend(resendApiKey);
		
		const { data: emailData, error: emailError } = await resend.emails.send({
			from: emailFrom,
			to: recipientEmail,
			subject: emailSubject,
			text: emailBody,
			replyTo: data.email, // Allow replying directly to the submitter
		});

		if (emailError) {
			console.error('Resend API error:', emailError);
			return new Response(
				JSON.stringify({ success: false, error: 'Failed to send email' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		console.log('Email sent successfully:', emailData);

		return new Response(
			JSON.stringify({ success: true, message: 'Form submitted successfully' }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);

	} catch (error) {
		console.error('Form submission error:', error);
		return new Response(
			JSON.stringify({ success: false, error: 'Internal server error' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
