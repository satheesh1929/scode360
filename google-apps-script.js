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
        var emailBody = "Hi " + name + ",\n\n" +
            "Thank you for contacting ScoDe360! We have received your message regarding " + (service ? service : "your inquiry") + ".\n\n" +
            "Our team will review your details and get back to you as soon as possible.\n\n" +
            "--- Your Message ---\n" +
            message + "\n" +
            "--------------------\n\n" +
            "Best Regards,\n" +
            "ScoDe360 Team\n" +
            "https://scode360.com";

        // Send the email
        MailApp.sendEmail({
            to: email,
            subject: subject,
            body: emailBody,
            name: "ScoDe360 Team" // Sender name
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
