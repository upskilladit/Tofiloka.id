import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, Navigation } from "lucide-react";
import CompleteTheTask from "@/imports/CompleteTheTask/index";

// ─── YouTube music ────────────────────────────────────────────────────────────
const YOUTUBE_ID = "GDykB7p9O5o";
const WHATSAPP_NUMBER = "6283178473194";
const SHOPEE_HAMPERS = "https://shopee.co.id/TofiLoka-Hampers-i.1791621217";
const SHOPEE_TRAVEL =
  "https://shopee.co.id/TOFILOKA-SAOUVENIR-COOKIES-AMPAS-TAHU-Standing-Pouch-souvening-Cookies-Ampas-Tahu-i.1791621217.43232518885";
const INSTAGRAM = "https://www.instagram.com/tofiloka.id/";

// ─── Jogja places data ────────────────────────────────────────────────────────
interface Place {
  name: string;
  tagline: string;
  philosophy: string;
  history: string;
  tips: string;
  mapsUrl: string;
  image: string;
  color: string;
}

const PLACES: Place[] = [
  {
    name: "Tugu Yogyakarta",
    tagline: "Poros Kosmis Kota Gudeg",
    philosophy:
      'Tugu Yogyakarta bukan sekadar monumen — ia adalah titik tumpu filosofis yang menghubungkan Gunung Merapi di utara, Keraton di tengah, dan Pantai Parangtritis di selatan. Garis imaginer ini dikenal sebagai "Sumbu Filosofi Yogyakarta" — simbol keseimbangan antara manusia, alam, dan Tuhan dalam kosmologi Jawa. Dari titik inilah Sultan Hamengkubuwono I merencanakan tata kota Yogyakarta sebagai miniatur jagat raya.',
    history:
      "Dibangun pada 1755 M oleh Sultan Hamengkubuwono I, awalnya berbentuk bulat silindris setinggi 25 meter. Setelah gempa 1867 dan renovasi oleh Belanda, bentuknya berubah menjadi persegi dengan tinggi 15 meter. Rakyat Yogyakarta menyebutnya \"Pal Putih\" — tonggak putih yang menjadi saksi bisu perjuangan dan semangat persatuan dalam merebut kemerdekaan.",
    tips: "Kunjungi dini hari sebelum matahari terbit untuk menyaksikan keheningan magis tugu berlatar langit jingga. Jangan lewatkan suasana malam hari saat tugu bercahaya indah.",
    mapsUrl: "https://www.google.com/maps/place/Tugu+Yogyakarta/@-7.7828,110.3670",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Yogyakarta_Kraton_25.jpg/1280px-Yogyakarta_Kraton_25.jpg",
    color: "#6b4226",
  },
  {
    name: "Malioboro",
    tagline: "Jantung Yogyakarta yang Berdenyut",
    philosophy:
      'Nama Malioboro berasal dari Bahasa Sansekerta "Malyabhara" — untaian bunga, lambang keindahan dan penyambutan. Sebagai jalur utama menuju Keraton, Malioboro adalah nadi kehidupan Yogyakarta: di sini pedagang, seniman, dan pelancong bercampur dalam harmoni budaya yang organik. Bagi wong Jogja, Malioboro adalah ruang publik tempat identitas kota dinegosiasikan setiap hari — antara tradisi dan modernitas, antara lokal dan global.',
    history:
      "Dibangun sejak abad ke-17 sebagai sumbu utara-selatan keraton, Malioboro berkembang menjadi pusat perdagangan di era kolonial Belanda. Namanya sempat diusulkan diganti saat kemerdekaan, namun rakyat mempertahankannya sebagai simbol perlawanan budaya. Hari ini, Malioboro adalah salah satu jalan paling terkenal di Asia Tenggara.",
    tips: "Datang sore hari untuk menikmati suasana paling hidup. Jangan lupa mencicipi gudeg dan angkringan di pinggir jalan. Tawar harga dengan ramah — itu bagian dari pengalaman Malioboro.",
    mapsUrl: "https://www.google.com/maps/place/Malioboro/@-7.7929,110.3653",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Malioboro_Street_Yogyakarta.jpg/1280px-Malioboro_Street_Yogyakarta.jpg",
    color: "#71866a",
  },
  {
    name: "Keraton Yogyakarta",
    tagline: "Pusat Semesta Budaya Jawa",
    philosophy:
      "Keraton bukan istana biasa — ia adalah representasi fisik dari kosmologi Jawa. Setiap elemen arsitekturnya memiliki makna: alun-alun utara melambangkan hubungan raja dengan rakyat, pohon beringin kembar mewakili keseimbangan dunia, dan bangsal agung adalah pusat meditasi kosmis. Filsafat Jawa \"Hamemayu Hayuning Bawana\" — menjaga keselarasan dan keindahan semesta — terwujud dalam setiap sudut keraton.",
    history:
      "Didirikan pada 1755 oleh Sultan Hamengkubuwono I setelah Perjanjian Giyanti memisahkan Mataram Islam. Keraton pernah menjadi pusat perlawanan terhadap penjajah dan tempat Soekarno memindahkan ibu kota sementara (1946–1948). Hingga hari ini, Sultan ke-10 masih tinggal di sini dan menjalankan tradisi budaya yang berusia ratusan tahun.",
    tips: "Kunjungi pada pagi hari (08.00–14.00) untuk akses penuh. Saksikan pertunjukan gamelan dan wayang yang rutin digelar. Hormati aturan berpakaian dan adat setempat.",
    mapsUrl: "https://www.google.com/maps/place/Keraton+Yogyakarta/@-7.8054,110.3642",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Interior_of_Keraton_Yogyakarta.jpg/1280px-Interior_of_Keraton_Yogyakarta.jpg",
    color: "#3b2416",
  },
  {
    name: "Candi Prambanan",
    tagline: "Mahakarya Hindu Nusantara",
    philosophy:
      'Prambanan dibangun bukan hanya sebagai tempat ibadah, tetapi sebagai "gunung kosmis" — replika Mahameru, kediaman para dewa dalam mitologi Hindu. Ketiga candi utama yang didedikasikan untuk Brahma (pencipta), Wisnu (pemelihara), dan Siwa (pemusnah) mencerminkan siklus abadi kehidupan: lahir, hidup, dan mati. Relief Ramayana yang menghiasi dindingnya mengajarkan nilai-nilai universal: kesetiaan, keberanian, dan kemenangan kebenaran atas kejahatan.',
    history:
      "Dibangun sekitar tahun 850 M oleh Raja Rakai Pikatan dari Dinasti Sanjaya. Sempat terbengkalai setelah letusan Gunung Merapi dan gempa bumi, baru ditemukan kembali oleh arkeolog Belanda pada 1811. Setelah restorasi panjang, Prambanan diakui sebagai Situs Warisan Dunia UNESCO pada 1991 — simbol keagungan peradaban Nusantara.",
    tips: "Kunjungi sore hari menjelang matahari terbenam untuk foto terbaik. Saksikan pertunjukan Sendratari Ramayana di panggung terbuka pada malam bulan purnama — pengalaman budaya yang tak terlupakan.",
    mapsUrl: "https://www.google.com/maps/place/Prambanan+Temple/@-7.7520,110.4914",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Prambanan_temple_2014.jpg/1280px-Prambanan_temple_2014.jpg",
    color: "#6b4226",
  },
];

