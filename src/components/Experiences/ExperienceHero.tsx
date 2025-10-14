import Image from "next/image";

interface ExperienceHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function ExperienceHero({
  title,
  subtitle,
  image,
}: ExperienceHeroProps) {
  return (
    <section className="relative h-screen w-screen flex items-center justify-center text-center">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover brightness-75"
      />
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">{title}</h1>
        <p className="mt-4 text-lg text-white md:text-xl">{subtitle}</p>
      </div>
    </section>
  );
}
