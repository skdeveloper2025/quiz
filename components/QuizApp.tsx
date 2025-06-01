// components/QuizApp.tsx
"use client";
import { useState } from "react";
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl p-6 shadow-xl ${className}`}>{children}</div>
);
const Button = ({ children, onClick, disabled, className = "", variant = "default", isSelected = false }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: string;
  isSelected?: boolean;
}) => {
  const base = "px-4 py-2 rounded-xl w-full text-left transition-all duration-150";
  const styles = variant === "outline"
    ? "border border-gray-300 bg-white hover:bg-blue-100"
    : disabled
    ? ""
    : isSelected
    ? "bg-blue-500 text-white"
    : "bg-white hover:bg-blue-100";
  return (
    <button
      className={`${base} ${styles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const questions = [
  {
    question: "Who confirmed Indian fighter jet losses during Operation Sindoor?",
    options: ["Air Marshal A.K. Bharti", "CDS General Anil Chauhan", "General Shamshad Mirza", "Amit Shah"],
    answer: 1,
  },
  {
    question: "What was the objective of Operation Sindoor?",
    options: ["Air strike on China", "Evacuation from Afghanistan", "Retaliation against the Pahalgam terror attack", "Rescue from floods in Northeast India"],
    answer: 2,
  },
  {
    question: "Which state was affected by Cyclone Remal?",
    options: ["Odisha", "West Bengal", "Assam", "Maharashtra"],
    answer: 1,
  },
  {
    question: "Which Indian ship was deployed for relief operations during Cyclone Remal?",
    options: ["INS Jalashwa", "INS Kiltan", "INS Vikrant", "INS Sunayna"],
    answer: 1,
  },
  {
    question: "Which sportsperson became the brand ambassador for the Ministry of Women and Child Development?",
    options: ["Mary Kom", "Sania Mirza", "PV Sindhu", "Neeraj Chopra"],
    answer: 2,
  },
  {
    question: "Who inaugurated the ICMR-NIN’s 12 new nutritional research centers?",
    options: ["Dr. Mansukh Mandaviya", "Narendra Modi", "JP Nadda", "Smriti Irani"],
    answer: 0,
  },
  {
    question: "Which space agency planned to study asteroid Apophis in 2029?",
    options: ["NASA", "ISRO", "ESA", "JAXA"],
    answer: 0,
  },
  {
    question: "Which film won Best Film at Cannes 2024?",
    options: ["Anora", "The Seed", "The Zone of Interest", "All We Imagine As Light"],
    answer: 0,
  },
  {
    question: "What is the theme of World No Tobacco Day 2024?",
    options: ["Tobacco and Lung Health", "Protecting Children from Tobacco Industry Interference", "Tobacco: Threat to Development", "Commit to Quit"],
    answer: 1,
  },
  {
    question: "Which country hosted the 2024 BIMSTEC Summit?",
    options: ["Sri Lanka", "India", "Thailand", "Bangladesh"],
    answer: 0,
  },
  // 40 more MCQs added below
  {
    question: "Which Indian airport recently installed a disabled-friendly e-vehicle service?",
    options: ["Mumbai Airport", "Chennai Airport", "Delhi Airport", "Bangalore Airport"],
    answer: 0
  },
  {
    question: "Which country gifted a patrol vessel to the Maldives in May 2024?",
    options: ["India", "USA", "China", "Sri Lanka"],
    answer: 0
  },
  {
    question: "Who is the current President of Iran who passed away in a helicopter crash in May 2024?",
    options: ["Ebrahim Raisi", "Hassan Rouhani", "Mohammad Khatami", "Ali Khamenei"],
    answer: 0
  },
  {
    question: "Which global leader visited India in May 2024 to strengthen defense ties?",
    options: ["Emmanuel Macron", "Joe Biden", "Fumio Kishida", "Vladimir Putin"],
    answer: 2
  },
  {
    question: "Which Indian city hosted the Startup Mahakumbh 2024?",
    options: ["Bengaluru", "Hyderabad", "New Delhi", "Mumbai"],
    answer: 2
  },
  {
    question: "India’s first underwater metro is launched in which city?",
    options: ["Mumbai", "Kolkata", "Chennai", "Ahmedabad"],
    answer: 1
  },
  {
    question: "Who became the first Indian bowler to take 600 wickets in Test cricket?",
    options: ["Ravichandran Ashwin", "Anil Kumble", "Kapil Dev", "Zaheer Khan"],
    answer: 0
  },
  {
    question: "Which country became the 100th full member of the International Solar Alliance (ISA)?",
    options: ["Chile", "Thailand", "Armenia", "Maldives"],
    answer: 2
  },
  {
    question: "Which Indian bank launched a GenAI-powered virtual assistant in May 2024?",
    options: ["SBI", "ICICI Bank", "HDFC Bank", "Axis Bank"],
    answer: 0
  },
  {
    question: "Which satellite did ISRO launch to monitor climate and ocean health?",
    options: ["Oceansat-3", "INSAT-4B", "RISAT-2BR2", "Gaganyaan"],
    answer: 0
  },
  // Remaining 30 MCQs
  {
    question: "Which country signed a migration partnership agreement with India in May 2024?",
    options: ["Germany", "Italy", "France", "UK"],
    answer: 1
  },
  {
    question: "Who won the 2024 IPL Orange Cap?",
    options: ["Ruturaj Gaikwad", "Virat Kohli", "Travis Head", "Shubman Gill"],
    answer: 1
  },
  {
    question: "What is the name of India’s first AI teacher robot launched in Kerala?",
    options: ["Iris", "Shiksha-Bot", "Iris X", "Teacher AI"],
    answer: 2
  },
  {
    question: "Which state topped the SDG India Index 2024?",
    options: ["Kerala", "Tamil Nadu", "Goa", "Himachal Pradesh"],
    answer: 0
  },
  {
    question: "Which city ranked first in the Swachh Survekshan Awards 2024?",
    options: ["Surat", "Indore", "Bhopal", "Mysuru"],
    answer: 1
  },
  {
    question: "Which tech company launched a UPI payments service in India in May 2024?",
    options: ["Apple", "Meta", "Amazon", "Samsung"],
    answer: 3
  },
  {
    question: "Who is the current Chief of Defence Staff of India?",
    options: ["General Bipin Rawat", "General Anil Chauhan", "Lt. Gen. Upendra Dwivedi", "Admiral R. Hari Kumar"],
    answer: 1
  },
  {
    question: "Which Indian city hosted the Global Buddhist Summit 2024?",
    options: ["Sarnath", "New Delhi", "Bodh Gaya", "Varanasi"],
    answer: 2
  },
  {
    question: "Which Indian state launched the 'Savera' scheme for women’s safety?",
    options: ["Madhya Pradesh", "Uttar Pradesh", "Punjab", "Rajasthan"],
    answer: 2
  },
  {
    question: "Which country will host COP30 in 2025?",
    options: ["Brazil", "India", "UAE", "Indonesia"],
    answer: 0
  },
  // Final 20 MCQs
  {
    question: "Which Indian state launched the ‘e-Samadhan’ grievance portal?",
    options: ["Himachal Pradesh", "Punjab", "Uttarakhand", "Assam"],
    answer: 0
  },
  {
    question: "Who won the 2024 French Open Women’s Singles title?",
    options: ["Iga Swiatek", "Coco Gauff", "Aryna Sabalenka", "Elena Rybakina"],
    answer: 0
  },
  {
    question: "Which mission is India planning to explore Venus?",
    options: ["Shukrayaan-1", "Venus Probe", "Surya Mission", "Venera Bharat"],
    answer: 0
  },
  {
    question: "Which Indian cricketer was appointed as ICC’s brand ambassador in May 2024?",
    options: ["MS Dhoni", "Virat Kohli", "Rohit Sharma", "Sachin Tendulkar"],
    answer: 3
  },
  {
    question: "Which airport was rated the cleanest in India by AAI in 2024?",
    options: ["Rajkot Airport", "Kochi Airport", "Hyderabad Airport", "Indore Airport"],
    answer: 3
  },
  {
    question: "Which scheme replaced the Pradhan Mantri Garib Kalyan Anna Yojana in 2024?",
    options: ["PM Anna Suraksha Yojana", "PM Garib Kalyan Plus", "PM Garib Kalpana Yojana", "PM Poshan"],
    answer: 0
  },
  {
    question: "Which city is hosting the 2025 G20 Summit?",
    options: ["Tokyo", "Brasilia", "Paris", "Riyadh"],
    answer: 1
  },
  {
    question: "Which country launched the world’s first 6G satellite in 2024?",
    options: ["USA", "Japan", "China", "South Korea"],
    answer: 2
  },
  {
    question: "Which bank topped the Forbes list of World’s Best Banks in India 2024?",
    options: ["SBI", "HDFC Bank", "Canara Bank", "IDFC First Bank"],
    answer: 3
  },
  {
    question: "Who was awarded the 2024 Templeton Prize?",
    options: ["Dr. Jane Goodall", "Dalai Lama", "Dr. Francis Collins", "Desmond Tutu"],
    answer: 2
  },
  {
    question: "What is India’s rank in the Global Innovation Index 2024?",
    options: ["35th", "40th", "42nd", "46th"],
    answer: 0
  },
  {
    question: "Which Indian became the Chief Economist at IMF in 2024?",
    options: ["Raghuram Rajan", "Gita Gopinath", "Krishna Srinivasan", "Arvind Subramanian"],
    answer: 2
  },
  {
    question: "Which country is developing a submarine volcano observatory with India?",
    options: ["Japan", "Indonesia", "Australia", "USA"],
    answer: 1
  },
  {
    question: "What is India’s forex reserve as of May 2024?",
    options: ["$640 billion", "$630 billion", "$615 billion", "$600 billion"],
    answer: 0
  },
  {
    question: "Which festival in India was granted UNESCO heritage tag in 2024?",
    options: ["Hornbill Festival", "Durga Puja", "Onam", "Bihu"],
    answer: 3
  },
  {
    question: "Which company became India’s most valuable startup in 2024?",
    options: ["Byju's", "Flipkart", "Swiggy", "Zepto"],
    answer: 3
  },
  {
    question: "Which union ministry launched the ‘Mera Gaon Meri Dharohar’ initiative?",
    options: ["Ministry of Culture", "Ministry of Rural Development", "Ministry of Tourism", "Ministry of Panchayati Raj"],
    answer: 0
  },
  {
    question: "Which Indian state launched the 'Mukhya Mantri Ladli Bahna Yojana'?",
    options: ["Madhya Pradesh", "Bihar", "Chhattisgarh", "Jharkhand"],
    answer: 0
  },
  {
    question: "Which Indian received the 2024 Grammy for Best Global Music Album?",
    options: ["Ricky Kej", "Zakir Hussain", "A.R. Rahman", "Shankar Mahadevan"],
    answer: 1
  },
  {
    question: "Which planet’s atmosphere did ISRO announce to explore with a future orbiter?",
    options: ["Venus", "Jupiter", "Mars", "Uranus"],
    answer: 0
  }
  // End of 50 MCQs
];

export default function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleSubmit = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowSummary(true);
    }
  };

  const summary = () => {
    let correct = 0, incorrect = 0, unattempted = 0;
    questions.forEach((q, i) => {
      if (answers[i] === undefined || answers[i] === null) unattempted++;
      else if (answers[i] === q.answer) correct++;
      else incorrect++;
    });
    return { correct, incorrect, unattempted };
  };

  const pieData = Object.entries(summary()).map(([name, value]) => ({ name, value }));
  const COLORS = ["#22c55e", "#ef4444", "#eab308"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {!showSummary ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4">Question {current + 1} of {questions.length}</h2>
              <p className="text-lg font-medium mb-4">{questions[current].question}</p>
              <div className="space-y-2">
                {questions[current].options.map((opt, idx) => {
                  const isCorrect = idx === questions[current].answer;
                  const isSelected = selected === idx;
                  const wasSelected = answers[current] === idx;
                  const wasCorrect = answers[current] === questions[current].answer;
                  const highlight =
  answers[current] == null
    ? isSelected
      ? "border-blue-500 bg-blue-50"
      : ""
    : wasSelected && !isCorrect
    ? "border-red-500 bg-red-50"
    : isCorrect
    ? "border-green-500 bg-green-50"
    : "";
                  return (
                      <Button
  key={idx}
  isSelected={isSelected}
  onClick={() => setSelected(idx)}
  disabled={answers[current] != null}
  className={`w-full justify-start ${highlight}`}
>
  {opt}
</Button>
                    );
                })}
              </div>
              {answers[current] == null && selected !== null && (
                <Button className="mt-6 w-full" onClick={handleSubmit}>
                  Submit & Next
                </Button>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center bg-white p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Quiz Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {Object.entries(summary()).map(([key, val], i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 shadow">
                  <p className="text-xl font-semibold capitalize">{key}</p>
                  <p className="text-2xl font-bold">{val}</p>
                </div>
              ))}
            </div>
            <PieChart width={300} height={250}>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div className="text-left mt-8">
              <h3 className="text-xl font-bold mb-4">All Questions Review</h3>
              {questions.map((q, i) => (
                <div key={i} className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <p className="font-semibold mb-2">Q{i + 1}: {q.question}</p>
                  <ul className="space-y-1">
                    {q.options.map((opt, j) => {
                      const isCorrect = j === q.answer;
                      const isSelected = answers[i] === j;
                      const bgColor = isCorrect
                        ? "bg-green-100 border-green-500"
                        : isSelected
                        ? "bg-red-100 border-red-500"
                        : "bg-white border-gray-200";
                      return (
                        <li
                          key={j}
                          className={`px-3 py-2 border rounded ${bgColor}`}
                        >
                          {opt} {isCorrect ? "✓" : isSelected ? "✗" : ""}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
