"use client"

import React, { useState } from 'react';
import { Appbar } from '../components/appBar/AppBar';
interface CaseBrief {
    id: number;
    title: string;
    citation: string;
    court: string;
    image: string;
    facts: string;
    issue: string;
    holding: string;
    reasoning: string;
    significance: string;
  }
  const initialCaseBriefs: CaseBrief[] =[
    {
      id: 1,
      title: "Brown v. Board of Education",
      citation: "347 U.S. 483 (1954)",
      court: "Supreme Court of the United States",
      image: "https://static.vecteezy.com/system/resources/thumbnails/035/305/333/small/ai-generated-law-books-gavel-and-scales-symbolizing-justice-on-a-table-generative-ai-photo.jpg",
      facts: "Several cases involving African-American children who had been denied admission to schools attended by white children under laws requiring or permitting segregation according to race were consolidated and brought before the Supreme Court.",
      issue: "Does segregation of children in public schools solely on the basis of race deprive the minority children of equal educational opportunities?",
      holding: "Yes. Separate educational facilities are inherently unequal and violate the Equal Protection Clause of the Fourteenth Amendment.",
      reasoning: "The Court found that segregation generates a feeling of inferiority that may affect the hearts and minds of children in a way unlikely to ever be undone. The separation of educational facilities is inherently unequal and violates the Equal Protection Clause of the Fourteenth Amendment.",
      significance: "Landmark decision that overturned the \"separate but equal\" doctrine established in Plessy v. Ferguson and paved the way for integration and the civil rights movement."
    },
    {
      id: 2,
      title: "Marbury v. Madison",
      citation: "5 U.S. 137 (1803)",
      court: "Supreme Court of the United States",
      image: "https://media.istockphoto.com/id/1139699594/photo/law-concept-themis-statue-judge-hammer-and-books.jpg?s=612x612&w=0&k=20&c=VgFftTqxcgJswpCK8IQS9bpCo9aDJ_Vsgigwa0bnH-c=",
      facts: "On his last day in office, President John Adams appointed several justices of the peace. The commissions were signed and sealed but not delivered before Adams left office. The new Secretary of State, James Madison, refused to deliver the commissions, including the one for William Marbury.",
      issue: "Does Marbury have a right to his commission? Does the law provide him with a remedy? Can the Supreme Court issue the remedy?",
      holding: "While Marbury had a right to his commission and the law generally provides a remedy, the Supreme Court cannot issue a writ of mandamus as requested because Section 13 of the Judiciary Act of 1789 is unconstitutional in granting this power to the Court.",
      reasoning: "The Court established that the Constitution is the supreme law of the land and that the Court has the power of judicial review to strike down laws that conflict with the Constitution.",
      significance: "Established the principle of judicial review and affirmed the Supreme Court's role as the ultimate interpreter of the Constitution."
    },
    {
      id: 3,
      title: "Roe v. Wade",
      citation: "410 U.S. 113 (1973)",
      court: "Supreme Court of the United States",
      image: "https://burst.shopifycdn.com/photos/judge-gavel-and-law-books.jpg?width=1000&format=pjpg&exif=0&iptc=0",
      facts: "Jane Roe (pseudonym) challenged Texas laws criminalizing abortion except to save the mother's life, claiming they violated her constitutional rights.",
      issue: "Do abortion laws violate the Constitution by infringing on a woman's right to privacy?",
      holding: "Yes. The Court recognized a woman's right to choose to have an abortion as part of a broader right to privacy, protected by the Due Process Clause of the Fourteenth Amendment.",
      reasoning: "The Court balanced a woman's right to privacy against the state's interest in protecting potential life, creating a trimester framework to guide when states could regulate abortion.",
      significance: "Established constitutional protection for a woman's right to choose abortion, though later cases modified this framework."
    },
    {
      id: 4,
      title: "Miranda v. Arizona",
      citation: "384 U.S. 436 (1966)",
      court: "Supreme Court of the United States",
      image: "https://t3.ftcdn.net/jpg/01/07/15/58/360_F_107155820_NCUA4CtCkIDXXHnKAlWVzUvRjfMe0k5D.jpg",
      facts: "Ernesto Miranda was arrested and questioned by police regarding a kidnapping and rape. After two hours of interrogation, he signed a confession. He was not advised of his right to counsel or his right to remain silent.",
      issue: "Does the Fifth Amendment's protection against self-incrimination extend to the police interrogation of a suspect?",
      holding: "Yes. The Court held that statements made by a defendant during interrogation while in police custody are only admissible if the defendant was informed of their right to consult with an attorney and their right against self-incrimination, and the defendant waived those rights.",
      reasoning: "The Court found that the interrogation environment creates inherent pressures that work to undermine an individual's will to resist and compel him to speak. Without proper safeguards, this pressure can force individuals to make self-incriminating statements.",
      significance: "Led to the creation of 'Miranda rights' that must be read to suspects before custodial interrogation."
    },
    {
      id: 5,
      title: "Gideon v. Wainwright",
      citation: "372 U.S. 335 (1963)",
      court: "Supreme Court of the United States",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeSVCozafDbr0cXdPNrMJT6xDoXYON1eyrDjT-HUgE4JchX_JfKF4ycEThtbrIK9f267A&usqp=CAU",
      facts: "Clarence Earl Gideon was charged with breaking into a poolroom. He appeared in court without funds and without a lawyer and asked the court to appoint counsel for him. The court refused, stating that Florida law only permitted appointment of counsel for capital offenses.",
      issue: "Does the Sixth Amendment's right to counsel in criminal cases extend to felony defendants in state courts?",
      holding: "Yes. The Supreme Court held that the Sixth Amendment's guarantee of counsel is a fundamental right essential to a fair trial and is made obligatory on the states by the Fourteenth Amendment.",
      reasoning: "The Court reasoned that lawyers in criminal courts are necessities, not luxuries. In a criminal trial, a defendant cannot be assured a fair trial unless counsel is provided for them.",
      significance: "Established that states must provide attorneys to criminal defendants who cannot afford them."
    },
    {
      id: 6,
      title: "United States v. Nixon",
      citation: "418 U.S. 683 (1974)",
      court: "Supreme Court of the United States",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgO5BZtWqKeLZhNV7vBRuzXhCBIJwKB0mXpdfBPYENi36T65bj4unn4YZ5LH2iBdanO0E&usqp=CAU",
      facts: "Special prosecutor Leon Jaworski subpoenaed tape recordings of conversations between President Nixon and his advisers. Nixon asserted executive privilege and refused to turn over the tapes.",
      issue: "Does executive privilege allow a president to withhold evidence relevant to a criminal case?",
      holding: "No. The Court held that executive privilege cannot override the needs of the judicial process if evidence is relevant to a criminal case.",
      reasoning: "The Court recognized the existence of executive privilege but found it is not absolute. The legitimate needs of the judicial process may outweigh presidential privilege, particularly in cases involving criminal proceedings.",
      significance: "Limited the scope of executive privilege and reinforced the principle that no person, not even the President, is above the law."
    }
  ];
  export default function TrendingCaseBriefs() {

    const [caseBriefs, setCaseBriefs] = useState(initialCaseBriefs);
    const [selectedCase, setSelectedCase] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredCases = caseBriefs.filter((brief) =>
      brief.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brief.court.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const showCaseDetails = (id: number) => {
      setSelectedCase(id);
    };
  
    const backToGallery = () => {
      setSelectedCase(null);
    };
  
    if (selectedCase !== null) {
      const caseData: CaseBrief | undefined = caseBriefs.find(
        (brief) => brief.id === selectedCase
      );
  
      // Render a fallback if caseData is undefined
      if (!caseData) {
        return (
          <div className="min-h-screen bg-orange-50 p-8 font-sans">
            <button
              onClick={backToGallery}
              className="text-orange-50 mb-6 px-4 py-2 bg-yellow-950 hover:bg-gray-300 rounded-md flex items-center font-semibold"
            >
              ← Back to Cases
            </button>
            <p className="text-red-500 font-bold">Error: Case details not found.</p>
          </div>
        );
      }
  
      return (
        <div>
        
          <div className="bg-orange-50 p-8 font-sans">
            <button
              onClick={backToGallery}
              className="text-orange-50 mb-6 px-4 py-2 bg-yellow-950 hover:bg-gray-300 rounded-md flex items-center font-semibold"
            >
              ← Back to Cases
            </button>
  
            <div className="flex flex-col items-center mb-8 animate-fadeIn">
              <div className="w-80 h-56 rounded-lg shadow-md mb-4 overflow-hidden">
                <img
                  src={caseData.image}
                  alt={caseData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-amber-950 text-2xl font-bold text-center">
                {caseData.title}
              </h1>
              <p className="text-gray-600 mt-2">
                {caseData.citation} • {caseData.court}
              </p>
            </div>
  
            <div className="space-y-6 animate-fadeIn delay-200">
              <div>
                <h2 className="text-amber-950 font-bold text-xl border-b border-gray-300 pb-2 mb-3">
                  Facts
                </h2>
                <p className="text-amber-900 font-semibold">{caseData.facts}</p>
              </div>
  
              <div>
                <h2 className="text-amber-950 text-xl font-bold border-b border-gray-300 pb-2 mb-3">
                  Issue
                </h2>
                <p className="text-amber-900 font-semibold">{caseData.issue}</p>
              </div>
  
              <div>
                <h2 className="text-amber-950 text-xl font-bold border-b border-gray-300 pb-2 mb-3">
                  Holding
                </h2>
                <p className="text-amber-900 font-semibold">{caseData.holding}</p>
              </div>
  
              <div>
                <h2 className="text-amber-950 text-xl font-bold border-b border-gray-300 pb-2 mb-3">
                  Reasoning
                </h2>
                <p className="text-amber-900 font-semibold">{caseData.reasoning}</p>
              </div>
  
              <div>
                <h2 className="text-amber-950 text-xl font-bold border-b border-gray-300 pb-2 mb-3">
                  Significance
                </h2>
                <p className="text-amber-900 font-semibold">
                  {caseData.significance}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
        <div>
             <Appbar/>
      <div className="bg-orange-50 p-8 font-sans">
        <h1 className="text-amber-950 text-4xl font-bold mb-8 text-center">
          Trending Case Briefs
        </h1>
  
        <div className="mb-8 text-lg text-black">
          <input
            type="text"
            placeholder="Search cases..."
            className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-900 shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredCases.map((brief) => (
            <div
              key={brief.id}
              className="flex flex-col items-center cursor-pointer transition-transform duration-500 hover:scale-105 hover:shadow-xl animate-fadeIn"
              onClick={() => showCaseDetails(brief.id)}
            >
              <div className="w-80 h-56 rounded-lg shadow-md mb-4 overflow-hidden">
                <img
                  src={brief.image}
                  alt={brief.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-amber-950 text-xl font-bold text-center">
                {brief.title}
              </h2>
              <p className="text-gray-600 mt-2 text-center">{brief.court}</p>
            </div>
          ))}
        </div>
  
        {filteredCases.length === 0 && (
          <div className="text-center p-8 text-amber-900 text-xl">
            No case briefs found matching your search criteria.
          </div>
        )}
      </div>
</div>
    );
  }
  
