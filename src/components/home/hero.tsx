"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Navigation, Keyboard } from "swiper/modules";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
const slides = [
  {
    tag: "A LITTLE SPACE FOR BIG IDEAS",
    title: (
      <>
        Less scrolling.
        <br />
        <span>More good books.</span>
      </>
    ),
    text: "Discover a new favourite, borrow a little adventure, and share the stories you love. Your next chapter is waiting.",
    image: "/covers/garden.svg",
    caption: "For your slow Sunday",
    color: "sage",
  },
  {
    tag: "CURIOSITY LOOKS GOOD ON YOU",
    title: (
      <>
        A new perspective.
        <br />
        <span>One page away.</span>
      </>
    ),
    text: "From the smallest wonders to the biggest questions, find books that make you see the world a little differently.",
    image: "/covers/cosmos.svg",
    caption: "For your curious side",
    color: "sky",
  },
  {
    tag: "GOOD STORIES KEEP MOVING",
    title: (
      <>
        Your favourite book.
        <br />
        <span>Someone’s next read.</span>
      </>
    ),
    text: "Make a little room on your shelf. Add a book to the library and give another reader a story to remember.",
    image: "/covers/pride.svg",
    caption: "For the love of stories",
    color: "peach",
  },
];
export function Hero() {
  return (
    <section className="hero-section container" aria-label="Discover BookNook">
      <Swiper
        modules={[A11y, Pagination, Navigation, Keyboard]}
        slidesPerView={1}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
      >
        <>
          {slides.map((slide) => (
            <SwiperSlide key={slide.tag}>
              <div className={`hero-panel ${slide.color}`}>
                <div className="hero-copy">
                  <p className="eyebrow">{slide.tag}</p>
                  <h1>{slide.title}</h1>
                  <p className="hero-description">{slide.text}</p>
                  <Link className="btn btn-primary" href="/books">
                    Browse Books <ArrowUpRight size={17} />
                  </Link>
                  <div className="hero-note">
                    <span className="little-line" /> A community library. Open
                    to every reader.
                  </div>
                </div>
                <div className="hero-art">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <span className="art-spark">✳</span>
                  <img
                    src={slide.image}
                    alt="Illustrative book cover"
                    width={205}
                    height={290}
                  />
                  <span className="art-caption">{slide.caption}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </>
      </Swiper>
      <div className="hero-navigation">
        <button
          className="hero-prev btn btn-circle btn-ghost btn-sm"
          aria-label="Previous slide"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          className="hero-next btn btn-circle btn-ghost btn-sm"
          aria-label="Next slide"
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