// ─── Nav & sections ───────────────────────────────────────────────────────────
const NAV_SECTION_MAP: Record<string, string> = {
  "Home": "HeroSection",
  "Discover Jogja": "DiscoverJogja",
  "Products": "ProductCatalog",
  "Our Story": "StorySection",
  "Founders": "FoundersSection",
  "Journal": "JournalSection",
  "Contact": "FeedbackSection",
};

const FOOTER_SECTION_MAP: Record<string, string> = {
  "Discover Jogja": "DiscoverJogja",
  "Products": "ProductCatalog",
  "Our Story": "StorySection",
  "Founders": "FoundersSection",
  "Journal": "JournalSection",
};

function scrollToSection(sectionName: string, navbar: HTMLElement | null) {
  const section = document.querySelector(`[data-name="${sectionName}"]`);
  if (!section) return;
  const offset = navbar?.offsetHeight ?? 0;
  const top = section.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function makeClickable(el: HTMLElement, handler: () => void): () => void {
  el.style.cursor = "pointer";
  el.addEventListener("click", handler);
  return () => el.removeEventListener("click", handler);
}

let playerInjected = false;

function injectYouTubePlayer(navbar: HTMLElement | null) {
  const musicSection = document.querySelector('[data-name="MusicSection"]') as HTMLElement | null;
  if (musicSection) {
    const offset = navbar?.offsetHeight ?? 0;
    const top = musicSection.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  if (playerInjected) return;
  playerInjected = true;
  const playerCard = musicSection?.querySelector('[data-name="Container"]') as HTMLElement | null;
  if (!playerCard) return;
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:absolute;inset:0;z-index:10;border-radius:28px;overflow:hidden;background:#000;";
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&controls=1&rel=0&modestbranding=1`;
  iframe.allow = "autoplay; encrypted-media; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.cssText = "width:100%;height:100%;border:none;";
  overlay.appendChild(iframe);
  if (window.getComputedStyle(playerCard).position === "static")
    playerCard.style.position = "relative";
  playerCard.appendChild(overlay);
}

// ─── Place detail modal ───────────────────────────────────────────────────────
function PlaceModal({ place, onClose }: { place: Place; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-[#fcfaf5] rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Hero image */}
        <div className="relative h-64 overflow-hidden rounded-t-[28px]">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} className="text-[#f4c542]" />
              <span className="text-[#f4c542] text-xs font-semibold uppercase tracking-widest">
                Yogyakarta
              </span>
            </div>
            <h2
              className="text-white text-3xl font-bold leading-tight"
              style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              {place.name}
            </h2>
            <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {place.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Philosophy */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[2px] text-[#6b4226] mb-2"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              — Filosofi
            </p>
            <p
              className="text-[#3b2416] text-[15px] leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {place.philosophy}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#eadcc8]" />

          {/* History */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[2px] text-[#6b4226] mb-2"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              — Sejarah Singkat
            </p>
            <p
              className="text-[rgba(59,36,22,0.75)] text-[14px] leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {place.history}
            </p>
          </div>

          {/* Tips */}
          <div className="bg-[#fff8e8] rounded-2xl p-4 border border-[rgba(234,220,200,0.6)]">
            <p
              className="text-xs font-semibold uppercase tracking-[2px] text-[#71866a] mb-1"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              💡 Tips Kunjungan
            </p>
            <p
              className="text-[rgba(59,36,22,0.7)] text-[13px] leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {place.tips}
            </p>
          </div>

          {/* Explore button */}
          <button
            onClick={() => openLink(place.mapsUrl)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-[15px] transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: place.color, fontFamily: "'Manrope', sans-serif" }}
          >
            <Navigation size={18} />
            Explore di Google Maps
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activePlaceName, setActivePlaceName] = useState<string | null>(null);
  const activePlace = PLACES.find((p) => p.name === activePlaceName) ?? null;

  useEffect(() => {
    playerInjected = false;
    const navbar = document.querySelector('[data-name="Navbar"]') as HTMLElement | null;
    const cleanup: Array<() => void> = [];

    // ── Navbar sticky ──────────────────────────────────────────────────────────
    if (navbar) {
      Object.assign(navbar.style, { position: "fixed", zIndex: "50", width: "100%", left: "0", top: "0" });
    }

    // ── Navbar links ───────────────────────────────────────────────────────────
    document.querySelectorAll('[data-name="Navbar"] [data-name="Link"]').forEach((link) => {
      const text = link.querySelector("p")?.textContent?.trim() ?? "";
      const section = NAV_SECTION_MAP[text];
      if (!section) return;
      const el = link as HTMLElement;
      cleanup.push(makeClickable(el, () => scrollToSection(section, navbar)));
      const p = link.querySelector("p") as HTMLElement | null;
      const onIn = () => { if (p) p.style.color = "#6b4226"; };
      const onOut = () => { if (p) p.style.color = ""; };
      el.addEventListener("mouseenter", onIn);
      el.addEventListener("mouseleave", onOut);
      cleanup.push(() => { el.removeEventListener("mouseenter", onIn); el.removeEventListener("mouseleave", onOut); });
    });
    document.querySelectorAll('[data-name="Navbar"] p').forEach((p) => {
      if (p.textContent?.trim() === "Buy TofiLoka") {
        const btn = p.closest('[data-name="Container"]') as HTMLElement | null;
        if (btn) cleanup.push(makeClickable(btn, () => scrollToSection("ProductCatalog", navbar)));
      }
    });

    // ── Discover Jogja cards — make clickable ──────────────────────────────────
    const discoverSection = document.querySelector('[data-name="DiscoverJogja"]');
    if (discoverSection) {
      // Find cards by heading text
      discoverSection.querySelectorAll('[data-name^="Heading"]').forEach((heading) => {
        const name = heading.querySelector("p")?.textContent?.trim() ?? "";
        const place = PLACES.find((p) => p.name === name);
        if (!place) return;
        // Walk up to the card container (rounded-[24px] wrapper)
        const card = heading.closest('[data-name="Container"][class*="rounded-[24px]"]') as HTMLElement | null;
        if (!card) return;
        card.style.cursor = "pointer";
        card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
        const onIn = () => {
          card.style.transform = "translateY(-4px) scale(1.01)";
          card.style.boxShadow = "0 16px 40px rgba(59,36,22,0.25)";
        };
        const onOut = () => {
          card.style.transform = "";
          card.style.boxShadow = "";
        };
        const onClick = () => setActivePlaceName(name);
        card.addEventListener("mouseenter", onIn);
        card.addEventListener("mouseleave", onOut);
        card.addEventListener("click", onClick);
        cleanup.push(() => {
          card.removeEventListener("mouseenter", onIn);
          card.removeEventListener("mouseleave", onOut);
          card.removeEventListener("click", onClick);
        });
      });
    }

    // ── Feedback form — replace static divs with real inputs ───────────────────
    const feedbackSection = document.querySelector('[data-name="FeedbackSection"]');
    if (feedbackSection) {
      const inputStyle = `
        width: 100%; height: 50px; padding: 0 20px;
        border: 1.265px solid #eadcc8; border-radius: 16px;
        background: #fcfaf5; font-size: 14px; font-family: 'Manrope', sans-serif;
        color: #3b2416; outline: none; box-sizing: border-box;
        transition: border-color 0.2s;
      `;
      const textareaStyle = `
        width: 100%; height: 110px; padding: 14px 20px;
        border: 1.265px solid #eadcc8; border-radius: 16px;
        background: #fcfaf5; font-size: 14px; font-family: 'Manrope', sans-serif;
        color: #3b2416; outline: none; box-sizing: border-box; resize: none;
        transition: border-color 0.2s;
      `;
      const selectStyle = `
        width: 100%; height: 50px; padding: 0 20px;
        border: 1.265px solid #eadcc8; border-radius: 16px;
        background: #fcfaf5; font-size: 14px; font-family: 'Manrope', sans-serif;
        color: #3b2416; outline: none; box-sizing: border-box;
        appearance: none; cursor: pointer;
        transition: border-color 0.2s;
      `;
      // Replace each Text Input
      feedbackSection.querySelectorAll('[data-name="Text Input"]').forEach((el, i) => {
        const container = el.parentElement as HTMLElement | null;
        if (!container) return;
        container.innerHTML = "";
        const input = document.createElement("input");
        input.type = i === 0 ? "text" : "text";
        input.id = i === 0 ? "fb-nama" : "fb-email";
        input.placeholder = i === 0 ? "Nama lengkap Anda" : "email@contoh.com atau 08xx";
        input.style.cssText = inputStyle;
        input.addEventListener("focus", () => { input.style.borderColor = "#6b4226"; });
        input.addEventListener("blur", () => { input.style.borderColor = "#eadcc8"; });
        container.style.cssText = "height:50px;position:relative;width:100%;";
        container.appendChild(input);
      });

      const dropdownEl = feedbackSection.querySelector('[data-name="Dropdown"]')
        ?.parentElement as HTMLElement | null;
      if (dropdownEl) {
        dropdownEl.innerHTML = "";
        const select = document.createElement("select");
        select.id = "fb-jenis";
        select.style.cssText = selectStyle;
        [
          { value: "", label: "Pilih jenis feedback..." },
          { value: "Produk", label: "Feedback Produk" },
          { value: "Layanan", label: "Feedback Layanan" },
          { value: "Pengiriman", label: "Feedback Pengiriman" },
          { value: "Kemitraan", label: "Pertanyaan Kemitraan" },
          { value: "Lainnya", label: "Lainnya" },
        ].forEach(({ value, label }) => {
          const opt = document.createElement("option");
          opt.value = value;
          opt.textContent = label;
          select.appendChild(opt);
        });
        select.addEventListener("focus", () => { select.style.borderColor = "#6b4226"; });
        select.addEventListener("blur", () => { select.style.borderColor = "#eadcc8"; });
        dropdownEl.style.cssText = "height:50px;position:relative;width:100%;";
        dropdownEl.appendChild(select);
      }

      const textAreaEl = feedbackSection.querySelector('[data-name="Text Area"]')
        ?.parentElement as HTMLElement | null;
      if (textAreaEl) {
        textAreaEl.innerHTML = "";
        const ta = document.createElement("textarea");
        ta.id = "fb-pesan";
        ta.placeholder = "Tulis pesan Anda di sini...";
        ta.style.cssText = textareaStyle;
        ta.addEventListener("focus", () => { ta.style.borderColor = "#6b4226"; });
        ta.addEventListener("blur", () => { ta.style.borderColor = "#eadcc8"; });
        textAreaEl.style.cssText = "height:110px;position:relative;width:100%;";
        textAreaEl.appendChild(ta);
      }

      // Override WhatsApp button
      const waButton = feedbackSection.querySelector('[data-name="Button"]') as HTMLElement | null;
      if (waButton) {
        // Remove existing anchor
        const anchor = waButton.querySelector("a");
        if (anchor) anchor.style.pointerEvents = "none";

        waButton.style.cursor = "pointer";
        const onClick = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          const nama = (document.getElementById("fb-nama") as HTMLInputElement)?.value.trim() ?? "";
          const email = (document.getElementById("fb-email") as HTMLInputElement)?.value.trim() ?? "";
          const jenis = (document.getElementById("fb-jenis") as HTMLSelectElement)?.value ?? "";
          const pesan = (document.getElementById("fb-pesan") as HTMLTextAreaElement)?.value.trim() ?? "";

          if (!nama) { alert("Mohon isi nama Anda terlebih dahulu."); return; }
          if (!pesan) { alert("Mohon isi pesan Anda terlebih dahulu."); return; }

          const msg = [
            `Halo TofiLoka! 👋`,
            ``,
            `*Nama:* ${nama}`,
            email ? `*Kontak:* ${email}` : "",
            jenis ? `*Jenis Feedback:* ${jenis}` : "",
            ``,
            `*Pesan:*`,
            pesan,
          ]
            .filter((l) => l !== undefined)
            .join("\n");

          const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
          openLink(url);
        };

        waButton.addEventListener("click", onClick);
        cleanup.push(() => waButton.removeEventListener("click", onClick));
      }
    }

    // ── All data-name="Button" ─────────────────────────────────────────────────
    document.querySelectorAll('[data-name="Button"]').forEach((btn) => {
      const el = btn as HTMLElement;
      if (el.querySelector("a")) return;
      const text = el.querySelector("p")?.textContent?.trim() ?? "";
      if (text === "Buy") {
        const heading = el.closest('[data-name="Container"]')?.querySelector('[data-name^="Heading"]')?.textContent?.trim() ?? "";
        cleanup.push(makeClickable(el, () => openLink(heading.toLowerCase().includes("hampers") ? SHOPEE_HAMPERS : SHOPEE_TRAVEL)));
        return;
      }
      if (text === "All") return;
      if (text === "Shop TofiLoka") { cleanup.push(makeClickable(el, () => scrollToSection("ProductCatalog", navbar))); return; }
      if (text === "Explore Jogja") { cleanup.push(makeClickable(el, () => scrollToSection("DiscoverJogja", navbar))); return; }
      if (text === "Contact Us") { cleanup.push(makeClickable(el, () => scrollToSection("FeedbackSection", navbar))); return; }
      if (text === "View All Stories") { cleanup.push(makeClickable(el, () => openLink(INSTAGRAM))); return; }
      if (text === "Listen to Jogja") { cleanup.push(makeClickable(el, () => injectYouTubePlayer(navbar))); return; }
      if (el.closest('[data-name="MusicSection"]')) { cleanup.push(makeClickable(el, () => injectYouTubePlayer(navbar))); return; }
    });

    document.querySelectorAll('[data-name="Link"]').forEach((link) => {
      const el = link as HTMLElement;
      if (el.closest('[data-name="Navbar"]')) return;
      if (el.querySelector("a")) return;
      if (link.querySelector("p")?.textContent?.trim() === "Become a Partner") {
        cleanup.push(makeClickable(el, () => openLink(`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%2C%20saya%20ingin%20menjadi%20partner%20TofiLoka!`)));
      }
    });

    document.querySelectorAll('[data-name="List Item"]').forEach((item) => {
      const el = item as HTMLElement;
      if (el.querySelector("a")) return;
      const text = item.querySelector("p")?.textContent?.trim() ?? "";
      const section = FOOTER_SECTION_MAP[text];
      if (section) {
        cleanup.push(makeClickable(el, () => scrollToSection(section, navbar)));
        const inner = item.querySelector('[data-name="Button"]') as HTMLElement | null;
        if (inner) cleanup.push(makeClickable(inner, () => scrollToSection(section, navbar)));
      }
    });

    return () => {
      cleanup.forEach((fn) => fn());
      playerInjected = false;
    };
  }, []);

  return (
    <div className="w-full">
      <CompleteTheTask />
      {activePlace && (
        <PlaceModal place={activePlace} onClose={() => setActivePlaceName(null)} />
      )}
    </div>
  );
}
