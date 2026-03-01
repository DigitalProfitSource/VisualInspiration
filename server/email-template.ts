interface AssessmentEmailData {
  contactName: string;
  businessName: string;
  industry: string;
  niche: string;
  teamSize: string;
  avgJobValue: string;
  monthlyLeadVolume: string;
  overallScore: number;
  captureScore: number;
  captureFindings: string[];
  convertScore: number;
  convertFindings: string[];
  compoundScore: number;
  compoundFindings: string[];
  blindspots: string[];
  quickWins: string[];
  supportingActions: string[];
  totalMonthlyGap: number;
  annualizedGap: number;
  recommendedTier: string;
  tierReason: string;
}

export function generateAssessmentEmailHTML(data: AssessmentEmailData): string {
  const calendarLink = "https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi";
  
  const firstName = data.contactName.split(" ")[0];

  const scoreColor = (score: number) => score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Sequential Revenue™ Friction Analysis Results</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f11; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f0f11;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #18181b 0%, #1e293b 100%); padding: 30px; border-radius: 12px 12px 0 0; border-bottom: 1px solid rgba(103, 232, 249, 0.2);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">SimpleSequence</h1>
                    <p style="margin: 8px 0 0; font-size: 14px; color: #67E8F9;">Sequential Revenue™ Friction Analysis Results</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="background-color: #18181b; padding: 30px;">
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0;">Hi ${firstName},</p>
              <p style="margin: 0; font-size: 16px; color: #94a3b8; line-height: 1.6;">
                Thank you for completing the Sequential Revenue™ Friction Analysis for <strong style="color: #ffffff;">${data.businessName}</strong>. 
                Here's your personalized breakdown of where friction is slowing your revenue across the three pillars.
              </p>
            </td>
          </tr>

          <!-- Business Snapshot -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(71, 85, 105, 0.3);">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #67E8F9; text-transform: uppercase; letter-spacing: 0.5px;">Business Snapshot</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="33%" style="padding: 8px 0;">
                          <p style="margin: 0; font-size: 11px; color: #64748b;">Industry</p>
                          <p style="margin: 4px 0 0; font-size: 14px; color: #ffffff; font-weight: 500;">${data.industry}</p>
                        </td>
                        <td width="33%" style="padding: 8px 0;">
                          <p style="margin: 0; font-size: 11px; color: #64748b;">Monthly Leads</p>
                          <p style="margin: 4px 0 0; font-size: 14px; color: #ffffff; font-weight: 500;">${data.monthlyLeadVolume}</p>
                        </td>
                        <td width="34%" style="padding: 8px 0;">
                          <p style="margin: 0; font-size: 11px; color: #64748b;">Avg Job Value</p>
                          <p style="margin: 4px 0 0; font-size: 14px; color: #ffffff; font-weight: 500;">${data.avgJobValue}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Overall Score -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; border: 1px solid rgba(103, 232, 249, 0.3);">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #67E8F9; text-transform: uppercase; letter-spacing: 1px;">Sequential Revenue™ Score</p>
                    <p style="margin: 0; font-size: 48px; font-weight: 700; color: ${scoreColor(data.overallScore)};">${data.overallScore}/100</p>
                    <p style="margin: 12px 0 0; font-size: 14px; color: #94a3b8;">Est. Monthly Revenue Gap: $${data.totalMonthlyGap.toLocaleString()} &bull; Annualized: $${data.annualizedGap.toLocaleString()}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pillar Scores -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="32%" style="padding-right: 8px;">
                    ${generatePillarBlock("Capture", data.captureScore, scoreColor(data.captureScore))}
                  </td>
                  <td width="32%" style="padding: 0 4px;">
                    ${generatePillarBlock("Convert", data.convertScore, scoreColor(data.convertScore))}
                  </td>
                  <td width="36%" style="padding-left: 8px;">
                    ${generatePillarBlock("Compound", data.compoundScore, scoreColor(data.compoundScore))}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pillar Details -->
          ${generatePillarSection("Capture", data.captureScore, data.captureFindings, "#67E8F9", "rgba(103, 232, 249, 0.1)")}
          ${generatePillarSection("Convert", data.convertScore, data.convertFindings, "#67E8F9", "rgba(103, 232, 249, 0.08)")}
          ${generatePillarSection("Compound", data.compoundScore, data.compoundFindings, "#67E8F9", "rgba(103, 232, 249, 0.06)")}

          <!-- Blindspots -->
          ${data.blindspots.length > 0 ? `
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <p style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #ffffff;">Your Blindspots</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(234, 179, 8, 0.05); border-radius: 8px; border: 1px solid rgba(234, 179, 8, 0.2);">
                <tr>
                  <td style="padding: 16px;">
                    ${data.blindspots.slice(0, 4).map(s => `<p style="margin: 0 0 8px; font-size: 13px; color: #94a3b8; padding-left: 16px;">&#9888; ${s}</p>`).join("")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- 30-Day Action Plan -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <p style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #ffffff;">Your Next-30-Day Action Plan</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(71, 85, 105, 0.3);">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #67E8F9;">Quick Wins (First 7–14 Days)</p>
                          ${data.quickWins.slice(0, 3).map(w => `<p style="margin: 0 0 6px; font-size: 13px; color: #94a3b8; line-height: 1.5; padding-left: 16px;">&#10003; ${w}</p>`).join("")}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #94a3b8;">Supporting Actions (Rest of 30 Days)</p>
                          ${data.supportingActions.slice(0, 3).map(a => `<p style="margin: 0 0 6px; font-size: 13px; color: #94a3b8; line-height: 1.5; padding-left: 16px;">&#8226; ${a}</p>`).join("")}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Recommended Tier -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 0.5px;">Recommended Solution</p>
                    <p style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #ffffff;">${data.recommendedTier} Tier</p>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.5;">${data.tierReason}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #18181b 0%, #1e293b 100%); border-radius: 12px; border: 1px solid rgba(103, 232, 249, 0.3);">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #ffffff;">Ready to Close Your Revenue Gaps?</p>
                    <p style="margin: 0 0 24px; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                      Let's discuss how to implement these fixes with AI-powered automation — without the DIY headaches.
                    </p>
                    <a href="${calendarLink}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                      Book a Discovery Call
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #18181b; padding: 20px 30px 30px; border-radius: 0 0 12px 12px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #67E8F9;">SimpleSequence</p>
                    <p style="margin: 0; font-size: 12px; color: #64748b;">AI Implementation Advisory for Service Businesses</p>
                    <p style="margin: 16px 0 0; font-size: 11px; color: #475569;">
                      This assessment was generated based on the information you provided. Actual results may vary.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function generatePillarBlock(title: string, score: number, color: string): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(71, 85, 105, 0.3);">
      <tr>
        <td style="padding: 16px; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: #67E8F9; text-transform: uppercase;">${title}</p>
          <p style="margin: 8px 0 0; font-size: 24px; font-weight: 700; color: ${color};">${score}/100</p>
        </td>
      </tr>
    </table>
  `;
}

function generatePillarSection(title: string, score: number, findings: string[], color: string, bgColor: string): string {
  const findingsHTML = findings.slice(0, 3).map(f => 
    `<tr><td style="padding: 4px 0 4px 16px; font-size: 13px; color: #94a3b8;">&#8226; ${f}</td></tr>`
  ).join("");

  return `
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${bgColor}; border-radius: 8px; border: 1px solid ${color}33;">
                <tr>
                  <td style="padding: 16px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${color};">${title}</p>
                        </td>
                        <td style="text-align: right;">
                          <p style="margin: 0; font-size: 16px; font-weight: 700; color: ${color};">${score}/100</p>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 8px;">
                      ${findingsHTML}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `;
}
