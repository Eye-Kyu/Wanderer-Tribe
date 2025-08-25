import Image from "next/image";

interface Experience {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface ExperienceGridProps {
  experiences: Experience[];
}

export default function ExperienceGrid({ experiences }: ExperienceGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="mt-2 text-gray-600">{exp.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#D27D2D]/10 text-[#D27D2D] px-3 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
