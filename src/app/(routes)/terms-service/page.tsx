import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  ShieldCheck,
  UserRound,
  BrainCircuit,
  AlertTriangle,
  FileText,
  ChevronRight,
} from "lucide-react";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account", title: "Your Account" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "ai-services", title: "AI Services" },
  { id: "content", title: "User Content" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "availability", title: "Service Availability" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "limitation", title: "Limitation of Liability" },
  { id: "termination", title: "Termination" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact" },
];

const infoCards = [
  {
    icon: UserRound,
    title: "Your Account",
    description:
      "You are responsible for maintaining the security of your account and login credentials.",
  },
  {
    icon: BrainCircuit,
    title: "AI Responses",
    description:
      "AI-generated responses may contain errors and should be reviewed before important use.",
  },
  {
    icon: ShieldCheck,
    title: "Use Responsibly",
    description:
      "Use Sayra lawfully and do not misuse the service or attempt to compromise its security.",
  },
  {
    icon: FileText,
    title: "Your Content",
    description:
      "You remain responsible for the content and information you submit through Sayra.",
  },
];

export default function TermsPage() {
  return (
    <main>
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
            <Scale className="size-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Terms
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-muted/50 shadow-sm">
              <Scale className="size-8 text-primary" />
            </div>

            <div className="mb-5 inline-flex items-center rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Last updated · September 25, 2026
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Terms of Service
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              These terms explain the rules for using Sayra, your
              responsibilities as a user, and the conditions under which the
              service is provided.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Terms Content */}
          <article className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {/* 01 */}
              <PolicySection
                id="acceptance"
                number="01"
                title="Acceptance of Terms"
              >
                <p>
                  Welcome to Sayra. By accessing or using Sayra, you agree to be
                  bound by these Terms of Service and any applicable laws and
                  regulations.
                </p>

                <p>
                  If you do not agree with these terms, you should not use Sayra
                  or its services.
                </p>

                <Callout>
                  These Terms of Service should be read together with our
                  Privacy Policy, which explains how we handle information
                  associated with your use of Sayra.
                </Callout>
              </PolicySection>

              {/* 02 */}
              <PolicySection id="eligibility" number="02" title="Eligibility">
                <p>
                  You may use Sayra only if you are legally permitted to enter
                  into these terms under the laws applicable to you.
                </p>

                <p>
                  If you are using Sayra on behalf of an organization or another
                  person, you represent that you have the necessary authority to
                  accept these terms on their behalf.
                </p>
              </PolicySection>

              {/* 03 */}
              <PolicySection id="account" number="03" title="Your Account">
                <p>
                  Some features of Sayra require you to create an account. You
                  are responsible for providing accurate information and keeping
                  your account information up to date.
                </p>

                <p>
                  You are responsible for maintaining the confidentiality of
                  your password, authentication credentials, and access to your
                  account.
                </p>

                <p>
                  If you believe that your account has been accessed without
                  authorization, you should take appropriate steps to secure the
                  account and contact us if necessary.
                </p>
              </PolicySection>

              {/* 04 */}
              <PolicySection
                id="acceptable-use"
                number="04"
                title="Acceptable Use"
              >
                <p>
                  You agree to use Sayra responsibly and only for lawful
                  purposes.
                </p>

                <p>You must not use Sayra to:</p>

                <ul>
                  <li>Break applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to the service</li>
                  <li>Interfere with or disrupt Sayra or its infrastructure</li>
                  <li>Upload malicious code, malware, or harmful content</li>
                  <li>Attempt to bypass security or authentication controls</li>
                  <li>
                    Abuse automated systems or intentionally overload the
                    service
                  </li>
                  <li>Impersonate another person or entity</li>
                  <li>
                    Use the service for fraudulent or deceptive activities
                  </li>
                </ul>

                <Callout>
                  We may restrict or suspend access when necessary to protect
                  Sayra, its users, or the integrity of the service.
                </Callout>
              </PolicySection>

              {/* 05 */}
              <PolicySection id="ai-services" number="05" title="AI Services">
                <p>
                  Sayra provides AI-powered functionality that generates
                  responses based on user input and available conversation
                  context.
                </p>

                <p>
                  AI-generated content may sometimes be incomplete, inaccurate,
                  outdated, or inappropriate for a particular situation.
                </p>

                <p>
                  You are responsible for reviewing AI-generated information
                  before relying on it, particularly for legal, medical,
                  financial, professional, safety-related, or other high-impact
                  decisions.
                </p>

                <Callout>
                  Sayra is an AI assistant, not a substitute for qualified
                  professional advice.
                </Callout>
              </PolicySection>

              {/* 06 */}
              <PolicySection id="content" number="06" title="User Content">
                <p>
                  You may provide messages, prompts, files, or other content
                  through Sayra. You remain responsible for the content you
                  submit.
                </p>

                <p>
                  You should only submit content that you have the right to
                  provide and process through the service.
                </p>

                <p>
                  Do not submit passwords, private keys, API credentials,
                  financial credentials, or other information that you do not
                  want processed by an AI service or stored by the application.
                </p>
              </PolicySection>

              {/* 07 */}
              <PolicySection
                id="intellectual-property"
                number="07"
                title="Intellectual Property"
              >
                <p>
                  Sayra, including its software, interface, branding, design,
                  logos, visual elements, and other original materials, may be
                  protected by intellectual property laws.
                </p>

                <p>
                  Except where expressly permitted, you may not copy, modify,
                  distribute, reverse engineer, sell, or commercially exploit
                  protected parts of Sayra without appropriate authorization.
                </p>

                <p>
                  These terms do not transfer ownership of Sayra&apos;s
                  intellectual property to you.
                </p>
              </PolicySection>

              {/* 08 */}
              <PolicySection
                id="third-party"
                number="08"
                title="Third-Party Services"
              >
                <p>
                  Sayra may use third-party services to provide functionality
                  such as AI processing, authentication, hosting, cloud storage,
                  analytics, or other infrastructure.
                </p>

                <p>
                  Third-party services may have their own terms and privacy
                  policies. Your use of third-party functionality may therefore
                  also be subject to those providers terms.
                </p>

                <p>
                  Sayra is not responsible for independent third-party services
                  outside its direct control.
                </p>
              </PolicySection>

              {/* 09 */}
              <PolicySection
                id="availability"
                number="09"
                title="Service Availability"
              >
                <p>
                  We aim to keep Sayra available and reliable, but we do not
                  guarantee that the service will always be available,
                  uninterrupted, or error-free.
                </p>

                <p>
                  Service availability may be affected by maintenance, updates,
                  technical failures, network problems, third-party
                  dependencies, or circumstances outside our reasonable control.
                </p>
              </PolicySection>

              {/* 10 */}
              <PolicySection id="disclaimer" number="10" title="Disclaimer">
                <p>
                  Sayra is provided on an “as available” and “as is” basis to
                  the extent permitted by applicable law.
                </p>

                <p>
                  We do not guarantee that information generated by the AI will
                  always be accurate, complete, reliable, current, or suitable
                  for your particular purpose.
                </p>

                <p>
                  You are responsible for independently evaluating information
                  before relying on it.
                </p>
              </PolicySection>

              {/* 11 */}
              <PolicySection
                id="limitation"
                number="11"
                title="Limitation of Liability"
              >
                <p>
                  To the maximum extent permitted by applicable law, Sayra and
                  its operators will not be responsible for indirect,
                  incidental, special, consequential, or similar damages arising
                  from your use of or inability to use the service.
                </p>

                <p>
                  This section does not exclude or limit liability where such
                  limitation is prohibited by applicable law.
                </p>

                <Callout>
                  Nothing in these terms is intended to remove rights or
                  protections that cannot legally be excluded.
                </Callout>
              </PolicySection>

              {/* 12 */}
              <PolicySection id="termination" number="12" title="Termination">
                <p>You may stop using Sayra at any time.</p>

                <p>
                  We may suspend or terminate access to Sayra when reasonably
                  necessary, including where a user violates these terms,
                  creates security risks, abuses the service, or uses Sayra in
                  an unlawful manner.
                </p>

                <p>
                  Where appropriate and reasonably possible, we may provide
                  notice before taking significant action.
                </p>
              </PolicySection>

              {/* 13 */}
              <PolicySection
                id="changes"
                number="13"
                title="Changes to These Terms"
              >
                <p>
                  We may update these Terms of Service as Sayra evolves or as
                  legal, technical, or operational requirements change.
                </p>

                <p>
                  When changes are made, the updated terms will be published on
                  this page with a revised “Last updated” date.
                </p>

                <p>
                  Continued use of Sayra after applicable changes take effect
                  may constitute acceptance of the updated terms, to the extent
                  permitted by law.
                </p>
              </PolicySection>

              {/* 14 */}
              <div id="contact" className="scroll-mt-24 p-6 sm:p-8 lg:p-10">
                <SectionNumber number="14" />

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Contact
                </h2>

                <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  If you have questions about these Terms of Service or your use
                  of Sayra, please contact the Sayra team through the
                  appropriate contact channel provided by the application.
                </p>

                <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

                    <div>
                      <p className="font-medium">Use Sayra responsibly.</p>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        By using the service, you agree to follow these terms
                        and respect the security and rights of other users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/20 p-6 text-center sm:flex-row sm:text-left">
              <div>
                <p className="font-medium">Ready to use Sayra?</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Return to the application and start a conversation.
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

            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>

            <span className="text-border">•</span>

            <span>Terms</span>
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
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-primary" />

        <p className="text-sm leading-6 text-foreground/80">{children}</p>
      </div>
    </div>
  );
}
