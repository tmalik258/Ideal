"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { storefrontCard, storefrontInput, storefrontOutlineBtn, storefrontPage, storefrontPrimaryBtn, storefrontTitle, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ErrorComponent } from "@/components/ui/error-component";
import { ContactPageSkeleton } from "./_components/contact-page-skeleton";
import { SITE_EMAIL_HELLO } from "@/lib/site-metadata";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ShoppingBag,
  Truck,
  CreditCard,
  User,
  Globe
} from "lucide-react";

// Contact information
const contactInfo = {
  address: {
    street: "42 Mall Road, Gulberg III",
    city: "Lahore",
    state: "Punjab",
    zip: "54000",
    country: "Pakistan",
  },
  phone: "+92 300 847 2653",
  email: SITE_EMAIL_HELLO,
  hours: {
    weekdays: "Monday - Friday: 10:00 AM - 7:00 PM PKT",
    weekends: "Saturday - Sunday: 11:00 AM - 5:00 PM PKT",
  },
};

// FAQ data
const faqData = [
  {
    category: "Orders",
    icon: ShoppingBag,
    questions: [
      {
        question: "How can I track my order?",
        answer: "Sign in and visit My Account or the Orders page to view order status and tracking details."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. Please contact us immediately if you need to make changes."
      }
    ]
  },
  {
    category: "Shipping",
    icon: Truck,
    questions: [
      {
        question: "What are your shipping options?",
        answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight shipping."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by destination."
      }
    ]
  },
  {
    category: "Payments",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard SSL encryption and are PCI DSS compliant to protect your payment information."
      }
    ]
  },
  {
    category: "Account",
    icon: User,
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click on the 'Sign Up' button in the top right corner and fill out the registration form with your details."
      },
      {
        question: "I forgot my password. What should I do?",
        answer: "Click on 'Forgot Password' on the login page and we'll send you a reset link to your email address."
      }
    ]
  }
];

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "general",
    message: "",
    orderNumber: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initial loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user makes selection
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
        errors.phone = "Please enter a valid phone number";
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    // Category validation
    if (!formData.category) {
      errors.category = "Please select a category";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!validateForm()) {
        toast.error("Please fix the errors in the form");
        return;
      }

      setIsSubmitting(true);
      setError(null);
      
      // Prepare contact data
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        category: formData.category,
        message: formData.message.trim(),
        orderNumber: formData.orderNumber.trim(),
        timestamp: new Date().toISOString()
      };
      
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random API failure for testing
          if (Math.random() > 0.8) {
            reject(new Error("Failed to send message. Please try again."));
          } else {
            resolve(contactData);
          }
        }, 2000);
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          category: "general",
          message: "",
          orderNumber: ""
        });
        setFormErrors({});
      }, 3000);
      
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const toggleFaq = (questionId: string) => {
    setExpandedFaq(expandedFaq === questionId ? null : questionId);
  };

  // Loading state
  if (isLoading) {
    return <ContactPageSkeleton />;
  }

  // Error state
  if (error && !isSubmitting) {
    return (
      <ErrorComponent 
        message={error}
        onRefresh={handleRetry}
      />
    );
  }

  return (
    <div className={storefrontPage}>
      <div className={cn(storefrontContainer, "py-8")}>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className={cn(storefrontTitle, "mb-4")}>Contact Us</h1>
        <p className="mx-auto max-w-2xl text-xl text-foreground/55">
          We&apos;re here to help! Get in touch with our customer support team for any questions or concerns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card className={storefrontCard}>
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <MessageCircle className="mr-2 h-5 w-5 text-brand-forest" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Visit Our Store</h4>
                  <p className="text-sm text-foreground/55">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}<br />
                    {contactInfo.address.country}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Call Us</h4>
                  <p className="text-sm text-foreground/55">{contactInfo.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Email Us</h4>
                  <p className="text-sm text-foreground/55">{contactInfo.email}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Business Hours</h4>
                  <p className="text-sm text-foreground/55">
                    {contactInfo.hours.weekdays}<br />
                    {contactInfo.hours.weekends}
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="rounded-none border border-brand-forest/15 bg-brand-champagne/20 p-4">
                <div className="mb-2 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-brand-forest" />
                  <span className="font-semibold text-brand-forest">Response Time</span>
                </div>
                <p className="text-sm text-foreground/55">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className={storefrontCard}>
            <CardHeader>
              <CardTitle className="text-foreground">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-foreground/55">
                    Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground/70"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className={cn(
                          storefrontInput,
                          "h-11",
                          formErrors.name &&
                            "border-red-500 focus-visible:ring-red-500/20"
                        )}
                      />
                      {formErrors.name ? (
                        <p className="text-sm text-red-500">{formErrors.name}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground/70"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email address"
                        className={cn(
                          storefrontInput,
                          "h-11",
                          formErrors.email &&
                            "border-red-500 focus-visible:ring-red-500/20"
                        )}
                      />
                      {formErrors.email ? (
                        <p className="text-sm text-red-500">{formErrors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-foreground/70"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className={cn(
                          storefrontInput,
                          "h-11",
                          formErrors.phone &&
                            "border-red-500 focus-visible:ring-red-500/20"
                        )}
                      />
                      {formErrors.phone ? (
                        <p className="text-sm text-red-500">{formErrors.phone}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="category"
                        className="text-sm font-medium text-foreground/70"
                      >
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "h-11 w-full cursor-pointer",
                            storefrontInput,
                            formErrors.category &&
                              "border-red-500 focus-visible:ring-red-500/20"
                          )}
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="shipping">
                            Shipping Question
                          </SelectItem>
                          <SelectItem value="returns">
                            Returns &amp; Exchanges
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feedback">
                            Feedback &amp; Suggestions
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.category ? (
                        <p className="text-sm text-red-500">
                          {formErrors.category}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {formData.category === "order" ||
                  formData.category === "shipping" ||
                  formData.category === "returns" ? (
                    <div className="space-y-2">
                      <Label
                        htmlFor="orderNumber"
                        className="text-sm font-medium text-foreground/70"
                      >
                        Order Number
                      </Label>
                      <Input
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your order number (optional)"
                        className={cn(storefrontInput, "h-11")}
                      />
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground/70"
                    >
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief description of your inquiry"
                      className={cn(
                        storefrontInput,
                        "h-11",
                        formErrors.subject &&
                          "border-red-500 focus-visible:ring-red-500/20"
                      )}
                    />
                    {formErrors.subject ? (
                      <p className="text-sm text-red-500">{formErrors.subject}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground/70"
                    >
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Please provide details about your inquiry..."
                      className={cn(
                        storefrontInput,
                        "min-h-32",
                        formErrors.message &&
                          "border-red-500 focus-visible:ring-red-500/20"
                      )}
                    />
                    {formErrors.message ? (
                      <p className="text-sm text-red-500">{formErrors.message}</p>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    className={cn(storefrontPrimaryBtn, "w-full cursor-pointer")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif mb-4">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-foreground/55">
            Find quick answers to common questions. Can&apos;t find what you&apos;re looking for? Contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqData.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.category} className={storefrontCard}>
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <IconComponent className="mr-2 h-5 w-5 text-brand-forest" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const questionId = `${category.category}-${index}`;
                      const isExpanded = expandedFaq === questionId;
                      
                      return (
                        <div
                          key={questionId}
                          className="border-b border-brand-forest/15 pb-4 last:border-b-0 last:pb-0"
                        >
                          <button
                            onClick={() => toggleFaq(questionId)}
                            className="flex w-full cursor-pointer items-center justify-between text-left"
                          >
                            <span className="text-sm font-medium text-foreground">{faq.question}</span>
                            <HelpCircle
                              className={cn(
                                "h-4 w-4 text-brand-forest/40 transition-transform",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </button>
                          {isExpanded && (
                            <div className="mt-2 text-sm text-foreground/55">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Support Options */}
      <div className="rounded-none border border-brand-forest/15 bg-brand-champagne/20 p-8">
        <div className="mb-6 text-center">
          <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">Need More Help?</h3>
          <p className="text-foreground/55">Explore these additional support options</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className={cn(storefrontCard, "text-center")}>
            <CardContent className="pt-6">
              <Globe className="mx-auto mb-4 h-12 w-12 text-brand-forest" />
              <h4 className="mb-2 font-semibold text-foreground">Help Center</h4>
              <p className="mb-4 text-sm text-foreground/55">
                Browse our comprehensive help articles and guides
              </p>
              <Button asChild variant="outline" size="sm" className={cn(storefrontOutlineBtn, "cursor-pointer")}>
                <Link href="/faq">Visit Help Center</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className={cn(storefrontCard, "text-center")}>
            <CardContent className="pt-6">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-brand-forest" />
              <h4 className="mb-2 font-semibold text-foreground">Email Support</h4>
              <p className="mb-4 text-sm text-foreground/55">
                Reach our support team by email during business hours
              </p>
              <Button asChild variant="outline" size="sm" className={cn(storefrontOutlineBtn, "cursor-pointer")}>
                <Link href={`mailto:${SITE_EMAIL_HELLO}`}>Email Support</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className={cn(storefrontCard, "text-center")}>
            <CardContent className="pt-6">
              <Truck className="mx-auto mb-4 h-12 w-12 text-brand-forest" />
              <h4 className="mb-2 font-semibold text-foreground">Order Status</h4>
              <p className="mb-4 text-sm text-foreground/55">
                Track your orders and delivery status
              </p>
              <Button asChild variant="outline" size="sm" className={cn(storefrontOutlineBtn, "cursor-pointer")}>
                <Link href="/orders">Track Order</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}