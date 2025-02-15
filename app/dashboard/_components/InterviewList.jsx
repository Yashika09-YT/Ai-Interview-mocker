// "use client";
// import { mockInterview } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState } from "react";
// import { desc } from "drizzle-orm";
// import { eq } from "drizzle-orm";
// import db from "@/utils/db";
// function Interviewlist() {
//   const { user } = useUser();
//   const [InterviewList, setinterviewList] = useState([]);
//   useEffect(() => {
//     user && GetInterviewList();
//   }, [user]);
//   const GetInterviewList = async () => {
//     const result = await db
//       .select()
//       .from(mockInterview)
//       .where(
//         eq(
//           mockInterview.createdBy,
//           user?.primaryEmailAddress?.emailAddress
//         ).orderBy(desc(mockInterview.id))
//       );
//     console.log(result);
//     setinterviewList(result);
//   };
//   return (
//     <div>
//       <h2 className="font-medium text-xl">Previous Mock Interview</h2>
//     </div>
//   );
// }

// export default Interviewlist;
"use client";
import { mockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { desc, eq } from "drizzle-orm"; // Import correctly
import db from "@/utils/db";
import InterviewItemCard from "../_components/InterviewItemCard";
function InterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      user && GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email not found");
      return;
    }

    try {
      const result = await db
        .select()
        .from(mockInterview)
        .where(
          eq(mockInterview.createdBy, user.primaryEmailAddress.emailAddress)
        ) // Corrected `.where()`
        .orderBy(desc(mockInterview.id)); // Moved `.orderBy()` outside `.where()`

      console.log(result);
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard key={interview.id} interview={interview} />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
