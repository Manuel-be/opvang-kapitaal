import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { naam, telefoon, email, budget, bericht } = await request.json()

    if (!naam || !email) {
      return NextResponse.json({ fout: 'Naam en e-mail zijn verplicht.' }, { status: 400 })
    }

    const html = `
      <h2 style="color:#1B2B4B;font-family:sans-serif">Nieuwe aanvraag via Opvang Kapitaal</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px 12px;font-weight:600;color:#555;width:140px">Naam</td><td style="padding:8px 12px">${naam}</td></tr>
        <tr style="background:#f9f9f7"><td style="padding:8px 12px;font-weight:600;color:#555">E-mail</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 12px;font-weight:600;color:#555">Telefoon</td><td style="padding:8px 12px">${telefoon || 'niet ingevuld'}</td></tr>
        <tr style="background:#f9f9f7"><td style="padding:8px 12px;font-weight:600;color:#555">Budget</td><td style="padding:8px 12px">${budget || 'niet ingevuld'}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top">Bericht</td><td style="padding:8px 12px;white-space:pre-wrap">${bericht || 'geen bericht'}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:13px;color:#999;margin-top:24px">Verzonden via opvangkapitaal.be</p>
    `

    await resend.emails.send({
      from: 'Opvang Kapitaal <onboarding@resend.dev>',
      to: ['info@hartstarters.be', 'takleandra@gmail.com'],
      replyTo: email,
      subject: `Nieuwe investeerder interesse van ${naam}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact e-mail fout:', err)
    return NextResponse.json({ fout: 'Verzenden mislukt, probeer later opnieuw.' }, { status: 500 })
  }
}
