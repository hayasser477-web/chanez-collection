
import { Gem, Heart, ShieldCheck, Sparkles } from "lucide-react";
import "./AboutUs.css";

const values = [
  {
    icon: Gem,
    title: "جودة تليق بكِ",
    description:
      "نهتم بجودة الأقمشة ودقة الخياطة لنقدم لكِ قطعًا تجمع بين الإتقان والأناقة.",
  },
  {
    icon: Heart,
    title: "رضاكِ أولويتنا",
    description:
      "نحرص على أن تكون تجربتكِ معنا مريحة، وأن يصلكِ منتج يليق بتوقعاتكِ.",
  },
  {
    icon: ShieldCheck,
    title: "الثقة أساس علاقتنا",
    description:
      "نحرص على عرض منتجاتنا بوضوح، ونسعى إلى أن يصلكِ المنتج أقرب ما يكون إلى صورته وتفاصيله على الموقع.",
  },
];

export default function AboutUs() {
  return (
    <section className="about-us" id="about-us" dir="rtl">
      <div className="about-us__container">
        <header className="about-us__header">
          <span className="about-us__eyebrow">
            CHANEZ COLLECTION
          </span>

          <h2 className="about-us__title">من نحن</h2>

          <p className="about-us__intro">
            لأن الأناقة الحقيقية هي أن تشعري بالجمال والثقة في كل ما ترتدينه.
          </p>

          <span className="about-us__divider" />
        </header>

        <div className="about-us__story">
          <div className="about-us__story-mark">
            <Sparkles size={30} strokeWidth={1.2} />
          </div>

          <div className="about-us__story-content">
            <span className="about-us__label">حكايتنا</span>

            <h3>بدأنا بشغف، ونواصل بثقة</h3>

            <p>
              انطلقت رحلتنا سنة 2019 برؤية بسيطة وطموح كبير:
              أن نجمع بين السترة والجمال في لباس واحد.
              ومنذ البداية، كان اهتمامنا منصبًا على جودة القماش،
              وإتقان العمل، وتقديم قطع تعكس الأناقة والاهتمام بالتفاصيل.
            </p>
          </div>

          <div className="about-us__year">
            <span>منذ</span>
            <strong>2019</strong>
          </div>
        </div>

        <div className="about-us__mission">
          <span className="about-us__label">رؤيتنا ورسالتنا</span>

          <h3>
            أناقة تمنحكِ الجمال، وراحة تعزز ثقتكِ.
          </h3>

          <p>
            نسعى إلى تقديم أزياء تجمع بين الاحتشام والجمال،
            مع الاهتمام بجودة الأقمشة وإتقان التصنيع.
            ونعمل باستمرار على تحسين تجربة التسوق، حتى تختاري
            قطعتكِ بثقة وتحصلي على منتج يطابق وصفه وصوره قدر الإمكان.
          </p>
        </div>

        <div className="about-us__values">
          {values.map(({ icon: Icon, title, description }) => (
            <article className="about-us__value" key={title}>
              <div className="about-us__value-icon">
                <Icon size={25} strokeWidth={1.35} />
              </div>

              <h3>{title}</h3>

              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="about-us__closing">
          <span className="about-us__closing-line" />

          <p>
            CHANEZ COLLECTION
          </p>

          <h3>أناقة تشبهكِ، وثقة تستحقينها.</h3>
        </div>
      </div>
    </section>
  );
}
