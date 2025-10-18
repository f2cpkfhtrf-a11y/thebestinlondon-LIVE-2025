import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | The Best in London | Get in Touch</title>
        <meta name="description" content="Get in touch with The Best in London team. We'd love to hear from you about restaurant recommendations, partnerships, or feedback." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | The Best in London" />
        <meta property="og:description" content="Get in touch with The Best in London team. We'd love to hear from you." />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/logo.svg" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/contact" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | The Best in London" />
        <meta name="twitter:description" content="Get in touch with The Best in London team. We'd love to hear from you." />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black">
        <TabContainer currentPath="/contact" pageType="contact">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal opacity-90"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gradient mb-6">
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-grey font-sans font-medium mb-4">
              Get in Touch
            </p>
            <p className="text-lg text-grey-light max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you! Whether you have a restaurant recommendation, 
              partnership inquiry, or feedback, we're here to help.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                  Send us a Message
                </h2>
                <p className="text-lg text-grey-light mb-8 leading-relaxed">
                  Have a question, suggestion, or want to recommend a restaurant? 
                  We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
                </p>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-grey mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-white border border-grey-light rounded-lg text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-grey mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-white border border-grey-light rounded-lg text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-grey mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-white border border-grey-light rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="restaurant-recommendation">Restaurant Recommendation</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="technical-issue">Technical Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-grey mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-grey-light rounded-lg text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary text-lg px-8 py-4"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                  Other Ways to Reach Us
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-white mb-2">
                        Email
                      </h3>
                      <p className="text-grey-light mb-2">
                        For general inquiries and restaurant recommendations
                      </p>
                      <a href="mailto:hello@thebestinlondon.co.uk" className="text-gold hover:text-gold-light transition-colors duration-300">
                        hello@thebestinlondon.co.uk
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🤝</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-white mb-2">
                        Partnerships
                      </h3>
                      <p className="text-grey-light mb-2">
                        For restaurant partnerships and collaborations
                      </p>
                      <a href="mailto:partnerships@thebestinlondon.co.uk" className="text-gold hover:text-gold-light transition-colors duration-300">
                        partnerships@thebestinlondon.co.uk
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🐛</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-white mb-2">
                        Technical Support
                      </h3>
                      <p className="text-grey-light mb-2">
                        For technical issues and bug reports
                      </p>
                      <a href="mailto:support@thebestinlondon.co.uk" className="text-gold hover:text-gold-light transition-colors duration-300">
                        support@thebestinlondon.co.uk
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-charcoal-light rounded-lg">
                  <h3 className="text-xl font-serif font-semibold text-white mb-4">
                    Response Time
                  </h3>
                  <p className="text-grey-light leading-relaxed">
                    We typically respond to all inquiries within 24-48 hours. 
                    For urgent matters, please mark your email as "Urgent" in the subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-charcoal-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-grey max-w-2xl mx-auto">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold text-white mb-3">
                  How do you select restaurants for your guide?
                </h3>
                <p className="text-grey-light leading-relaxed">
                  We carefully curate our restaurant database based on quality, authenticity, 
                  customer reviews, FSA ratings, and our own verification process. Every restaurant 
                  must meet our high standards to be included.
                </p>
              </div>
              
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold text-white mb-3">
                  Can I recommend a restaurant?
                </h3>
                <p className="text-grey-light leading-relaxed">
                  Absolutely! We love hearing about great restaurants from our community. 
                  Use the contact form above or email us directly with your recommendation 
                  and we'll review it for inclusion in our guide.
                </p>
              </div>
              
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold text-white mb-3">
                  How often is the information updated?
                </h3>
                <p className="text-grey-light leading-relaxed">
                  We update our restaurant information weekly to ensure accuracy. 
                  This includes ratings, reviews, opening hours, and contact details. 
                  Our automated system also monitors for changes and updates.
                </p>
              </div>
              
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold text-white mb-3">
                  Do you have partnerships with restaurants?
                </h3>
                <p className="text-grey-light leading-relaxed">
                  We work with restaurants to ensure accurate information and sometimes 
                  feature special offers. However, our recommendations are always 
                  based on quality and authenticity, never on commercial partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>
        </TabContainer>
      </main>

      <Footer />
    </>
  );
}
