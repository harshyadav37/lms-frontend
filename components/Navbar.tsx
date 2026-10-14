"use client";
import { Menu, School } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Darkmode from "./Darkmode";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
const Navbar = () => {
  const user = true;
  const router = useRouter();
  return (
    // dark:bg-[#020817]
    <div className="h-16  bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-10 px-4">
        <div className="flex items-center gap-2">
          <School className="" size={"30"} />
          <Link href="/">
            <h1 className="font-extrabold text-xl md:text-2xl">
              E-Learning
            </h1>
          </Link>
        </div>
        <section className="hidden bg-white items-center gap-4 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border-0 shadow-sm"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem>Log out</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <section className="flex items-center  gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
              <Button onClick={() => router.push("/auth/signup")}>
                Signup
              </Button>
            </section>
          )}
          <Darkmode />
        </section>
        <section className="flex items-center gap-3 md:hidden">
          <Darkmode />
          <MobileNavbar user={user} />
        </section>
      </div>
    </div>
  );
};

export default Navbar;


const MobileNavbar = ({ user }: { user: boolean }) => {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Open navigation">
            <Menu />
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>E-Learning</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4">
          {user ? (
            <>
              <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/student/dashboard">
                My Learning
              </Link>
              <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/profile">
                Edit Profile
              </Link>
              <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/admin/dashboard">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/auth/login">
                Login
              </Link>
              <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/auth/signup">
                Signup
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
