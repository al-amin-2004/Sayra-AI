import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            ← Back to Sayra
          </Link>

          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: September 25, 2026
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              1. Introduction
            </h2>

            <p>
              Welcome to Sayra. Sayra is an AI-powered assistant that allows
              users to communicate with an artificial intelligence system,
              create conversations, and manage their account.
            </p>

            <p className="mt-4">
              This Privacy Policy explains what information we collect, how
              we use it, how we protect it, and what choices you have when
              using Sayra.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              2. Information We Collect
            </h2>

            <p>Depending on how you use Sayra, we may collect:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Account information such as your name and email address.
              </li>
              <li>
                Authentication information required to securely access your
                account.
              </li>
              <li>
                Profile information, including a profile image if you choose
                to provide one.
              </li>
              <li>
                Messages and conversations you send to Sayra.
              </li>
              <li>
                Information associated with your conversations, such as chat
                titles and timestamps.
              </li>
              <li>
                Technical information required to operate and secure the
                service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              3. Google Sign-In
            </h2>

            <p>
              Sayra may allow you to create or access your account using
              Google Sign-In. When you use Google Sign-In, we may receive
              information provided by Google, such as your name, email
              address, Google account identifier, and profile picture,
              depending on the permissions granted during authentication.
            </p>

            <p className="mt-4">
              We use this information to create, authenticate, and maintain
              your Sayra account. We do not request access to unrelated
              Google services such as Gmail, Google Drive, or Google
              Calendar unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              4. How We Use Your Information
            </h2>

            <p>We may use collected information to:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Create and manage your Sayra account.</li>
              <li>Authenticate your identity and maintain your session.</li>
              <li>Provide AI-powered responses to your requests.</li>
              <li>Store and display your conversations.</li>
              <li>Maintain, secure, and improve Sayra.</li>
              <li>Detect and prevent abuse, fraud, or unauthorized access.</li>
              <li>Communicate with you about important service-related matters.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              5. AI Conversations
            </h2>

            <p>
              Messages that you send to Sayra may be processed by AI services
              used to generate responses. Your conversation data may therefore
              be transmitted to third-party AI service providers when
              necessary to provide the requested functionality.
            </p>

            <p className="mt-4">
              You should avoid submitting passwords, authentication tokens,
              financial credentials, or other highly sensitive information
              into your conversations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              6. Cookies and Authentication
            </h2>

            <p>
              Sayra uses cookies and similar browser storage mechanisms to
              maintain authentication and protect your account.
            </p>

            <p className="mt-4">
              Authentication cookies may contain a secure token that allows
              Sayra to recognize your authenticated session. These cookies are
              intended for authentication purposes and are not used to store
              your password.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              7. Data Security
            </h2>

            <p>
              We use reasonable technical and organizational measures to
              protect your information from unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <p className="mt-4">
              However, no internet-based service can guarantee absolute
              security. You should use a strong password and avoid sharing
              sensitive credentials through the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              8. Data Retention
            </h2>

            <p>
              We retain account and conversation information for as long as
              reasonably necessary to provide Sayra and maintain your
              account, unless a longer retention period is required by law
              or necessary for legitimate security purposes.
            </p>

            <p className="mt-4">
              When you delete information or your account, some information
              may remain temporarily in backups or logs before being
              permanently removed according to our retention practices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              9. Third-Party Services
            </h2>

            <p>
              Sayra may use third-party services for authentication, cloud
              storage, AI processing, hosting, analytics, or other
              infrastructure required to operate the service.
            </p>

            <p className="mt-4">
              These providers may process information only as necessary to
              provide their services and according to their applicable
              policies and agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              10. Your Choices and Rights
            </h2>

            <p>
              Depending on applicable law and the functionality available in
              Sayra, you may have the right to access, correct, or delete
              certain personal information associated with your account.
            </p>

            <p className="mt-4">
              You may also choose not to use Google Sign-In and create an
              account using the available alternative authentication method.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              11. Children&apos;s Privacy
            </h2>

            <p>
              Sayra is not intended for children who are below the minimum age
              required to use the service under applicable law. We do not
              knowingly collect personal information from children in
              violation of applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              12. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to Sayra, our practices, or applicable legal
              requirements.
            </p>

            <p className="mt-4">
              When we make significant changes, we may provide additional
              notice through Sayra or other appropriate means.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              13. Contact
            </h2>

            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy or your personal information, please contact the
              Sayra team through the contact method provided within the
              service.
            </p>
          </section>

          <section className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              By using Sayra, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;