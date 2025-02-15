"use client";
import db from "@/utils/db"; // Make sure this is your Drizzle client instance
import useSpeechToText from "react-hook-speech-to-text";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { UserAnswer } from "@/utils/schema"; // Ensure UserAnswer is imported from your schema
import { drizzle } from "drizzle-orm";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Update `userAnswer` when `results` change
  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(
        (prevAns) => prevAns + " " + results.map((r) => r.transcript).join(" ")
      );
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
    if (userAnswer.length < 10) {
      toast("Error: Please record a longer answer.");
      setLoading(false);
    }
  }, [userAnswer]);

  // Function to start or stop recording
  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  // Function to update and insert user answer into the database
  const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = `
        Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
        User Answer: ${userAnswer}
        Provide feedback as JSON in the following format:
        {
          "rating": <score out of 10>,
          "feedback": "<3-5 lines of improvement suggestions>"
        }
      `;

    try {
      // Send request to AI model to get feedback
      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawResponse = await result.response.text();

      // Clean up and parse the feedback response
      const cleanedResponse = rawResponse
        .replace("```json", "")
        .replace("```", "");
      const parsedResponse = JSON.parse(cleanedResponse);

      console.log(parsedResponse);
      toast(`Feedback received! Rating: ${parsedResponse.rating}/10`);

      // ✅ Ensure `db` is correctly defined and Drizzle ORM is initialized
      if (!db) {
        console.error("Database instance is undefined.");
        toast("Database error, please contact support.");
        setLoading(false);
        return;
      }

      // Insert the answer and feedback into the userAnswer table in the database
      const insertResult = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: parsedResponse?.feedback,
        rating: parsedResponse?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"), // Date format
      });

      if (insertResult) {
        toast("User answer recorded successfully.");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error(
        "Error fetching feedback or inserting into database:",
        error
      );
      setResults([]);
      toast("An error occurred while processing your response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center rounded-lg p-5 relative">
        {/* Background Image */}
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          alt="Webcam icon"
          className="absolute"
        />

        {/* Actual Webcam Component */}
        <Webcam
          mirrored={true}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
            position: "relative",
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}
    </div>
  );
}

export default RecordAnswerSection;
