"use client";
import React, { useState } from 'react';
import { Avatar } from '@mantine/core';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useCookies } from 'react-cookie';
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconLogout,
  IconSettings,
  IconUserBolt,
  IconRun,
  IconHome,
  IconSearch,
  IconFolder,
  IconAlien,
  IconNotification,
  IconWallet
} from "@tabler/icons-react";
import { cn } from "../lib/utils";

export function SidebarDemo( { children }: { children: React.ReactNode }) {
    const { user, setUser } = useUser();
    const [, , removeCookie] = useCookies(['login']);
    const links = [
        {
            label: "Dashboard",
            href: "/",
            icon: (
                <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Workout",
            href: "/workout",
            icon: (
                <IconRun className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Feed",
            href: "/feed",
            icon: (
                <IconSearch className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Routines",
            href: "/routines",
            icon: (
                <IconFolder className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Exercises",
            href: "/exercises",
            icon: (
                <IconAlien className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Notifications",
            href: "/notification",
            icon: (
                <IconNotification className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Wallet",
            href: "/wallet",
            icon: (
                <IconWallet className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Profile",
            href: "/profile",
            icon: (
                <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        
    ];
    const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-0 flex w-full flex-col border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen",
      )}
    >
    <Sidebar open={open} setOpen={setOpen}>
    <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Logo />
        <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
            <SidebarLink key={idx} link={link} />
            ))}
        </div>
        </div>
        <div className="flex flex-row gap-2">
            <SidebarLink
                link={{
                label: `${user.userInfo.username}`,
                href: "/profile",
                icon: (
                    <Avatar
                    // avatar image 
                    src={``}
                    radius="md"
                    size={23}
                    className="shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white"
                    />
                ),
                }}
            />
            <IconLogout
                aria-label='Logout'
                className={`h-5 w-5 m-auto shrink-0 cursor-pointer text-neutral-700 dark:text-neutral-200 ${open ? 'visible' : 'invisible'}`}
                onClick={() => {
                setUser({ isAuthenticated: false, userInfo: { userId: '', username: '', publicKey: '', email: '' } });
                removeCookie('login', { path: '/' });
                }}
            />
        </div>
    </SidebarBody>
    </Sidebar>
    <div className="flex w-full overflow-auto border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        {children}
    </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <button
      type="button"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <img 
        src="/logo.png"
        alt="Logo"
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white"
        width={24}
        height={24}
        loading="lazy"
        decoding="async"
        data-nimg="intrinsic"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        GymBro
      </motion.span>
    </button>
  );
};



