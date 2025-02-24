export default function PrivacyPolicy() {
  return(
    <div className="bg-white m-auto my-4 p-4" style={{maxWidth: '720px' }}>
      <div className="text-center text-4xl py-10">Privacy Policy for 2workbook</div>
      <div className="py-5">Version 1.1  -  Feb 24 2025 <br /> Review Date: Feb 24 2026</div>
      <p>Thank you for using <strong>2workbook</strong>, an application designed to open and manage <strong>.2workbook</strong> files within Google Drive. Protecting your privacy is important to us. This Privacy Policy explains how we interact with your data when you use our app.</p>
      
      <h2 className="text-2xl py-5">1. Information We Access</h2>
      <p>Our application interacts with Google Drive to open and manage files. We may access the following information:</p>
      <ul>
          <li><strong>Google Drive Access:</strong> We request permission to access your Google Drive for the purpose of reading and opening .2workbook files.</li>
          <li><strong>File Metadata:</strong> The application may access file names, sizes, and other metadata required for processing files within the app.</li>
          <li><strong>User Account Information:</strong> If required, we may collect basic profile information (such as email and name) to identify users and provide support.</li>
      </ul>
      
      <h2 className="text-2xl py-5">2. How We Use Your Information</h2>
      <p>We use this data <strong>only</strong> for:</p>
      <ul>
          <li>Opening, reading, and displaying .2workbook files within the app.</li>
          <li>Enhancing user experience and troubleshooting issues.</li>
          <li>Ensuring compliance with Google Drive API policies and security measures.</li>
      </ul>
      
      <h2 className="text-2xl py-5">3. Data Storage and Security</h2>
      <ul>
          <li><strong>No Data Retention:</strong> We <strong>do not store, collect, or retain</strong> any files or personal information on external servers. All file processing happens <strong>locally within the application and Google Drive.</strong></li>
          <li><strong>Secure Access:</strong> We use <strong>OAuth 2.0 authentication</strong> to securely request access to your Google Drive.</li>
          <li><strong>Limited Scope Access:</strong> The app requests the <strong>minimum permissions necessary</strong> to function properly.</li>
          <li><strong>No External Storage:</strong> The application does <strong>not transmit, log, or store</strong> any user data outside Google Drive.</li>
      </ul>
      
      <h2 className="text-2xl py-5">4. Sensitive Data Protection</h2>
      <p>We understand the importance of protecting sensitive data. However, our application <strong>does not collect, store, or process</strong> sensitive user data. Specifically:</p>
      <ul>
          <li>All file access remains within Google Drive and is never stored externally.</li>
          <li>No personal or sensitive data is retained after the user session ends.</li>
          <li>The app operates <strong>entirely within the user&apos;s browser environment</strong> and does not transfer any information to external databases or servers.</li>
          <li>Users can revoke permissions at any time through Google&apos;s account security settings.</li>
      </ul>
      
      <h2 className="text-2xl py-5">5. Sharing of Information</h2>
      <p>We <strong>do not share, sell, or distribute</strong> any user data. The application only interacts with files as needed for functionality and does not retain information beyond the session.</p>
      
      <h2 className="text-2xl py-5">6. Third-Party Services</h2>
      <p>Our app uses Google APIs for authentication and file handling. These services comply with their respective privacy policies and security practices.</p>
      
      <h2 className="text-2xl py-5">7. User Controls and Permissions</h2>
      <p>You can manage or revoke the app’s access to your Google Drive at any time via <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a>.</p>
      
      <h2 className="text-2xl py-5">8. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be reflected here with a revised &quot;Last Updated&quot; date.</p>
      
      <h2 className="text-2xl py-5">9. Contact Us</h2>
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