// import Image from "next/image";
// import { Button } from "@/components/ui/button"

// export default function Home() {
//   return (
//     <div>
//       <h1>Yashika Tanwar </h1>
//       <Button variant="outline">Button</Button>

//     </div>
//   );
// }

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}
