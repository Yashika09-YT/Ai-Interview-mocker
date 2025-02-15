// "use client";
// import db from "@/utils/db";
// import { eq } from "drizzle-orm";
// import { UserAnswer } from "@/utils/schema";
// import React, { useEffect } from "react";

// function Feedback({ params }) {
//   useEffect(() => {
//     GetFeedback();
//   }, []);
//   const GetFeedback = async () => {
//     const result = await db
//       .select()
//       .from(UserAnswer)
//       .where(eq(UserAnswer.mockIdRef, parseAppSegmentConfig.interviewId))
//       .orderBy(UserAnswer.id);
//     console.log(result);
//   };
//   return (
//     <div className="p-10">
//       <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
//       <h2 className="font-bold text-2xl">Here is your interview</h2>
//       <h2 className="text-primary text-lg my-3">
//         Your Overall interview rating:<strong>7/10</strong>
//       </h2>
//       <h2 className="text-sm text-gray-500">
//         Find Below Interview Question with correct answer your answer{" "}
//       </h2>
//     </div>
//   );
// }

// export default Feedback;
// "use client";
// import db from "@/utils/db";
// import { eq } from "drizzle-orm";
// import { UserAnswer } from "@/utils/schema";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// function Feedback({ params }) {
//   const [feedbackList, setFeedbackList] = useState([]);
//   useEffect(() => {
//     GetFeedback();
//   }, []);

//   const GetFeedback = async () => {
//     if (!params || !params.interviewId) {
//       console.error("interviewId is missing in params");
//       return;
//     }

//     try {
//       const result = await db
//         .select()
//         .from(UserAnswer)
//         .where(eq(UserAnswer.mockIdRef, params.interviewId)) // Using params.interviewId
//         .orderBy(UserAnswer.id);

//       console.log(result);
//       setFeedbackList(result);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   return (
//     <div className="p-10">
//       <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
//       <h2 className="font-bold text-2xl">Here is your interview</h2>
//       <h2 className="text-primary text-lg my-3">
//         Your Overall interview rating: <strong>7/10</strong>
//       </h2>
//       <h2 className="text-sm text-gray-500">
//         Find Below Interview Question with correct answer your answer{" "}
//       </h2>
//       {feedbackList &&
//         feedbackList.map((item, index) => {
//           <Collapsible key={index}>
//             <CollapsibleTrigger>
//               Can I use this in my project?
//             </CollapsibleTrigger>
//             <CollapsibleContent>
//               Yes. Free to use for personal and commercial projects. No
//               attribution required.
//             </CollapsibleContent>
//           </Collapsible>;
//         })}
//     </div>
//   );
// }

// export default Feedback;
"use client";
import db from "@/utils/db";
import { eq } from "drizzle-orm";
import { UserAnswer } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation"; // Import
//  useParams
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";

function Feedback() {
  const params = useParams(); // Get the params correctly
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (params?.interviewId) {
      GetFeedback(params.interviewId);
    }
  }, [params]);

  const GetFeedback = async (interviewId) => {
    if (!interviewId) {
      console.error("interviewId is missing");
      return;
    }

    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId)) // Now safely using interviewId
        .orderBy(UserAnswer.id);

      console.log(result);
      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview FeedBack Record Found{" "}
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
          <h2 className="font-bold text-2xl">Here is your interview</h2>
          <h2 className="text-primary text-lg my-3">
            Your Overall interview rating: <strong>7/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find Below Interview Question with correct answer your answer
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg  flex justify-between my-2 text-left gap-7 w-full ">
                {item.question}{" "}
                <ChevronsUpDown className="h-5 w-5"></ChevronsUpDown>
                {/* Replace with your actual field */}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounde-lg">
                    <strong>Rating:</strong>
                    {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer : </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer : </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary-900">
                    <strong>FeedBack : </strong>
                    {item.feedback}
                  </h2>
                </div>
                {/* Replace with your actual field */}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}

export default Feedback;
