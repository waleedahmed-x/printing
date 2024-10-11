"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Hamburger } from "@/components/icons/Icons";
// import Link from "next/link";

export default function Appbar() {
  return (
    <div className="appbar">
      <Hamburger />
      <h2>Start2 Finish Printing</h2>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[300px] p-5">
                <sup>
                  Re-usable components built using Radix UI and Tailwind CSS.
                </sup>
                <sup>How to install dependencies and structure your app.</sup>
                <sup>Styles for headings, paragraphs, lists...etc</sup>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
