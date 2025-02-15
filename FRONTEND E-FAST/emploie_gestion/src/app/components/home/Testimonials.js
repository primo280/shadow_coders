import { Facebook, Instagram, Linkedin } from "lucide-react";

const testimonials = [
  { 
    name: "Alice", 
    text: "Amazing service! My website is now top-notch.", 
    image: "/images/alice.jpg", 
    social: { facebook: "#", instagram: "#", linkedin: "#" } 
  },
  { 
    name: "Bob", 
    text: "SEO optimization really helped my business grow!", 
    image: "/images/bob.jpg", 
    social: { facebook: "#", instagram: "#", linkedin: "#" } 
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Avatar */}
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-20 h-20 rounded-full mb-4"
              />
              
              {/* Testimonial Text */}
              <p className="italic">"{testimonial.text}"</p>
              <p className="mt-2 font-semibold text-blue-700">- {testimonial.name}</p>

              {/* Social Icons */}
              <div className="flex space-x-3 mt-4">
                <a href={testimonial.social.facebook} target="_blank">
                  <Facebook className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                </a>
                <a href={testimonial.social.instagram} target="_blank">
                  <Instagram className="w-5 h-5 text-pink-500 hover:text-pink-700" />
                </a>
                <a href={testimonial.social.linkedin} target="_blank">
                  <Linkedin className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
