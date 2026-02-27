interface AssessmentEmailData {
  contactName: string;
  businessName: string;
  industry: string;
  niche: string;
  teamSize: string;
  avgJobValue: string;
  monthlyLeadVolume: string;
  clarityScore: number;
  totalMonthlyGap: number;
  annualizedGap: number;
  speedGapEstimate: number;
  speedGapFindings: string[];
  silenceGapEstimate: number;
  silenceGapFindings: string[];
  chaosGapEstimate: number;
  chaosGapFindings: string[];
  recommendedTier: string;
  tierReason: string;
}

export function generateAssessmentEmailHTML(data: AssessmentEmailData): string {
  const calendarLink = "https://api.leadconnectorhq.com/widget/booking/3thrLJtlhjEWrn7rrzMi";
  
  const firstName = data.contactName.split(" ")[0];
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Clarity Assessment Results</title>
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
                    <p style="margin: 8px 0 0; font-size: 14px; color: #67E8F9;">AI Clarity Assessment Results</p>
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
                Thank you for completing the AI Clarity Assessment for <strong style="color: #ffffff;">${data.businessName}</strong>. 
                Here's your personalized analysis of operational gaps and revenue opportunities.
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

          <!-- Total Impact Summary -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; border: 1px solid rgba(103, 232, 249, 0.3);">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #67E8F9; text-transform: uppercase; letter-spacing: 1px;">Total Monthly Revenue Gap</p>
                    <p style="margin: 0; font-size: 36px; font-weight: 700; color: #67E8F9;">$${data.totalMonthlyGap.toLocaleString()}/mo</p>
                    <p style="margin: 8px 0 0; font-size: 14px; color: #94a3b8;">Annualized: $${data.annualizedGap.toLocaleString()}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gap Breakdown -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="32%" style="padding-right: 8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(20, 184, 166, 0.1); border-radius: 8px; border: 1px solid rgba(20, 184, 166, 0.2);">
                      <tr>
                        <td style="padding: 16px; text-align: center;">
                          <p style="margin: 0; font-size: 11px; color: #5eead4; text-transform: uppercase;">Speed Gap</p>
                          <p style="margin: 8px 0 0; font-size: 18px; font-weight: 700; color: #14b8a6;">$${data.speedGapEstimate.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="32%" style="padding: 0 4px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(251, 191, 36, 0.1); border-radius: 8px; border: 1px solid rgba(251, 191, 36, 0.2);">
                      <tr>
                        <td style="padding: 16px; text-align: center;">
                          <p style="margin: 0; font-size: 11px; color: #fcd34d; text-transform: uppercase;">Silence Gap</p>
                          <p style="margin: 8px 0 0; font-size: 18px; font-weight: 700; color: #f59e0b;">$${data.silenceGapEstimate.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="36%" style="padding-left: 8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
                      <tr>
                        <td style="padding: 16px; text-align: center;">
                          <p style="margin: 0; font-size: 11px; color: #fca5a5; text-transform: uppercase;">Chaos Gap</p>
                          <p style="margin: 8px 0 0; font-size: 18px; font-weight: 700; color: #ef4444;">$${data.chaosGapEstimate.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gap Analysis Details -->
          ${generateGapSection("Speed Gap", data.speedGapEstimate, data.speedGapFindings, "#14b8a6", "rgba(20, 184, 166, 0.1)")}
          ${generateGapSection("Silence Gap", data.silenceGapEstimate, data.silenceGapFindings, "#f59e0b", "rgba(251, 191, 36, 0.1)")}
          ${generateGapSection("Chaos Gap", data.chaosGapEstimate, data.chaosGapFindings, "#ef4444", "rgba(239, 68, 68, 0.1)")}

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

          <!-- DIY Tips Section -->
          <tr>
            <td style="background-color: #18181b; padding: 0 30px 30px;">
              <p style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #ffffff;">Quick Wins You Can Start Today</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(15, 23, 42, 0.6); border-radius: 8px; border: 1px solid rgba(71, 85, 105, 0.3);">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #14b8a6;">Speed Fixes</p>
                          <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">• Set up auto-responders for after-hours leads<br>• Train team on sub-5-minute response protocol</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #f59e0b;">Silence Fixes</p>
                          <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">• Create no-show recovery scripts<br>• Set calendar reminders for quote follow-ups</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #ef4444;">Chaos Fixes</p>
                          <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">• Document top 10 repetitive admin tasks<br>• Use Zapier/Make.com free tiers for automation</p>
                        </td>
                      </tr>
                    </table>
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
                      Let's discuss how to implement these fixes with AI-powered automation—without the DIY headaches.
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

function generateGapSection(title: string, estimate: number, findings: string[], color: string, bgColor: string): string {
  const findingsHTML = findings.slice(0, 3).map(f => 
    `<tr><td style="padding: 4px 0 4px 16px; font-size: 13px; color: #94a3b8;">• ${f}</td></tr>`
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
                          <p style="margin: 0; font-size: 16px; font-weight: 700; color: ${color};">$${estimate.toLocaleString()}/mo</p>
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
