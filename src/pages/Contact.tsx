import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeInput = (value: string): string =>
  value.replace(/[<>"'&]/g, "");

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedFirst) newErrors.firstName = "First name is required";
    else if (trimmedFirst.length > MAX_NAME_LENGTH) newErrors.firstName = `Max ${MAX_NAME_LENGTH} characters`;

    if (!trimmedLast) newErrors.lastName = "Last name is required";
    else if (trimmedLast.length > MAX_NAME_LENGTH) newErrors.lastName = `Max ${MAX_NAME_LENGTH} characters`;

    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(trimmedEmail)) newErrors.email = "Please enter a valid email";

    if (!trimmedMessage) newErrors.message = "Message is required";
    else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) newErrors.message = `Max ${MAX_MESSAGE_LENGTH} characters`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setErrors({});
      navigate("/thank-you");
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <Layout>
    <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none" />
      <div className="absolute top-20 left-10 w-3 h-3 rounded-full bg-accent/30 animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-2 h-2 rounded-full bg-accent/20 animate-float pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <PageHero
            eyebrow="CONTACT"
            defaultTitle="Let's talk"
            defaultSubtitle="Have questions? We'd love to hear from you."
            className="mb-0 [&>h1]:mx-auto [&>h1]:text-center [&>p]:mx-auto [&>p]:text-center [&>div.tag-pill]:mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <motion.form className="md:col-span-3 rounded-2xl border border-border bg-card p-7 space-y-5 shimmer-card gradient-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-first-name" className="text-sm font-medium mb-1.5 block">First Name</label>
                <Input id="contact-first-name" data-testid="input-first-name" placeholder="John" className="rounded-xl" value={firstName} onChange={(e) => setFirstName(sanitizeInput(e.target.value))} maxLength={MAX_NAME_LENGTH} autoComplete="given-name" />
                {errors.firstName && <p className="text-xs text-destructive mt-1" data-testid="error-first-name">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="contact-last-name" className="text-sm font-medium mb-1.5 block">Last Name</label>
                <Input id="contact-last-name" data-testid="input-last-name" placeholder="Doe" className="rounded-xl" value={lastName} onChange={(e) => setLastName(sanitizeInput(e.target.value))} maxLength={MAX_NAME_LENGTH} autoComplete="family-name" />
                {errors.lastName && <p className="text-xs text-destructive mt-1" data-testid="error-last-name">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm font-medium mb-1.5 block">Email</label>
              <Input id="contact-email" data-testid="input-email" type="email" placeholder="john@example.com" className="rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              {errors.email && <p className="text-xs text-destructive mt-1" data-testid="error-email">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact-message" className="text-sm font-medium mb-1.5 block">Message</label>
              <Textarea id="contact-message" data-testid="input-message" placeholder="Tell us about your needs..." className="rounded-xl min-h-[120px]" value={message} onChange={(e) => setMessage(sanitizeInput(e.target.value))} maxLength={MAX_MESSAGE_LENGTH} />
              <p className="text-xs text-muted-foreground mt-1 text-right">{message.length}/{MAX_MESSAGE_LENGTH}</p>
              {errors.message && <p className="text-xs text-destructive mt-1" data-testid="error-message">{errors.message}</p>}
            </div>
            <Button data-testid="button-submit" className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 glow-hover" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Sending...</span>
              ) : (
                <><Send className="mr-2 h-4 w-4" /> Send Message</>
              )}
            </Button>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 space-y-4">
            {[
              { icon: Mail, title: "Email Us", text: "support@llmclicks.ai" },
              { icon: Phone, title: "Phone", text: "+91 9822298988" },
              { icon: MapPin, title: "Address", text: "Pune, Maharashtra, India" },
            ].map((item, i) => (
              <motion.div key={item.title} className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4 shimmer-card" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm mb-0.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default Contact;
