import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#434343] flex flex-col items-center py-12">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to our company! We are a team of passionate individuals
          dedicated to providing the best service and products to our customers.
          Our mission is to deliver high-quality solutions that exceed your
          expectations.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Founded in [Year], we have grown from a small startup to a
          well-established organization with a diverse team of experts. Our
          values are rooted in integrity, innovation, and customer satisfaction.
          We believe in building long-lasting relationships with our clients and
          continuously improving our offerings.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our team consists of professionals from various backgrounds, each
          bringing unique skills and perspectives to the table. Together, we
          work tirelessly to achieve our goals and support our clients in
          reaching theirs.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for choosing us. We look forward to working with you and
          helping you succeed.
        </p>
      </div>
    </div>
  );
}
