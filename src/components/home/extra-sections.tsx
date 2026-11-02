import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  RotateCcw,
  FlaskConical,
  Landmark,
  Smile,
  Layers,
} from "lucide-react";
const topics = [
  { name: "Fiction", note: "A world beyond your own", icon: BookOpen },
  { name: "Science", note: "Follow your curiosity", icon: FlaskConical },
  { name: "History", note: "Stories that shaped us", icon: Landmark },
  { name: "Kids", note: "Big adventures start small", icon: Smile },
  { name: "Others", note: "Something unexpected", icon: Layers },
];
export function ExtraSections() {
  return (
    <>
      <section className="how-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A SIMPLE LITTLE RITUAL</p>
              <h2>Find it. Read it. Pass it on.</h2>
            </div>
            <p>
              More reading, less fuss.
              <br />
              Here’s how Pataghor works.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                n: "01",
                icon: Compass,
                title: "Find your next book",
                text: "Explore the shelves and choose a story or idea that catches your eye.",
              },
              {
                n: "02",
                icon: BookOpen,
                title: "Make time for a chapter",
                text: "Sign in, borrow an available copy, and enjoy seven days of reading.",
              },
              {
                n: "03",
                icon: RotateCcw,
                title: "Keep the story moving",
                text: "Return it from My Borrows so someone else can discover it too.",
              },
            ].map((step) => (
              <div className="step" key={step.n}>
                <div className="step-top">
                  <step.icon size={24} strokeWidth={1.5} />
                  <span>{step.n}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHERE WILL YOU WANDER?</p>
            <h2>Follow your curiosity.</h2>
          </div>
        </div>
        <div className="category-grid">
          {topics.map((topic) => (
            <Link
              className="category-card"
              key={topic.name}
              href={`/books?category=${topic.name}`}
            >
              <topic.icon size={23} strokeWidth={1.4} />
              <h3>{topic.name}</h3>
              <p>{topic.note}</p>
              <ArrowUpRight className="category-arrow" size={17} />
            </Link>
          ))}
        </div>
        <div className="share-banner">
          <div>
            <p className="eyebrow">THERE’S ROOM ON OUR SHELF</p>
            <h2>A good book is even better shared.</h2>
            <p>Have a story you keep recommending? Give it a place here.</p>
          </div>
          <Link className="btn btn-primary" href="/add-book">
            Share a Book <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
