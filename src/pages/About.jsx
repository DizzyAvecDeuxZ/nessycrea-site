import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <main className="pt-32 pb-0">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 bg-cream-200 rounded-full text-sm font-medium text-caramel-dark mb-6">
              Notre Histoire
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal mb-6">
              Passion, artisanat et{' '}
              <span className="text-gradient">créativité</span>
            </h1>
            <p className="text-xl text-charcoal/70 leading-relaxed">
              Depuis 2020, NessyCrea crée des bougies artisanales uniques qui
              transforment votre intérieur en un sanctuaire de bien-être et de
              chaleur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl font-bold text-charcoal mb-6">
                Comment tout a commencé
              </h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed">
                <p>
                  NessyCrea est née d'une passion profonde pour l'artisanat et
                  le désir de créer des moments de sérénité dans notre quotidien
                  souvent agité.
                </p>
                <p>
                  Chaque bougie est conçue avec soin, en utilisant uniquement
                  des ingrédients naturels de première qualité : cire végétale,
                  mèches en coton bio, et parfums soigneusement sélectionnés
                  pour créer des ambiances uniques.
                </p>
                <p>
                  Notre atelier parisien est un lieu où tradition et innovation
                  se rencontrent, où chaque création raconte une histoire et
                  apporte une touche de magie à votre intérieur.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-cream-200 to-cream-300 rounded-3xl overflow-hidden relative shadow-xl">
                {/* Image de bougie en fond */}
                <img
                  src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/5ff06277-c960-49ff-88c3-80023c260e0d.png"
                  alt="Bougie NessyCrea"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-warm/30 to-caramel/20" />

                {/* Badge en haut centré */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center z-10">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-amber-warm/40">
                    <Heart className="w-8 h-8 text-amber-warm" />
                  </div>
                  <p className="font-display text-xl font-bold text-charcoal drop-shadow-sm">
                    Fait avec amour
                  </p>
                  <p className="text-charcoal/70 text-sm mt-1 font-medium">
                    Artisanat français
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-warm/30 to-caramel/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-charcoal mb-4">
              Nos Engagements
            </h2>
            <p className="text-charcoal/60 text-lg">
              Ce qui guide notre travail au quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Éco-responsable',
                description:
                  'Nous utilisons uniquement des matières premières naturelles et durables, minimisant notre impact environnemental.',
              },
              {
                icon: Heart,
                title: 'Fait main',
                description:
                  'Chaque bougie est coulée à la main dans notre atelier, garantissant qualité et unicité.',
              },
              {
                icon: Award,
                title: 'Qualité premium',
                description:
                  'Nous sélectionnons rigoureusement nos ingrédients pour offrir des produits d\'exception.',
              },
              {
                icon: Users,
                title: 'Satisfaction client',
                description:
                  'Votre bonheur est notre priorité. Nous sommes à votre écoute pour créer la bougie parfaite.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-cosy flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-warm/20 to-caramel/10 rounded-2xl flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-amber-warm" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-16 pb-0 bg-charcoal text-cream-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-warm/10 to-transparent rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold mb-6">
              Prêt à illuminer votre intérieur ?
            </h2>
            <p className="text-cream-100/60 text-lg mb-8">
              Découvrez notre collection et trouvez la bougie parfaite pour
              votre espace.
            </p>
            <a
              href="/boutique"
              className="btn-primary inline-flex items-center"
            >
              Voir la boutique
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
