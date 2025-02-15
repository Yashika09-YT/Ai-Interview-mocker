// "use client";
// import Header from "../../_components/Header";
// import { mockInterview } from "@/utils/schema";
// import React, { useEffect, useState } from "react";
// import db from "@/utils/db";
// import { eq } from "drizzle-orm";
// import { Webcam } from "lucide-react";
// import { WebcamIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function Interview({ params }) {
//   const [interviewData, setinterviewData] = useState();
//   const [webCamEnabled, setWebCamEnabled] = useState(false);
//   useEffect(() => {
//     console.log(params /*.interviewId*/);
//     GetInterviewDetails();
//   }, []);
//   /**
//    * used to get interview details by mockid/interviewid
//    */
//   const GetInterviewDetails = async () => {
//     const result = await db
//       .select()
//       .from(mockInterview)
//       .where(eq(mockInterview.mockId, params.interviewId));

//     setinterviewData(result[0]);
//   };
//   return (
//     <div className="my-10 flex justify-center flex-col items-center">
//       <h2 className="font-bold text-2xl">Lets Get Started</h2>
//       <div>
//         {webCamEnabled ? (
//           <Webcam
//             onUserMedia={() => setWebCamEnabled(true)}
//             onUserMediaError={() => setWebCamEnabled(false)}
//             style={{
//               height: 300,
//               width: 300,
//             }}
//           />
//         ) : (
//           <>
//             <WebcamIcon className="h-72 w-full  my-7 p-20 bg-secondary rounded-lg border" />
//             <Button onClick={() => setWebCamEnabled(true)}>
//               Enable Web Cam and Microphone
//             </Button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Interview;
// 2 code
// "use client";
// import Link from "next/link";
// import Header from "../../_components/Header";
// import { mockInterview } from "@/utils/schema";
// import React, { useEffect, useState, useRef } from "react";
// import db from "@/utils/db";
// import { eq } from "drizzle-orm";
// import { Lightbulb, WebcamIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Webcam from "react-webcam"; // ✅ Import react-webcam

// function Interview({ params }) {
//   const [interviewData, setInterviewData] = useState(null);
//   const [webCamEnabled, setWebCamEnabled] = useState(false);
//   const [error, setError] = useState(null);
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     params.then((resolvedParams) => {
//       console.log("Interview ID:", resolvedParams.interviewId);
//       GetInterviewDetails(resolvedParams.interviewId);
//     });
//   }, [params]);

//   /**
//    * Fetch interview details by interviewId
//    */
//   const GetInterviewDetails = async (interviewId) => {
//     try {
//       const result = await db
//         .select()
//         .from(mockInterview)
//         .where(eq(mockInterview.mockId, interviewId));

//       setInterviewData(result[0]);
//     } catch (err) {
//       console.error("Error fetching interview details:", err);
//     }
//   };

//   return (
//     <div className="my-10 ">
//       <h2 className="font-bold text-2xl">Let's Get Started</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="flex flex-col my-5 gap-5 ">
//           <div className="p-5 rounded-lg border">
//             {interviewData ? (
//               <>
//                 <h2 className="text-lg">
//                   <strong>Job Role/Job Position: </strong>{" "}
//                   {interviewData.jobPosition}
//                 </h2>
//                 <h2 className="text-lg">
//                   <strong>Job Description/Tech Stack: </strong>{" "}
//                   {interviewData.jobDesc}
//                 </h2>
//                 <h2 className="text-lg">
//                   <strong>Years Of Experience </strong>{" "}
//                   {interviewData.jobExperience}
//                 </h2>
//               </>
//             ) : (
//               <p>Loading interview details...</p>
//             )}
//           </div>
//           <div className="p-5 border rounded-lg border-yellow-300  bg-yellow-100">
//             <h2 className="flex gap-2 items-center text-yellow-500 ">
//               {" "}
//               <Lightbulb />
//               <strong>Information</strong>
//             </h2>
//             <h2 className="mt-3 text-yellow-500">
//               {process.env.NEXT_PUBLIC_INFORMATION}
//             </h2>
//           </div>
//         </div>
//         <div>
//           {webCamEnabled ? (
//             <Webcam
//               ref={webcamRef}
//               audio={true}
//               mirrored={true} // ✅ Flips the camera horizontally
//               onUserMedia={() => console.log("Webcam access granted!")}
//               onUserMediaError={(err) =>
//                 console.error("Webcam access denied:", err)
//               }
//               style={{ height: 300, width: 300, borderRadius: "10px" }}
//             />
//           ) : (
//             <>
//               <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
//               {error && <p className="text-red-500">{error}</p>}
//               <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
//                 Enable Web Cam and Microphone
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-end items-end">
//         <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
//           <Button>Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Interview;
"use client";

import Link from "next/link";
import Header from "../../_components/Header";
import { mockInterview } from "@/utils/schema";
import React, { useEffect, useState, useRef } from "react";
import db from "@/utils/db";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam"; // ✅ Import react-webcam

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [interviewId, setInterviewId] = useState(null); // ✅ Handle interview ID properly
  const webcamRef = useRef(null);

  useEffect(() => {
    if (params instanceof Promise) {
      params
        .then((resolvedParams) => {
          console.log("Resolved Interview ID:", resolvedParams?.interviewId);
          if (resolvedParams?.interviewId) {
            setInterviewId(resolvedParams.interviewId);
            GetInterviewDetails(resolvedParams.interviewId);
          } else {
            setError("Interview ID not found.");
          }
        })
        .catch((err) => {
          console.error("Error resolving params:", err);
          setError("Error loading interview details.");
        });
    } else {
      console.log("Direct Interview ID:", params?.interviewId);
      if (params?.interviewId) {
        setInterviewId(params.interviewId);
        GetInterviewDetails(params.interviewId);
      } else {
        setError("Interview ID not found.");
      }
    }
  }, [params]);

  /**
   * Fetch interview details by interviewId
   */
  const GetInterviewDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(mockInterview)
        .where(eq(mockInterview.mockId, id));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        setError("No interview data found.");
      }
    } catch (err) {
      console.error("Error fetching interview details:", err);
      setError("Failed to fetch interview details.");
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="p-5 rounded-lg border">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/Job Position: </strong>{" "}
                  {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Tech Stack: </strong>{" "}
                  {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years Of Experience: </strong>{" "}
                  {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <p>Loading interview details...</p>
            )}
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "No additional information available."}
            </h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              ref={webcamRef}
              audio={true}
              mirrored={true} // ✅ Flips the camera horizontally
              onUserMedia={() => console.log("Webcam access granted!")}
              onUserMediaError={(err) => {
                console.error("Webcam access denied:", err);
                setError("Webcam access denied.");
                setWebCamEnabled(false);
              }}
              style={{ height: 300, width: 300, borderRadius: "10px" }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              {error && <p className="text-red-500">{error}</p>}
              <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Link
          href={interviewId ? `/dashboard/interview/${interviewId}/start` : "#"}
        >
          <Button disabled={!interviewId}>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
