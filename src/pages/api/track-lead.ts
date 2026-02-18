/**
 * Conversions API (CAPI) endpoint: sends a Lead event to Meta when someone
 * lands on the thank-you page. Called from the thank-you page on load.
 * Requires META_CAPI_ACCESS_TOKEN and PUBLIC_FB_PIXEL_ID in env.
 */
import type { APIRoute } from 'astro';

const META_GRAPH_VERSION = 'v21.0';

function getClientIp(request: Request): string | undefined {
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) return forwarded.split(',')[0].trim();
	return request.headers.get('x-real-ip') ?? undefined;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const pixelId = import.meta.env.PUBLIC_FB_PIXEL_ID as string | undefined;
		const accessToken = import.meta.env.META_CAPI_ACCESS_TOKEN as string | undefined;

		if (!pixelId || !accessToken) {
			console.error('track-lead: PUBLIC_FB_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set');
			return new Response(
				JSON.stringify({ success: false, error: 'Server not configured' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const body = await request.json().catch(() => ({}));
		const eventId = typeof body.eventID === 'string' ? body.eventID : `capi-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
		const eventSourceUrl = typeof body.eventSourceUrl === 'string' ? body.eventSourceUrl : undefined;

		const clientIp = getClientIp(request);
		const userAgent = request.headers.get('user-agent') ?? undefined;

		const eventTime = Math.floor(Date.now() / 1000);
		const payload: Record<string, unknown> = {
			event_name: 'Lead',
			event_time: eventTime,
			event_id: eventId,
			action_source: 'website',
			user_data: {
				...(clientIp && { client_ip_address: clientIp }),
				...(userAgent && { client_user_agent: userAgent }),
			},
		};
		if (eventSourceUrl) payload.event_source_url = eventSourceUrl;

		const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ data: [payload] }),
		});

		const data = await res.json().catch(() => ({}));
		if (!res.ok) {
			console.error('Meta CAPI error:', res.status, data);
			return new Response(
				JSON.stringify({ success: false, error: 'Meta API error' }),
				{ status: 502, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({ success: true }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (err) {
		console.error('track-lead error:', err);
		return new Response(
			JSON.stringify({ success: false, error: 'Internal error' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
