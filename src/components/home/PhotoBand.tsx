import Image from "next/image";
import Link from "next/link";

/** Showcase: one of the owner's photographs edge to edge, captioned with its place. */
export default function PhotoBand({
  src,
  alt,
  place,
  href,
}: {
  src: string;
  alt: string;
  place: string;
  href: string;
}) {
  return (
    <section aria-label={place} className="photo-band">
      <div data-slot="band" data-alt="A wide photograph from one of your safaris" className="photo-band-frame">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="container">
        <p className="photo-band-caption">
          <span>{place}</span>
          <Link href={href} className="link">
            See the trip
          </Link>
        </p>
      </div>
    </section>
  );
}
