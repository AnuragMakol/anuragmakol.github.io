import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import Swiper from "swiper";
import 'swiper/css';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { contactForm } from "../api";
import { WebsiteLayout } from '../components/layouts';

export function Homepage(props) {
  const [showAlert, setAlert] = useState(false);

  useEffect(() => {
    const swiper = new Swiper(".case-study-slider", {
      slidesPerView: "auto",
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 4000
      }
    });
  }, []);

  const { register: registerContactForm, handleSubmit: handleSubmitContactForm, reset: resetContactForm } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        message: yup.string().required()
      })
    )
  });

  const onSubmitContactForm = (form) => {
    initContactForm(form);
  }

  const { mutate: initContactForm } = useMutation(contactForm, {
    onSuccess: (result) => {
      setAlert(true);
      resetContactForm();

      setTimeout(() => {
        setAlert(false)
      }, 6000);
    }
  });

  return (
    <WebsiteLayout props={props}>
      <section id='home' className="bg-black h-full pt-28 relative overflow-hidden">
        <div className="absolute left-0 max-w-full w-full top-0 z-10">
          <img src={`${import.meta.env.VITE_APP_URL}/assets/images/hero-bg.webp`} alt="app vertix"
            className="w-full max-w-full" style={{ height: "1100px" }} />
        </div>
        <div className="container z-40 w-full max-[768px]:h-[520px] pt-[20px] md:pt-[200px] md:pb-[220px] relative">
          <div className="absolute max-w-[528px] max-h-[528px] right-0 top-30">
            <img src={`${import.meta.env.VITE_APP_URL}/assets/images/globe.svg`} alt="app vertix"
              className="w-full max-w-full" />
          </div>
          <div className="w-full mb-10 md:mb-20 relative">
            <div className="section-head max-w-[750px]">
              <h1 className="text-5xl md:text-6xl leading-18 font-bold mb-6">
                Empowering your <br /> digital journey
              </h1>
              <p className="text-xl md:text-2xl text-gray-100">
                We fuel business growth by designing innovative, agile
                digital solutions that solve complex challenges and
                drive success in today's rapidly evolving digital
                landscape.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-between relative">
            <div>
              <a href={`mailto:${import.meta.env.VITE_INFO_EMAIL}`} className="flex text-left cursor-pointer group">
                <div className="relative z-10 w-12 h-10 flex flex-col gap-1 top_lines_animation top-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="text-white text-lg flex ml-4 font-medium group-hover:text-gray-100">Consult our
                  Experts</span>
                <span
                  className="w-10 h-10 flex justify-center items-center bg-primary rounded-full transfrom transition-all group-hover:rotate-45 text-white ml-3 relative -top-1">
                  <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                    viewBox="0 0 25 25" fill="none">
                    <path
                      d="M16.8569 9.67962L8.24994 18.2866L6.83594 16.8726L15.4419 8.26562H7.85694V6.26562H18.8569V17.2656H16.8569V9.67962Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-16 md:py-28">
        <div className="container">
          <div className="flex">
            <div className="min-w-[260px] max-w-[260px] mr-15 xl:mr-30 relative hidden lg:flex">
              <div className="absolute -left-full top-10 z-0">
                <img src={`${import.meta.env.VITE_APP_URL}/assets/images/lines-shape.png`} alt="app vertix" />
              </div>
              <div className="w-full h-full bg-black rounded-full overflow-hidden relative z-10">
                <img className="w-full h-full opacity-90 object-cover"
                  src={`${import.meta.env.VITE_APP_URL}/assets/images/about-img.jpg`} />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col md:flex-row mb-8 md:mb-16">
                <div className="mb-5 md:mb-0 md:mr-10">
                  <img src={`${import.meta.env.VITE_APP_URL}/assets/images/title-image-home.png`} alt="app vertix"
                    className="max-w-[55px] md:max-w-[135px]" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl md:leading-14 font-bold">
                    Transforming your brand <br /> with <span className="text-gray-dark">
                      innovative digital strategies and solutions</span>
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                <div className="border-b md:border-b-0 md:border-r border-gray-200 md:pr-6 pb-8 md:pb-0">
                  <h3 className="text-primary text-5xl font-extrabold mb-5">
                    12+
                  </h3>
                  <h6 className="font-bold mb-5 text-2xl">
                    Years of Experience
                  </h6>
                  <p className="text-lg">
                    In Cutting-Edge IT Solutions, Innovation, and
                    Scalable Growth
                  </p>
                </div>
                <div>
                  <h3 className="text-primary text-5xl font-extrabold mb-5">
                    250+
                  </h3>
                  <h6 className="font-bold mb-5 text-2xl">
                    Projects Completed
                  </h6>
                  <p className="text-lg">
                    With Precision, Innovation, and a Commitment to
                    Excellence
                  </p>
                </div>
                <div
                  className="border border-gray-200 bg-gray-50 px-8 py-10 rounded-2xl flex justify-between relative overflow-hidden">
                  <div className="absolute right-0 w-full h-full opacity-20 z-0 bg-no-repeat transform -scale-120 bg-left top-0"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_APP_URL}/assets/images/card-bg.png)`,
                    }}>
                  </div>
                  <div className="relative z-1">
                    <h6 className="font-bold mb-10 text-xl">
                      Ready to innovate and make a lasting impact?
                    </h6>
                    <a href={`mailto:${import.meta.env.VITE_INFO_EMAIL}`} className="btn btn-primary py-2">Get in touch</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="portfolio" className="py-28 section-dark bg-black overflow-hidden w-full">
        <div className="container">
          <div className="section-head mb-10">
            <h4 className="section-badge-primary">Case Study</h4>
            <h2>A peek into our creative process</h2>
          </div>
        </div>
        <div>
          <div className="case-study-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide min-w-[820px] max-w-[820px] h-[708px]">
                <div className="p-7 bg-gray-900 rounded-2xl w-full h-[708px] mx-auto">
                  <div className="rounded-2xl bg-cover w-full h-full relative flex flex-col overflow-hidden"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_APP_URL}/assets/images/case-study/case-study1.webp)`,
                    }}>
                    <span className="absolute top-0 left-0 bg-black/30 w-full h-full z-0"></span>
                    <span
                      className="home-case-study-cat absolute top-6 inline-flex items-center bg-gray-50 px-4 py-2 text-black rounded-full text-xs font-semibold uppercase"><span
                        className="w-2 h-2 mr-2 bg-primary rounded-full flex"></span>E-COMMERCE</span>
                    <div
                      className="home-case-study-bottom flex flex-col mt-auto pb-12 px-6 w-full text-left relative z-10 max-w-[540px]">
                      <h6 className="text-4xl leading-12 font-black mb-5">
                        Rugged Roots
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide min-w-[820px] max-w-[820px] h-[708px]">
                <div className="p-7 bg-gray-900 rounded-2xl w-full h-[708px] mx-auto">
                  <div className="rounded-2xl bg-cover w-full h-full relative flex flex-col overflow-hidden"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_APP_URL}/assets/images/case-study/case-study2.webp)`,
                    }}>
                    <span className="absolute top-0 left-0 bg-black/30 w-full h-full z-0"></span>
                    <span
                      className="home-case-study-cat absolute top-6 inline-flex items-center bg-gray-50 px-4 py-2 text-black rounded-full text-xs font-semibold uppercase"><span
                        className="w-2 h-2 mr-2 bg-primary rounded-full flex"></span>PRODUCTION</span>
                    <div
                      className="home-case-study-bottom flex flex-col mt-auto pb-12 px-6 w-full text-left relative z-10 max-w-[540px]">
                      <h6 className="text-4xl leading-12 font-black mb-5">
                        The Box Studios
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide min-w-[820px] max-w-[820px] h-[708px]">
                <div className="p-7 bg-gray-900 rounded-2xl w-full h-[708px] mx-auto">
                  <div className="rounded-2xl bg-cover w-full h-full relative flex flex-col overflow-hidden"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_APP_URL}/assets/images/case-study/case-study1.webp)`,
                    }}>
                    <span className="absolute top-0 left-0 bg-black/30 w-full h-full z-0"></span>
                    <span
                      className="home-case-study-cat absolute top-6 inline-flex items-center bg-gray-50 px-4 py-2 text-black rounded-full text-xs font-semibold uppercase"><span
                        className="w-2 h-2 mr-2 bg-primary rounded-full flex"></span>SASS</span>
                    <div
                      className="home-case-study-bottom flex flex-col mt-auto pb-12 px-6 w-full text-left relative z-10 max-w-[540px]">
                      <h6 className="text-4xl leading-12 font-black mb-5">
                        Brainio Software
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide min-w-[820px] max-w-[820px] h-[708px]">
                <div className="p-7 bg-gray-900 rounded-2xl w-full h-[708px] mx-auto">
                  <div className="rounded-2xl bg-cover w-full h-full relative flex flex-col overflow-hidden"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_APP_URL}/assets/images/case-study/case-study4.webp)`,
                    }}>
                    <span className="absolute top-0 left-0 bg-black/30 w-full h-full z-0"></span>
                    <span
                      className="home-case-study-cat absolute top-6 inline-flex items-center bg-gray-50 px-4 py-2 text-black rounded-full text-xs font-semibold uppercase"><span
                        className="w-2 h-2 mr-2 bg-primary rounded-full flex"></span>Services</span>
                    <div
                      className="home-case-study-bottom flex flex-col mt-auto pb-12 px-6 w-full text-left relative z-10 max-w-[540px]">
                      <h6 className="text-4xl leading-12 font-black mb-5">
                        Resume Hero
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="py-28 section-dark bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_APP_URL}/assets/images/bg-1.webp)`,
        }}>
        <div className="container">
          <div className="section-head mb-10">
            <h4 className="section-badge-primary">Our Services</h4>
            <h2>
              Navigate The Digital Frontier With <br />Our Engineering
              Excellence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="p-6 pb-12 border transition border-gray-700 hover:border-primary rounded-2xl bg-gray-900 relative overflow-hidden">
              <span
                className="mb-6 flex text-stroke-primary text-[60px] leading-18 font-extrabold text-gray-900">01.</span>
              <h4 className="text-2xl font-medium mb-6">
                Mobile App Development
              </h4>
              <p>
                We use Cutting-edge technologies, user-centric designs,
                and agile methodologies to create scalable,
                high-performance apps tailored to your business needs.
              </p>
            </div>
            <div
              className="p-6 pb-12 border transition border-gray-700 hover:border-primary rounded-2xl bg-gray-900 relative overflow-hidden">
              <span
                className="mb-6 flex text-stroke-primary text-[60px] leading-18 font-extrabold text-gray-900">02.</span>
              <h4 className="text-2xl font-medium mb-6">
                Software<br /> Development
              </h4>
              <p>
                We leverage agile methodologies, modern technologies,
                and a client-focused approach to deliver scalable,
                efficient, and tailored solutions for your unique
                business challenges.
              </p>
            </div>
            <div
              className="p-6 pb-12 border transition border-gray-700 hover:border-primary rounded-2xl bg-gray-900 relative overflow-hidden">
              <span
                className="mb-6 flex text-stroke-primary text-[60px] leading-18 font-extrabold text-gray-900">03.</span>
              <h4 className="text-2xl font-medium mb-6">
                Cloud Maneged Services
              </h4>
              <p>
                We ensure optimized performance, scalability, and
                security through proactive monitoring, seamless
                maintenance, and tailored solutions to meet your
                evolving business needs.
              </p>
            </div>
            <div
              className="p-6 pb-12 border transition border-gray-700 hover:border-primary rounded-2xl bg-gray-900 relative overflow-hidden">
              <span
                className="mb-6 flex text-stroke-primary text-[60px] leading-18 font-extrabold text-gray-900">04.</span>
              <h4 className="text-2xl font-medium mb-6">
                Ideation And Design Strategy
              </h4>
              <p>
                We craft innovative ideas and design strategies by
                blending creativity, user insights, and business goals
                to deliver intuitive, impactful, and user-centric
                digital experiences.
              </p>
            </div>
            <div
              className="p-6 pb-12 border transition border-gray-700 hover:border-primary rounded-2xl bg-gray-900 relative overflow-hidden">
              <span
                className="mb-6 flex text-stroke-primary text-[60px] leading-18 font-extrabold text-gray-900">05.</span>
              <h4 className="text-2xl font-medium mb-6">IT Consulting</h4>
              <p>
                We align strategies with business goals to deliver
                innovative solutions, optimize processes, and drive
                digital transformation for sustainable growth.
              </p>
            </div>
            <div
              className="p-6 pb-12 border transition border-gray-700 hover:border-primary rounded-2xl bg-gray-900 relative overflow-hidden">
              <span
                className="mb-6 flex text-stroke-primary text-[60px] leading-18 font-extrabold text-gray-900">06.</span>
              <h4 className="text-2xl font-medium mb-6">Dev Ops</h4>
              <p>
                We implement automation, continuous integration, and
                efficient workflows to enhance collaboration, accelerate
                delivery, and ensure reliable, scalable solutions for
                your business.
              </p>
            </div>
            <div
              className="p-6 pb-12 border transition border-gray-700 hover:border-primary rounded-2xl bg-gray-900 relative overflow-hidden">
              <span
                className="mb-6 flex text-stroke-primary text-[60px] leading-18 font-extrabold text-gray-900">07.</span>
              <h4 className="text-2xl font-medium mb-6">
                Digital Transformation
              </h4>
              <p>
                With innovative technologies, optimizing processes, and
                delivering tailored strategies to enhance efficiency, we
                unlock new growth opportunities for your business.
              </p>
            </div>
            <div className="p-6 bg-primary rounded-2xl relative overflow-hidden flex items-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-30"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_APP_URL}/assets/images/wires-cart-bg.jpg)`,
                }}>
              </div>
              <div className="relative z-1">
                <h4 className="text-2xl font-medium mb-6">
                  Want to make your idea into reality and make your
                  brand presence online
                </h4>
                <a href={`mailto:${import.meta.env.VITE_INFO_EMAIL}`} className="btn btn-secondary py-2 mt-auto">Get in Touch</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-28 section-dark bg-secondary">
        <div className="container">
          <div className="section-head mb-10">
            <h4 className="section-badge-primary">Technolgies we use</h4>
            <h2>
              Leveraging Advanced Technologies to <br />Drive Digital
              Transformation for Our Clients
            </h2>
          </div>
          <div className="border border-gray-700 rounded-2xl p-8 flex">
            <div className="min-w-[520px] max-w-[520px] pr-10 hidden">
              <ul>
                <li
                  className="bg-primary font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-default"
                >
                  <span>Frontend Programming Languages</span>
                </li>
                <li
                  className="font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer hover:text-gray-200"
                >
                  <span>Backend Programming Languages</span>
                </li>
                <li
                  className="font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer hover:text-gray-200"
                >
                  <span>Mobile</span>
                </li>
                <li
                  className="font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer hover:text-gray-200"
                >
                  <span>Databases / Dara Storages</span>
                </li>
                <li
                  className="font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer hover:text-gray-200"
                >
                  <span>Cloud DB, Warehouses And Storage</span>
                </li>
                <li
                  className="font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer hover:text-gray-200"
                >
                  <span>DevOps</span>
                </li>
                <li
                  className="font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer hover:text-gray-200"
                >
                  <span>Architecture Designs And Patterns</span>
                </li>
                <li
                  className="font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer hover:text-gray-200"
                >
                  <span>Artificial Intelligence</span>
                </li>
              </ul>
            </div>
            <div className="w-full relative min-h-[450px]">
              <div className="tech-tabs-wrap">
                <div className="tech-tab">
                  <label>
                    <input
                      type="radio"
                      name="tech-tab"
                      className="sr-only"
                    />
                    <div
                      className="tech-tab-head flex font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer min-w-[460px] max-w-[460px] relative z-10"
                    >
                      Frontend Programming Languages
                    </div>
                    <div
                      className="tech-tabs-body absolute top-0 right-0 w-full pl-[490px] z-0"
                    >
                      <div
                        className="tech-tab-content text-black font-semibold bg-white p-6 flex-grow rounded-2xl"
                      >
                        <div
                          className="min-h-[400px] max-h-[400px] overflow-auto"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center h-auto"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              CSS
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/html-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              HTML
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                            <div
                              className="bg-gray-50 px-4 py-2 flex items-center"
                            >
                              <span className="mr-4">
                                <img
                                  src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                  alt="css 3"
                                  className="max-w-9"
                                /></span
                              >
                              Javascript
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="tech-tab">
                  <label>
                    <input
                      type="radio"
                      name="tech-tab"
                      className="sr-only"
                    />
                    <div
                      className="tech-tab-head flex font-bold text-xl rounded-xl px-6 py-3.5 mb-2 cursor-pointer min-w-[460px] max-w-[460px] relative z-10"
                    >
                      Backend Programming Languages
                    </div>
                    <div
                      className="tech-tab-body absolute top-0 right-0 w-full pl-[490px] z-0"
                    >
                      <div
                        className="tech-tab-content text-black font-semibold bg-white p-6 flex-grow rounded-2xl"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div
                            className="bg-gray-50 px-4 py-2 flex items-center h-auto"
                          >
                            <span className="mr-4">
                              <img
                                src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/css3-logo.svg`}
                                alt="css 3"
                                className="max-w-9"
                              /></span
                            >
                            CSS
                          </div>
                          <div
                            className="bg-gray-50 px-4 py-2 flex items-center"
                          >
                            <span className="mr-4">
                              <img
                                src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/html-logo.svg`}
                                alt="css 3"
                                className="max-w-9"
                              /></span
                            >
                            HTML
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold">Frequently Asked Questions</h3>
          </div>
          <div className="accordion max-w-[992px] mx-auto">
            <div className="accordion-item border border-gray-800 rounded-2xl mb-4">
              <label>
                <input type="checkbox" className="sr-only" />
                <div className="accordion-head cursor-pointer flex items-center justify-between group">
                  <h5 className="text-xl font-black group-hover:text-gray-800 pl-6 pr-10 py-4 flex-grow">
                    What mobile app development services do you
                    offer?
                  </h5>
                  <span className="ml-auto relative right-4 min-w-6 max-w-6 accordion-head-icon justify-center">
                    <img src={`${import.meta.env.VITE_APP_URL}/assets/images/arrow-down-solid.svg`}
                      alt="app vertix" className="w-6" />
                  </span>
                </div>
                <div className="accordion-content px-6 py-4">
                  <p className="mb-6">
                    As a leading
                    <a href="https://appinventiv.com/mobile-app-development-services/"
                      target="_blank">mobile application development service</a> company, we offer a
                    comprehensive array of services,
                    including:
                  </p>
                  <ul className="mb-6 list-disc ml-6">
                    <li>
                      <a href="https://appinventiv.com/iphone-application-development/"
                        target="_blank">iOS App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/android-application-development/"
                        target="_blank">Android App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/flutter-app-development/" target="_blank">Flutter
                        App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/react-native-app-development/"
                        target="_blank">React Native App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/wearable-devices-app-development/"
                        target="_blank">Wearable App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/web-application-development/" target="_blank">Web
                        App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/progressive-web-apps/" target="_blank">PWA
                        Development
                      </a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/healthcare-mobile-app-development-services/"
                        target="_blank">Healthcare App Development</a>
                    </li>
                  </ul>
                  <p>
                    Our client-centric approach allows us to assist
                    our clients all the way from the initial idea
                    validation to execution and post maintenance.
                    This involves rigorous planning, design,
                    development, testing, and deployment, ensuring
                    that the mobile app is not only technologically
                    robust but also aligns with the client's
                    business vision and user expectations.
                  </p>
                </div>
              </label>
            </div>
            <div className="accordion-item border border-gray-800 rounded-2xl mb-4">
              <label>
                <input type="checkbox" className="sr-only" />
                <div className="accordion-head cursor-pointer flex items-center justify-between group">
                  <h5 className="text-xl font-black group-hover:text-gray-800 pl-6 pr-10 py-4 flex-grow">
                    What mobile app development services do you
                    offer?
                  </h5>
                  <span className="ml-auto relative right-4 min-w-6 max-w-6 accordion-head-icon justify-center">
                    <img src={`${import.meta.env.VITE_APP_URL}/assets/images/arrow-down-solid.svg`}
                      alt="app vertix" className="w-6" />
                  </span>
                </div>
                <div className="accordion-content px-6 py-4">
                  <p className="mb-6">
                    As a leading
                    <a href="https://appinventiv.com/mobile-app-development-services/"
                      target="_blank">mobile application development service</a> company, we offer a
                    comprehensive array of services,
                    including:
                  </p>
                  <ul className="mb-6 list-disc ml-6">
                    <li>
                      <a href="https://appinventiv.com/iphone-application-development/"
                        target="_blank">iOS App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/android-application-development/"
                        target="_blank">Android App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/flutter-app-development/" target="_blank">Flutter
                        App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/react-native-app-development/"
                        target="_blank">React Native App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/wearable-devices-app-development/"
                        target="_blank">Wearable App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/web-application-development/" target="_blank">Web
                        App Development</a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/progressive-web-apps/" target="_blank">PWA
                        Development
                      </a>
                    </li>
                    <li>
                      <a href="https://appinventiv.com/healthcare-mobile-app-development-services/"
                        target="_blank">Healthcare App Development</a>
                    </li>
                  </ul>
                  <p>
                    Our client-centric approach allows us to assist
                    our clients all the way from the initial idea
                    validation to execution and post maintenance.
                    This involves rigorous planning, design,
                    development, testing, and deployment, ensuring
                    that the mobile app is not only technologically
                    robust but also aligns with the client's
                    business vision and user expectations.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section> */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container">
          <div className="md:flex justify-between">
            <div className="relative md:w-1/2">
              <h3 className="text-5xl md:text-[80px] lg:text-[100px] lg:leading-30 font-bold mb-8 mt-4">
                Let's work <span className='md:block'>together</span>
              </h3>
            </div>
            <div className="flex-grow md:pl-10 md:w-1/2">
              <div className="md:max-w-[550px] mx-auto">
                <p className="mb-3">
                  Get in touch with us today to explore how we can
                  elevate your business through innovative digital
                  solutions.
                </p>
                <form onSubmit={handleSubmitContactForm(onSubmitContactForm)}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label className="form-label">Full Name</label>
                      <input type="text" {...registerContactForm('name')} placeholder="Full Name" className="form-control" required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">E-mail</label>
                      <input type="text" {...registerContactForm('email')} placeholder="E-mail" className="form-control" required />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Message</label>
                    <textarea {...registerContactForm('message')} placeholder="Message" rows="4" className="textarea" required></textarea>
                  </div>
                  <div className="mb-4">
                    <button type="submit"
                      className="uppercase text-sm h-12 font-bold btn bg-black text-white w-full">Send
                      Message</button>
                  </div>
                </form>
                {showAlert ? <div className='bg-green-700 text-white shadow p-4 rounded-md flex text-lg items-start font-medium'>
                  <span className='min-w-8 max-w-8 inline-flex mr-3 relative top-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill='#fff'>
                      <path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z" />
                    </svg>
                  </span>
                  <div>
                    We have received your query, our team will reach out to you within 24 hours.
                  </div>
                </div> : ""}
              </div>
            </div>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  )
}