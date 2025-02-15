// "use client";
// import { eq } from "drizzle-orm";
// import React, { useState, useEffect } from "react";
// import db from "@/utils/db";
// import { mockInterview } from "@/utils/schema";
// function StartInterview({ params }) {
//   const [interviewData, setInterviewData] = useState();
//   const [mockInterviewQuestion, setmockInterviewQuestion] = useState();
//   const [error, setError] = useState(null);

//   useEffect((id) => {
//     GetInterviewDetails();
//   }, []);
//   const GetInterviewDetails = async (id) => {
//     try {
//       const result = await db
//         .select()
//         .from(mockInterview)
//         .where(eq(mockInterview.mockId, id));
//       const jsonMockResp = JSON.parse(result[0].jsonMockResp);
//       console.log(jsonMockResp);
//       setmockInterviewQuestion(jsonMockResp);
//       setInterviewData(result[0]);
//       if (result.length > 0) {
//       } else {
//         setError("No interview data found.");
//       }
//     } catch (err) {
//       console.error("Error fetching interview details:", err);
//       setError("Failed to fetch interview details.");
//     }
//   };
//   return <div>StartInterview</div>;
// }

// export default StartInterview;
// "use client";
// import { eq } from "drizzle-orm";
// import React, { useState, useEffect } from "react";
// import db from "@/utils/db";
// import { mockInterview } from "@/utils/schema";

// function StartInterview({ params }) {
//   const [interviewData, setInterviewData] = useState(null);
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (params?.interviewId) {
//       GetInterviewDetails(params.interviewId);
//     } else {
//       setError("Invalid Interview ID.");
//     }
//   }, [params]); // ✅ Runs when params change

//   const GetInterviewDetails = async (id) => {
//     try {
//       const result = await db
//         .select()
//         .from(mockInterview)
//         .where(eq(mockInterview.mockId, id));

//       if (!result || result.length === 0) {
//         setError("No interview data found.");
//         console.error("No interview data found for ID:", id);
//         return; // ✅ Stop execution if no data
//       }

//       // ✅ Safely parse JSON response
//       const jsonMockResp = result[0]?.jsonMockResp;
//       if (!jsonMockResp) {
//         setError("Invalid interview data.");
//         console.error("Invalid JSON response.");
//         return;
//       }

//       const parsedJson = JSON.parse(jsonMockResp);
//       setMockInterviewQuestion(parsedJson);
//       setInterviewData(result[0]);
//     } catch (err) {
//       console.error("Error fetching interview details:", err);
//       setError("Failed to fetch interview details.");
//     }
//   };

//   return (
//     <div>
//       {error ? <p className="text-red-500">{error}</p> : <p>Start Interview</p>}
//     </div>
//   );
// }

// export default StartInterview;
// 3 codeeeeeeeeeeeeeeeeeeeeeeeeeeee

// "use client";
// import { eq } from "drizzle-orm";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation"; // ✅ Import useParams
// import db from "@/utils/db";
// import { mockInterview } from "@/utils/schema";

// function StartInterview() {
//   const params = useParams(); // ✅ Fetch params asynchronously
//   const [interviewData, setInterviewData] = useState(null);
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (params?.interviewId) {
//       GetInterviewDetails(params.interviewId);
//     } else {
//       setError("Invalid Interview ID.");
//     }
//   }, [params]); // ✅ Runs when params are updated

//   const GetInterviewDetails = async (id) => {
//     try {
//       const result = await db
//         .select()
//         .from(mockInterview)
//         .where(eq(mockInterview.mockId, id));

//       if (!result || result.length === 0) {
//         setError("No interview data found.");
//         console.error("No interview data found for ID:", id);
//         return; // ✅ Stop execution if no data
//       }

//       // ✅ Safely parse JSON response
//       const jsonMockResp = result[0]?.jsonMockResp;
//       if (!jsonMockResp) {
//         setError("Invalid interview data.");
//         console.error("Invalid JSON response.");
//         return;
//       }

//       const parsedJson = JSON.parse(jsonMockResp);
//       setMockInterviewQuestion(parsedJson);
//       setInterviewData(result[0]);
//     } catch (err) {
//       console.error("Error fetching interview details:", err);
//       setError("Failed to fetch interview details.");
//     }
//   };

//   return (
//     <div>
//       {error ? <p className="text-red-500">{error}</p> : <p>Start Interview</p>}
//     </div>
//   );
// }

// export default StartInterview;
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import db from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
function StartInterview() {
  const params = useParams(); // ✅ Get params (async in Next.js 14+)
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [error, setError] = useState(null);

  // ✅ Resolve params asynchronously inside useEffect
  useEffect(() => {
    if (params?.interviewId) {
      setInterviewId(params.interviewId);
    }
  }, [params?.interviewId]);

  // ✅ Fetch interview details when interviewId is available
  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails(interviewId);
    }
  }, [interviewId]);

  // const GetInterviewDetails = async (id) => {
  //   try {
  //     const result = await db
  //       .select()
  //       .from(mockInterview)
  //       .where(eq(mockInterview.mockId, id));

  //     if (!result || result.length === 0) {
  //       setError("No interview data found.");
  //       console.error("No interview data found for ID:", id);
  //       return; // ✅ Stop execution if no data
  //     }

  //     // ✅ Safely parse JSON response
  //     const jsonMockResp = result[0]?.jsonMockResp;
  //     if (!jsonMockResp) {
  //       setError("Invalid interview data.");
  //       console.error("Invalid JSON response.");
  //       return;
  //     }

  //     const parsedJson = JSON.parse(jsonMockResp);
  //     setMockInterviewQuestion(parsedJson);
  //     setInterviewData(result[0]);
  //   } catch (err) {
  //     console.error("Error fetching interview details:", err);
  //     setError("Failed to fetch interview details.");
  //   }
  // };
  const GetInterviewDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(mockInterview)
        .where(eq(mockInterview.mockId, id));

      if (!result || result.length === 0) {
        setError("No interview data found.");
        console.error("No interview data found for ID:", id);
        return;
      }

      // ✅ Log the API response structure
      console.log("API Response:", result[0]);

      // ✅ Ensure jsonMockResp exists
      const jsonMockResp = result[0]?.jsonMockResp;
      if (!jsonMockResp) {
        setError("Invalid interview data.");
        console.error("Invalid JSON response.");
        return;
      }

      // ✅ Log raw JSON response
      console.log("Raw JSON Response:", jsonMockResp);

      // ✅ Ensure JSON is properly parsed
      let parsedJson;
      if (typeof jsonMockResp === "string") {
        parsedJson = JSON.parse(jsonMockResp);
      } else {
        parsedJson = jsonMockResp; // If it's already an object, use it directly
      }

      // ✅ Ensure parsed data is an array
      const questionsArray = Array.isArray(parsedJson)
        ? parsedJson
        : [parsedJson];

      setMockInterviewQuestion(questionsArray);
      setInterviewData(result[0]);

      console.log("Parsed Questions:", questionsArray);
    } catch (err) {
      console.error("Error fetching interview details:", err);
      setError("Failed to fetch interview details.");
    }
  };

  return (
    <div>
      {error ? <p className="text-red-500">{error}</p> : <p>Start Interview</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/**Questions  */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/**Video /Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question{" "}
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}

        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
