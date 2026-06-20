import React from "react";
import { Helmet } from "react-helmet-async";
import HeaderSection from "@main/components/common/HeaderSection";

export default function NefzawaPrivacy() {
  return (
    <div className="bg-white min-h-screen pb-24">
      <Helmet>
        <title>Privacy Policy - Nefzawa</title>
      </Helmet>

      <HeaderSection
        title="Privacy Policy"
        subtitle="Nefzawa — News, Radio & Weather"
      />

      <div
        className="container mx-auto px-6 max-w-4xl mt-16 font-latin text-slate-700 leading-relaxed text-left"
        dir="ltr"
      >
        <p className="text-sm text-slate-400 mb-8 italic">
          Last updated: March 2026
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Introduction
          </h2>
          <p>
            Nefzawa ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we handle information when
            you use our mobile application and website (collectively, the
            "Service").
          </p>
          <p className="mt-4">
            By using the Service, you agree to the practices described in this
            policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Information We Collect
          </h2>
          <p>
            We do not collect, store, or process any personal information about
            you. You are not required to create an account, provide your name,
            email address, or any other personal details to use the Service.
          </p>
          <p className="mt-4">
            The Service connects to the internet solely to deliver content —
            news articles, weather data, and live radio — directly to your
            device. No information about you or your device is sent to us in
            this process.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Permissions
          </h2>
          <p>The mobile application requests the following permissions:</p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>
              <strong>Internet access:</strong> Required to load news articles,
              weather information, and stream live radio.
            </li>
            <li>
              <strong>Network state access:</strong> Used to check whether your
              device is connected before attempting to load content.
            </li>
          </ul>
          <p className="mt-4">
            We do not request access to your location, camera, microphone,
            contacts, storage, or any other sensitive device feature.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Third-Party Services
          </h2>
          <p>
            The Service retrieves content from external sources. These providers
            operate independently and have their own privacy policies:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>
              <strong>nefzawa.net</strong> — source of all news and editorial
              content
            </li>
            <li>
              <strong>Open-Meteo (open-meteo.com)</strong> — weather data for
              the Kebili region (no account or location sharing required)
            </li>
            <li>
              <strong>Zeno.FM (zeno.fm)</strong> — live radio streaming
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Data Sharing
          </h2>
          <p>
            Because we do not collect any personal data, there is nothing to
            share with third parties. We do not sell, trade, or transfer any
            user information to outside parties. The Service contains no
            advertising and no analytics tracking.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Data Security
          </h2>
          <p>
            All connections made by the Service use encrypted HTTPS
            communication. No personal data is stored locally on your device by
            our application beyond standard temporary caching handled by your
            operating system.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Children's Privacy
          </h2>
          <p>
            The Service is not directed specifically at children under the age
            of 13. Since we do not collect any personal information, no data is
            gathered from users of any age.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated "Last updated" date at
            the top. We encourage you to review this page periodically.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us:
          </p>
          <div className="mt-4 space-y-1">
            <p>
              <strong>Email:</strong> web@nefzawa.net
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href="https://www.nefzawa.net"
                className="text-[#E00A0A] hover:underline"
              >
                https://www.nefzawa.net
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
