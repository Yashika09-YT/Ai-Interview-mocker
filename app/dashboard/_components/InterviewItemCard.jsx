import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function interviewItemCard({ interview }) {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">{interview?.jobExperience}</h2>
      <h2 className="text-xs text-gray-400">
        Created At:{interview.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        {/* <Link
          href={"/dashboard/interview/" + interview?.mockId}
          className="w-full"
        > */}
        <Button size="sm" variant="outline" onClick={onFeedback}>
          FeedBack
        </Button>

        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default interviewItemCard;
