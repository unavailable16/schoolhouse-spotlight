
export function SchoolMap() {
  return (
    <div className="overflow-hidden rounded-lg bg-paper ring-1 ring-ink/10">
      <iframe
        title="Lokasi Sekolah SMP Islam Al-Mujahidin Pamulang di Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d589.4578186637062!2d106.73239283767646!3d-6.3443256228179505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef785ef5542b%3A0x9d6d559ab0190633!2sSMP%20Islam%20Al%20Mujahidin%20Pamulang.%20Gedung%20baru!5e0!3m2!1sid!2sid!4v1791470427235!5m2!1sid!2sid"
        className="block h-[360px] w-full border-0 lg:h-[430px]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}