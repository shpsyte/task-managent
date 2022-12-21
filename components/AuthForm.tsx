"use client";
import { register, signin } from "@/lib/api";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import produce from "immer";
const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace("/home");
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === "register" ? registerContent : signinContent;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  name="firstName"
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={handleChange}
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  name="lastName"
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              name="email"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              name="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  // prefetch
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
