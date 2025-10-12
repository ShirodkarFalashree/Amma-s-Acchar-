// data/pickleData.js
import mango1 from "../assets/raw mangoes.png";
import mango2 from "../assets/mangoAcchar.png";
import chilli1 from "../assets/red chillies.png";
import chilli2 from "../assets/chilliAcchar.png";
import lemon1 from "../assets/lemon.png";
import lemon2 from "../assets/lemonAcchar.png";
import garlic1 from "../assets/garlic.png";
import garlic2 from "../assets/garlicAcchar.png";
import mixed1 from "../assets/mixed.png";
import mixed2 from "../assets/mixAcchar.png";

const pickleData = [
  {
    id: 1,
    name: "Mango Pickle",
    price: 150,
    rating: 4.7,
    quantity: [1, 2, 3],
    images: [mango1, mango2],
    description:
      "Our Mango Pickle is made with sun-dried raw mangoes and handpicked Indian spices — tangy, spicy, and full of nostalgic flavor. Perfect for pairing with parathas, dal-chawal, or curd rice.",
    features: [
      "100% Homemade",
      "Authentic Indian Spices",
      "No Preservatives",
      "Packed with Love ❤️",
    ],
    testimonials: [
      {
        name: "Riya Sharma",
        text: "So flavorful and fresh! Reminds me of my grandma’s pickles.",
        rating: 5,
      },
      {
        name: "Aarav Mehta",
        text: "Perfect balance of spice and tang! Must try.",
        rating: 4,
      },
      {
        name: "Sneha Patel",
        text: "The best homemade pickle I’ve had in years!",
        rating: 5,
      },
    ],
    faqs: [
      {
        q: "Is it homemade?",
        a: "Yes! Every pickle is made in small batches at home.",
      },
      {
        q: "Does it contain preservatives?",
        a: "No preservatives are used, only traditional ingredients.",
      },
      {
        q: "How long does it last?",
        a: "Up to 6 months when stored in a cool, dry place.",
      },
    ],
  },
  {
    id: 2,
    name: "Chilli Pickle",
    price: 120,
    rating: 4.5,
    quantity: [1, 2, 3],
    images: [chilli1, chilli2],
    description:
      "Fiery red chilies blended with mustard and fenugreek seeds — a spicy treat for heat lovers! Great with rotis, khichdi, and curd rice.",
    features: [
      "Spicy & Tangy",
      "Preservative-Free",
      "Rich Aroma",
      "Homemade Taste",
    ],
    testimonials: [
      {
        name: "Rahul Verma",
        text: "Loved the punchy spice! Great with every meal.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        text: "Exactly like my mom used to make.",
        rating: 4,
      },
    ],
    faqs: [
      {
        q: "Is it too spicy?",
        a: "Medium spicy — just enough to tingle your taste buds.",
      },
      {
        q: "Can I refrigerate it?",
        a: "Yes, but it’s best stored in sunlight occasionally.",
      },
    ],
  },
  {
    id: 3,
    name: "Lemon Pickle",
    price: 130,
    rating: 4.6,
    quantity: [1, 2, 3],
    images: [lemon1, lemon2],
    description:
      "Our Lemon Pickle is the perfect mix of sour and spicy — aged to perfection to bring out the juiciest, tangiest flavor. Boosts digestion and pairs beautifully with rice or chapati.",
    features: [
      "Aged for 30 days for best flavor",
      "Boosts digestion",
      "Made with organic lemons",
      "Preservative-Free",
    ],
    testimonials: [
      {
        name: "Snehal Pawar",
        text: "So tangy and balanced — reminds me of summer lunches!",
        rating: 5,
      },
      {
        name: "Manoj Iyer",
        text: "Goes perfectly with curd rice. Very authentic taste.",
        rating: 4,
      },
    ],
    faqs: [
      {
        q: "Does it have seeds?",
        a: "Yes, but you can remove them easily while eating.",
      },
      {
        q: "How long is it aged?",
        a: "It is sun-aged for at least 3 weeks before packing.",
      },
    ],
  },
  {
    id: 4,
    name: "Garlic Pickle",
    price: 160,
    rating: 4.8,
    quantity: [1, 2, 3],
    images: [garlic1, garlic2],
    description:
      "Our Garlic Pickle is bold, aromatic, and irresistibly flavorful. Each clove is soaked in spicy mustard oil, delivering that perfect North Indian kick.",
    features: [
      "Rich in antioxidants",
      "Traditional Punjabi recipe",
      "No artificial colors",
      "Handmade in small batches",
    ],
    testimonials: [
      {
        name: "Kunal Shah",
        text: "Super flavorful! Just one spoon adds magic to the meal.",
        rating: 5,
      },
      {
        name: "Meera Nair",
        text: "The garlic is perfectly soft and full of flavor.",
        rating: 5,
      },
      {
        name: "Tanya Joshi",
        text: "Loved it! Definitely ordering again.",
        rating: 4,
      },
    ],
    faqs: [
      {
        q: "Does it have a strong smell?",
        a: "Yes, but that’s part of its rich and authentic taste!",
      },
      {
        q: "Is it too oily?",
        a: "We use minimal mustard oil for the perfect flavor balance.",
      },
    ],
  },
  {
    id: 5,
    name: "Mixed Veg Pickle",
    price: 140,
    rating: 4.4,
    quantity: [1, 2, 3],
    images: [mixed1, mixed2],
    description:
      "A crunchy mix of carrots, cauliflower, and turnips soaked in tangy masala — every bite is a burst of spice and freshness.",
    features: [
      "Loaded with vegetables",
      "Crunchy & tangy",
      "Homestyle recipe",
      "No preservatives or additives",
    ],
    testimonials: [
      {
        name: "Neha Gupta",
        text: "The crunch and masala balance is just perfect!",
        rating: 5,
      },
      {
        name: "Vikas Singh",
        text: "Reminds me of my childhood winters in Delhi!",
        rating: 4,
      },
    ],
    faqs: [
      {
        q: "Which veggies are included?",
        a: "Carrots, cauliflower, turnip, and green chili.",
      },
      {
        q: "Does it stay crunchy?",
        a: "Yes! Proper sun-drying keeps it crunchy for months.",
      },
    ],
  },
];

export default pickleData;
