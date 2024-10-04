"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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
            {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            <div className="flex flex-col ml-[20px]">
              <Link href="/">Top</Link>
              <DropdownMenuSeparator />
              <Link href="/">Bottom</Link>
              <DropdownMenuSeparator />
              <Link href="/">Right</Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
