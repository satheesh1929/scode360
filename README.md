# ScoDe360 - Web Development & Creative Services

ScoDe360 is a modern, responsive website for a creative agency offering Web Development, Logo Design, and Video Editing services. The site allows startups and small businesses to explore services, view portfolios, and get in touch for potential collaborations.

## 🚀 Features

-   **Modern Design:** Sleek dark theme with vibrant accent colors and smooth animations.
-   **Services Showcase:** Dedicated sections for Web Development, Logo Design, and Video Editing.
-   **Interactive Contact Form:**
    -   Collects client details and inquiries.
    -   **Google Sheets Integration:** Automatically saves form submissions to a Google Sheet.
    -   **Automated Confirmation:** Sends an instant confirmation email to the client using Google Apps Script.
-   **SEO Optimized:**
    -   Includes meta tags, Open Graph tags, and Twitter Cards.
    -   Implements Schema.org structured data for Search Engines.
-   **Responsive Layout:** Fully optimized for desktops, tablets, and mobile devices.
-   **Dynamic Animations:** Background particle effects, scroll animations, and hover interactions.

## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, JavaScript
-   **Backend Logic:** Google Apps Script
-   **Database:** Google Sheets
-   **Fonts:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)

## 📂 Project Structure

-   `index.html`: Main landing page containing the structure and content.
-   `google-apps-script.js`: The backend script (deployed on Google Apps Script) to handle form submissions and emails.
-   `INTEGRATION_STEPS.md`: Guide on troubleshooting and setting up the Google Apps Script integration.
-   `favicon.png` & `logo.png`: Branding assets.
-   `sitemap.xml` & `robots.txt`: SEO configuration files.

## ⚙️ Setup & Usage

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/satheesh1929/scode360.git
    cd scode360
    ```

2.  **Run Locally:**
    -   Simply open the `index.html` file in your web browser.
    -   Or use a local server like Live Server in VS Code.

3.  **Contact Form Configuration:**
    -   The contact form relies on a Google Apps Script deployment.
    -   If you need to redeploy or modify the script, refer to `INTEGRATION_STEPS.md` for detailed instructions on permissions and deployment.
    -   Ensure the `scriptURL` in the `index.html` JavaScript section points to your active Web App deployment.

## 📄 License

This project is proprietary to ScoDe360.
