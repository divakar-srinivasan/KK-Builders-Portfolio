import React from 'react';

function Location() {
  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 py-16 px-4 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden transform transition duration-500 hover:scale-[1.01]">
        <div className="px-8 py-12">
          <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4">
            📍 Our Location
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Come visit us at KK Builders – where quality meets trust.
          </p>

          <div className="w-full h-96 rounded-xl overflow-hidden shadow-md mb-10">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.252462933641!2d77.6082015!3d11.2734875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96ee92bbd9e3d%3A0x8e68a368b37b5e37!2sKK%20BUILDERS!5e0!3m2!1sen!2sin!4v1712724479793!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="text-center">
            <a
              href="https://maps.app.goo.gl/69KpE6KzEGwzihPg6?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              🔎 Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
