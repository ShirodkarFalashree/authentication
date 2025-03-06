import React from "react";
import otp from "../assets/otp.png";
import voice from "../assets/voice.jpg";
import keystroke from "../assets/keystroke.jpg";
import captcha from "../assets/captcha.png";
import pattern from "../assets/pattern.png";
import gesture from "../assets/gesture.webp";
import Navbar from "../component/Navbar";

const AboutUs = () => {
  const features = [
    {
      title: "OTP Authentication",
      desc: "Secure your login with a unique, time-sensitive OTP—one code, one time, ultimate protection!",
      img: otp,
    },
    {
      title: "Voice Authentication",
      desc: "Unlock security with your voice—unique, effortless, and foolproof!",
      img: voice,
    },
    {
      title: "Keystroke Authentication",
      desc: "Secure authentication with your unique typing rhythm—fast, invisible, and hacker-proof!",
      img: keystroke,
    },
    {
      title: "Captcha Verification",
      desc: "Prove you're human by solving a challenge—simple, effective, and bot-proof!",
      img: captcha,
    },
    {
      title: "Pattern-Based Verification",
      desc: "Authenticate with a unique pattern—easy to remember, hard to crack!",
      img: pattern,
    },
    {
      title: "Gesture-Based Verification",
      desc: "Verify your identity using hand gestures—intuitive, secure, and futuristic!",
      img: gesture,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-16 py-12">
    <Navbar/>
      {/* Header Section */}
      <header className="text-center mt-20">
        <h1 className="text-4xl font-bold">Welcome to SecureOTP</h1>
        <p className="text-lg text-gray-300 mt-2">
          Explore our website to learn more about what we offer.
        </p>
      </header>

      {/* Mission Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-center">Our Mission</h2>
        <p className="text-gray-400 text-lg text-center max-w-3xl mx-auto mt-4">
        Our mission is to protect your website with advanced security solutions, keeping it safe from cyber threats like data breaches and hacking. Using the latest technology and constantly updating our methods, we ensure a secure online environment where businesses and users can operate confidently without fear of attacks.
        </p>
      </section>

      {/* Features Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group cursor-pointer w-full h-64 md:h-80 rounded-lg overflow-hidden"
            >
              {/* Image (Full Card) */}
              <img
                src={feature.img}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              
              {/* Text Content (Hidden Initially, Appears on Hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 text-center">
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold">Our Commitment</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-4">
        At SecureOTP, we are committed to securing your website with advanced protection, ensuring it stays resilient against all cyber threats and providing a safe environment for your users.
        </p>
      </section>

      {/* Vision Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold">Our Vision</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-4">
        We envision a future where website owners effortlessly secure their sites with advanced tools, powered by AI and seamless integrations for real-time protection.
        </p>
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold">Ready to fortify your website against hackers?</h2>
        <p className="text-gray-400 text-lg mt-2">
        Start using our security platform today and protect your site with advanced defenses.
        Sign up now and experience the difference!
        </p>
        <a
          href="/register"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
