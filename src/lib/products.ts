import ankaraImg from "@/assets/ankara.jpg";
import adireImg from "@/assets/adire.jpg";
import kenteImg from "@/assets/kente.jpg";
import bubuImg from "@/assets/bubu.jpg";
import asoOkeImg from "@/assets/aso-oke.jpg";

export type Product = {
  slug: string;
  name: string;
  english: string;
  description: string;
  price: number;
  category: string;
  fabric: "Ankara" | "Kente" | "Adire" | "Aso-Oke" | "Batik";
  origin: string;
  colors: string[];
  sizes: string[];
  images: string[];
  bestseller?: boolean;
  newArrival?: boolean;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

export const products: Product[] = [
  {
    slug: "iso-asa",
    name: "Ìṣọ Àṣà",
    english: "Ankara Wrap Dress",
    description:
      "A bold geometric Ankara wrap dress that drapes the body with the rhythm of the West African market. Each motif speaks of community, harvest and joy.",
    price: 25000,
    category: "Ankara Dresses",
    fabric: "Ankara",
    origin: "Yoruba heritage",
    colors: ["#C2410C", "#F59E0B", "#1E3A1E"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    images: [
      ankaraImg,
      img("photo-1614291129408-3dd5436942e6"),
      img("photo-1687095969938-65f637b28a46"),
    ],
    bestseller: true,
    newArrival: true,
  },
  {
    slug: "ewu-idanioju",
    name: "Ẹwù Ìdánilójú",
    english: "Kente Peplum Top",
    description:
      "A confident Kente peplum top with fluted sleeves. Hand-loomed strips carry the proverbs of the Asante kingdom across the chest.",
    price: 18500,
    category: "Kente Wraps",
    fabric: "Kente",
    origin: "Kente — Ghanaian origin",
    colors: ["#F59E0B", "#1E3A1E", "#7C2D12"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    images: [kenteImg, img("photo-1720343340446-7dfba2a92ceb")],
    bestseller: true,
  },
  {
    slug: "buba-olorun",
    name: "Bùbá Olórun",
    english: "Adire Indigo Blouse",
    description:
      "A meditative Adire tie-dye blouse soaked in deep indigo. Every fold of the fabric was tied by hand before the dye spoke.",
    price: 15000,
    category: "Adire Tops",
    fabric: "Adire",
    origin: "Yoruba heritage",
    colors: ["#1E3A8A", "#0F172A"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    images: [adireImg, img("photo-1601653233006-5c9fd30eab12")],
    newArrival: true,
  },
  {
    slug: "iro-agbado",
    name: "Ìró Àgbàdo",
    english: "Aso-Oke Skirt Set",
    description:
      "A regal Aso-Oke skirt and top set woven in green and gold. Reserved for those who walk with the weight of celebration.",
    price: 32000,
    category: "Aso-Oke Sets",
    fabric: "Aso-Oke",
    origin: "Yoruba heritage",
    colors: ["#1E3A1E", "#F59E0B"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [img("photo-1681545290284-679e6291c440"), img("photo-1763256293918-6d40f1439fa3")],
    bestseller: true,
  },
  {
    slug: "oju-imole",
    name: "Ọjú Ìmọ́lẹ̀",
    english: "Batik Sunburst Maxi",
    description:
      "A Batik maxi dress whose sunburst pattern carries the morning light of the Niger delta across the silhouette.",
    price: 22000,
    category: "Ankara Dresses",
    fabric: "Batik",
    origin: "West African heritage",
    colors: ["#C2410C", "#F59E0B", "#FFF7ED"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1778517436072-17faa6f57ca7"), img("photo-1612833833572-4f2709907bc4")],
    newArrival: true,
  },
  {
    slug: "ewu-ife",
    name: "Ẹwù Ìfẹ̀",
    english: "Embroidered Dashiki Top",
    description:
      "A burgundy dashiki top with intricate neckline embroidery — soft enough for everyday, rich enough for ceremony.",
    price: 13500,
    category: "Adire Tops",
    fabric: "Adire",
    origin: "Pan-African heritage",
    colors: ["#7C2D12", "#F59E0B"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    images: [adireImg, img("photo-1664151101091-02a76363aeef")],
  },
  {
    slug: "iso-ila-oorun",
    name: "Ìṣọ Ìlà Oòrun",
    english: "Sunrise Ankara Co-ord",
    description:
      "A two-piece Ankara co-ordinate set printed with the colours of the eastern sunrise — sharp tailoring meets soft confidence.",
    price: 28000,
    category: "Ankara Dresses",
    fabric: "Ankara",
    origin: "Yoruba heritage",
    colors: ["#C2410C", "#F59E0B", "#1E3A1E"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    images: [ankaraImg, img("photo-1663044023437-6b3f9be28a90")],
    bestseller: true,
  },
  {
    slug: "agbada-iyawo",
    name: "Àgbádá Ìyàwó",
    english: "Bridal Aso-Oke Gown",
    description:
      "A ceremonial Aso-Oke bridal gown — heavy with hand-woven thread, light with the promise of a new name.",
    price: 75000,
    category: "Aso-Oke Sets",
    fabric: "Aso-Oke",
    origin: "Yoruba heritage",
    colors: ["#F59E0B", "#FFF7ED", "#7C2D12"],
    sizes: ["S", "M", "L", "XL"],
    images: [asoOkeImg, img("photo-1682904119073-aaf8ce0cf132")],
    newArrival: true,
  },
  {
    slug: "bubu-olola",
    name: "Bùbá Olólà",
    english: "Bubu Gown",
    description:
      "A flowing Bubu gown in deep black with bold golden Aso-Oke striped panels. Effortless drape, regal presence — made for the woman who arrives without announcing herself.",
    price: 42000,
    category: "Aso-Oke Sets",
    fabric: "Aso-Oke",
    origin: "Yoruba heritage",
    colors: ["#0d0d0d", "#F59E0B"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    images: [bubuImg, img("photo-1682904119073-aaf8ce0cf132")],
    newArrival: true,
  },
];

export const categories = [
  { slug: "Ankara Dresses", name: "Ankara Dresses", blurb: "Bold prints, fluid silhouettes" },
  { slug: "Kente Wraps", name: "Kente Wraps", blurb: "Hand-loomed strips of meaning" },
  { slug: "Aso-Oke Sets", name: "Aso-Oke Sets", blurb: "Ceremonial weight, modern cut" },
  { slug: "Adire Tops", name: "Adire Tops", blurb: "Indigo dyed by patient hands" },
  { slug: "Accessories", name: "Accessories", blurb: "Headwraps, beads, finishing touches" },
];

export const fabrics = ["Ankara", "Kente", "Adire", "Aso-Oke", "Batik"] as const;
export const allSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
export const allColors = [
  { name: "Terracotta", hex: "#C2410C" },
  { name: "Gold", hex: "#F59E0B" },
  { name: "Forest", hex: "#1E3A1E" },
  { name: "Indigo", hex: "#1E3A8A" },
  { name: "Burgundy", hex: "#7C2D12" },
  { name: "Ivory", hex: "#FFF7ED" },
];

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 4) {
  const p = getProduct(slug);
  if (!p) return [];
  return products
    .filter((x) => x.slug !== slug)
    .sort((a, b) => (a.category === p.category ? -1 : 1))
    .slice(0, count);
}
