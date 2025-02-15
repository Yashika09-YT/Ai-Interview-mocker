// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { LoaderCircle } from "lucide-react";
// import { mockInterview } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";
// import db from "@/utils/db";
// import { useRouter } from "next/navigation";
// console.log(db);
// require("dotenv").config();

// function AddNewInterview() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [jobPosition, setJobPosition] = useState();
//   const [jobDesc, setJobDesc] = useState();
//   const [jobExperience, setJobExperience] = useState();
//   const [loading, setloading] = useState(false);
//   const [jsonResponse, setJsonResponse] = useState([]);
//   const router = useRouter();
//   const { user } = useUser();

//   const onSubmit = async (e) => {
//     setloading(true);
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience);

//     const InputPrompt =
//       "Job Position:" +
//       jobPosition +
//       ",Job Description:" +
//       jobDesc +
//       ",Years of Experience:" +
//       jobExperience +
//       " give us " +
//       process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
//       "interview question along with answers in json format,Give us question and answer field on  JSON";

//     const result = await chatSession.sendMessage(InputPrompt);
//     console.log("******************************************");
//     const MockJsonResp = result.response
//       .text()
//       .replace("```json", "")
//       .replace("```", "");
//     console.log(JSON.parse(MockJsonResp));
//     setJsonResponse(MockJsonResp);
//     try {
//       console.log("==========inside try block");

//       if (MockJsonResp) {
//         console.log("inside if condition ========");
//         console.log(db);
//         console.log("after console db condition ========");
//         const resp = await db
//           .insert(mockInterview)
//           .values({
//             mockId: uuidv4(),
//             jsonMockResp: MockJsonResp,
//             jobPosition: jobPosition,
//             jobDesc: jobDesc,
//             jobExperience: jobExperience,
//             createdBy: user?.primaryEmailAddress?.emailAddress,
//             createdAt: moment().format("DD-MM-YYYY"),
//           })
//           .returning({ mockId: mockInterview.mockId });
//         console.log("Inserted ID:", resp);
//         if (resp) {
//           setOpenDialog(false);
//           router.push("/dashboard/interview/" + resp[0]?.mockId);
//         }
//       } else {
//         console.log("ERROR");
//       }
//       setloading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   return (
//     <div>
//       <div
//         className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
//         onClick={() => setOpenDialog(true)}
//       >
//         <h2 className=" text-lg text-center">+ Add New</h2>
//       </div>
//       <Dialog open={openDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="text-2xl">
//               Are you absolutely sure?
//             </DialogTitle>
//             <DialogDescription>
//               <form onSubmit={onSubmit}>
//                 <h2>
//                   Add Details about your job position/role, Job Description,
//                   years of experience, and upload your resume
//                 </h2>
//                 <div className="mt-7 my-3">
//                   <label>Job Role/Job Position</label>
//                   <Input
//                     placeholder="Ex. Full Stack"
//                     required
//                     onChange={(event) => setJobPosition(event.target.value)}
//                   ></Input>
//                 </div>
//                 <div className="my-2">
//                   <label>Job Description/Tech Stack (In Short) </label>
//                   <Textarea
//                     placeholder="Ex. React, Angular, Node.js, MySQL, etc."
//                     required
//                     onChange={(event) => setJobDesc(event.target.value)}
//                   ></Textarea>
//                 </div>
//                 <div className="my-3">
//                   <label>Years of Experience</label>
//                   <Input
//                     placeholder="Ex. 5"
//                     type="number"
//                     max="100"
//                     required
//                     onChange={(event) => setJobExperience(event.target.value)}
//                   ></Input>
//                 </div>
//                 <div className="my-3">
//                   <label>Upload Resume</label>
//                   <Input type="file" accept=".pdf,.doc,.docx" />
//                 </div>
//                 <div>
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => setOpenDialog(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={loading}>
//                     {loading ? (
//                       <>
//                         <LoaderCircle className="animate-spin" />
//                         'Generating from ai'
//                       </>
//                     ) : (
//                       "start interview"
//                     )}
//                     Start Interview
//                   </Button>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddNewInterview;
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { mockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import db from "@/utils/db";
import { useRouter } from "next/navigation";

require("dotenv").config();

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [error, setError] = useState(null); // ✅ Added error state
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!jobPosition || !jobDesc || !jobExperience) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const questionCount =
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || "5";

    const InputPrompt = `
      Job Position: ${jobPosition},
      Job Description: ${jobDesc},
      Years of Experience: ${jobExperience},
      Give us ${questionCount} interview questions along with answers in JSON format.
      Provide "question" and "answer" fields in the JSON response.
    `;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = await result.response.text();
      const cleanedMockJsonResp = MockJsonResp.replace("```json", "").replace(
        "```",
        ""
      );

      // ✅ Try parsing JSON safely
      let parsedJson;
      try {
        parsedJson = JSON.parse(cleanedMockJsonResp);
      } catch (jsonError) {
        console.error("Error parsing AI response:", jsonError);
        setError("AI response was not valid JSON.");
        setLoading(false);
        return;
      }

      console.log(parsedJson);
      setJsonResponse(parsedJson);

      // ✅ Store data in the database
      const resp = await db
        .insert(mockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: cleanedMockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: mockInterview.mockId });

      if (resp.length > 0) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      } else {
        setError("Failed to save interview details.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <h2>
                  Add details about your job position/role, Job Description,
                  years of experience, and upload your resume.
                </h2>
                {error && <p className="text-red-500">{error}</p>}{" "}
                {/* ✅ Display errors */}
                <div className="mt-7 my-3">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack"
                    required
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>
                <div className="my-2">
                  <label>Job Description/Tech Stack (In Short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, Node.js, MySQL, etc."
                    required
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    max="100"
                    required
                    onChange={(event) => setJobExperience(event.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Upload Resume</label>
                  <Input type="file" accept=".pdf,.doc,.docx" />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
