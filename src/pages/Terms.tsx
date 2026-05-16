import Layout from "@/components/layout/Layout";

const Terms = () => (
  <Layout>
    <section className="section-padding pt-28 md:pt-36">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last Updated: November 8, 2025</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              Welcome to LLMClicks.AI ("we," "our," or "us"). By accessing or using our website and
              services, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Service Description</h2>
            <p>LLMClicks.AI provides AI-powered SEO analysis tools including:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Google Analytics and Search Console data analysis</li>
              <li>Keyword research and content gap analysis</li>
              <li>Automated SEO audits and recommendations</li>
              <li>Content improvement suggestions using AI</li>
              <li>Free SEO audit tools</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">3. Account Registration</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 18 years old to use our services</li>
              <li>One account per user or organization</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">4. Lifetime Deal (LTD) Terms</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Lifetime access to the plan tier purchased</li>
              <li>All future updates included in your tier</li>
              <li>No recurring fees for LTD purchases</li>
              <li>Features may be added or modified; tier access remains</li>
              <li>Non-transferable license</li>
              <li>Company reserves the right to discontinue service with 90 days notice and prorated refund</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">5. Subscription Terms</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Monthly subscriptions renew automatically</li>
              <li>Cancel anytime; access continues until period end</li>
              <li>Price changes with 30 days notice</li>
              <li>No refunds for partial months</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">6. Payment and Billing</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>All payments processed securely via Stripe</li>
              <li>Prices displayed in USD</li>
              <li>Applicable taxes added at checkout</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">7. Acceptable Use</h2>
            <p>You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Violate any laws or regulations</li>
              <li>Abuse, scrape, or overload our systems</li>
              <li>Share login credentials</li>
              <li>Reverse engineer our software</li>
              <li>Use our service for spam or malicious purposes</li>
              <li>Submit false or misleading information</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">8. Data and Privacy</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>We collect data as described in our Privacy Policy</li>
              <li>You retain ownership of your website data</li>
              <li>We use data to provide AI-powered insights</li>
              <li>We may aggregate anonymous data for service improvement</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">9. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>All content, features, and functionality are owned by LLMClicks.AI</li>
              <li>You retain rights to your submitted content</li>
              <li>We may use your data to generate insights specific to your account</li>
              <li>AI-generated reports are licensed to you for your use</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">10. Third-Party Services</h2>
            <p>We integrate with:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Google Analytics and Search Console (you authorize access)</li>
              <li>Payment processing (Stripe)</li>
              <li>AI platforms for analysis</li>
              <li>Email services</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">11. Service Availability</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>We strive for 99.9% uptime but don't guarantee uninterrupted service</li>
              <li>Scheduled maintenance will be announced when possible</li>
              <li>We are not liable for service interruptions</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">12. Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>LTD purchases: 30-day money-back guarantee</li>
              <li>Monthly subscriptions: No refunds for current billing period</li>
              <li>
                Refund requests:{" "}
                <a href="mailto:contact@llmclicks.ai" className="text-accent underline">
                  contact@llmclicks.ai
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">13. Limitation of Liability</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Services provided "as is" without warranties</li>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>Maximum liability limited to amount paid in last 12 months</li>
              <li>We are not responsible for accuracy of AI-generated insights</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">14. Termination</h2>
            <p>We may suspend or terminate accounts for:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Violation of these terms</li>
              <li>Non-payment</li>
              <li>Abusive behavior</li>
              <li>Fraudulent activity</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">15. Changes to Terms</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>We may modify these terms with 30 days notice</li>
              <li>Continued use constitutes acceptance</li>
              <li>Material changes will be highlighted</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">16. Governing Law</h2>
            <p>
              These terms are governed by the laws of Aurangabad, Maharashtra, India. Disputes will
              be resolved through binding arbitration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">17. Contact</h2>
            <p>
              Questions? Email{" "}
              <a href="mailto:contact@llmclicks.ai" className="text-accent underline">
                contact@llmclicks.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  </Layout>
);

export default Terms;
