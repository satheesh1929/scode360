/**
 * GOOGLE APPS SCRIPT CODE for ScoDe360 Contact Form
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/18DgSshM85GGWqhfSMQCSCtG5ZgyGeURnYSMLaoLxJr8/edit?usp=sharing
 * 2. Go to "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any code currently in the editor (like "function myFunction...").
 * 4. Copy and PASTE all the code below into the editor.
 * 5. Click the "Save" icon (floppy disk).
 * 6. Click the blue "Deploy" button (top right) > "New deployment".
 * 7. Click the "Select type" gear icon > "Web app".
 * 8. Configuration:
 *    - Description: "Contact Form Integration"
 *    - Execute as: "Me" (your email address)
 *    - Who has access: "Anyone" (This is critical for the form to work)
 * 9. Click "Deploy".
 *    IMPORTANT: The email will be sent from the Google Account that creates/deploys this script.
 *    If you want it to come from "team.scode360@gmail.com", you MUST be logged in as that user when you do this.
 * 10. You might benefit from an "Authorize access" screen. Click "Review permissions", choose your account, click "Advanced" > "Go to (Project Name) (unsafe)" > "Allow".
 * 11. COPY the "Web App URL" (it starts with https://script.google.com/macros/s/...).
 * 12. Paste this URL into your index.html file where it says "REPLACE_WITH_YOUR_WEB_APP_URL".
 */

function doPost(e) {
    // Use a lock to prevent concurrent access issues
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        // 1. Get the active sheet
        var doc = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = doc.getActiveSheet();

        // 2. Parse the incoming JSON data
        var data = JSON.parse(e.postData.contents);

        // Extract fields
        var name = data.name;
        var email = data.email;
        var phone = data.phone || "";
        var service = data.service || "";
        var message = data.message;
        var timestamp = new Date();

        // 3. Append to Google Sheet
        // Headers are assumed to be: Timestamp, Name, Email, Phone, Service, Message
        sheet.appendRow([timestamp, name, email, phone, service, message]);

        // 4. Send Confirmation Email to the Client
        var subject = "We've received your inquiry - ScoDe360";

        // HTML Email Template - Modern & Stunning Design
        var htmlBody = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ScoDe360 Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #F8F8F8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                
                <!-- Main Wrapper -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F8F8; width: 100%;">
                    <tr>
                        <td align="center" style="padding: 20px 10px;">
                            
                            <!-- Compact Card -->
                            <table role="presentation" width="500" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; width: 500px; max-width: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08); border: 1px solid #E5E7EB;">
                                
                                <!-- Yellow Header Section -->
                                <tr>
                                    <td align="center" style="background-color: #FFD700; padding: 25px 20px 20px 20px; text-align: center;">
                                        <!-- Logo -->
                                        <img src="https://drive.google.com/uc?export=view&id=1jTmK__FZA6-_epeWOpNY5u_VayRXLqUI" alt="ScoDe360 Logo" width="70" style="display: block; width: 70px; height: auto; margin: 0 auto 10px auto;">
                                        
                                        <!-- Brand Name -->
                                        <h1 style="color: #111827; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">ScoDe360</h1>
                                    </td>
                                </tr>

                                <!-- Main Content Section -->
                                <tr>
                                    <td style="padding: 30px 25px; text-align: center; background-color: #FFFFFF;">
                                        <!-- Greeting -->
                                        <p style="margin: 0 0 15px 0; color: #4B5563; font-size: 16px;">Hi ${name},</p>
                                        
                                        <!-- Confirmation Message -->
                                        <p style="margin: 0 0 25px 0; color: #111827; font-size: 18px; line-height: 1.5; font-weight: 600;">We’ve received your request regarding <strong>${service || 'your project'}</strong>.</p>
                                        
                                        <!-- Highlight Info Box -->
                                        <div style="background-color: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 12px; margin: 0 auto 25px auto; max-width: 90%;">
                                            <p style="margin: 0; color: #92400E; font-size: 14px; font-weight: bold;">
                                                ⏱️ We usually respond within 24 hours.
                                            </p>
                                        </div>
                                        
                                        <!-- CTA Button -->
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                            <tr>
                                                <td align="center" style="border-radius: 6px; background-color: #111827;">
                                                    <a href="https://scode360.com" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 14px; color: #FFD700; text-decoration: none; font-weight: bold; border-radius: 6px; border: 1px solid #111827;">Visit Our Website</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Footer Section -->
                                <tr>
                                    <td style="background-color: #FAFAFA; padding: 20px; text-align: center; border-top: 1px solid #F3F4F6;">
                                        <p style="margin: 0 0 5px 0; color: #4B5563; font-size: 14px; font-weight: bold;">ScoDe360 Team</p>
                                        
                                        <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                                            <a href="https://scode360.in" style="color: #6B7280; text-decoration: none;">scode360.in</a>
                                            <span style="margin: 0 6px;">•</span>
                                            <a href="mailto:team.scode360@gmail.com" style="color: #6B7280; text-decoration: none;">team.scode360@gmail.com</a>
                                        </p>
                                    </td>
                                </tr>
                                
                            </table>
                            
                            <!-- Bottom Spacing -->
                            <div style="height: 20px;"></div>
                        </td>
                    </tr>
                </table>

            </body>
            </html>
        `;

        // Send the email
        // CRITICAL: To send FROM "team.scode360@gmail.com", you MUST be logged in as that account when you deploy this script.
        MailApp.sendEmail({
            to: email,
            subject: subject,
            htmlBody: htmlBody, // Use HTML body
            body: "Hi " + name + ", Thank you for contacting ScoDe360. We have received your message. Best, ScoDe360 Team", // Fallback plain text
            name: "ScoDe360 Team",
            replyTo: "team.scode360@gmail.com"
        });

        // 5. Send Lead Details to Admin (Satheesh)
        var adminEmail = "satheeshkumarfine@gmail.com";
        var adminSubject = "New Lead: " + name + " - " + (service || "General Inquiry");
        var adminHtmlBody = `
            <h3>New Lead Received on ScoDe360</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong><br>${message}</p>
            <hr>
            <p><small>Received on: ${timestamp}</small></p>
        `;

        MailApp.sendEmail({
            to: adminEmail,
            subject: adminSubject,
            htmlBody: adminHtmlBody,
            body: "New Lead:\nName: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nService: " + service + "\nMessage: " + message
        });

        // 5. Return Success Response
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        // Return Error Response
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);

    } finally {
        // Release the lock
        lock.releaseLock();
    }
}
