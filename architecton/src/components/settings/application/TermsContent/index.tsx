import { useEffect, useState } from 'react';
import './index.css';

const TermsContent = () => {
  const [date, setDate] = useState<string>();

  useEffect(() => {
    const now = new Date();
    setDate(now.toLocaleDateString('ru-Ru'));
  }, []);

  return (
    <>
      <div className="terms-header">ArchitecTon Developer Agreement</div>
      <div className="terms-update-date">Last Updated: [{date}]</div>
      <ul className="terms-block-container">
        <li>
          <span className="block-header">Introduction</span>
          <div className="block-content">
            Welcome to ArchitecTon, a platform for developers to distribute
            their applications in The Open Network (TON) ecosystem. By
            registering as a developer and submitting applications to
            ArchitecTon, you agree to comply with the following terms and
            conditions. This Developer Agreement ("Agreement") is a legal
            contract between you ("Developer" or "You") and ArchitecTon
            ("Platform", "We", "Us", or "Our").
          </div>
        </li>
        <li>
          <span className="block-header">Definitions</span>
          <ul className="block-content">
            <li>
              <b>Application:</b> Software programs, services, or products that
              the Developer submits to the Platform for distribution.
            </li>
            <li>
              <b>User:</b> Any individual who downloads, installs, or uses the
              Developer's Application.
            </li>
            <li>
              <b>Store:</b> The digital marketplace provided by ArchitecTon
              where Applications are distributed.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">Developer Account</span>
          <ul className="block-content">
            <li>
              <b>Eligibility:</b> The Developer must possess all necessary legal
              rights and obligations in their jurisdiction or have a duly
              authorized legal representative, who capable of entering into a
              legally binding agreement.
            </li>
            <li>
              <b>Registration:</b> You must provide accurate and complete
              information during the registration process and keep this
              information up-to-date.
            </li>
            <li>
              <b>Account Security:</b> You are responsible for maintaining the
              security of your account and all activity associated with it.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">Submission of Applications</span>
          <ul className="block-content">
            <li>
              <b>Approval:</b> All Applications must be submitted to ArchitecTon
              for review and approval before being listed in the Store. We
              reserve the right to approve or reject any Application at our
              discretion.
            </li>
            <li>
              <b>Compliance:</b> Applications must comply with all applicable
              laws, regulations, and our policies, including but not limited to
              our Content Guidelines.
            </li>
            <li>
              <b>Updates:</b> You are responsible for maintaining and updating
              your Applications to ensure they remain functional and comply with
              our policies.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">Intellectual Property</span>
          <ul className="block-content">
            <li>
              <b>Ownership:</b> You retain all rights to your Applications. By
              submitting an Application to the Platform, you grant ArchitecTon a
              worldwide, non-exclusive, royalty-free license to distribute,
              promote, and use the Application as necessary to operate the
              Store.
            </li>
            <li>
              <b>Infringement:</b> You warrant that your Applications do not
              infringe upon the intellectual property rights of any third party.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">Payments and Fees</span>
          <ul className="block-content">
            <li>
              <b>Revenue Sharing:</b> ArchitecTon will take a commission from
              all sales of Applications. The remaining will be remitted to the
              Developer.
            </li>
            <li>
              <b>Payouts:</b> Payments to Developers will be made on a
              [quarterly] basis, provided the minimum payout threshold of is
              met.
            </li>
            <li>
              <b>Using payment instruments:</b> Developer have to use jettons of
              Platform to accept payments in application preferably.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">User Data and Privacy</span>
          <ul className="block-content">
            <li>
              <b>Data Collection:</b> You must comply with all applicable data
              protection laws and regulations when collecting, using, and
              storing User data.
            </li>
            <li>
              <b>Privacy Policy:</b> You must provide a clear and comprehensive
              privacy policy for your Application that complies with our
              policies and applicable laws.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">Termination</span>
          <ul className="block-content">
            <li>
              <b>Termination by Developer:</b> You may terminate this Agreement
              at any time by removing your Applications from the Store and
              closing your Developer account.
            </li>
            <li>
              <b>Termination by ArchitecTon:</b> We reserve the right to
              terminate this Agreement and/or suspend or terminate your
              Developer account and remove your Applications from the Store at
              our discretion, particularly if you violate any terms of this
              Agreement.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">Limitation of Liability</span>
          <ul className="block-content">
            <li>
              <b>Disclaimer:</b> ArchitecTon provides the Platform on an "as-is"
              basis and disclaims all warranties, express or implied.
            </li>
            <li>
              <b>Limitation:</b> In no event will ArchitecTon be liable for any
              indirect, incidental, special, consequential, or punitive damages
              arising out of or in connection with this Agreement.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">General Provisions</span>
          <ul className="block-content">
            <li>
              <b>Governing Law:</b> This Agreement will be governed by and
              construed in accordance with the laws of Kyrgyzstan.
            </li>
            <li>
              <b>Entire Agreement:</b> This Agreement constitutes the entire
              agreement between you and ArchitecTon and supersedes all prior
              agreements and understandings.
            </li>
            <li>
              <b>Amendments:</b> ArchitecTon reserves the right to amend this
              Agreement at any time. We will notify you of any changes, and your
              continued use of the Platform will constitute acceptance of the
              amended terms.
            </li>
          </ul>
        </li>
        <li>
          <span className="block-header">Contact Information</span>
          <ul className="block-content">
            <li>
              For any questions or concerns regarding this Agreement, please
              contact us at [contact email].
            </li>
            <li>
              By clicking "I Agree" and/or by submitting your Application to
              ArchitecTon, you acknowledge that you have read, understood, and
              agree to be bound by this Agreement.
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default TermsContent;
