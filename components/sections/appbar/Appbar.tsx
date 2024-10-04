"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Appbar() {
  return (
    <div className="appbar">
      <h2>Start2 Finish Printing</h2>
      <div className="nav-items">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <p>Open</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <div className="flex flex-col ml-[20px]">
              <DropdownMenuLabel>
                <Link href="/">Top</Link>
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <Link href="/">Bottom</Link>
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <Link href="/">Right</Link>
              </DropdownMenuLabel>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
