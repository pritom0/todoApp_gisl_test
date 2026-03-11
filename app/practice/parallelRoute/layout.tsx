import { getSession } from "@/utility/getSession";
import React from "react";

type LayoutProp = {
  children: React.ReactNode;
  NavSection: React.ReactNode;
  adminSection: React.ReactNode; // added admin slot
  userSection: React.ReactNode;
  LoginSection: React.ReactNode;
}

export default async function ParallelLayout({children, NavSection, adminSection, userSection, LoginSection}  : LayoutProp){
  const session = await getSession();
  const role = session?.role;
  console.log({role})
  return (
    <>
      {children}
      {NavSection}
      {LoginSection}
      {
        // render the correct parallel branch based on role
        role === 'admin' ? adminSection
          : role === 'user' ? userSection
          : <div>logged out</div>
      }
    </>
  )
}