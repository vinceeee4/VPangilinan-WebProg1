import teamsImg from "../teams.jpg";
import driversImg from "../drivers.jpg";
import circuitsImg from "../circuits.jpg";
import article1Img from "../article1.jpg";
import article2Img from "../article2.jpg";
import article3Img from "../article3.jpg";
import article4Img from "../article4.jpg";
import heroImg from "../hero.jpg";

const articles = [
  {
    name: "f1-introduction",
    title: "Introduction to Formula 1",
    image: heroImg,
    content: [
      "Formula 1 is the highest class of international racing for open-wheel single-seater formula racing cars sanctioned by the Fédération Internationale de l'Automobile (FIA).",
      "F1 cars are the fastest racing cars in the world, capable of speeds over 200 mph and accelerating from 0-60 mph in under 2 seconds.",
      "The sport features 20 drivers competing in teams, with races held on circuits around the world throughout the season.",
      "F1 combines cutting-edge technology, engineering excellence, and human skill in a thrilling spectacle of speed and strategy."
    ]
  },
  {
    name: "f1-teams",
    title: "Formula 1 Teams",
    image: teamsImg,
    content: [
      "F1 teams are the backbone of the sport, consisting of constructors who design, build, and race the cars. There are currently 10 teams in the championship.",
      "Each team employs hundreds of engineers, mechanics, and support staff working tirelessly to develop the fastest cars possible.",
      "Examples of top teams include Mercedes AMG Petronas, Red Bull Racing, Ferrari, and McLaren Racing.",
      "Team performance depends on car design, aerodynamics, engine power, and the ability to adapt to changing regulations."
    ]
  },
  {
    name: "f1-drivers",
    title: "Formula 1 Drivers",
    image: driversImg,
    content: [
      "F1 drivers are elite athletes who push the limits of human capability in the most demanding motorsport on the planet.",
      "They must have exceptional reflexes, physical fitness, and mental resilience to handle G-forces up to 6G and make split-second decisions at 200+ mph.",
      "Legendary drivers include Michael Schumacher, Ayrton Senna, Lewis Hamilton, and Max Verstappen.",
      "Modern drivers combine driving skill with engineering knowledge and strategic thinking during races."
    ]
  },
  {
    name: "f1-circuits",
    title: "Iconic F1 Circuits",
    image: circuitsImg,
    content: [
      "F1 races take place on purpose-built circuits designed to test every aspect of car and driver performance.",
      "Circuits vary from high-speed tracks like Monza and Spa to technical circuits like Monaco and Singapore.",
      "Each circuit has unique challenges: Monza's high speeds, Monaco's tight corners, Spa's elevation changes.",
      "Circuit design affects strategy, with factors like DRS zones, pit lane layouts, and weather conditions playing crucial roles."
    ]
  },
  {
    name: "f1-strategy",
    title: "F1 Race Strategy",
    image: article1Img,
    content: [
      "Race strategy in F1 involves tire management, pit stops, fuel efficiency, and adapting to changing conditions.",
      "Teams must decide when to pit for new tires, balancing speed against durability and weather changes.",
      "Undercut and overcut strategies can gain positions, while safety cars and virtual safety cars create opportunities.",
      "Data analysis and real-time decision making are crucial for success in modern F1 racing."
    ]
  },
  {
    name: "f1-technology",
    title: "F1 Technology and Innovation",
    image: article2Img,
    content: [
      "F1 is at the forefront of automotive technology, with innovations that trickle down to road cars.",
      "Hybrid power units combine turbocharged V6 engines with electric motors for incredible performance and efficiency.",
      "Aerodynamic design focuses on downforce and drag reduction, with wings and diffusers creating massive grip.",
      "Advanced materials like carbon fiber composites make cars lightweight yet incredibly strong and safe."
    ]
  },
  {
    name: "f1-history",
    title: "The History of Formula 1",
    image: article3Img,
    content: [
      "Formula 1 began in 1950 with the first World Championship race at Silverstone, England.",
      "The sport has evolved from basic open-wheel cars to the sophisticated hybrid machines we see today.",
      "Key eras include the 1970s with Lotus and Ferrari dominance, the 1980s turbo era, and the modern hybrid era starting in 2014.",
      "F1 has adapted to changing safety standards, environmental concerns, and technological advancements throughout its history."
    ]
  },
  {
    name: "f1-championships",
    title: "F1 World Championships",
    image: article4Img,
    content: [
      "The F1 World Championship consists of Drivers' and Constructors' titles, awarded at the end of each season.",
      "Points are earned based on finishing positions, with bonus points for fastest lap and sprint race wins.",
      "The season culminates with the final race, where champions are crowned in dramatic fashion.",
      "Rivalries between drivers and teams create unforgettable moments and stories that define F1 history."
    ]
  }
];

export default articles;