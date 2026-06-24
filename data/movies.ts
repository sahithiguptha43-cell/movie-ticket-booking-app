export interface Movie {
  id: number;
  title: string;
  genre: string[];
  duration: number; // minutes
  rating: string;
  imdb: number;
  description: string;
  poster: string;
  backdrop: string;
  director: string;
  cast: string[];
  language: string;
  releaseDate: string;
}

export interface ShowTime {
  id: string;
  time: string;
  hall: string;
  price: { standard: number; premium: number; vip: number };
  available: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: 166,
    rating: "PG-13",
    imdb: 8.5,
    description:
      "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    poster:
      "https://images.pexels.com/photos/7991266/pexels-photo-7991266.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600",
    backdrop:
      "https://images.pexels.com/photos/7991266/pexels-photo-7991266.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler"],
    language: "English",
    releaseDate: "2024-03-01",
  },
  {
    id: 2,
    title: "Oppenheimer",
    genre: ["Biography", "Drama", "History"],
    duration: 180,
    rating: "R",
    imdb: 8.9,
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, and the subsequent political persecution that followed.",
    poster:
      "https://images.pexels.com/photos/8263369/pexels-photo-8263369.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600",
    backdrop:
      "https://images.pexels.com/photos/8263369/pexels-photo-8263369.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    language: "English",
    releaseDate: "2023-07-21",
  },
  {
    id: 3,
    title: "The Batman Returns",
    genre: ["Action", "Crime", "Thriller"],
    duration: 156,
    rating: "PG-13",
    imdb: 7.8,
    description:
      "Gotham's shadowy vigilante returns to face a new wave of crime, uncovering a vast conspiracy that strikes at the heart of the city's elite, testing his limits both physically and morally.",
    poster:
      "https://images.pexels.com/photos/7991485/pexels-photo-7991485.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600",
    backdrop:
      "https://images.pexels.com/photos/7991485/pexels-photo-7991485.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Colin Farrell"],
    language: "English",
    releaseDate: "2024-06-15",
  },
  {
    id: 4,
    title: "Interstellar Beyond",
    genre: ["Sci-Fi", "Drama", "Mystery"],
    duration: 169,
    rating: "PG-13",
    imdb: 8.7,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival after Earth becomes uninhabitable, confronting the mysteries of time, gravity and love.",
    poster:
      "https://images.pexels.com/photos/806880/pexels-photo-806880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600",
    backdrop:
      "https://images.pexels.com/photos/806880/pexels-photo-806880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    language: "English",
    releaseDate: "2024-11-07",
  },
  {
    id: 5,
    title: "Avatar: Fire & Ash",
    genre: ["Action", "Adventure", "Fantasy"],
    duration: 192,
    rating: "PG-13",
    imdb: 7.6,
    description:
      "Jake Sully and Neytiri must work together with new allies and old enemies to protect their home on Pandora from a new devastating threat that emerges from the volcanic regions of the moon.",
    poster:
      "https://images.pexels.com/photos/8263354/pexels-photo-8263354.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600",
    backdrop:
      "https://images.pexels.com/photos/8263354/pexels-photo-8263354.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver", "Kate Winslet"],
    language: "English",
    releaseDate: "2024-12-20",
  },
  {
    id: 6,
    title: "Midnight in Paris",
    genre: ["Romance", "Comedy", "Fantasy"],
    duration: 94,
    rating: "PG-13",
    imdb: 7.7,
    description:
      "A romantic comedy set in Paris about a family that is there on a business trip. The main character, a nostalgic Hollywood writer, is conflicted about his fiancée and his own writing ambitions.",
    poster:
      "https://images.pexels.com/photos/7991320/pexels-photo-7991320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600",
    backdrop:
      "https://images.pexels.com/photos/7991320/pexels-photo-7991320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    director: "Woody Allen",
    cast: ["Owen Wilson", "Rachel McAdams", "Marion Cotillard", "Kathy Bates"],
    language: "English / French",
    releaseDate: "2024-08-10",
  },
];

export const showTimes: Record<number, ShowTime[]> = {
  1: [
    { id: "1a", time: "10:00 AM", hall: "Hall A", price: { standard: 12, premium: 16, vip: 24 }, available: true },
    { id: "1b", time: "01:30 PM", hall: "Hall B", price: { standard: 14, premium: 18, vip: 26 }, available: true },
    { id: "1c", time: "05:00 PM", hall: "IMAX Hall", price: { standard: 18, premium: 24, vip: 36 }, available: true },
    { id: "1d", time: "08:30 PM", hall: "Hall A", price: { standard: 14, premium: 18, vip: 26 }, available: true },
  ],
  2: [
    { id: "2a", time: "11:00 AM", hall: "Hall C", price: { standard: 12, premium: 16, vip: 24 }, available: true },
    { id: "2b", time: "03:00 PM", hall: "Hall A", price: { standard: 14, premium: 18, vip: 26 }, available: true },
    { id: "2c", time: "07:00 PM", hall: "IMAX Hall", price: { standard: 18, premium: 24, vip: 36 }, available: true },
  ],
  3: [
    { id: "3a", time: "09:30 AM", hall: "Hall B", price: { standard: 12, premium: 16, vip: 24 }, available: true },
    { id: "3b", time: "12:45 PM", hall: "Hall A", price: { standard: 14, premium: 18, vip: 26 }, available: true },
    { id: "3c", time: "04:15 PM", hall: "Hall C", price: { standard: 14, premium: 18, vip: 26 }, available: true },
    { id: "3d", time: "08:00 PM", hall: "IMAX Hall", price: { standard: 18, premium: 24, vip: 36 }, available: true },
  ],
  4: [
    { id: "4a", time: "10:30 AM", hall: "Hall A", price: { standard: 12, premium: 16, vip: 24 }, available: true },
    { id: "4b", time: "02:00 PM", hall: "IMAX Hall", price: { standard: 18, premium: 24, vip: 36 }, available: true },
    { id: "4c", time: "06:30 PM", hall: "Hall B", price: { standard: 14, premium: 18, vip: 26 }, available: true },
  ],
  5: [
    { id: "5a", time: "11:30 AM", hall: "IMAX Hall", price: { standard: 18, premium: 24, vip: 36 }, available: true },
    { id: "5b", time: "03:30 PM", hall: "Hall A", price: { standard: 14, premium: 18, vip: 26 }, available: true },
    { id: "5c", time: "07:30 PM", hall: "Hall C", price: { standard: 14, premium: 18, vip: 26 }, available: true },
  ],
  6: [
    { id: "6a", time: "12:00 PM", hall: "Hall B", price: { standard: 12, premium: 16, vip: 24 }, available: true },
    { id: "6b", time: "04:00 PM", hall: "Hall A", price: { standard: 14, premium: 18, vip: 26 }, available: true },
    { id: "6c", time: "07:45 PM", hall: "Hall C", price: { standard: 14, premium: 18, vip: 26 }, available: true },
  ],
};

export const generateSeats = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;
  const takenSeats = new Set<string>();
  // randomly mark ~30% seats as taken
  rows.forEach((row) => {
    for (let col = 1; col <= seatsPerRow; col++) {
      if (Math.random() < 0.3) takenSeats.add(`${row}${col}`);
    }
  });
  return { rows, seatsPerRow, takenSeats };
};
