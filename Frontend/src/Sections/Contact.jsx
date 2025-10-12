import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#FFF8E7] min-h-screen py-16 px-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Get in Touch
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Contact Form */}
        <form className="flex-1 bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <p className="mb-4">
              <span className="font-semibold">Email:</span> support@ammasachar.com
            </p>
            <p className="mb-4">
              <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
            <p className="mb-4">
              <span className="font-semibold">Address:</span> 123, Spice Street, Mumbai, India
            </p>
            <p className="text-gray-600 mt-6">
              We'd love to hear from you! Whether it's a question, feedback, or just to say hi,
              feel free to reach out.
            </p>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="Amma's Achar Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30282.123456!2d72.801239!3d19.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c123456789ab%3A0xc1234567890abcdef!2sSpice%20Street%2C%20Mumbai%2C%20India!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
