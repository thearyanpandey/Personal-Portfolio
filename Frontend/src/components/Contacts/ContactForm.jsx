import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const ContactForm = () => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "bb321710-3ead-4ec5-98c1-f309cea45133");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      //console.log("Success", res);
    }
  };

  return (
    <div className="bg-custom-gradient shadow-lg text-white p-8 rounded-3xl max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Let's work <span className="text-blue-500">together.</span>
      </h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            required
            className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500"
            //onChange={handleChange}
          />
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500"
            //onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="subject"
            placeholder="Your Subject *"
            required
            className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500"
            //onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Your Message *"
            required
            rows="4"
            className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500"
            //onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;