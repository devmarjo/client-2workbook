export default function PrivacyPolicy() {
  return(
    <div className="bg-white m-auto my-4 p-4" style={{maxWidth: '500px' }}>
      <div className="py-4 text-4xl">Privacy Policy</div>
      <p>Thank you for using 2workbook, an application designed to open and manage .2workbook files within Google Drive. Protecting your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our app.</p>

      <div className="py-4 text-2xl">1. Information We Collect</div>
      <p>Our application interacts with Google Drive to open and manage files. We may collect the following information:</p>
      <ul className="list-disc pl-10 py-5">
          <li><strong>Google Drive Access:</strong> We request permission to access your Google Drive to read and open .2workbook files.</li>
          <li><strong>File Metadata:</strong> We may access file names, sizes, and other metadata for processing within the app.</li>
          <li><strong>User Account Information:</strong> If required, we may collect basic profile information (such as email and name) to identify users and provide support.</li>
      </ul>

      <div className="py-4 text-2xl">2. How We Use Your Information</div>
      <p>We use the collected data solely for the purpose of providing the app’s functionality:</p>
      <ul className="list-disc pl-10 py-5">
          <li>Opening, reading, and displaying .2workbook files.</li>
          <li>Improving user experience and troubleshooting issues.</li>
          <li>Ensuring compliance with Google Drive API policies and security measures.</li>
      </ul>

      <div className="py-4 text-2xl">3. Data Storage and Security</div>
      <ul className="list-disc pl-10 py-5">
          <li><strong>No Data Retention:</strong> We do not store your files on our servers. All file processing happens within the app and Google Drive.</li>
          <li><strong>Secure Access:</strong> We use OAuth 2.0 authentication for secure access to your Google Drive.</li>
          <li><strong>Limited Scope Access:</strong> We only request the minimum permissions necessary to provide the app&apos;s intended functionality.</li>
      </ul>

      <div className="py-4 text-2xl">4. Sharing of Information</div>
      <p>We do not share, sell, or distribute your data to third parties. Your files remain private and are only accessed by our application for functionality purposes.</p>

      <div className="py-4 text-2xl">5. Third-Party Services</div>
      <p>Our app may use third-party services, including Google APIs, for authentication and file handling. These services comply with their respective privacy policies and security practices.</p>

      <div className="py-4 text-2xl">6. User Controls and Permissions</div>
      <p>You can manage or revoke the app&apos;s access to your Google Drive at any time through your Google Account settings:</p>
      <p><a href="https://myaccount.google.com/permissions" target="_blank">Google Security Settings</a></p>

      <div className="py-4 text-2xl">7. Changes to This Privacy Policy</div>
      <p>We may update this Privacy Policy from time to time. Any changes will be reflected here with a revised &quot;Last Updated&quot; date.</p>

      <div className="py-4 text-2xl">8. Contact Us</div>
      <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
      <p><strong>Company Name:</strong> 2wards</p>
      <p><strong>Email:</strong> <a href="mailto:adm@2wards.co">adm@2wards.com</a></p>
      <p><strong>Website:</strong> <a href="https://www.2wards.co" target="_blank">https://www.2wards.co</a></p>

      <p>By using 2workbook, you agree to this Privacy Policy and our handling of your information as described.</p>
    </div>
  )
}