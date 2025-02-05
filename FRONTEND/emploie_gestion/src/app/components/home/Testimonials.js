const testimonials = [
  { name: "Alice", text: "Amazing service! My website is now top-notch." },
  { name: "Bob", text: "SEO optimization really helped my business grow!" },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
              <p className="italic">"{testimonial.text}"</p>
              <p className="mt-2 font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
