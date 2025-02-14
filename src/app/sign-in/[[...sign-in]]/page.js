import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <SignIn
      appearance={{
        elements: {
          rootBox: "bg-white shadow-lg rounded-lg p-6",
          card: "border border-gray-300",
          formFieldLabel: "text-gray-700 font-semibold",
          submitButton: "bg-blue-500 text-white px-4 py-2 rounded",
        },
      }}
    />
  </div>
  )
}