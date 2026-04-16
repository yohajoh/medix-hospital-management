import { redirect } from "next/navigation";

export default function AutIndexPage(): never {
  redirect("/auth/login");
}
