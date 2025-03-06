export default function PrivacyPolicy() {
  return (
    <div className="bg-white m-auto my-4 p-4" style={{ maxWidth: '720px' }}>
      <div className="text-center text-4xl py-10">Privacy Policy for 2workbook</div>
      <div className="py-5">Version 1.4  -  Mar 06 2025 <br /> Review Date: Mar 06 2026</div>
      <p>
        Thank you for using <strong>2workbook</strong>, an application designed to open and manage <strong>.2workbook</strong> files within Google Drive. Protecting your privacy is important to us. This Privacy Policy explains how we interact with your data when you use our app.
      </p>

      <h2 className="text-2xl py-5">1. Information We Access</h2>
      <p>Our application interacts with Google Drive to open and manage files. We may access the following information:</p>
      <ul>
        <li><strong>Google Drive Access:</strong> We request permission to access your Google Drive for the purpose of reading and opening .2workbook files.</li>
        <li><strong>File Metadata:</strong> The application may access file names, sizes, and other metadata required for processing files within the app.</li>
      </ul>

      <h2 className="text-2xl py-5">2. How We Use Your Information</h2>
      <p>We use this data <strong>only</strong> for:</p>
      <ul>
        <li>Opening, reading, and displaying .2workbook files within the app.</li>
        <li>Enhancing user experience and troubleshooting issues.</li>
        <li>Ensuring compliance with Google Drive API policies and security measures.</li>
      </ul>

      <h2 className="text-2xl py-5">3. Data Protection Mechanisms for Sensitive Data</h2>
      <p>We implement the following data protection mechanisms to safeguard sensitive data:</p>
      <ul>
        <li><strong>Encryption in Transit:</strong> All data, including authentication tokens and file content, is transmitted using HTTPS/TLS encryption to prevent unauthorized interception.</li>
        <li><strong>OAuth 2.0 Authentication:</strong> We use secure, token-based authentication to manage access without exposing user credentials.</li>
        <li><strong>Data Minimization:</strong> We only request access to the specific files required for functionality and handle all file operations securely through Google APIs such as Google Picker.</li>
        <li><strong>No Data Storage or Caching:</strong> We do not store, log, or cache any user data. All processing occurs temporarily in the user&apos;s browser and is discarded after the session ends.</li>
        <li><strong>Limited Scope Permissions:</strong> We request only the minimal permissions necessary to provide app functionality.</li>
        <li><strong>User Control:</strong> Users can review and revoke app permissions anytime via <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a>.</li>
        <li><strong>Compliance:</strong> We comply with Google&apos;s API Services User Data Policy and follow industry best practices for security and privacy.</li>
      </ul>

      <h2 className="text-2xl py-5">4. Sharing of Information</h2>
      <p>We <strong>do not share, sell, or distribute</strong> any user data. The application only interacts with files as needed for functionality and does not retain information beyond the session.</p>

      <h2 className="text-2xl py-5">5. Third-Party Services</h2>
      <p>Our app uses Google APIs for authentication and file handling. These services comply with their respective privacy policies and security practices.</p>

      <h2 className="text-2xl py-5">6. User Controls and Permissions</h2>
      <p>You can manage or revoke the app’s access to your Google Drive at any time via <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a>.</p>

      <h2 className="text-2xl py-5">7. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be reflected here with a revised &quot;Last Updated&quot; date.</p>

      <h2 className="text-2xl py-5">8. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
      <ul>
        <li><strong>Company Name:</strong> 2wards</li>
        <li><strong>Email:</strong> <a href="mailto:adm@2wards.com">adm@2wards.com</a></li>
        <li><strong>Website:</strong> <a href="https://www.2wards.co" target="_blank">https://www.2wards.co</a></li>
      </ul>

      <p>By using <strong>2workbook</strong>, you agree to this Privacy Policy and our handling of information as described.</p>
    </div>
  )
}
