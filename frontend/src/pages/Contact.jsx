import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${form.name}. We’ll get back to you shortly!`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-12 px-4 sm:px-10 md:px-20 lg:px-32">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h2>
        {/* <p className="text-gray-600 text-lg">We’d love to hear from you</p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-2xl shadow-md">
        {/* Contact Info */}
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-1">Store Address</h3>
            <p>TopFitness Pvt. Ltd.<br />Bhaktapur, Nepal</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Email</h3>
            <p>JasonSaudeep@fitness.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Phone</h3>
            <p>+977-9861041302</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
