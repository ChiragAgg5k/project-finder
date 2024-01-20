"use client";

import { useState } from "react";
import {api} from "@/trpc/react";

const interests = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cyber Security",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Game Development",
  "Robotics",
  "Internet of Things",
  "Other",
];

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Spring",
  "Laravel",
  "PHP",
  "Java",
  "Python",
  "C",
  "C++",
  "C#",
  "Kotlin",
  "Swift",
  "Flutter",
  "React Native",
  "Android",
  "iOS",
  "SQL",
  "MongoDB",
  "Firebase",
  "PostgreSQL",
  "MySQL",
  "NoSQL",
  "Redis",
  "GraphQL",
  "REST",
  "Git",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "Heroku",
  "Digital Ocean",
  "Linux",
  "Windows",
  "MacOS",
  "Arduino",
  "Raspberry Pi",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe XD",
  "Figma",
  "Blender",
  "Unity",
  "Unreal Engine",
  "Other",
];

const skillLevels = ["Beginner", "Intermediate", "Advanced"];

export default function CreateProfile() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSkillLevel, setSkillLevel] = useState<string>("");

  const updateProfile = api.user.updateProfile.useMutation();

  const handleSubmit = () => {
    console.log(selectedInterests, selectedSkills);

    const skillPoint = selectedSkillLevel === "Beginner" ? 1 : selectedSkillLevel === "Intermediate" ? 2 : 3;

    updateProfile.mutate({
        interests: selectedInterests.join(","),
        skills: selectedSkills.join(","),
        rating: skillPoint
    })
  }

  return (
    <div
      className={`mt-20 flex min-h-[90dvh] flex-col items-center bg-base-200 p-8`}
    >
      <h1 className={`mt-8 text-center text-3xl font-bold`}>
        Tell us a little about yourself
      </h1>

      <div
        className={`mt-6 min-h-[60dvh] w-full max-w-4xl rounded-xl border border-base-content/25 p-4`}
      >
        <p
          className={`mb-8 text-center text-sm font-bold text-base-content/70`}
        >
          {"We'll use this information to help you find projects you're interested in."}
        </p>
        <p className={`mb-4 font-bold`}>Tell us about your interests</p>
        <div className={`mb-8 flex  flex-wrap gap-2`}>
          {interests.map((interest, index) => (
            <button
              className={`badge hover:badge-accent ${
                selectedInterests.includes(interest) && `badge-accent`
              }`}
              key={index}
              onClick={() => {
                setSelectedInterests((prev) => {
                  if (prev.includes(interest)) {
                    return prev.filter((i) => i !== interest);
                  } else {
                    return [...prev, interest];
                  }
                });
              }}
            >
              {interest}
            </button>
          ))}
        </div>
        <p className={`mb-4 font-bold`}>Tell us about your skills</p>
        <div className={`mb-8 flex  flex-wrap gap-2`}>
          {skills.map((skill, index) => (
            <button
              className={`badge hover:badge-accent ${
                selectedSkills.includes(skill) && `badge-accent`
              }`}
              key={index}
              onClick={() => {
                setSelectedSkills((prev) => {
                  if (prev.includes(skill)) {
                    return prev.filter((i) => i !== skill);
                  } else {
                    return [...prev, skill];
                  }
                });
              }}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className={`mt-8 flex items-center justify-between`}>
          <p className={`mr-6 w-full font-bold`}>
            How would you rate your skill level in each of the skills you
            listed?
          </p>

          <select
            className={`select select-bordered mb-4 w-full`}
            onChange={(e) => {
                setSkillLevel(e.target.value);
            }}
            value={selectedSkillLevel}
          >
            {skillLevels.map((level, index) => (
              <option key={index}>{level}</option>
            ))}
          </select>
        </div>

        <div className={`mt-8 flex items-center justify-center`}>
          <button className={`btn btn-accent btn-wide`} onClick={
            handleSubmit
          }>Finish</button>
        </div>
      </div>
    </div>
  );
}
