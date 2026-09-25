import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  Database,
  UserRound,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
  },
  {
    id: "google-sign-in",
    title: "Google Sign-In",
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
  },
  {
    id: "ai-conversations",
    title: "AI Conversations",
  },
  {
    id: "cookies",
    title: "Cookies & Authentication",
  },
  {
    id: "security",
    title: "Data Security",
  },
  {
    id: "retention",
    title: "Data Retention",
  },
  {
    id: "third-party",
    title: "Third-Party Services",
  },
  {
    id: "your-rights",
    title: "Your Choices & Rights",
  },
  {
    id: "children",
    title: "Children's Privacy",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const infoCards = [
  {
    icon: UserRound,
    title: "Account Information",
    description:
      "We may collect information such as your name, email address and profile image.",
  },
  {
    icon: BrainCircuit,
    title: "AI Conversations",
    description:
      "Your messages may be stored so Sayra can provide conversation history and continuity.",
  },
  {
    icon: LockKeyhole,
    title: "Authentication",
    description:
      "Authentication cookies and security mechanisms help protect your account.",
  },
  {
    icon: Database,
    title: "Service Data",
    description:
      "We may store chat titles, timestamps and other information required to operate Sayra.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-muted/40 transition-colors group-hover:bg-muted">
              <ArrowLeft className="size-4" />
            </div>

            <span className="hidden sm:inline">Back to Sayra</span>
          </Link>

          <Link href="/" className="text-lg font-semibold tracking-tight">
            Sayra.
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5">
            <ShieldCheck className="size-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Privacy
            </span>
          </div>
        </div>
      </header>

      <section>
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 text-center border-b border-border/80">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-muted/50 shadow-sm">
            <ShieldCheck className="size-8 text-primary" />
          </div>

          <div className="mb-4.5 inline-flex items-center rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            Last updated · September 25, 2026
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Your privacy matters to us. This policy explains what information
            Sayra collects, how we use it, and the choices available to you.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section>
        <div className="mx-auto max-w-7xl py-10 px-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-border bg-card/60 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-card hover:shadow-md"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-border bg-muted/50">
                  <Icon className="size-5 text-primary" />
                </div>

                <h3 className="font-semibold">{card.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <span>{section.title}</span>
                    <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy */}
          <article className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {/* Intro */}
              <div
                id="introduction"
                className="scroll-mt-24 border-b border-border p-6 sm:p-8 lg:p-10"
              >
                <SectionNumber number="01" />

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Introduction
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  <p>
                    Welcome to Sayra. We respect your privacy and are committed
                    to protecting the information you provide while using our
                    services.
                  </p>

                  <p>
                    This Privacy Policy describes the types of information we
                    may collect, how that information is used, how it may be
                    shared, and the choices you have regarding your information.
                  </p>

                  <p>
                    By using Sayra, you acknowledge the practices described in
                    this Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Information */}
              <PolicySection
                id="information-we-collect"
                number="02"
                title="Information We Collect"
              >
                <p>
                  Depending on how you use Sayra, we may collect or receive
                  several types of information.
                </p>

                <h3>Account information</h3>

                <p>
                  When you create an account, we may collect your name, email
                  address, password-related authentication information, profile
                  image, and account verification information.
                </p>

                <h3>Chat information</h3>

                <p>
                  We may store the conversations you have with Sayra, including
                  messages, chat titles, timestamps, and related conversation
                  data.
                </p>

                <h3>Technical information</h3>

                <p>
                  We may receive basic technical information required to operate
                  and secure the service, such as browser, authentication, and
                  request-related information.
                </p>
              </PolicySection>

              {/* Google */}
              <PolicySection
                id="google-sign-in"
                number="03"
                title="Google Sign-In"
              >
                <p>
                  Sayra allows you to sign in using your Google account. When
                  you choose Google Sign-In, Google may provide us with
                  information associated with your Google account.
                </p>

                <ul>
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your Google account identifier</li>
                  <li>Your Google profile picture, when available</li>
                  <li>Email verification status</li>
                </ul>

                <p>
                  We use this information to create or authenticate your Sayra
                  account and provide the requested service.
                </p>

                <Callout>
                  Sayra does not receive your Google password through the Google
                  Sign-In process.
                </Callout>
              </PolicySection>

              {/* Usage */}
              <PolicySection
                id="how-we-use"
                number="04"
                title="How We Use Your Information"
              >
                <p>We may use collected information for purposes including:</p>

                <ul>
                  <li>Creating and managing your account</li>
                  <li>Authenticating your identity</li>
                  <li>Providing AI conversations</li>
                  <li>Saving and displaying your chat history</li>
                  <li>Maintaining and improving Sayra</li>
                  <li>Detecting abuse, fraud, or security issues</li>
                  <li>Communicating important service-related information</li>
                </ul>

                <p>
                  We aim to collect and use information only where reasonably
                  necessary to operate and improve the service.
                </p>
              </PolicySection>

              {/* AI */}
              <PolicySection
                id="ai-conversations"
                number="05"
                title="AI Conversations"
              >
                <p>
                  Sayra is an AI-powered application. When you send a message,
                  your message may be processed by third-party AI service
                  providers used by Sayra to generate a response.
                </p>

                <p>
                  Conversation data may also be stored in our database so that
                  you can access previous conversations and continue a chat
                  later.
                </p>

                <Callout>
                  Please avoid submitting passwords, API keys, financial
                  credentials, private documents, or other highly sensitive
                  information into AI conversations.
                </Callout>
              </PolicySection>

              {/* Cookies */}
              <PolicySection
                id="cookies"
                number="06"
                title="Cookies & Authentication"
              >
                <p>
                  Sayra uses authentication cookies to maintain your signed-in
                  session and protect access to your account.
                </p>

                <p>
                  These cookies may contain security tokens that allow Sayra to
                  recognize an authenticated session.
                </p>

                <p>
                  Authentication cookies are not intended to contain your
                  password in plain text.
                </p>
              </PolicySection>

              {/* Security */}
              <PolicySection id="security" number="07" title="Data Security">
                <p>
                  We take reasonable technical and organizational measures to
                  protect information stored and processed through Sayra.
                </p>

                <p>
                  These measures may include authenticated access, protected
                  server-side operations, secure cookies, access controls, and
                  encrypted connections where supported.
                </p>

                <p>
                  However, no internet service can guarantee absolute security.
                  Users should avoid submitting information that they would not
                  want exposed in the event of a security incident.
                </p>
              </PolicySection>

              {/* Retention */}
              <PolicySection id="retention" number="08" title="Data Retention">
                <p>
                  We may retain account information and conversation data for as
                  long as reasonably necessary to provide the service, maintain
                  your account, comply with legal requirements, and resolve
                  disputes.
                </p>

                <p>
                  The exact retention period may depend on the type of data and
                  how the service is used.
                </p>
              </PolicySection>

              {/* Third Party */}
              <PolicySection
                id="third-party"
                number="09"
                title="Third-Party Services"
              >
                <p>
                  Sayra may rely on third-party services to provide certain
                  functionality. These services may include providers for AI
                  processing, authentication, cloud storage, hosting, or other
                  infrastructure.
                </p>

                <p>
                  Depending on the service involved, information necessary to
                  provide that functionality may be processed by the relevant
                  third-party provider.
                </p>

                <p>
                  Third-party services operate under their own privacy policies
                  and terms.
                </p>
              </PolicySection>

              {/* Rights */}
              <PolicySection
                id="your-rights"
                number="10"
                title="Your Choices & Rights"
              >
                <p>
                  Depending on applicable law and the nature of your account,
                  you may have rights concerning your personal information.
                </p>

                <ul>
                  <li>Access information associated with your account</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your account or information</li>
                  <li>Stop using the service at any time</li>
                  <li>Ask questions about how your information is handled</li>
                </ul>

                <p>
                  Some information may need to be retained where required for
                  security, legal, or legitimate operational purposes.
                </p>
              </PolicySection>

              {/* Children */}
              <PolicySection
                id="children"
                number="11"
                title="Children's Privacy"
              >
                <p>
                  Sayra is not intended to knowingly collect personal
                  information from children in violation of applicable laws.
                </p>

                <p>
                  If you believe a child has provided personal information to
                  Sayra without appropriate authorization, please contact us so
                  the information can be reviewed and, where appropriate,
                  removed.
                </p>
              </PolicySection>

              {/* Changes */}
              <PolicySection
                id="changes"
                number="12"
                title="Changes to This Policy"
              >
                <p>
                  We may update this Privacy Policy from time to time as Sayra
                  evolves or as legal and operational requirements change.
                </p>

                <p>
                  When changes are made, the updated version will be published
                  on this page together with a revised “Last updated” date.
                </p>
              </PolicySection>

              {/* Contact */}
              <div id="contact" className="scroll-mt-24 p-6 sm:p-8 lg:p-10">
                <SectionNumber number="13" />

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Contact
                </h2>

                <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  If you have questions, concerns, or requests regarding this
                  Privacy Policy or your personal information, please contact
                  the Sayra team through the appropriate contact channel
                  provided by the application.
                </p>

                <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

                    <div>
                      <p className="font-medium">
                        Your privacy is important to us.
                      </p>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        We will continue working to keep Sayra secure,
                        transparent, and respectful of your information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/20 p-6 text-center sm:flex-row sm:text-left">
              <div>
                <p className="font-medium">Have more questions?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Return to Sayra and continue using the application.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Go to Sayra
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>© {new Date().getFullYear()} Sayra. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>

            <span className="text-border">•</span>

            <span>Privacy Policy</span>

            <span className="text-border">•</span>

            <Link
              href="/terms-service"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------------------------------- */
/* Reusable Components                 */
/* ---------------------------------- */

function SectionNumber({ number }: { number: string }) {
  return (
    <span className="inline-flex rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground">
      {number}
    </span>
  );
}

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-border p-6 sm:p-8 lg:p-10"
    >
      <SectionNumber number={number} />

      <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>

      <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div className="flex gap-3">
        <LockKeyhole className="mt-0.5 size-5 shrink-0 text-primary" />

        <p className="text-sm leading-6 text-foreground/80">{children}</p>
      </div>
    </div>
  );
}
