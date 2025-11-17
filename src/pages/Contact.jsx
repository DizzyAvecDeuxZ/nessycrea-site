import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import FAQ from '../components/UI/FAQ';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal mb-4">
            Contactez <span className="text-gradient">Nous</span>
          </h1>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Une question, une demande spéciale ? Nous sommes là pour vous aider.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card-cosy">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-warm/20 to-caramel/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-warm" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">
                  Adresse
                </h3>
              </div>
              <p className="text-charcoal/60">
                Atelier NessyCrea
                <br />
                Paris, France
              </p>
            </div>

            <div className="card-cosy">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-warm/20 to-caramel/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-warm" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">
                  Email
                </h3>
              </div>
              <p className="text-charcoal/60">contact@nessycrea.fr</p>
            </div>

            <div className="card-cosy">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-warm/20 to-caramel/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-warm" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">
                  Téléphone
                </h3>
              </div>
              <p className="text-charcoal/60">+33 1 23 45 67 89</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card-cosy">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-charcoal mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-charcoal/60">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-cosy"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-cosy"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-cosy"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-cosy resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <FAQ />
        </div>
      </div>
    </main>
  );
}
